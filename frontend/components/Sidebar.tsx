'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
    { icon: '🏠', label: 'Trang Chủ', href: '/' },
    { icon: '🎬', label: 'Phim Lẻ', href: '/phim-le' },
    { icon: '📺', label: 'Phim Bộ', href: '/phim-bo' },
    { icon: '🔥', label: 'Xu Hướng', href: '/xu-huong' },
];

const categories = [
    { name: 'Hành Động', slug: 'hanh-dong' },
    { name: 'Hài Hước', slug: 'hai-huoc' },
    { name: 'Lãng Mạn', slug: 'lang-man' },
    { name: 'Kinh Dị', slug: 'kinh-di' },
    { name: 'Khoa Học Viễn Tưởng', slug: 'khoa-hoc-vien-tuong' },
    { name: 'Phiêu Lưu', slug: 'phieu-luu' },
    { name: 'Tâm Lý', slug: 'tam-ly' },
    { name: 'Hoạt Hình', slug: 'hoat-hinh' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-dark-200 rounded-lg"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-dark-100 border-r border-gray-800 
        flex flex-col overflow-y-auto z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold">PoHub</span>
                    </Link>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-800">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full pl-10 pr-4 py-2 bg-dark-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="p-4 flex-1">
                    <div className="space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Categories */}
                    <div className="mt-8">
                        <h3 className="px-4 mb-3 text-sm font-semibold text-gray-400 uppercase">
                            Thể Loại
                        </h3>
                        <div className="space-y-1">
                            {categories.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/the-loai/${category.slug}`}
                                    className={`sidebar-link ${pathname === `/the-loai/${category.slug}` ? 'active' : ''}`}
                                >
                                    <span>{category.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
