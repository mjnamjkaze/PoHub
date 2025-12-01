import axios from 'axios';
import { Movie } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const movieService = {
    async getAll(): Promise<Movie[]> {
        const response = await api.get<Movie[]>('/movies');
        return response.data;
    },

    async getTrending(count: number = 10): Promise<Movie[]> {
        const response = await api.get<Movie[]>(`/movies/trending?count=${count}`);
        return response.data;
    },

    async getById(id: number): Promise<Movie> {
        const response = await api.get<Movie>(`/movies/${id}`);
        return response.data;
    },

    async search(query: string): Promise<Movie[]> {
        const response = await api.get<Movie[]>(`/movies?search=${encodeURIComponent(query)}`);
        return response.data;
    },

    async getByGenre(genre: string): Promise<Movie[]> {
        const response = await api.get<Movie[]>(`/movies?genre=${encodeURIComponent(genre)}`);
        return response.data;
    },

    async incrementViewCount(id: number): Promise<void> {
        await api.post(`/movies/${id}/view`);
    },
};
