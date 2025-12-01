'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import HeroBanner from '@/components/home/HeroBanner';
import MovieRow from '@/components/home/MovieRow';
import { movieService } from '@/services/movieService';
import { watchHistoryService } from '@/services/watchHistoryService';
import { Movie, WatchHistory } from '@/types';

export default function Home() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [continueWatching, setContinueWatching] = useState<WatchHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load trending movies
      const trending = await movieService.getTrending(10);
      setTrendingMovies(trending);

      // Set featured movie (first trending movie)
      if (trending.length > 0) {
        const featured = await movieService.getById(trending[0].id);
        setFeaturedMovie(featured);
      }

      // Load all movies
      const movies = await movieService.getAll();
      setAllMovies(movies);

      // Load continue watching (using userId = 1 for demo)
      try {
        const history = await watchHistoryService.getContinueWatching(1);
        setContinueWatching(history);
      } catch (error) {
        console.log('No watch history yet');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group movies by genre
  const moviesByGenre = allMovies.reduce((acc, movie) => {
    const genres = movie.genre?.split(',').map(g => g.trim()) || ['Other'];
    genres.forEach(genre => {
      if (!acc[genre]) acc[genre] = [];
      acc[genre].push(movie);
    });
    return acc;
  }, {} as Record<string, Movie[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#141414]">
      <Header />

      {/* Hero Banner */}
      {featuredMovie && <HeroBanner movie={featuredMovie} />}

      {/* Movie Rows */}
      <div className="relative -mt-32 z-10">
        {/* Continue Watching */}
        {continueWatching.length > 0 && (
          <MovieRow
            title="Continue Watching"
            movies={continueWatching.map(h => h.movie!).filter(Boolean)}
          />
        )}

        {/* Trending */}
        {trendingMovies.length > 0 && (
          <MovieRow title="Trending Now" movies={trendingMovies} />
        )}

        {/* Movies by Genre */}
        {Object.entries(moviesByGenre).map(([genre, movies]) => (
          <MovieRow key={genre} title={genre} movies={movies} />
        ))}
      </div>
    </main>
  );
}
