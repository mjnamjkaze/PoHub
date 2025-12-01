namespace MiniNetflix.Core.Entities;

public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int? Year { get; set; }
    public string? Genre { get; set; }
    public int? Runtime { get; set; } // in minutes
    public decimal? ImdbRating { get; set; }
    public string? PosterUrl { get; set; }
    public string? BackdropUrl { get; set; }
    public bool IsSeries { get; set; }
    public int ViewCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation properties
    public ICollection<Episode> Episodes { get; set; } = new List<Episode>();
    public ICollection<GoogleDriveFile> DriveFiles { get; set; } = new List<GoogleDriveFile>();
    public ICollection<WatchHistory> WatchHistories { get; set; } = new List<WatchHistory>();
}
