using System.ComponentModel.DataAnnotations;

namespace PoHub.API.Models;

public class UserFavorite
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public int FilmId { get; set; }
    public Film Film { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
}
