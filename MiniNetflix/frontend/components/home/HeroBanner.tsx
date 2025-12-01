'use client';

import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Info } from 'lucide-react';

interface HeroBannerProps {
    movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
    const backdropUrl = movie.backdropUrl || movie.posterUrl || '/placeholder-backdrop.svg';
    const videoFile = movie.driveFiles?.find(f => f.fileType === 0);

    return (
        <div className="relative h-[85vh] w-full">
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
                <div className="container mx-auto px-4 md:px-12">
                    <div className="max-w-2xl pt-20">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                            {movie.title}
                        </h1>

                        <div className="flex items-center space-x-4 mb-6">
                            {movie.year && <span className="text-green-400 font-semibold">{movie.year}</span>}
                            {movie.imdbRating && (
                                <span className="text-white border border-gray-500 px-1 text-sm">
                                    {movie.imdbRating}
                                </span>
                            )}
                            {movie.runtime && <span className="text-white">{movie.runtime} min</span>}
                        </div>

                        {movie.description && (
                            <p className="text-white text-lg mb-8 line-clamp-3 drop-shadow-md">
                                {movie.description}
                            </p>
                        )}

                        <div className="flex space-x-4">
                            {videoFile && (
                                <Link href={`/watch/${movie.id}`}>
                                    <button className="bg-white text-black px-8 py-3 rounded flex items-center space-x-2 font-bold hover:bg-opacity-80 transition">
                                        <Play size={24} fill="black" />
                                        <span>Play</span>
                                    </button>
                                </Link>
                            )}

                            <Link href={`/movie/${movie.id}`}>
                                <button className="bg-[rgba(109,109,110,0.7)] text-white px-8 py-3 rounded flex items-center space-x-2 font-bold hover:bg-[rgba(109,109,110,0.9)] transition">
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
