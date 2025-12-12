import FilmGrid from '@/components/FilmGrid';

async function getMovies() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/films?type=Movie&limit=50`, {
        cache: 'no-store'
    });

    if (!res.ok) return { data: [] };
    const result = await res.json();
    return result;
}

export default async function PhimLePage() {
    const { data: films } = await getMovies();

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">Phim Lẻ</h1>
            <p className="text-gray-400 mb-8">
                Tổng cộng {films.length} phim
            </p>
            <FilmGrid films={films} />
        </div>
    );
}
