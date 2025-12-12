using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PoHub.API.Models;

public class Film
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(500)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? OriginalTitle { get; set; }

    [MaxLength(2000)]
    public string? Description { get; set; }

    [MaxLength(500)]
    public string? PosterUrl { get; set; }

    [MaxLength(500)]
    public string? BackgroundUrl { get; set; }

    public int Year { get; set; }

    [MaxLength(100)]
    public string? Country { get; set; }

    public decimal Rating { get; set; }

    [MaxLength(500)]
    public string? Director { get; set; }

    [MaxLength(1000)]
    public string? Cast { get; set; }

    public long ViewCount { get; set; }

    public int TotalEpisodes { get; set; }

    // Movie (phim lẻ) hoặc Series (phim bộ)
    [Required]
    [MaxLength(20)]
    public string Type { get; set; } = "Movie";

    // Badge: New, Hot, Full, Trailer
    [MaxLength(20)]
    public string? Badge { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public bool IsActive { get; set; } = true;

    // Navigation properties
    public ICollection<FilmGenre> FilmGenres { get; set; } = new List<FilmGenre>();
    public ICollection<Episode> Episodes { get; set; } = new List<Episode>();
    public ICollection<FilmView> FilmViews { get; set; } = new List<FilmView>();
    public ICollection<UserFavorite> UserFavorites { get; set; } = new List<UserFavorite>();
    public ICollection<ViewHistory> ViewHistories { get; set; } = new List<ViewHistory>();
}
