using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniNetflix.Core.Entities;
using MiniNetflix.Infrastructure.Data;

namespace MiniNetflix.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WatchHistoryController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public WatchHistoryController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<WatchHistory>> SaveProgress([FromBody] SaveProgressRequest request)
    {
        // Find existing watch history or create new one
        var watchHistory = await _context.WatchHistories
            .FirstOrDefaultAsync(w => 
                w.UserId == request.UserId && 
                w.MovieId == request.MovieId && 
                w.EpisodeId == request.EpisodeId);

        if (watchHistory == null)
        {
            watchHistory = new WatchHistory
            {
                UserId = request.UserId,
                MovieId = request.MovieId,
                EpisodeId = request.EpisodeId,
                CreatedAt = DateTime.UtcNow
            };
            _context.WatchHistories.Add(watchHistory);
        }

        watchHistory.CurrentPosition = request.CurrentPosition;
        watchHistory.TotalDuration = request.TotalDuration;
        watchHistory.IsCompleted = request.CurrentPosition >= request.TotalDuration * 0.9; // 90% watched = completed
        watchHistory.LastWatchedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(watchHistory);
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<List<WatchHistory>>> GetUserHistory(int userId)
    {
        var history = await _context.WatchHistories
            .Include(w => w.Movie)
            .Include(w => w.Episode)
            .Where(w => w.UserId == userId)
            .OrderByDescending(w => w.LastWatchedAt)
            .ToListAsync();

        return Ok(history);
    }

    [HttpGet("user/{userId}/movie/{movieId}")]
    public async Task<ActionResult<WatchHistory>> GetProgress(int userId, int movieId, [FromQuery] int? episodeId = null)
    {
        var watchHistory = await _context.WatchHistories
            .FirstOrDefaultAsync(w => 
                w.UserId == userId && 
                w.MovieId == movieId && 
                w.EpisodeId == episodeId);

        if (watchHistory == null)
        {
            return NotFound();
        }

        return Ok(watchHistory);
    }

    [HttpGet("user/{userId}/continue-watching")]
    public async Task<ActionResult<List<WatchHistory>>> GetContinueWatching(int userId)
    {
        var continueWatching = await _context.WatchHistories
            .Include(w => w.Movie)
            .Include(w => w.Episode)
            .Where(w => w.UserId == userId && !w.IsCompleted)
            .OrderByDescending(w => w.LastWatchedAt)
            .Take(10)
            .ToListAsync();

        return Ok(continueWatching);
    }
}

public class SaveProgressRequest
{
    public int UserId { get; set; }
    public int? MovieId { get; set; }
    public int? EpisodeId { get; set; }
    public int CurrentPosition { get; set; }
    public int TotalDuration { get; set; }
}
