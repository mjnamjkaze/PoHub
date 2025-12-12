import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../lib/prisma';

export class UserController {
    // GET /api/users/me - Get current user profile
    async getProfile(req: AuthRequest, res: Response) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: req.userId },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    fullName: true,
                    avatarUrl: true,
                    createdAt: true,
                    lastLoginAt: true
                }
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.error('Error fetching profile:', error);
            res.status(500).json({ error: 'Failed to fetch profile' });
        }
    }

    // GET /api/users/favorites - Get user favorites
    async getFavorites(req: AuthRequest, res: Response) {
        try {
            const favorites = await prisma.userFavorite.findMany({
                where: { userId: req.userId },
                include: {
                    film: {
                        include: {
                            filmGenres: {
                                include: {
                                    genre: true
                                }
                            }
                        }
                    }
                },
                orderBy: { addedAt: 'desc' }
            });

            const films = favorites.map(fav => ({
                ...fav.film,
                genres: fav.film.filmGenres.map(fg => fg.genre),
                filmGenres: undefined,
                addedAt: fav.addedAt
            }));

            res.json(films);
        } catch (error) {
            console.error('Error fetching favorites:', error);
            res.status(500).json({ error: 'Failed to fetch favorites' });
        }
    }

    // POST /api/users/favorites/:filmId - Add to favorites
    async addFavorite(req: AuthRequest, res: Response) {
        try {
            const { filmId } = req.params;

            const favorite = await prisma.userFavorite.create({
                data: {
                    userId: req.userId!,
                    filmId: parseInt(filmId),
                    addedAt: new Date()
                }
            });

            res.status(201).json(favorite);
        } catch (error) {
            console.error('Error adding favorite:', error);
            res.status(500).json({ error: 'Failed to add favorite' });
        }
    }

    // DELETE /api/users/favorites/:filmId - Remove from favorites
    async removeFavorite(req: AuthRequest, res: Response) {
        try {
            const { filmId } = req.params;

            await prisma.userFavorite.deleteMany({
                where: {
                    userId: req.userId!,
                    filmId: parseInt(filmId)
                }
            });

            res.json({ message: 'Removed from favorites' });
        } catch (error) {
            console.error('Error removing favorite:', error);
            res.status(500).json({ error: 'Failed to remove favorite' });
        }
    }

    // GET /api/users/history - Get watch history
    async getHistory(req: AuthRequest, res: Response) {
        try {
            const history = await prisma.viewHistory.findMany({
                where: { userId: req.userId },
                include: {
                    film: {
                        include: {
                            filmGenres: {
                                include: {
                                    genre: true
                                }
                            }
                        }
                    }
                },
                orderBy: { viewedAt: 'desc' },
                take: 50
            });

            const films = history.map(h => ({
                ...h.film,
                genres: h.film.filmGenres.map(fg => fg.genre),
                filmGenres: undefined,
                progress: h.progress,
                viewedAt: h.viewedAt
            }));

            res.json(films);
        } catch (error) {
            console.error('Error fetching history:', error);
            res.status(500).json({ error: 'Failed to fetch history' });
        }
    }

    // POST /api/users/history/:filmId - Update watch progress
    async updateProgress(req: AuthRequest, res: Response) {
        try {
            const { filmId } = req.params;
            const { progress } = req.body;

            const history = await prisma.viewHistory.upsert({
                where: {
                    userId_filmId: {
                        userId: req.userId!,
                        filmId: parseInt(filmId)
                    }
                },
                update: {
                    progress,
                    viewedAt: new Date()
                },
                create: {
                    userId: req.userId!,
                    filmId: parseInt(filmId),
                    progress,
                    viewedAt: new Date()
                }
            });

            res.json(history);
        } catch (error) {
            console.error('Error updating progress:', error);
            res.status(500).json({ error: 'Failed to update progress' });
        }
    }
}

export default new UserController();
