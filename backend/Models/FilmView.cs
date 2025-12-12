using System.ComponentModel.DataAnnotations;

namespace PoHub.API.Models;

public class FilmView
{
    [Key]
    public int Id { get; set; }

    public int FilmId { get; set; }
    public Film Film { get; set; } = null!;

    [MaxLength(50)]
    public string? IpAddress { get; set; }

    public int? UserId { get; set; }

    public DateTime ViewedAt { get; set; }
}
