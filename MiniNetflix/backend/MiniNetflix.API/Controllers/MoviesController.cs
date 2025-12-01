using Microsoft.AspNetCore.Mvc;
using MiniNetflix.Core.Entities;
using MiniNetflix.Core.Interfaces;

namespace MiniNetflix.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly IMovieRepository _movieRepository;

    public MoviesController(IMovieRepository movieRepository)
    {
        _movieRepository = movieRepository;
    }

    [HttpGet]
    public async Task<ActionResult<List<Movie>>> GetMovies([FromQuery] string? genre = null, [FromQuery] string? search = null)
    {
        if (!string.IsNullOrEmpty(search))
        {
            var searchResults = await _movieRepository.SearchAsync(search);
            return Ok(searchResults);
        }

        if (!string.IsNullOrEmpty(genre))
        {
            var genreMovies = await _movieRepository.GetByGenreAsync(genre);
            return Ok(genreMovies);
        }

        var movies = await _movieRepository.GetAllAsync();
        return Ok(movies);
    }

    [HttpGet("trending")]
    public async Task<ActionResult<List<Movie>>> GetTrending([FromQuery] int count = 10)
    {
        var trending = await _movieRepository.GetTrendingAsync(count);
        return Ok(trending);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Movie>> GetMovie(int id)
    {
        var movie = await _movieRepository.GetByIdAsync(id);
        
        if (movie == null)
        {
            return NotFound();
        }

        return Ok(movie);
    }

    [HttpPost]
    public async Task<ActionResult<Movie>> CreateMovie([FromBody] Movie movie)
    {
        var createdMovie = await _movieRepository.AddAsync(movie);
        return CreatedAtAction(nameof(GetMovie), new { id = createdMovie.Id }, createdMovie);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMovie(int id, [FromBody] Movie movie)
    {
        if (id != movie.Id)
        {
            return BadRequest();
        }

        await _movieRepository.UpdateAsync(movie);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        await _movieRepository.DeleteAsync(id);
        return NoContent();
    }

    [HttpPost("{id}/view")]
    public async Task<IActionResult> IncrementViewCount(int id)
    {
        await _movieRepository.IncrementViewCountAsync(id);
        return NoContent();
    }
}
