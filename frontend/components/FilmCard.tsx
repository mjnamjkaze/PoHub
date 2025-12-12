import Link from 'next/link';
import Image from 'next/image';
import { Film } from '@/lib/api';

interface FilmCardProps {
    film: Film;
}

export default function FilmCard({ film }: FilmCardProps) {
    const posterUrl = film.posterUrl || '/placeholder-poster.jpg';

    return (
        <Link href={`/phim/${film.id}`} className="film-card group">
            <div className="relative">
                <div className="film-card-image-container relative">
                    <Image
                        src={posterUrl}
                        alt={film.title}
                        width={300}
                        height={450}
                        className="film-card-image"
                        loading="lazy"
                    />
                </div>

                {film.badge && (
                    <div className="film-badge">
                        {film.badge === 'New' && 'Mới'}
                        {film.badge === 'Hot' && 'Hot'}
                        {film.badge === 'Full' && 'Full'}
                        {film.badge === 'Trailer' && 'Trailer'}
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="font-bold text-sm md:text-base line-clamp-2 mb-1">
                        {film.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{film.year}</span>
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>{film.rating.toFixed(1)}</span>
                        </div>
                    </div>

                    {film.type === 'Series' && film.totalEpisodes > 0 && (
                        <div className="mt-1 text-xs text-primary">
                            {film.totalEpisodes} tập
                        </div>
                    )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                        <svg className="w-16 h-16 mx-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        <p className="mt-2 text-sm font-semibold">Xem Ngay</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
