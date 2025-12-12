using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PoHub.API.Data;
using PoHub.API.DTOs;

namespace PoHub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FilmsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FilmsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<PaginatedResult<FilmListDto>>> GetFilms([FromQuery] FilmFilterDto filter)
    {
        var query = _context.Films
            .Include(f => f.FilmGenres)
            .ThenInclude(fg => fg.Genre)
            .Where(f => f.IsActive)
            .AsQueryable();

        // Apply filters
        if (!string.IsNullOrEmpty(filter.Search))
        {
            query = query.Where(f => f.Title.Contains(filter.Search) || 
                                   f.OriginalTitle != null && f.OriginalTitle.Contains(filter.Search));
        }

        if (filter.Genres != null && filter.Genres.Any())
        {
            query = query.Where(f => f.FilmGenres.Any(fg => filter.Genres.Contains(fg.Genre.Slug)));
        }

        if (!string.IsNullOrEmpty(filter.Country))
        {
            query = query.Where(f => f.Country == filter.Country);
        }

        if (filter.Year.HasValue)
        {
            query = query.Where(f => f.Year == filter.Year.Value);
        }

        if (!string.IsNullOrEmpty(filter.Type))
        {
            query = query.Where(f => f.Type == filter.Type);
        }

        if (filter.MinEpisodes.HasValue)
        {
            query = query.Where(f => f.TotalEpisodes >= filter.MinEpisodes.Value);
        }

        if (filter.MaxEpisodes.HasValue)
        {
            query = query.Where(f => f.TotalEpisodes <= filter.MaxEpisodes.Value);
        }

        // Apply sorting
        query = filter.SortBy.ToLower() switch
        {
            "year" => query.OrderByDescending(f => f.Year),
            "views" => query.OrderByDescending(f => f.ViewCount),
            "title" => query.OrderBy(f => f.Title),
            "rating" => query.OrderByDescending(f => f.Rating),
            _ => query.OrderByDescending(f => f.UpdatedAt)
        };

        var totalCount = await query.CountAsync();

        var films = await query
            .Skip((filter.Page - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .Select(f => new FilmListDto
            {
                Id = f.Id,
                Title = f.Title,
                OriginalTitle = f.OriginalTitle,
                PosterUrl = f.PosterUrl,
                Year = f.Year,
                Country = f.Country,
                Rating = f.Rating,
                ViewCount = f.ViewCount,
                TotalEpisodes = f.TotalEpisodes,
                Type = f.Type,
                Badge = f.Badge,
                Genres = f.FilmGenres.Select(fg => fg.Genre.Name).ToList(),
                UpdatedAt = f.UpdatedAt
            })
            .ToListAsync();

        return Ok(new PaginatedResult<FilmListDto>
        {
            Items = films,
            TotalCount = totalCount,
            Page = filter.Page,
            PageSize = filter.PageSize
        });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FilmDetailDto>> GetFilm(int id)
    {
        var film = await _context.Films
            .Include(f => f.FilmGenres)
            .ThenInclude(fg => fg.Genre)
            .Include(f => f.Episodes)
            .ThenInclude(e => e.VideoSources)
            .Include(f => f.Episodes)
            .FirstOrDefaultAsync(f => f.Id == id && f.IsActive);

        if (film == null)
        {
            return NotFound();
        }

        // Get video sources for movies (not series)
        var videoSources = new List<VideoSourceDto>();
        if (film.Type == "Movie")
        {
            videoSources = await _context.VideoSources
                .Where(vs => vs.FilmId == id)
                .Select(vs => new VideoSourceDto
                {
                    Id = vs.Id,
                    SourceType = vs.SourceType,
                    Url = vs.Url,
                    Quality = vs.Quality,
                    ServerName = vs.ServerName,
                    SubtitleUrl = vs.SubtitleUrl,
                    IsDefault = vs.IsDefault
                })
                .ToListAsync();
        }

        var result = new FilmDetailDto
        {
            Id = film.Id,
            Title = film.Title,
            OriginalTitle = film.OriginalTitle,
            Description = film.Description,
            PosterUrl = film.PosterUrl,
            BackgroundUrl = film.BackgroundUrl,
            Year = film.Year,
            Country = film.Country,
            Rating = film.Rating,
            Director = film.Director,
            Cast = film.Cast,
            ViewCount = film.ViewCount,
            TotalEpisodes = film.TotalEpisodes,
            Type = film.Type,
            Badge = film.Badge,
            Genres = film.FilmGenres.Select(fg => fg.Genre.Name).ToList(),
            CreatedAt = film.CreatedAt,
            UpdatedAt = film.UpdatedAt,
            Episodes = film.Episodes
                .OrderBy(e => e.EpisodeNumber)
                .Select(e => new EpisodeDto
                {
                    Id = e.Id,
                    EpisodeNumber = e.EpisodeNumber,
                    Title = e.Title,
                    Description = e.Description,
                    Duration = e.Duration,
                    VideoSources = e.VideoSources.Select(vs => new VideoSourceDto
                    {
                        Id = vs.Id,
                        SourceType = vs.SourceType,
                        Url = vs.Url,
                        Quality = vs.Quality,
                        ServerName = vs.ServerName,
                        SubtitleUrl = vs.SubtitleUrl,
                        IsDefault = vs.IsDefault
                    }).ToList()
                })
                .ToList(),
            VideoSources = videoSources
        };

        // Increment view count
        await IncrementViewCount(id, HttpContext.Connection.RemoteIpAddress?.ToString());

        return Ok(result);
    }

    [HttpGet("trending")]
    public async Task<ActionResult<List<FilmListDto>>> GetTrending([FromQuery] string period = "24h")
    {
        var sinceDate = period == "7d" 
            ? DateTime.UtcNow.AddDays(-7) 
            : DateTime.UtcNow.AddHours(-24);

        var trending = await _context.FilmViews
            .Where(fv => fv.ViewedAt >= sinceDate)
            .GroupBy(fv => fv.FilmId)
            .Select(g => new { FilmId = g.Key, ViewCount = g.Count() })
            .OrderByDescending(x => x.ViewCount)
            .Take(10)
            .Join(_context.Films.Include(f => f.FilmGenres).ThenInclude(fg => fg.Genre),
                x => x.FilmId,
                f => f.Id,
                (x, f) => new FilmListDto
                {
                    Id = f.Id,
                    Title = f.Title,
                    OriginalTitle = f.OriginalTitle,
                    PosterUrl = f.PosterUrl,
                    Year = f.Year,
                    Country = f.Country,
                    Rating = f.Rating,
                    ViewCount = f.ViewCount,
                    TotalEpisodes = f.TotalEpisodes,
                    Type = f.Type,
                    Badge = f.Badge,
                    Genres = f.FilmGenres.Select(fg => fg.Genre.Name).ToList(),
                    UpdatedAt = f.UpdatedAt
                })
            .ToListAsync();

        return Ok(trending);
    }

    [HttpGet("search/suggest")]
    public async Task<ActionResult<List<FilmListDto>>> SearchSuggest([FromQuery] string q)
    {
        if (string.IsNullOrWhiteSpace(q) || q.Length < 2)
        {
            return Ok(new List<FilmListDto>());
        }

        var results = await _context.Films
            .Include(f => f.FilmGenres)
            .ThenInclude(fg => fg.Genre)
            .Where(f => f.IsActive && 
                       (f.Title.Contains(q) || 
                        f.OriginalTitle != null && f.OriginalTitle.Contains(q)))
            .OrderByDescending(f => f.ViewCount)
            .Take(10)
            .Select(f => new FilmListDto
            {
                Id = f.Id,
                Title = f.Title,
                OriginalTitle = f.OriginalTitle,
                PosterUrl = f.PosterUrl,
                Year = f.Year,
                Country = f.Country,
                Rating = f.Rating,
                ViewCount = f.ViewCount,
                TotalEpisodes = f.TotalEpisodes,
                Type = f.Type,
                Badge = f.Badge,
                Genres = f.FilmGenres.Select(fg => fg.Genre.Name).ToList(),
                UpdatedAt = f.UpdatedAt
            })
            .ToListAsync();

        return Ok(results);
    }

    private async Task IncrementViewCount(int filmId, string? ipAddress)
    {
        var film = await _context.Films.FindAsync(filmId);
        if (film != null)
        {
            film.ViewCount++;
            
            _context.FilmViews.Add(new Models.FilmView
            {
                FilmId = filmId,
                IpAddress = ipAddress,
                ViewedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
        }
    }
}
