namespace MiniNetflix.Core.Entities;

public class GoogleDriveFile
{
    public int Id { get; set; }
    public string FileId { get; set; } = string.Empty; // Google Drive file ID
    public string FileName { get; set; } = string.Empty;
    public string MimeType { get; set; } = string.Empty;
    public long FileSize { get; set; } // in bytes
    public string? Resolution { get; set; } // e.g., "1080p", "720p"
    public int? Duration { get; set; } // in seconds
    public string? Quality { get; set; } // e.g., "HD", "SD", "4K"
    public FileType FileType { get; set; }
    public string? SubtitleFileId { get; set; } // Google Drive file ID for subtitle
    public int? MovieId { get; set; }
    public int? EpisodeId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation properties
    public Movie? Movie { get; set; }
    public Episode? Episode { get; set; }
}

public enum FileType
{
    Video,
    Subtitle,
    Poster,
    Backdrop,
    Thumbnail
}
