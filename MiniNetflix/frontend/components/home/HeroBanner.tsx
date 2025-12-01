'use client';

import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Info } from 'lucide-react';

interface HeroBannerProps {
    movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
    const backdropUrl = movie.backdropUrl || movie.posterUrl || '/placeholder-backdrop.jpg';
    const videoFile = movie.driveFiles?.find(f => f.fileType === 0);

    return (
        <div className="relative h-[80vh] w-full">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={backdropUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
                <div className="container-custom">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-shadow">
                            {movie.title}
                        </h1>

                        <div className="flex items-center space-x-4 mb-4">
                            {movie.year && <span className="text-white text-lg">{movie.year}</span>}
                            {movie.imdbRating && (
                                <span className="text-yellow-400 text-lg font-semibold">
                                    ★ {movie.imdbRating}
                                </span>
                            )}
                            {movie.runtime && <span className="text-white text-lg">{movie.runtime} min</span>}
                        </div>

                        {movie.description && (
                            <p className="text-white text-lg mb-8 line-clamp-3 text-shadow">
                                {movie.description}
                            </p>
                        )}

                        <div className="flex space-x-4">
                            {videoFile && (
                                <Link href={`/watch/${movie.id}`}>
                                    <button className="btn-primary flex items-center space-x-2">
                                        <Play size={24} fill="white" />
                                        <span>Play</span>
                                    </button>
                                </Link>
                            )}

                            <Link href={`/movie/${movie.id}`}>
                                <button className="btn-secondary flex items-center space-x-2">
                                    <Info size={24} />
                                    <span>More Info</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
