import axios from 'axios';
import { StreamingResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const streamingService = {
    async getStreamingUrl(fileId: string): Promise<StreamingResponse> {
        const response = await api.get<StreamingResponse>(`/streaming/${fileId}`);
        return response.data;
    },

    async getMetadata(fileId: string): Promise<any> {
        const response = await api.get(`/streaming/${fileId}/metadata`);
        return response.data;
    },

    getDirectStreamUrl(fileId: string): string {
        return `${API_BASE_URL}/streaming/${fileId}/direct`;
    },
};
