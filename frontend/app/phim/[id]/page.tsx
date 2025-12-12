import Image from 'next/image';
import YouTubePlayer from '@/components/YouTubePlayer';

interface FilmPageProps {
    params: {
        id: string;
    };
}

async function getFilm(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/films/${id}`, {
        cache: 'no-store'
    });

    if (!res.ok) return null;
    return await res.json();
}

export default async function FilmPage({ params }: FilmPageProps) {
    const film = await getFilm(params.id);

    if (!film) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Không tìm thấy phim</h1>
                    <a href="/" className="text-primary hover:underline">← Về trang chủ</a>
                </div>
            </div>
        );
    }

    const videoSource = film.videoSources?.[0];

    return (
        <div className="min-h-screen pb-12">
            {/* Background */}
            {film.backgroundUrl && (
                <div className="fixed inset-0 z-0">
                    <Image
                        src={film.backgroundUrl}
                        alt={film.title}
                        fill
                        className="object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-dark-300/80 via-dark-300 to-dark-300" />
                </div>
            )}

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Video Player */}
                {videoSource && (
                    <div className="mb-8">
                        <YouTubePlayer url={videoSource.url} title={film.title} />
                    </div>
                )}

                {/* Film Info */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Poster */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        {film.posterUrl ? (
                            <Image
                                src={film.posterUrl}
                                alt={film.title}
                                width={320}
                                height={480}
                                className="w-full rounded-lg shadow-2xl"
                            />
                        ) : (
                            <div className="w-full aspect-[2/3] bg-dark-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                            </div>
                        )}
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
                                <span className="text-yellow-400">⭐</span>
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
                        </div>

                        {/* Genres */}
                        {film.genres && film.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {film.genres.map((genre: any) => (
                                    <a
                                        key={genre.id}
                                        href={`/the-loai/${genre.slug}`}
                                        className="px-3 py-1 bg-dark-200 rounded-full text-sm hover:bg-primary transition-colors"
                                    >
                                        {genre.name}
                                    </a>
                                ))}
                            </div>
                        )}

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

                        {/* Server Info */}
                        {videoSource && (
                            <div className="bg-dark-200 rounded-lg p-4">
                                <p className="text-sm text-gray-400">
                                    <span className="font-semibold text-white">Server:</span> {videoSource.serverName || 'YouTube'}
                                    {videoSource.quality && <span className="ml-2">• {videoSource.quality}</span>}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
