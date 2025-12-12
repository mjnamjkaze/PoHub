using System.ComponentModel.DataAnnotations;

namespace PoHub.API.Models;

public class Episode
{
    [Key]
    public int Id { get; set; }

    public int FilmId { get; set; }
    public Film Film { get; set; } = null!;

    public int EpisodeNumber { get; set; }

    [MaxLength(200)]
    public string? Title { get; set; }

    [MaxLength(1000)]
    public string? Description { get; set; }

    public int Duration { get; set; } // in minutes

    // Video sources
    public ICollection<VideoSource> VideoSources { get; set; } = new List<VideoSource>();

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public bool IsActive { get; set; } = true;
}
