'use client';

import { Movie } from '@/types';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface MovieRowProps {
    title: string;
    movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
    const rowRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const scrollAmount = direction === 'left' ? -800 : 800;
            rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 px-4 md:px-12">{title}</h2>

            <div className="relative group">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-black/70"
                >
                    <ChevronLeft size={32} className="text-white" />
                </button>

                {/* Movie Row */}
                <div
                    ref={rowRef}
                    className="flex overflow-x-scroll scrollbar-hide space-x-4 px-4 md:px-12 py-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.map((movie) => (
                        <div key={movie.id} className="flex-none w-48 md:w-56">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-black/70"
                >
                    <ChevronRight size={32} className="text-white" />
                </button>
            </div>
        </div>
    );
}
