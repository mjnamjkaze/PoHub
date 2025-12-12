import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export class AuthController {
    // POST /api/auth/register
    async register(req: Request, res: Response) {
        try {
            const { email, username, password, fullName } = req.body;

            // Check if user exists
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [{ email }, { username }]
                }
            });

            if (existingUser) {
                return res.status(400).json({ error: 'Email or username already exists' });
            }

            // Hash password
            const passwordHash = await bcrypt.hash(password, 10);

            // Create user
            const user = await prisma.user.create({
                data: {
                    email,
                    username,
                    passwordHash,
                    fullName,
                    createdAt: new Date()
                },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    fullName: true,
                    avatarUrl: true,
                    createdAt: true
                }
            });

            // Generate JWT
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

            res.status(201).json({ user, token });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Failed to register user' });
        }
    }

    // POST /api/auth/login
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user || !user.isActive) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.passwordHash);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Update last login
            await prisma.user.update({
                where: { id: user.id },
                data: { lastLoginAt: new Date() }
            });

            // Generate JWT
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

            res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    fullName: user.fullName,
                    avatarUrl: user.avatarUrl
                },
                token
            });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ error: 'Failed to login' });
        }
    }
}

export default new AuthController();
