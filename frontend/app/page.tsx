'use client';

import { useState, useEffect } from 'react';
import FilmCard from '@/components/FilmCard';
import { apiService, Film, PaginatedResult } from '@/lib/api';
import Image from 'next/image';

export default function HomePage() {
  const [trending, setTrending] = useState<Film[]>([]);
  const [latest, setLatest] = useState<PaginatedResult<Film> | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (trending.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.min(5, trending.length));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [trending]);

  async function loadData() {
    try {
      const [trendingData, latestData] = await Promise.all([
        apiService.getTrending('24h'),
        apiService.getFilms({ sortBy: 'updated', page: 1, pageSize: 12 })
      ]);
      setTrending(trendingData);
      setLatest(latestData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Hero Slider */}
      {trending.length > 0 && (
        <section className="relative h-[70vh] bg-dark-300 overflow-hidden">
          {trending.slice(0, 5).map((film, index) => (
            <div
              key={film.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {film.posterUrl && (
                <Image
                  src={film.posterUrl}
                  alt={film.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/50 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="max-w-3xl">
                  {film.badge && (
                    <span className="inline-block px-3 py-1 bg-primary text-sm font-bold rounded mb-4">
                      {film.badge === 'Hot' ? '🔥 HOT' : film.badge}
                    </span>
                  )}
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">{film.title}</h2>
                  <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-6">
                    <span>{film.year}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{film.rating.toFixed(1)}</span>
                    </div>
                    <span>•</span>
                    <span>{film.viewCount.toLocaleString()} lượt xem</span>
                  </div>
                  <div className="flex gap-4">
                    <a href={`/phim/${film.id}`} className="btn-primary">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        Xem Ngay
                      </span>
                    </a>
                    <a href={`/phim/${film.id}`} className="btn-outline">
                      Thông Tin
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slider indicators */}
          <div className="absolute bottom-8 right-8 flex gap-2">
            {trending.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-primary w-8' : 'bg-gray-600'
                  }`}
              />
            ))}
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 mt-12">
        {/* Trending Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">🔥 Thịnh Hành</h2>
            <a href="/xu-huong" className="text-primary hover:text-primary-light transition-colors">
              Xem tất cả →
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {trending.slice(0, 6).map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
        </section>

        {/* Latest Section */}
        {latest && latest.items.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">📅 Mới Cập Nhật</h2>
              <a href="/phim-le" className="text-primary hover:text-primary-light transition-colors">
                Xem tất cả →
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {latest.items.map((film) => (
                <FilmCard key={film.id} film={film} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
