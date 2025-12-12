import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export class GenreController {
    // GET /api/genres - Get all genres
    async getGenres(req: Request, res: Response) {
        try {
            const genres = await prisma.genre.findMany({
                orderBy: { name: 'asc' }
            });

            res.json(genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
            res.status(500).json({ error: 'Failed to fetch genres' });
        }
    }

    // GET /api/genres/:slug - Get genre by slug with films
    async getGenreBySlug(req: Request, res: Response) {
        try {
            const { slug } = req.params;
            const { page = '1', limit = '20' } = req.query;

            const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
            const take = parseInt(limit as string);

            const genre = await prisma.genre.findUnique({
                where: { slug },
                include: {
                    filmGenres: {
                        skip,
                        take,
                        where: {
                            film: { isActive: true }
                        },
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
                        }
                    }
                }
            });

            if (!genre) {
                return res.status(404).json({ error: 'Genre not found' });
            }

            // Get total count
            const total = await prisma.filmGenre.count({
                where: {
                    genreId: genre.id,
                    film: { isActive: true }
                }
            });

            // Transform data
            const films = genre.filmGenres.map(fg => ({
                ...fg.film,
                genres: fg.film.filmGenres.map(fgInner => fgInner.genre),
                filmGenres: undefined
            }));

            res.json({
                genre: {
                    id: genre.id,
                    name: genre.name,
                    slug: genre.slug,
                    description: genre.description
                },
                films,
                pagination: {
                    page: parseInt(page as string),
                    limit: parseInt(limit as string),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit as string))
                }
            });
        } catch (error) {
            console.error('Error fetching genre:', error);
            res.status(500).json({ error: 'Failed to fetch genre' });
        }
    }
}

export default new GenreController();
