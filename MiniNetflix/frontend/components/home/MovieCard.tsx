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
            <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
                <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    className="rounded-sm object-cover md:rounded"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 rounded-sm md:rounded" />
            </div>
        </Link>
    );
}
