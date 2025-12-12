import prisma from '../lib/prisma';

async function seedMoreFilms() {
    console.log('🌱 Seeding more films...');

    const genres = {
        action: await prisma.genre.findUnique({ where: { slug: 'hanh-dong' } }),
        comedy: await prisma.genre.findUnique({ where: { slug: 'hai-huoc' } }),
        romance: await prisma.genre.findUnique({ where: { slug: 'tinh-cam' } }),
        horror: await prisma.genre.findUnique({ where: { slug: 'kinh-di' } }),
        scifi: await prisma.genre.findUnique({ where: { slug: 'khoa-hoc-vien-tuong' } }),
        animation: await prisma.genre.findUnique({ where: { slug: 'hoat-hinh' } }),
        adventure: await prisma.genre.findUnique({ where: { slug: 'phieu-luu' } }),
        drama: await prisma.genre.findUnique({ where: { slug: 'tam-ly' } }),
    };

    const moreFilms = [
        // Hành Động
        { title: 'John Wick: Chapter 4', year: 2023, rating: 8.6, poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', genres: [genres.action?.id], country: 'Mỹ', director: 'Chad Stahelski', cast: 'Keanu Reeves', badge: 'Hot' },
        { title: 'Mission: Impossible - Dead Reckoning', year: 2023, rating: 8.0, poster: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg', genres: [genres.action?.id, genres.adventure?.id], country: 'Mỹ', director: 'Christopher McQuarrie', cast: 'Tom Cruise' },
        { title: 'Fast X', year: 2023, rating: 7.2, poster: 'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg', genres: [genres.action?.id], country: 'Mỹ', director: 'Louis Leterrier', cast: 'Vin Diesel' },
        { title: 'Extraction 2', year: 2023, rating: 7.8, poster: 'https://image.tmdb.org/t/p/w500/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg', genres: [genres.action?.id], country: 'Mỹ', director: 'Sam Hargrave', cast: 'Chris Hemsworth', badge: 'New' },
        { title: 'Top Gun: Maverick', year: 2022, rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', genres: [genres.action?.id, genres.drama?.id], country: 'Mỹ', director: 'Joseph Kosinski', cast: 'Tom Cruise', badge: 'Hot' },
        { title: 'Black Adam', year: 2022, rating: 6.8, poster: 'https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg', genres: [genres.action?.id, genres.scifi?.id], country: 'Mỹ', director: 'Jaume Collet-Serra', cast: 'Dwayne Johnson' },

        // Hài Hước
        { title: 'Barbie', year: 2023, rating: 7.5, poster: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', genres: [genres.comedy?.id, genres.romance?.id], country: 'Mỹ', director: 'Greta Gerwig', cast: 'Margot Robbie, Ryan Gosling', badge: 'Hot' },
        { title: 'The Super Mario Bros. Movie', year: 2023, rating: 7.3, poster: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg', genres: [genres.comedy?.id, genres.animation?.id, genres.adventure?.id], country: 'Mỹ', director: 'Aaron Horvath', cast: 'Chris Pratt', badge: 'New' },
        { title: 'Dungeons & Dragons: Honor Among Thieves', year: 2023, rating: 7.6, poster: 'https://image.tmdb.org/t/p/w500/v7UF7ypAqjsFZFdjksjQ7IUpXdn.jpg', genres: [genres.comedy?.id, genres.adventure?.id], country: 'Mỹ', director: 'Jonathan Goldstein', cast: 'Chris Pine' },
        { title: 'Ant-Man and the Wasp: Quantumania', year: 2023, rating: 6.5, poster: 'https://image.tmdb.org/t/p/w500/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg', genres: [genres.comedy?.id, genres.scifi?.id, genres.action?.id], country: 'Mỹ', director: 'Peyton Reed', cast: 'Paul Rudd' },
        { title: 'Shazam! Fury of the Gods', year: 2023, rating: 6.2, poster: 'https://image.tmdb.org/t/p/w500/2VK4d3mqqTc7LVZLnLPeRiPaJ71.jpg', genres: [genres.comedy?.id, genres.action?.id], country: 'Mỹ', director: 'David F. Sandberg', cast: 'Zachary Levi' },

        // Tình Cảm
        { title: 'Anyone But You', year: 2023, rating: 7.1, poster: 'https://image.tmdb.org/t/p/w500/5qHNlLt5j3kxnrL4LtMD5YpLuAh.jpg', genres: [genres.romance?.id, genres.comedy?.id], country: 'Mỹ', director: 'Will Gluck', cast: 'Sydney Sweeney', badge: 'New' },
        { title: 'The Notebook', year: 2004, rating: 7.8, poster: 'https://image.tmdb.org/t/p/w500/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg', genres: [genres.romance?.id, genres.drama?.id], country: 'Mỹ', director: 'Nick Cassavetes', cast: 'Ryan Gosling, Rachel McAdams' },
        { title: 'La La Land', year: 2016, rating: 8.0, poster: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg', genres: [genres.romance?.id, genres.drama?.id], country: 'Mỹ', director: 'Damien Chazelle', cast: 'Ryan Gosling, Emma Stone', badge: 'Hot' },
        { title: 'Titanic', year: 1997, rating: 7.9, poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', genres: [genres.romance?.id, genres.drama?.id], country: 'Mỹ', director: 'James Cameron', cast: 'Leonardo DiCaprio, Kate Winslet' },
        { title: 'Me Before You', year: 2016, rating: 7.4, poster: 'https://image.tmdb.org/t/p/w500/Ia3dzj5LnCj1ZBdlVeJrbKJQxG.jpg', genres: [genres.romance?.id, genres.drama?.id], country: 'Mỹ', director: 'Thea Sharrock', cast: 'Emilia Clarke' },

        // Kinh Dị
        { title: 'The Nun II', year: 2023, rating: 6.5, poster: 'https://image.tmdb.org/t/p/w500/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg', genres: [genres.horror?.id], country: 'Mỹ', director: 'Michael Chaves', cast: 'Taissa Farmiga', badge: 'New' },
        { title: 'M3GAN', year: 2023, rating: 6.8, poster: 'https://image.tmdb.org/t/p/w500/xYLBgw7dHyEqmcrSk2Sq3asuSq5.jpg', genres: [genres.horror?.id, genres.scifi?.id], country: 'Mỹ', director: 'Gerard Johnstone', cast: 'Allison Williams', badge: 'Hot' },
        { title: 'Scream VI', year: 2023, rating: 6.7, poster: 'https://image.tmdb.org/t/p/w500/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg', genres: [genres.horror?.id], country: 'Mỹ', director: 'Matt Bettinelli-Olpin', cast: 'Melissa Barrera' },
        { title: 'The Conjuring', year: 2013, rating: 7.5, poster: 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg', genres: [genres.horror?.id], country: 'Mỹ', director: 'James Wan', cast: 'Vera Farmiga' },
        { title: 'A Quiet Place', year: 2018, rating: 7.5, poster: 'https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg', genres: [genres.horror?.id, genres.scifi?.id], country: 'Mỹ', director: 'John Krasinski', cast: 'Emily Blunt' },

        // Khoa Học Viễn Tưởng
        { title: 'Dune: Part Two', year: 2024, rating: 8.8, poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', genres: [genres.scifi?.id, genres.adventure?.id], country: 'Mỹ', director: 'Denis Villeneuve', cast: 'Timothée Chalamet', badge: 'Hot' },
        { title: 'Interstellar', year: 2014, rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', genres: [genres.scifi?.id, genres.drama?.id], country: 'Mỹ', director: 'Christopher Nolan', cast: 'Matthew McConaughey', badge: 'Hot' },
        { title: 'The Matrix', year: 1999, rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', genres: [genres.scifi?.id, genres.action?.id], country: 'Mỹ', director: 'Lana Wachowski', cast: 'Keanu Reeves' },
        { title: 'Inception', year: 2010, rating: 8.8, poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', genres: [genres.scifi?.id, genres.action?.id], country: 'Mỹ', director: 'Christopher Nolan', cast: 'Leonardo DiCaprio', badge: 'Hot' },

        // Hoạt Hình
        { title: 'Spider-Man: Across the Spider-Verse', year: 2023, rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', genres: [genres.animation?.id, genres.action?.id], country: 'Mỹ', director: 'Joaquim Dos Santos', cast: 'Shameik Moore', badge: 'Hot' },
        { title: 'Elemental', year: 2023, rating: 7.2, poster: 'https://image.tmdb.org/t/p/w500/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg', genres: [genres.animation?.id, genres.romance?.id], country: 'Mỹ', director: 'Peter Sohn', cast: 'Leah Lewis', badge: 'New' },
        { title: 'Turning Red', year: 2022, rating: 7.0, poster: 'https://image.tmdb.org/t/p/w500/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg', genres: [genres.animation?.id, genres.comedy?.id], country: 'Mỹ', director: 'Domee Shi', cast: 'Rosalie Chiang' },
        { title: 'Encanto', year: 2021, rating: 7.2, poster: 'https://image.tmdb.org/t/p/w500/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg', genres: [genres.animation?.id, genres.comedy?.id], country: 'Mỹ', director: 'Jared Bush', cast: 'Stephanie Beatriz' },
        { title: 'Frozen II', year: 2019, rating: 7.0, poster: 'https://image.tmdb.org/t/p/w500/mINJaa34MtknCb2xQRKiw4xjCxz.jpg', genres: [genres.animation?.id, genres.adventure?.id], country: 'Mỹ', director: 'Chris Buck', cast: 'Kristen Bell' },

        // Phiêu Lưu
        { title: 'Indiana Jones and the Dial of Destiny', year: 2023, rating: 6.9, poster: 'https://image.tmdb.org/t/p/w500/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg', genres: [genres.adventure?.id, genres.action?.id], country: 'Mỹ', director: 'James Mangold', cast: 'Harrison Ford', badge: 'New' },
        { title: 'Avatar: The Way of Water', year: 2022, rating: 7.7, poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', genres: [genres.adventure?.id, genres.scifi?.id], country: 'Mỹ', director: 'James Cameron', cast: 'Sam Worthington', badge: 'Hot' },
        { title: 'Jurassic World Dominion', year: 2022, rating: 5.7, poster: 'https://image.tmdb.org/t/p/w500/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg', genres: [genres.adventure?.id, genres.scifi?.id], country: 'Mỹ', director: 'Colin Trevorrow', cast: 'Chris Pratt' },
        { title: 'The Lost City', year: 2022, rating: 6.7, poster: 'https://image.tmdb.org/t/p/w500/neMZH82Stu91d3iqvLdNQfqPPyl.jpg', genres: [genres.adventure?.id, genres.comedy?.id], country: 'Mỹ', director: 'Aaron Nee', cast: 'Sandra Bullock' },
        { title: 'Uncharted', year: 2022, rating: 6.4, poster: 'https://image.tmdb.org/t/p/w500/tlZpSxYuBRoVJBOpUrPdQe9FmFq.jpg', genres: [genres.adventure?.id, genres.action?.id], country: 'Mỹ', director: 'Ruben Fleischer', cast: 'Tom Holland' },

        // Tâm Lý
        { title: 'Oppenheimer', year: 2023, rating: 8.6, poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', genres: [genres.drama?.id], country: 'Mỹ', director: 'Christopher Nolan', cast: 'Cillian Murphy', badge: 'Hot' },
        { title: 'The Whale', year: 2022, rating: 7.8, poster: 'https://image.tmdb.org/t/p/w500/jQ0gylJMxWSL490sy0RrPj1Lj7e.jpg', genres: [genres.drama?.id], country: 'Mỹ', director: 'Darren Aronofsky', cast: 'Brendan Fraser' },
        { title: 'The Fabelmans', year: 2022, rating: 7.6, poster: 'https://image.tmdb.org/t/p/w500/d2IywyOPS78vEnJvwVqkVRTiNC4.jpg', genres: [genres.drama?.id], country: 'Mỹ', director: 'Steven Spielberg', cast: 'Gabriel LaBelle' },
        { title: 'Tár', year: 2022, rating: 7.4, poster: 'https://image.tmdb.org/t/p/w500/dRVAlaU0vbG6hMf2K45NSiIyoUe.jpg', genres: [genres.drama?.id], country: 'Mỹ', director: 'Todd Field', cast: 'Cate Blanchett' },
        { title: 'The Banshees of Inisherin', year: 2022, rating: 7.7, poster: 'https://image.tmdb.org/t/p/w500/4yFG6cSPaCaPhyJ1vtGOtMD1lgh.jpg', genres: [genres.drama?.id, genres.comedy?.id], country: 'Ireland', director: 'Martin McDonagh', cast: 'Colin Farrell' },
    ];

    for (const filmData of moreFilms) {
        const { genres: genreIds, poster, ...filmInfo } = filmData;

        const existingFilm = await prisma.film.findFirst({
            where: { title: filmInfo.title }
        });

        if (existingFilm) {
            console.log(`⏭️  Skipping ${filmInfo.title} (already exists)`);
            continue;
        }

        const film = await prisma.film.create({
            data: {
                ...filmInfo,
                posterUrl: poster,
                backgroundUrl: poster,
                description: `${filmInfo.title} - Phim ${filmInfo.year}`,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        // Add genres
        if (genreIds) {
            for (const genreId of genreIds) {
                if (genreId) {
                    await prisma.filmGenre.create({
                        data: {
                            filmId: film.id,
                            genreId: genreId
                        }
                    });
                }
            }
        }

        // Add video source
        await prisma.videoSource.create({
            data: {
                filmId: film.id,
                sourceType: 'External',
                url: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
                quality: '1080p',
                serverName: 'Server 1',
                isDefault: true
            }
        });

        console.log(`✅ Added: ${filmInfo.title}`);
    }

    console.log('✅ More films seeded successfully');
}

async function main() {
    try {
        console.log('🚀 Seeding more films...\\n');
        await seedMoreFilms();
        console.log('\\n✨ Completed!');
    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();
