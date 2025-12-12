import FilmGrid from '@/components/FilmGrid';

async function getSeriesFilms() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/films?type=Series&limit=50`, {
        cache: 'no-store'
    });

    if (!res.ok) return { data: [] };
    const result = await res.json();
    return result;
}

export default async function PhimBoPage() {
    const { data: films } = await getSeriesFilms();

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">Phim Bộ</h1>
            <p className="text-gray-400 mb-8">
                {films.length > 0 ? `Tổng cộng ${films.length} phim` : 'Chưa có phim bộ nào'}
            </p>
            {films.length > 0 ? (
                <FilmGrid films={films} />
            ) : (
                <div className="text-center text-gray-500 py-20">
                    <p>Phim bộ sẽ được cập nhật sớm</p>
                </div>
            )}
        </div>
    );
}
