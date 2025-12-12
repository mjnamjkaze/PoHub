using System.ComponentModel.DataAnnotations;

namespace PoHub.API.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? FullName { get; set; }

    [MaxLength(500)]
    public string? AvatarUrl { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }

    public bool IsActive { get; set; } = true;

    // Navigation properties
    public ICollection<ViewHistory> ViewHistories { get; set; } = new List<ViewHistory>();
    public ICollection<UserFavorite> UserFavorites { get; set; } = new List<UserFavorite>();
}
