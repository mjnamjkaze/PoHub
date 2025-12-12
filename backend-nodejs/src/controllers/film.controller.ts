import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export class FilmController {
    // GET /api/films - Get all films with filters and pagination
    async getFilms(req: Request, res: Response) {
        try {
            const {
                page = '1',
                limit = '20',
                type,
                genreSlug,
                year,
                country,
                sortBy = 'createdAt',
                order = 'desc'
            } = req.query;

            const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
            const take = parseInt(limit as string);

            // Build where clause
            const where: any = { isActive: true };

            if (type) where.type = type;
            if (year) where.year = parseInt(year as string);
            if (country) where.country = country;
            if (genreSlug) {
                where.filmGenres = {
                    some: {
                        genre: {
                            slug: genreSlug
                        }
                    }
                };
            }

            // Get total count
            const total = await prisma.film.count({ where });

            // Get films
            const films = await prisma.film.findMany({
                where,
                skip,
                take,
                orderBy: { [sortBy as string]: order },
                include: {
                    filmGenres: {
                        include: {
                            genre: true
                        }
                    },
                    episodes: {
                        where: { isActive: true },
                        orderBy: { episodeNumber: 'asc' }
                    }
                }
            });

            // Transform data
            const transformedFilms = films.map(film => ({
                ...film,
                genres: film.filmGenres.map(fg => fg.genre),
                filmGenres: undefined
            }));

            res.json({
                data: transformedFilms,
                pagination: {
                    page: parseInt(page as string),
                    limit: parseInt(limit as string),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit as string))
                }
            });
        } catch (error) {
            console.error('Error fetching films:', error);
            res.status(500).json({ error: 'Failed to fetch films' });
        }
    }

    // GET /api/films/:id - Get film by ID
    async getFilmById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const film = await prisma.film.findUnique({
                where: { id: parseInt(id) },
                include: {
                    filmGenres: {
                        include: {
                            genre: true
                        }
                    },
                    episodes: {
                        where: { isActive: true },
                        orderBy: { episodeNumber: 'asc' },
                        include: {
                            videoSources: true
                        }
                    },
                    videoSources: true
                }
            });

            if (!film) {
                return res.status(404).json({ error: 'Film not found' });
            }

            // Increment view count
            await prisma.filmView.create({
                data: {
                    filmId: film.id,
                    ipAddress: req.ip
                }
            });

            // Update film view count
            await prisma.film.update({
                where: { id: film.id },
                data: { viewCount: { increment: 1 } }
            });

            // Transform data
            const transformedFilm = {
                ...film,
                genres: film.filmGenres.map(fg => fg.genre),
                filmGenres: undefined
            };

            res.json(transformedFilm);
        } catch (error) {
            console.error('Error fetching film:', error);
            res.status(500).json({ error: 'Failed to fetch film' });
        }
    }

    // GET /api/films/trending - Get trending films
    async getTrendingFilms(req: Request, res: Response) {
        try {
            const { limit = '10' } = req.query;

            // Get films with most views in last 7 days
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            const trendingFilms = await prisma.film.findMany({
                where: {
                    isActive: true,
                    filmViews: {
                        some: {
                            viewedAt: {
                                gte: sevenDaysAgo
                            }
                        }
                    }
                },
                take: parseInt(limit as string),
                orderBy: {
                    viewCount: 'desc'
                },
                include: {
                    filmGenres: {
                        include: {
                            genre: true
                        }
                    }
                }
            });

            const transformedFilms = trendingFilms.map(film => ({
                ...film,
                genres: film.filmGenres.map(fg => fg.genre),
                filmGenres: undefined
            }));

            res.json(transformedFilms);
        } catch (error) {
            console.error('Error fetching trending films:', error);
            res.status(500).json({ error: 'Failed to fetch trending films' });
        }
    }

    // GET /api/films/search/suggest - Search autocomplete
    async searchSuggest(req: Request, res: Response) {
        try {
            const { q = '', limit = '10' } = req.query;

            if (!q || (q as string).length < 2) {
                return res.json([]);
            }

            const films = await prisma.film.findMany({
                where: {
                    isActive: true,
                    OR: [
                        { title: { contains: q as string } },
                        { originalTitle: { contains: q as string } }
                    ]
                },
                take: parseInt(limit as string),
                select: {
                    id: true,
                    title: true,
                    originalTitle: true,
                    posterUrl: true,
                    year: true,
                    type: true
                }
            });

            res.json(films);
        } catch (error) {
            console.error('Error searching films:', error);
            res.status(500).json({ error: 'Failed to search films' });
        }
    }

    // POST /api/films - Create new film (admin only)
    async createFilm(req: Request, res: Response) {
        try {
            const filmData = req.body;

            const film = await prisma.film.create({
                data: {
                    ...filmData,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });

            res.status(201).json(film);
        } catch (error) {
            console.error('Error creating film:', error);
            res.status(500).json({ error: 'Failed to create film' });
        }
    }

    // PUT /api/films/:id - Update film (admin only)
    async updateFilm(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const filmData = req.body;

            const film = await prisma.film.update({
                where: { id: parseInt(id) },
                data: {
                    ...filmData,
                    updatedAt: new Date()
                }
            });

            res.json(film);
        } catch (error) {
            console.error('Error updating film:', error);
            res.status(500).json({ error: 'Failed to update film' });
        }
    }

    // DELETE /api/films/:id - Delete film (admin only)
    async deleteFilm(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await prisma.film.update({
                where: { id: parseInt(id) },
                data: { isActive: false }
            });

            res.json({ message: 'Film deleted successfully' });
        } catch (error) {
            console.error('Error deleting film:', error);
            res.status(500).json({ error: 'Failed to delete film' });
        }
    }
}

export default new FilmController();
