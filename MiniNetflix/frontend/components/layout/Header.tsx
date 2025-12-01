'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            setIsScrolled(window.scrollY > 0);
        });
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
                }`}
        >
            <div className="container-custom py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-8">
                        <h1 className="text-3xl font-bold text-[#e50914]">MININETFLIX</h1>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-white hover:text-gray-300 font-medium">
                            Home
                        </Link>
                        <Link href="/movies" className="text-white hover:text-gray-300 font-medium">
                            Movies
                        </Link>
                        <Link href="/series" className="text-white hover:text-gray-300 font-medium">
                            TV Series
                        </Link>
                        <Link href="/trending" className="text-white hover:text-gray-300 font-medium">
                            Trending
                        </Link>
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-black/50 border border-white/20 rounded px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 w-64"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </form>

                        {/* Icons */}
                        <button className="text-white hover:text-gray-300">
                            <Bell size={24} />
                        </button>
                        <button className="text-white hover:text-gray-300">
                            <User size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
