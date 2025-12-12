using System.ComponentModel.DataAnnotations;

namespace PoHub.API.Models;

public class VideoSource
{
    [Key]
    public int Id { get; set; }

    public int? EpisodeId { get; set; }
    public Episode? Episode { get; set; }

    public int? FilmId { get; set; }
    public Film? Film { get; set; }

    // Drive, Local, External
    [Required]
    [MaxLength(20)]
    public string SourceType { get; set; } = "Local";

    [Required]
    [MaxLength(1000)]
    public string Url { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? Quality { get; set; } // 720p, 1080p, 4K

    [MaxLength(100)]
    public string? ServerName { get; set; } // Google Drive, Server 1, Server 2...

    [MaxLength(500)]
    public string? SubtitleUrl { get; set; }

    public bool IsDefault { get; set; }
}
