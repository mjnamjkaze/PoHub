import prisma from '../lib/prisma';

// Map film titles to real YouTube trailer IDs
const youtubeTrailers: Record<string, string> = {
    'Avengers: Endgame': 'TcMBFSGVi1c',
    'Spider-Man: No Way Home': 'JfVOs4VSpmA',
    'The Batman': 'mqqft2x_Aa4',
    'Guardians of the Galaxy Vol. 3': 'u3V5KDHRQvk',
    'John Wick: Chapter 4': 'qEVUtrk8_B4',
    'Mission: Impossible - Dead Reckoning': '2m1drlOPvVi',
    'Fast X': 'eoOaKN4qCKw',
    'Extraction 2': 'Y274jZs5s7s',
    'Top Gun: Maverick': 'giXco2jaZ_4',
    'Black Adam': 'X0tOpBuYasI',
    'Barbie': 'pBk4NYhWNMM',
    'The Super Mario Bros. Movie': 'TnGl01FkMMo',
    'Dungeons & Dragons: Honor Among Thieves': 'IiMinixSXII',
    'Ant-Man and the Wasp: Quantumania': 'ZlNFpri-Y40',
    'Shazam! Fury of the Gods': 'go6GEIrcvFY',
    'Anyone But You': '4fJJNw4dJJE',
    'The Notebook': 'BjJcYdEOI0k',
    'La La Land': '0pdqf4P9MB8',
    'Titanic': 'kVrqfYjkTdQ',
    'Me Before You': 'Eh993__rOxA',
    'The Nun II': 'QF-oyCwaArU',
    'M3GAN': 'BRb4U99OU80',
    'Scream VI': 'h74AXqw4Opc',
    'The Conjuring': 'k10ETZ41q5o',
    'A Quiet Place': 'WR7cc5t7tv8',
    'Dune: Part Two': 'Way9Dexny3w',
    'Interstellar': 'zSWdZVtXT7E',
    'The Matrix': 'm8e-FF8MsqU',
    'Inception': 'YoHD9XEInc0',
    'Spider-Man: Across the Spider-Verse': 'shW9i6k8cB0',
    'Elemental': 'hXzcyx9V0xw',
    'Turning Red': 'XdKzUbAiswE',
    'Encanto': 'CaimKeDcudo',
    'Frozen II': 'Zi4LMpSDccc',
    'Indiana Jones and the Dial of Destiny': 'eQfMbSe7F2g',
    'Avatar: The Way of Water': 'd9MyW72ELq0',
    'Jurassic World Dominion': 'fb5ELWi-ekk',
    'The Lost City': 'nfKO9rYDmE8',
    'Uncharted': 'eHp3MbsCbMg',
    'Oppenheimer': 'uYPbbksJxIg',
    'The Whale': 'BmllggGO4pM',
    'The Fabelmans': 'PbJfV_Ql_q8',
    'Tár': 'GlJxGhUYL4s',
    'The Banshees of Inisherin': 'uRu3zLOJN2c',
};

async function updateVideoSources() {
    console.log('🎬 Updating video sources with real YouTube trailers...');

    const films = await prisma.film.findMany({
        include: {
            videoSources: true
        }
    });

    for (const film of films) {
        const youtubeId = youtubeTrailers[film.title];

        if (!youtubeId) {
            console.log(`⏭️  No trailer for: ${film.title}`);
            continue;
        }

        // Delete old video sources
        await prisma.videoSource.deleteMany({
            where: { filmId: film.id }
        });

        // Add new YouTube source
        await prisma.videoSource.create({
            data: {
                filmId: film.id,
                sourceType: 'External',
                url: `https://www.youtube.com/watch?v=${youtubeId}`,
                quality: '1080p',
                serverName: 'YouTube',
                isDefault: true
            }
        });

        console.log(`✅ Updated: ${film.title}`);
    }

    console.log('✅ All video sources updated!');
}

async function main() {
    try {
        await updateVideoSources();
    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();
