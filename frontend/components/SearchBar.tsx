'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService, Film } from '@/lib/api';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Film[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length >= 2) {
                setIsSearching(true);
                try {
                    const data = await apiService.searchSuggest(query);
                    setResults(data);
                    setShowResults(true);
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div className="relative">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tìm kiếm phim..."
                    className="w-full md:w-80 pl-10 pr-4 py-2 bg-dark-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <svg
                    className="w-5 h-5 absolute left-3 top-2.5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
                <div className="absolute top-full mt-2 w-full bg-dark-100 border border-gray-800 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                    {isSearching ? (
                        <div className="p-4 text-center text-gray-500">Đang tìm kiếm...</div>
                    ) : results.length > 0 ? (
                        <div className="p-2">
                            {results.map((film) => (
                                <Link
                                    key={film.id}
                                    href={`/phim/${film.id}`}
                                    className="flex items-center gap-3 p-2 hover:bg-dark-200 rounded-lg transition-colors"
                                    onClick={() => {
                                        setShowResults(false);
                                        setQuery('');
                                    }}
                                >
                                    <img
                                        src={film.posterUrl || '/placeholder-poster.jpg'}
                                        alt={film.title}
                                        className="w-12 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm line-clamp-1">{film.title}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                            <span>{film.year}</span>
                                            <span>•</span>
                                            <span>{film.type === 'Movie' ? 'Phim lẻ' : 'Phim bộ'}</span>
                                            {film.type === 'Series' && film.totalEpisodes > 0 && (
                                                <>
                                                    <span>•</span>
                                                    <span>{film.totalEpisodes} tập</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-gray-500">Không tìm thấy kết quả</div>
                    )}
                </div>
            )}

            {/* Overlay to close dropdown */}
            {showResults && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowResults(false)}
                />
            )}
        </div>
    );
}
