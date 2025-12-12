'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Film {
    id: number;
    title: string;
    posterUrl: string | null;
    year: number;
    rating: number;
    badge: string | null;
}

interface FilmGridProps {
    films: Film[];
}

export default function FilmGrid({ films }: FilmGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {films.map((film) => (
                <Link
                    key={film.id}
                    href={`/phim/${film.id}`}
                    className="group relative overflow-hidden rounded-lg bg-dark-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
                >
                    <div className="relative aspect-[2/3]">
                        {film.posterUrl ? (
                            <Image
                                src={film.posterUrl}
                                alt={film.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                            />
                        ) : (
                            <div className="w-full h-full bg-dark-100 flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                            </div>
                        )}

                        {/* Badge */}
                        {film.badge && (
                            <div className="absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded bg-primary text-white uppercase">
                                {film.badge}
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                                {film.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-300">
                                <span>{film.year}</span>
                                <span>•</span>
                                <span className="text-yellow-400">⭐ {film.rating}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
