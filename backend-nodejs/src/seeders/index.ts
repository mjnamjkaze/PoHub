import prisma from '../lib/prisma';

async function seedGenres() {
    const genres = [
        { name: 'Hành Động', slug: 'hanh-dong', description: 'Phim hành động gay cấn' },
        { name: 'Hài Hước', slug: 'hai-huoc', description: 'Phim hài vui nhộn' },
        { name: 'Tình Cảm', slug: 'tinh-cam', description: 'Phim tình cảm lãng mạn' },
        { name: 'Kinh Dị', slug: 'kinh-di', description: 'Phim kinh dị rùng rợn' },
        { name: 'Khoa Học Viễn Tưởng', slug: 'khoa-hoc-vien-tuong', description: 'Phim sci-fi' },
        { name: 'Hoạt Hình', slug: 'hoat-hinh', description: 'Phim hoạt hình animation' },
        { name: 'Phiêu Lưu', slug: 'phieu-luu', description: 'Phim phiêu lưu mạo hiểm' },
        { name: 'Tâm Lý', slug: 'tam-ly', description: 'Phim tâm lý xã hội' }
    ];

    console.log('🌱 Seeding genres...');

    for (const genre of genres) {
        await prisma.genre.upsert({
            where: { slug: genre.slug },
            update: genre,
            create: genre
        });
    }

    console.log('✅ Genres seeded successfully');
}

async function seedFilms() {
    console.log('🌱 Seeding films...');

    const actionGenre = await prisma.genre.findUnique({ where: { slug: 'hanh-dong' } });
    const scifiGenre = await prisma.genre.findUnique({ where: { slug: 'khoa-hoc-vien-tuong' } });
    const comedyGenre = await prisma.genre.findUnique({ where: { slug: 'hai-huoc' } });

    const films = [
        {
            title: 'Avengers: Endgame',
            originalTitle: 'Avengers: Endgame',
            description: 'Sau sự kiện tàn khốc của Infinity War, các siêu anh hùng còn sống sót tập hợp lại để đảo ngược hành động của Thanos.',
            posterUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
            backgroundUrl: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
            year: 2019,
            country: 'Mỹ',
            rating: 8.4,
            director: 'Anthony Russo, Joe Russo',
            cast: 'Robert Downey Jr., Chris Evans, Mark Ruffalo',
            type: 'Movie',
            badge: 'Hot',
            totalEpisodes: 1,
            genreIds: [actionGenre?.id, scifiGenre?.id]
        },
        {
            title: 'Spider-Man: No Way Home',
            originalTitle: 'Spider-Man: No Way Home',
            description: 'Peter Parker phải đối mặt với hậu quả khi danh tính của anh bị tiết lộ.',
            posterUrl: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
            backgroundUrl: 'https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
            year: 2021,
            country: 'Mỹ',
            rating: 8.2,
            director: 'Jon Watts',
            cast: 'Tom Holland, Zendaya, Benedict Cumberbatch',
            type: 'Movie',
            badge: 'New',
            totalEpisodes: 1,
            genreIds: [actionGenre?.id, scifiGenre?.id]
        },
        {
            title: 'The Batman',
            originalTitle: 'The Batman',
            description: 'Batman khám phá tham nhũng ở Gotham City và mối liên hệ với gia đình của mình.',
            posterUrl: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
            backgroundUrl: 'https://image.tmdb.org/t/p/original/5P8SmMzSNYikXpxil6BYzJ16611.jpg',
            year: 2022,
            country: 'Mỹ',
            rating: 7.8,
            director: 'Matt Reeves',
            cast: 'Robert Pattinson, Zoë Kravitz, Paul Dano',
            type: 'Movie',
            badge: 'Hot',
            totalEpisodes: 1,
            genreIds: [actionGenre?.id]
        },
        {
            title: 'Guardians of the Galaxy Vol. 3',
            originalTitle: 'Guardians of the Galaxy Vol. 3',
            description: 'Đội Vệ Binh Dải Ngân Hà tiếp tục cuộc phiêu lưu của họ.',
            posterUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
            backgroundUrl: 'https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg',
            year: 2023,
            country: 'Mỹ',
            rating: 8.0,
            director: 'James Gunn',
            cast: 'Chris Pratt, Zoe Saldana, Dave Bautista',
            type: 'Movie',
            badge: 'New',
            totalEpisodes: 1,
            genreIds: [actionGenre?.id, scifiGenre?.id, comedyGenre?.id]
        }
    ];

    for (const filmData of films) {
        const { genreIds, ...filmInfo } = filmData;

        // Check if film already exists
        const existingFilm = await prisma.film.findFirst({
            where: { title: filmInfo.title }
        });

        let film;
        if (existingFilm) {
            film = await prisma.film.update({
                where: { id: existingFilm.id },
                data: {
                    ...filmInfo,
                    updatedAt: new Date()
                }
            });
        } else {
            film = await prisma.film.create({
                data: {
                    ...filmInfo,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
        }

        // Add genres
        if (genreIds) {
            for (const genreId of genreIds) {
                if (genreId) {
                    const existingFilmGenre = await prisma.filmGenre.findFirst({
                        where: {
                            filmId: film.id,
                            genreId: genreId
                        }
                    });

                    if (!existingFilmGenre) {
                        await prisma.filmGenre.create({
                            data: {
                                filmId: film.id,
                                genreId: genreId
                            }
                        });
                    }
                }
            }
        }

        // Add video source
        const existingVideoSource = await prisma.videoSource.findFirst({
            where: {
                filmId: film.id,
                isDefault: true
            }
        });

        if (!existingVideoSource) {
            await prisma.videoSource.create({
                data: {
                    filmId: film.id,
                    sourceType: 'External',
                    url: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
                    quality: '1080p',
                    serverName: 'YouTube Trailer',
                    isDefault: true
                }
            });
        }
    }
    console.log('✅ Films seeded successfully');
}

async function main() {
    try {
        console.log('🚀 Starting database seeding...\n');

        await seedGenres();
        await seedFilms();

        console.log('\n✨ Database seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();
