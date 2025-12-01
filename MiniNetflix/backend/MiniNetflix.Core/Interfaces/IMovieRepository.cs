using MiniNetflix.Core.Entities;

namespace MiniNetflix.Core.Interfaces;

public interface IMovieRepository
{
    Task<Movie?> GetByIdAsync(int id);
    Task<List<Movie>> GetAllAsync();
    Task<List<Movie>> GetTrendingAsync(int count = 10);
    Task<List<Movie>> SearchAsync(string query);
    Task<List<Movie>> GetByGenreAsync(string genre);
    Task<Movie> AddAsync(Movie movie);
    Task UpdateAsync(Movie movie);
    Task DeleteAsync(int id);
    Task IncrementViewCountAsync(int id);
}
