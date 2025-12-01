-- Mini-Netflix Sample Data
-- Run this script in SQL Server Management Studio or Azure Data Studio

USE MiniNetflix;
GO

-- 1. Thêm User mẫu
INSERT INTO Users (Username, Email, CreatedAt)
VALUES ('demo', 'demo@mininetflix.com', GETDATE());
GO

-- 2. Thêm Movies mẫu
INSERT INTO Movies (Title, Description, Year, Genre, Runtime, ImdbRating, PosterUrl, BackdropUrl, IsSeries, ViewCount, CreatedAt)
VALUES 
-- Action Movies
('The Matrix', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 1999, 'Action, Sci-Fi', 136, 8.7, 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', 'https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg', 0, 1250, GETDATE()),

('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.', 2008, 'Action, Crime, Drama', 152, 9.0, 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg', 0, 3500, GETDATE()),

('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 2010, 'Action, Sci-Fi, Thriller', 148, 8.8, 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg', 0, 2100, GETDATE()),

('John Wick', 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.', 2014, 'Action, Thriller', 101, 7.4, 'https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg', 'https://image.tmdb.org/t/p/original/umC04Cozevu8nn3JTDJ1pc7PVTn.jpg', 0, 1800, GETDATE()),

-- Sci-Fi Movies
('Interstellar', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.', 2014, 'Adventure, Drama, Sci-Fi', 169, 8.6, 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', 'https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg', 0, 2800, GETDATE()),

('Blade Runner 2049', 'A young blade runner''s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.', 2017, 'Sci-Fi, Thriller', 164, 8.0, 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', 'https://image.tmdb.org/t/p/original/ilRyazdMJwN05exqhwK4tMKBYZs.jpg', 0, 1500, GETDATE()),

-- Drama Movies
('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 1994, 'Drama', 142, 9.3, 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg', 0, 5000, GETDATE()),

('Forrest Gump', 'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.', 1994, 'Drama, Romance', 142, 8.8, 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg', 'https://image.tmdb.org/t/p/original/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg', 0, 4200, GETDATE()),

-- Comedy Movies
('The Grand Budapest Hotel', 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.', 2014, 'Adventure, Comedy, Crime', 99, 8.1, 'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg', 'https://image.tmdb.org/t/p/original/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg', 0, 1600, GETDATE()),

('Parasite', 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', 2019, 'Comedy, Drama, Thriller', 132, 8.6, 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', 'https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg', 0, 2300, GETDATE()),

-- Horror/Thriller
('Get Out', 'A young African-American visits his white girlfriend''s parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.', 2017, 'Horror, Mystery, Thriller', 104, 7.7, 'https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg', 'https://image.tmdb.org/t/p/original/8yqLPNwNCtpOPc3XkOlkSMnghzw.jpg', 0, 1900, GETDATE()),

('A Quiet Place', 'In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.', 2018, 'Drama, Horror, Sci-Fi', 90, 7.5, 'https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg', 'https://image.tmdb.org/t/p/original/roYyPiQDQKmIKUEhO912693tSja.jpg', 0, 2200, GETDATE()),

-- TV Series
('Stranger Things', 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.', 2016, 'Drama, Fantasy, Horror', 50, 8.7, 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg', 1, 4200, GETDATE()),

('Breaking Bad', 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.', 2008, 'Crime, Drama, Thriller', 47, 9.5, 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', 'https://image.tmdb.org/t/p/original/9faGSFi5jam6pDWGNd0p8JcJgXQ.jpg', 1, 6500, GETDATE()),

('The Witcher', 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.', 2019, 'Action, Adventure, Fantasy', 60, 8.2, 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg', 'https://image.tmdb.org/t/p/original/qsxKjmCNGViojaYeBcPGBhJLiMH.jpg', 1, 3100, GETDATE()),

('The Mandalorian', 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.', 2019, 'Action, Adventure, Sci-Fi', 40, 8.7, 'https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg', 'https://image.tmdb.org/t/p/original/9ijMGlJKqcslswWUzTEwScm82Gs.jpg', 1, 3800, GETDATE());

GO

PRINT 'Sample data inserted successfully!';
PRINT 'Total movies: 16';
PRINT '';
PRINT 'Now refresh your browser at http://localhost:3000';
GO
