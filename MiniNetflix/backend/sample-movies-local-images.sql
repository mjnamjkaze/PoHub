-- Sample data for movies using local images
-- Run this in your database to add sample movies

-- Movie 1: Dark Shadows (Action)
INSERT INTO Movies (Title, Description, Year, Genre, Runtime, ImdbRating, PosterUrl, BackdropUrl, IsSeries, ViewCount, CreatedAt)
VALUES (
    'Dark Shadows',
    'An intense action thriller following a former special ops agent who must protect a key witness from a dangerous criminal organization. Packed with explosive action sequences and dramatic twists.',
    2024,
    'Action, Thriller',
    142,
    8.5,
    '/images/posters/action-1.png',
    '/images/backdrops/action-1.png',
    0,
    0,
    GETDATE()
);

-- Movie 2: Neon Future (Sci-Fi)
INSERT INTO Movies (Title, Description, Year, Genre, Runtime, ImdbRating, PosterUrl, BackdropUrl, IsSeries, ViewCount, CreatedAt)
VALUES (
    'Neon Future',
    'In a dystopian future where technology controls every aspect of life, a hacker discovers a conspiracy that could change humanity forever. A visually stunning sci-fi adventure.',
    2024,
    'Sci-Fi, Adventure',
    128,
    8.2,
    '/images/posters/scifi-1.png',
    '/images/backdrops/scifi-1.png',
    0,
    0,
    GETDATE()
);

-- Movie 3: Love in Paris (Romance)
INSERT INTO Movies (Title, Description, Year, Genre, Runtime, ImdbRating, PosterUrl, BackdropUrl, IsSeries, ViewCount, CreatedAt)
VALUES (
    'Love in Paris',
    'A heartwarming romantic drama about two strangers who meet by chance in Paris and embark on a journey of love and self-discovery in the city of lights.',
    2024,
    'Romance, Drama',
    115,
    7.8,
    '/images/posters/romance-1.png',
    '/images/backdrops/romance-1.png',
    0,
    0,
    GETDATE()
);

-- Additional sample movies (you can add more images and use these)
INSERT INTO Movies (Title, Description, Year, Genre, Runtime, ImdbRating, PosterUrl, BackdropUrl, IsSeries, ViewCount, CreatedAt)
VALUES (
    'The Last Stand',
    'A gripping war drama about courage and sacrifice on the battlefield.',
    2023,
    'War, Drama',
    156,
    8.7,
    '/images/posters/action-1.png',  -- Reusing existing image
    '/images/backdrops/action-1.png',
    0,
    0,
    GETDATE()
);

INSERT INTO Movies (Title, Description, Year, Genre, Runtime, ImdbRating, PosterUrl, BackdropUrl, IsSeries, ViewCount, CreatedAt)
VALUES (
    'Cosmic Journey',
    'An epic space exploration adventure across the galaxy.',
    2024,
    'Sci-Fi, Adventure',
    145,
    8.0,
    '/images/posters/scifi-1.png',  -- Reusing existing image
    '/images/backdrops/scifi-1.png',
    0,
    0,
    GETDATE()
);
