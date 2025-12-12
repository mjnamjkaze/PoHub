using PoHub.API.Data;
using PoHub.API.Models;

namespace PoHub.API.Seeders;

public static class FilmSeeder
{
    public static void SeedSampleFilms(ApplicationDbContext context)
    {
        if (context.Films.Any())
        {
            return; // Already seeded
        }

        var films = new List<Film>
        {
            new Film
            {
                Title = "Inception",
                OriginalTitle = "Inception",
                Description = "Một tên trộm có khả năng xâm nhập vào giấc mơ của người khác được giao nhiệm vụ cấy một ý tưởng vào tiềm thức của một CEO.",
                PosterUrl = "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
                BackgroundUrl = "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
                Year = 2010,
                Country = "Mỹ",
                Rating = 8.8M,
                Director = "Christopher Nolan",
                Cast = "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
                ViewCount = 125000,
                Type = "Movie",
                Badge = "Hot",
                CreatedAt = DateTime.UtcNow.AddDays(-30),
                UpdatedAt = DateTime.UtcNow.AddDays(-5)
            },
            new Film
            {
                Title = "The Dark Knight",
                OriginalTitle = "The Dark Knight",
                Description = "Batman phải đối mặt với một trong những kẻ phản diện nguy hiểm nhất - Joker",
                PosterUrl = "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                Year = 2008,
                Country = "Mỹ",
                Rating = 9.0M,
                Director = "Christopher Nolan",
                Cast = "Christian Bale, Heath Ledger, Aaron Eckhart",
                ViewCount = 200000,
                Type = "Movie",
                Badge = "Hot",
                CreatedAt = DateTime.UtcNow.AddDays(-60),
                UpdatedAt = DateTime.UtcNow.AddDays(-10)
            },
            new Film
            {
                Title = "Breaking Bad",
                OriginalTitle = "Breaking Bad",
                Description = "Một giáo viên hóa học biến thành trùm ma túy sau khi phát hiện mắc bệnh ung thư.",
                PosterUrl = "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
                Year = 2008,
                Country = "Mỹ",
                Rating = 9.5M,
                Director = "Vince Gilligan",
                Cast = "Bryan Cranston, Aaron Paul, Anna Gunn",
                ViewCount = 300000,
                TotalEpisodes = 62,
                Type = "Series",
                Badge = "Full",
                CreatedAt = DateTime.UtcNow.AddDays(-90),
                UpdatedAt = DateTime.UtcNow.AddDays(-2)
            },
            new Film
            {
                Title = "Parasite",
                OriginalTitle = "기생충",
                Description = "Cả gia đình nghèo khổ xâm nhập vào cuộc sống của một gia đình giàu có.",
                PosterUrl = "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                Year = 2019,
                Country = "Hàn Quốc",
                Rating = 8.6M,
                Director = "Bong Joon-ho",
                Cast = "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
                ViewCount = 85000,
                Type = "Movie",
                Badge = "New",
                CreatedAt = DateTime.UtcNow.AddDays(-15),
                UpdatedAt = DateTime.UtcNow.AddDays(-1)
            },
            new Film
            {
                Title = "Stranger Things",
                OriginalTitle = "Stranger Things",
                Description = "Một cậu bé mất tích trong một thị trấn nhỏ, hé lộ những bí mật và thí nghiệm siêu nhiên.",
                PosterUrl = "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
                Year = 2016,
                Country = "Mỹ",
                Rating = 8.7M,
                Director = "The Duffer Brothers",
                Cast = "Millie Bobby Brown, Finn Wolfhard, Winona Ryder",
                ViewCount = 250000,
                TotalEpisodes = 42,
                Type = "Series",
                Badge = "Hot",
                CreatedAt = DateTime.UtcNow.AddDays(-120),
                UpdatedAt = DateTime.UtcNow
            },
            new Film
            {
                Title = "Avengers: Endgame",
                OriginalTitle = "Avengers: Endgame",
                Description = "Các siêu anh hùng tập hợp để đảo ngược hành động của Thanos.",
                PosterUrl = "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
                Year = 2019,
                Country = "Mỹ",
                Rating = 8.4M,
                Director = "Anthony Russo, Joe Russo",
                Cast = "Robert Downey Jr., Chris Evans, Mark Ruffalo",
                ViewCount = 500000,
                Type = "Movie",
                Badge = "Hot",
                CreatedAt = DateTime.UtcNow.AddDays(-45),
                UpdatedAt = DateTime.UtcNow.AddDays(-3)
            }
        };

        context.Films.AddRange(films);
        context.SaveChanges();

        // Assign genres
        AssignGenres(context, films);
    }

    private static void AssignGenres(ApplicationDbContext context, List<Film> films)
    {
        var genres = context.Genres.ToList();
        var actionGenre = genres.FirstOrDefault(g => g.Slug == "hanh-dong");
        var sciFiGenre = genres.FirstOrDefault(g => g.Slug == "khoa-hoc-vien-tuong");
        var thrillerGenre = genres.FirstOrDefault(g => g.Slug == "tam-ly");

        var filmGenres = new List<FilmGenre>();

        // Inception - Action, Sci-Fi, Thriller
        if (actionGenre != null)
            filmGenres.Add(new FilmGenre { FilmId = films[0].Id, GenreId = actionGenre.Id });
        if (sciFiGenre != null)
            filmGenres.Add(new FilmGenre { FilmId = films[0].Id, GenreId = sciFiGenre.Id });

        // The Dark Knight - Action
        if (actionGenre != null)
            filmGenres.Add(new FilmGenre { FilmId = films[1].Id, GenreId = actionGenre.Id });

        // Breaking Bad - Thriller
        if (thrillerGenre != null)
            filmGenres.Add(new FilmGenre { FilmId = films[2].Id, GenreId = thrillerGenre.Id });

        // Parasite - Thriller
        if (thrillerGenre != null)
            filmGenres.Add(new FilmGenre { FilmId = films[3].Id, GenreId = thrillerGenre.Id });

        // Stranger Things - Sci-Fi, Thriller
        if (sciFiGenre != null)
            filmGenres.Add(new FilmGenre { FilmId = films[4].Id, GenreId = sciFiGenre.Id });
        if (thrillerGenre != null)
            filmGenres.Add(new FilmGenre { FilmId = films[4].Id, GenreId = thrillerGenre.Id });

        // Avengers - Action, Sci-Fi
        if (actionGenre != null)
            filmGenres.Add(new FilmGenre { FilmId = films[5].Id, GenreId = actionGenre.Id });
        if (sciFiGenre != null)
            filmGenres.Add(new FilmGenre { FilmId = films[5].Id, GenreId = sciFiGenre.Id });

        context.FilmGenres.AddRange(filmGenres);
        context.SaveChanges();
    }
}
