import SearchBar from './SearchBar';

export default function Header() {
    return (
        <header className="sticky top-0 z-30 bg-dark-100/95 backdrop-blur-sm border-b border-gray-800">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="text-xl font-bold hidden md:block">Khám Phá Phim</h1>
                    </div>

                    <div className="flex-1 max-w-2xl mx-4">
                        <SearchBar />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="hidden md:block px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                            Đăng Nhập
                        </button>
                        <button className="btn-primary text-sm py-2">
                            Đăng Ký
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
