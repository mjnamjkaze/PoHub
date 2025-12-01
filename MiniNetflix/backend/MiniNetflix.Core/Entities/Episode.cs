namespace MiniNetflix.Core.Entities;

public class Episode
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public int SeasonNumber { get; set; }
    public int EpisodeNumber { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int? Runtime { get; set; } // in minutes
    public string? ThumbnailUrl { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation properties
    public Movie Movie { get; set; } = null!;
    public ICollection<GoogleDriveFile> DriveFiles { get; set; } = new List<GoogleDriveFile>();
    public ICollection<WatchHistory> WatchHistories { get; set; } = new List<WatchHistory>();
}
