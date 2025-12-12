using System.ComponentModel.DataAnnotations;

namespace PoHub.API.Models;

public class ViewHistory
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public int FilmId { get; set; }
    public Film Film { get; set; } = null!;

    public int? EpisodeId { get; set; }
    public Episode? Episode { get; set; }

    public int Progress { get; set; } // in seconds

    public DateTime ViewedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
