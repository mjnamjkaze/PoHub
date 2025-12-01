namespace MiniNetflix.Core.Entities;

public class WatchHistory
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int? MovieId { get; set; }
    public int? EpisodeId { get; set; }
    public int CurrentPosition { get; set; } // in seconds
    public int TotalDuration { get; set; } // in seconds
    public bool IsCompleted { get; set; }
    public DateTime LastWatchedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation properties
    public User User { get; set; } = null!;
    public Movie? Movie { get; set; }
    public Episode? Episode { get; set; }
}
