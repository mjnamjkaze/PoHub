const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Film {
    id: number;
    title: string;
    originalTitle?: string;
    posterUrl?: string;
    year: number;
    country?: string;
    rating: number;
    viewCount: number;
    totalEpisodes: number;
    type: string;
    badge?: string;
    genres: string[];
    updatedAt: string;
}

export interface FilmDetail extends Film {
    description?: string;
    backgroundUrl?: string;
    director?: string;
    cast?: string;
    createdAt: string;
    episodes: Episode[];
    videoSources: VideoSource[];
}

export interface Episode {
    id: number;
    episodeNumber: number;
    title?: string;
    description?: string;
    duration: number;
    videoSources: VideoSource[];
}

export interface VideoSource {
    id: number;
    sourceType: string;
    url: string;
    quality?: string;
    serverName?: string;
    subtitleUrl?: string;
    isDefault: boolean;
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
    description?: string;
    filmCount: number;
}

export interface FilmFilter {
    search?: string;
    genres?: string[];
    country?: string;
    year?: number;
    type?: string;
    minEpisodes?: number;
    maxEpisodes?: number;
    sortBy?: string;
    page?: number;
    pageSize?: number;
}

export interface PaginatedResult<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    async getFilms(filter: FilmFilter = {}): Promise<PaginatedResult<Film>> {
        const params = new URLSearchParams();

        if (filter.search) params.append('search', filter.search);
        if (filter.genres) filter.genres.forEach(g => params.append('genres', g));
        if (filter.country) params.append('country', filter.country);
        if (filter.year) params.append('year', filter.year.toString());
        if (filter.type) params.append('type', filter.type);
        if (filter.minEpisodes) params.append('minEpisodes', filter.minEpisodes.toString());
        if (filter.maxEpisodes) params.append('maxEpisodes', filter.maxEpisodes.toString());
        if (filter.sortBy) params.append('sortBy', filter.sortBy);
        if (filter.page) params.append('page', filter.page.toString());
        if (filter.pageSize) params.append('pageSize', filter.pageSize.toString());

        const response = await fetch(`${this.baseUrl}/films?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch films');
        return response.json();
    }

    async getFilm(id: number): Promise<FilmDetail> {
        const response = await fetch(`${this.baseUrl}/films/${id}`);
        if (!response.ok) throw new Error('Failed to fetch film');
        return response.json();
    }

    async getTrending(period: '24h' | '7d' = '24h'): Promise<Film[]> {
        const response = await fetch(`${this.baseUrl}/films/trending?period=${period}`);
        if (!response.ok) throw new Error('Failed to fetch trending');
        return response.json();
    }

    async searchSuggest(query: string): Promise<Film[]> {
        const response = await fetch(`${this.baseUrl}/films/search/suggest?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to search');
        return response.json();
    }

    async getGenres(): Promise<Genre[]> {
        const response = await fetch(`${this.baseUrl}/genres`);
        if (!response.ok) throw new Error('Failed to fetch genres');
        return response.json();
    }

    async getGenre(slug: string): Promise<Genre> {
        const response = await fetch(`${this.baseUrl}/genres/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch genre');
        return response.json();
    }
}

export const apiService = new ApiService();
