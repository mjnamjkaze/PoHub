'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import VideoPlayer from '@/components/player/VideoPlayer';
import { movieService } from '@/services/movieService';
import { streamingService } from '@/services/streamingService';
import { watchHistoryService } from '@/services/watchHistoryService';
import { Movie, FileType } from '@/types';
import { ArrowLeft } from 'lucide-react';

export default function WatchPage() {
    const params = useParams();
    const router = useRouter();
    const movieId = parseInt(params.id as string);

    const [movie, setMovie] = useState<Movie | null>(null);
    const [streamingUrl, setStreamingUrl] = useState<string>('');
    const [subtitleUrl, setSubtitleUrl] = useState<string>('');
    const [startTime, setStartTime] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMovie();
    }, [movieId]);

    const loadMovie = async () => {
        try {
            const movieData = await movieService.getById(movieId);
            setMovie(movieData);

            // Get video file
            const videoFile = movieData.driveFiles?.find(f => f.fileType === FileType.Video);
            if (videoFile) {
                const streaming = await streamingService.getStreamingUrl(videoFile.fileId);
                setStreamingUrl(streaming.streamingUrl);

                // Get subtitle if available
                if (videoFile.subtitleFileId) {
                    const subtitleStreaming = await streamingService.getStreamingUrl(videoFile.subtitleFileId);
                    setSubtitleUrl(subtitleStreaming.streamingUrl);
                }
            }

            // Get watch progress (using userId = 1 for demo)
            const progress = await watchHistoryService.getProgress(1, movieId);
            if (progress && progress.currentPosition > 0) {
                setStartTime(progress.currentPosition);
            }

            // Increment view count
            await movieService.incrementViewCount(movieId);
        } catch (error) {
            console.error('Error loading movie:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTimeUpdate = (currentTime: number) => {
        // Save progress every 10 seconds
        if (movie && currentTime > 0 && Math.floor(currentTime) % 10 === 0) {
            const videoFile = movie.driveFiles?.find(f => f.fileType === FileType.Video);
            if (videoFile && videoFile.duration) {
                watchHistoryService.saveProgress({
                    userId: 1, // Demo user
                    movieId: movie.id,
                    currentPosition: Math.floor(currentTime),
                    totalDuration: videoFile.duration,
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    if (!movie || !streamingUrl) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-2xl">Video not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="absolute top-4 left-4 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            >
                <ArrowLeft size={24} />
            </button>

            {/* Video Player */}
            <div className="w-full h-screen">
                <VideoPlayer
                    src={streamingUrl}
                    poster={movie.backdropUrl || movie.posterUrl}
                    subtitleUrl={subtitleUrl}
                    onTimeUpdate={handleTimeUpdate}
                    startTime={startTime}
                />
            </div>

            {/* Movie Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
                <h1 className="text-white text-3xl font-bold mb-2">{movie.title}</h1>
                {movie.description && (
                    <p className="text-gray-300 text-lg max-w-3xl">{movie.description}</p>
                )}
            </div>
        </div>
    );
}
