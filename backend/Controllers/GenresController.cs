using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PoHub.API.Data;
using PoHub.API.DTOs;

namespace PoHub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GenresController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public GenresController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<GenreDto>>> GetGenres()
    {
        var genres = await _context.Genres
            .Select(g => new GenreDto
            {
                Id = g.Id,
                Name = g.Name,
                Slug = g.Slug,
                Description = g.Description,
                FilmCount = g.FilmGenres.Count(fg => fg.Film.IsActive)
            })
            .OrderBy(g => g.Name)
            .ToListAsync();

        return Ok(genres);
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<GenreDto>> GetGenre(string slug)
    {
        var genre = await _context.Genres
            .Where(g => g.Slug == slug)
            .Select(g => new GenreDto
            {
                Id = g.Id,
                Name = g.Name,
                Slug = g.Slug,
                Description = g.Description,
                FilmCount = g.FilmGenres.Count(fg => fg.Film.IsActive)
            })
            .FirstOrDefaultAsync();

        if (genre == null)
        {
            return NotFound();
        }

        return Ok(genre);
    }
}
