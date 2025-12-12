'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { apiService, FilmDetail } from '@/lib/api';

export default function FilmDetailPage() {
    const params = useParams();
    const [film, setFilm] = useState<FilmDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
    const [selectedServer, setSelectedServer] = useState(0);

    useEffect(() => {
        if (params.id) {
            loadFilm(Number(params.id));
        }
    }, [params.id]);

    async function loadFilm(id: number) {
        try {
            const data = await apiService.getFilm(id);
            setFilm(data);

            // Auto select first episode for series
            if (data.type === 'Series' && data.episodes.length > 0) {
                setSelectedEpisode(data.episodes[0].id);
            }
        } catch (error) {
            console.error('Failed to load film:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-400">Đang tải...</p>
                </div>
            </div>
        );
    }

    if (!film) {
        return <div className="container mx-auto px-4 py-12 text-center">Không tìm thấy phim</div>;
    }

    const currentVideoSources = film.type === 'Movie'
        ? film.videoSources
        : film.episodes.find(e => e.id === selectedEpisode)?.videoSources || [];

    return (
        <div className="min-h-screen">
            {/* Background */}
            {film.backgroundUrl && (
                <div className="fixed inset-0 z-0">
                    <Image
                        src={film.backgroundUrl}
                        alt={film.title}
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-dark-300/50 via-dark-300 to-dark-300" />
                </div>
            )}

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Film Info */}
                <div className="flex flex-col lg:flex-row gap-8 mb-12">
                    {/* Poster */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <img
                            src={film.posterUrl || '/placeholder-poster.jpg'}
                            alt={film.title}
                            className="w-full rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        {film.badge && (
                            <span className="inline-block px-3 py-1 bg-primary text-sm font-bold rounded mb-4">
                                {film.badge}
                            </span>
                        )}

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{film.title}</h1>

                        {film.originalTitle && (
                            <p className="text-xl text-gray-400 mb-6">{film.originalTitle}</p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
                            <div className="flex items-center gap-2">
                                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-2xl font-bold">{film.rating.toFixed(1)}</span>
                            </div>

                            <span>•</span>
                            <span>{film.year}</span>

                            {film.country && (
                                <>
                                    <span>•</span>
                                    <span>{film.country}</span>
                                </>
                            )}

                            <span>•</span>
                            <span>{film.viewCount.toLocaleString()} lượt xem</span>

                            {film.type === 'Series' && (
                                <>
                                    <span>•</span>
                                    <span>{film.totalEpisodes} tập</span>
                                </>
                            )}
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {film.genres.map((genre, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-dark-200 rounded-full text-sm hover:bg-primary transition-colors cursor-pointer"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        {film.description && (
                            <p className="text-gray-300 leading-relaxed mb-6">{film.description}</p>
                        )}

                        {/* Director & Cast */}
                        <div className="space-y-2 mb-6">
                            {film.director && (
                                <p>
                                    <span className="text-gray-500">Đạo diễn:</span>{' '}
                                    <span className="text-white">{film.director}</span>
                                </p>
                            )}
                            {film.cast && (
                                <p>
                                    <span className="text-gray-500">Diễn viên:</span>{' '}
                                    <span className="text-white">{film.cast}</span>
                                </p>
                            )}
                        </div>

                        {/* Play Button */}
                        <button className="btn-primary text-lg">
                            <span className="flex items-center gap-2">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                                Xem Phim
                            </span>
                        </button>
                    </div>
                </div>

                {/* Episodes (for Series) */}
                {film.type === 'Series' && film.episodes.length > 0 && (
                    <div className="bg-dark-200 rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Danh Sách Tập</h2>
                        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3">
                            {film.episodes.map((episode) => (
                                <button
                                    key={episode.id}
                                    onClick={() => setSelectedEpisode(episode.id)}
                                    className={`px-4 py-3 rounded-lg font-semibold transition-all ${selectedEpisode === episode.id
                                            ? 'bg-primary text-white'
                                            : 'bg-dark-100 text-gray-300 hover:bg-dark-300'
                                        }`}
                                >
                                    {episode.episodeNumber}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Video Sources */}
                {currentVideoSources.length > 0 && (
                    <div className="bg-dark-200 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Server</h2>
                        <div className="flex flex-wrap gap-3">
                            {currentVideoSources.map((source, index) => (
                                <button
                                    key={source.id}
                                    onClick={() => setSelectedServer(index)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedServer === index
                                            ? 'bg-primary text-white'
                                            : 'bg-dark-100 text-gray-300 hover:bg-dark-300'
                                        }`}
                                >
                                    {source.serverName || `Server ${index + 1}`}
                                    {source.quality && <span className="ml-2 text-xs">({source.quality})</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
