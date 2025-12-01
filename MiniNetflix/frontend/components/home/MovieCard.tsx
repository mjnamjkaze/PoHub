'use client';

import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const posterUrl = movie.posterUrl || movie.driveFiles?.find(f => f.fileType === 2)?.fileName || '/placeholder-movie.jpg';

    return (
        <Link href={`/movie/${movie.id}`}>
            <div className="movie-card group">
                <div className="relative aspect-[2/3] w-full">
                    <Image
                        src={posterUrl}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-lg mb-1 text-shadow">{movie.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                        {movie.year && <span>{movie.year}</span>}
                        {movie.imdbRating && (
                            <>
                                <span>•</span>
                                <span className="text-yellow-400">★ {movie.imdbRating}</span>
                            </>
                        )}
                    </div>
                    {movie.genre && (
                        <p className="text-xs text-gray-400 mt-1">{movie.genre}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}
