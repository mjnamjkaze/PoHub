import FilmGrid from '@/components/FilmGrid';
import Link from 'next/link';

async function getFilms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/films?limit=24`, {
    cache: 'no-store'
  });

  if (!res.ok) return { data: [] };
  const result = await res.json();
  return result;
}

async function getTrending() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/films/trending?limit=12`, {
    cache: 'no-store'
  });

  if (!res.ok) return [];
  return await res.json();
}

export default async function HomePage() {
  const [{ data: allFilms }, trending] = await Promise.all([
    getFilms(),
    getTrending()
  ]);

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-primary/20 via-dark-300 to-dark-300 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            🎬 PoHub
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Xem phim miễn phí - Chất lượng cao
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/phim-le" className="btn-primary">
              Khám Phá Ngay
            </Link>
            <Link href="/the-loai/hanh-dong" className="btn-outline">
              Thể Loại
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12">
        {/* Trending Section */}
        {trending.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">🔥 Thịnh Hành</h2>
              <Link href="/xu-huong" className="text-primary hover:text-primary-light transition-colors">
                Xem tất cả →
              </Link>
            </div>
            <FilmGrid films={trending.slice(0, 12)} />
          </section>
        )}

        {/* All Films Section */}
        {allFilms.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">📅 Tất Cả Phim</h2>
              <Link href="/phim-le" className="text-primary hover:text-primary-light transition-colors">
                Xem tất cả →
              </Link>
            </div>
            <FilmGrid films={allFilms} />
          </section>
        )}

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-6 bg-dark-200 rounded-lg">
            <div className="text-3xl font-bold text-primary">{allFilms.length}+</div>
            <div className="text-gray-400 mt-2">Phim</div>
          </div>
          <div className="p-6 bg-dark-200 rounded-lg">
            <div className="text-3xl font-bold text-primary">8</div>
            <div className="text-gray-400 mt-2">Thể Loại</div>
          </div>
          <div className="p-6 bg-dark-200 rounded-lg">
            <div className="text-3xl font-bold text-primary">HD</div>
            <div className="text-gray-400 mt-2">Chất Lượng</div>
          </div>
          <div className="p-6 bg-dark-200 rounded-lg">
            <div className="text-3xl font-bold text-primary">Free</div>
            <div className="text-gray-400 mt-2">Miễn Phí</div>
          </div>
        </div>
      </div>
    </div>
  );
}
