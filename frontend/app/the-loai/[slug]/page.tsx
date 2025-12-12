interface GenrePageProps {
    params: {
        slug: string;
    };
}

export default function GenrePage({ params }: GenrePageProps) {
    const genreNames: Record<string, string> = {
        'hanh-dong': 'Hành Động',
        'hai-huoc': 'Hài Hước',
        'tinh-cam': 'Tình Cảm',
        'kinh-di': 'Kinh Dị',
        'khoa-hoc-vien-tuong': 'Khoa Học Viễn Tưởng',
        'hoat-hinh': 'Hoạt Hình',
        'phieu-luu': 'Phiêu Lưu',
        'tam-ly': 'Tâm Lý',
    };

    const genreName = genreNames[params.slug] || params.slug;

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">Thể loại: {genreName}</h1>
            <p className="text-gray-400">
                Danh sách phim thể loại {genreName} sẽ hiển thị ở đây
            </p>
        </div>
    );
}
