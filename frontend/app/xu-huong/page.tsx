import FilmGrid from '@/components/FilmGrid';

async function getTrendingFilms() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/films/trending?limit=50`, {
        cache: 'no-store'
    });

    if (!res.ok) return [];
    const films = await res.json();
    return films;
}

export default async function XuHuongPage() {
    const films = await getTrendingFilms();

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">🔥 Xu Hướng</h1>
            <p className="text-gray-400 mb-8">
                Phim đang được xem nhiều nhất
            </p>
            {films.length > 0 ? (
                <FilmGrid films={films} />
            ) : (
                <div className="text-center text-gray-500 py-20">
                    <p>Chưa có dữ liệu trending</p>
                </div>
            )}
        </div>
    );
}
