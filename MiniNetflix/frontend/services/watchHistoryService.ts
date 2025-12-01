import axios from 'axios';
import { WatchHistory } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const watchHistoryService = {
    async saveProgress(data: {
        userId: number;
        movieId?: number;
        episodeId?: number;
        currentPosition: number;
        totalDuration: number;
    }): Promise<WatchHistory> {
        const response = await api.post<WatchHistory>('/watchhistory', data);
        return response.data;
    },

    async getUserHistory(userId: number): Promise<WatchHistory[]> {
        const response = await api.get<WatchHistory[]>(`/watchhistory/user/${userId}`);
        return response.data;
    },

    async getProgress(userId: number, movieId: number, episodeId?: number): Promise<WatchHistory | null> {
        try {
            const url = episodeId
                ? `/watchhistory/user/${userId}/movie/${movieId}?episodeId=${episodeId}`
                : `/watchhistory/user/${userId}/movie/${movieId}`;
            const response = await api.get<WatchHistory>(url);
            return response.data;
        } catch (error) {
            return null;
        }
    },

    async getContinueWatching(userId: number): Promise<WatchHistory[]> {
        const response = await api.get<WatchHistory[]>(`/watchhistory/user/${userId}/continue-watching`);
        return response.data;
    },
};
