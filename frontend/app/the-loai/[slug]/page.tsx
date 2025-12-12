import FilmGrid from '@/components/FilmGrid';

interface GenrePageProps {
    params: {
        slug: string;
    };
}

async function getGenreFilms(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/genres/${slug}`, {
        cache: 'no-store'
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data;
}

export default async function GenrePage({ params }: GenrePageProps) {
    const data = await getGenreFilms(params.slug);

    if (!data) {
        return (
            <div className="min-h-screen p-8">
                <h1 className="text-3xl font-bold mb-6">Thể loại không tồn tại</h1>
            </div>
        );
    }

    const { genre, films } = data;

    return (
        <div className="min-h-screen p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{genre.name}</h1>
                {genre.description && (
                    <p className="text-gray-400">{genre.description}</p>
                )}
                <p className="text-gray-500 mt-2">
                    {films.length} phim
                </p>
            </div>

            {films.length > 0 ? (
                <FilmGrid films={films} />
            ) : (
                <div className="text-center text-gray-500 py-20">
                    <p>Chưa có phim nào trong thể loại này</p>
                </div>
            )}
        </div>
    );
}
