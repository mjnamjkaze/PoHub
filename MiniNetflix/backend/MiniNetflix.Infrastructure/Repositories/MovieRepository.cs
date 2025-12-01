using Microsoft.EntityFrameworkCore;
using MiniNetflix.Core.Entities;
using MiniNetflix.Core.Interfaces;
using MiniNetflix.Infrastructure.Data;

namespace MiniNetflix.Infrastructure.Repositories;

public class MovieRepository : IMovieRepository
{
    private readonly ApplicationDbContext _context;

    public MovieRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Movie?> GetByIdAsync(int id)
    {
        return await _context.Movies
            .Include(m => m.Episodes)
            .Include(m => m.DriveFiles)
            .FirstOrDefaultAsync(m => m.Id == id);
    }

    public async Task<List<Movie>> GetAllAsync()
    {
        return await _context.Movies
            .Include(m => m.DriveFiles.Where(df => df.FileType == FileType.Poster))
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<Movie>> GetTrendingAsync(int count = 10)
    {
        return await _context.Movies
            .Include(m => m.DriveFiles.Where(df => df.FileType == FileType.Poster))
            .OrderByDescending(m => m.ViewCount)
            .Take(count)
            .ToListAsync();
    }

    public async Task<List<Movie>> SearchAsync(string query)
    {
        return await _context.Movies
            .Include(m => m.DriveFiles.Where(df => df.FileType == FileType.Poster))
            .Where(m => m.Title.Contains(query) || (m.Description != null && m.Description.Contains(query)))
            .ToListAsync();
    }

    public async Task<List<Movie>> GetByGenreAsync(string genre)
    {
        return await _context.Movies
            .Include(m => m.DriveFiles.Where(df => df.FileType == FileType.Poster))
            .Where(m => m.Genre != null && m.Genre.Contains(genre))
            .ToListAsync();
    }

    public async Task<Movie> AddAsync(Movie movie)
    {
        movie.CreatedAt = DateTime.UtcNow;
        _context.Movies.Add(movie);
        await _context.SaveChangesAsync();
        return movie;
    }

    public async Task UpdateAsync(Movie movie)
    {
        movie.UpdatedAt = DateTime.UtcNow;
        _context.Movies.Update(movie);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie != null)
        {
            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
        }
    }

    public async Task IncrementViewCountAsync(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie != null)
        {
            movie.ViewCount++;
            await _context.SaveChangesAsync();
        }
    }
}
