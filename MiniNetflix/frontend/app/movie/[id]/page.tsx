'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import { movieService } from '@/services/movieService';
import { Movie, FileType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, ThumbsUp } from 'lucide-react';

export default function MovieDetailPage() {
    const params = useParams();
    const movieId = parseInt(params.id as string);

    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMovie();
    }, [movieId]);

    const loadMovie = async () => {
        try {
            const movieData = await movieService.getById(movieId);
            setMovie(movieData);
        } catch (error) {
            console.error('Error loading movie:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center">
                <div className="text-white text-2xl">Movie not found</div>
            </div>
        );
    }

    const backdropUrl = movie.backdropUrl || movie.posterUrl || '/placeholder-backdrop.svg';
    const hasVideo = movie.driveFiles?.some(f => f.fileType === FileType.Video);

    return (
        <main className="min-h-screen bg-[#141414]">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[70vh] w-full mt-16">
                <div className="absolute inset-0">
                    <Image
                        src={backdropUrl}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                </div>

                <div className="relative h-full flex items-end pb-16">
                    <div className="container-custom">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-shadow">
                            {movie.title}
                        </h1>

                        <div className="flex items-center space-x-4 mb-6">
                            {movie.year && <span className="text-white text-xl">{movie.year}</span>}
                            {movie.imdbRating && (
                                <span className="text-yellow-400 text-xl font-semibold">
                                    ★ {movie.imdbRating}
                                </span>
                            )}
                            {movie.runtime && <span className="text-white text-xl">{movie.runtime} min</span>}
                            {movie.genre && <span className="text-gray-300 text-xl">{movie.genre}</span>}
                        </div>

                        <div className="flex space-x-4">
                            {hasVideo && (
                                <Link href={`/watch/${movie.id}`}>
                                    <button className="btn-primary flex items-center space-x-2">
                                        <Play size={24} fill="white" />
                                        <span>Play</span>
                                    </button>
                                </Link>
                            )}

                            <button className="btn-secondary flex items-center space-x-2">
                                <Plus size={24} />
                                <span>My List</span>
                            </button>

                            <button className="btn-secondary flex items-center space-x-2">
                                <ThumbsUp size={24} />
                                <span>Like</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                        {movie.description && (
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                {movie.description}
                            </p>
                        )}

                        {/* Episodes (if series) */}
                        {movie.isSeries && movie.episodes && movie.episodes.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">Episodes</h2>
                                <div className="space-y-4">
                                    {movie.episodes.map((episode) => (
                                        <div
                                            key={episode.id}
                                            className="bg-[#2f2f2f] rounded-lg p-4 hover:bg-[#3a3a3a] transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-1">
                                                    <h3 className="text-white font-semibold text-lg">
                                                        {episode.seasonNumber}x{episode.episodeNumber} - {episode.title}
                                                    </h3>
                                                    {episode.description && (
                                                        <p className="text-gray-400 mt-2">{episode.description}</p>
                                                    )}
                                                    {episode.runtime && (
                                                        <span className="text-gray-500 text-sm">{episode.runtime} min</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div>
                        <div className="bg-[#2f2f2f] rounded-lg p-6">
                            <h3 className="text-white font-semibold text-lg mb-4">Details</h3>

                            <div className="space-y-3">
                                {movie.genre && (
                                    <div>
                                        <span className="text-gray-400">Genre:</span>
                                        <span className="text-white ml-2">{movie.genre}</span>
                                    </div>
                                )}

                                {movie.year && (
                                    <div>
                                        <span className="text-gray-400">Year:</span>
                                        <span className="text-white ml-2">{movie.year}</span>
                                    </div>
                                )}

                                {movie.runtime && (
                                    <div>
                                        <span className="text-gray-400">Runtime:</span>
                                        <span className="text-white ml-2">{movie.runtime} minutes</span>
                                    </div>
                                )}

                                <div>
                                    <span className="text-gray-400">Views:</span>
                                    <span className="text-white ml-2">{movie.viewCount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
