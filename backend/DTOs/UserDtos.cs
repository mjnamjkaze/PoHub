namespace PoHub.API.DTOs;

public class LoginDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class RegisterDto
{
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string? FullName { get; set; }
}

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public UserDto User { get; set; } = null!;
}

public class UserDto
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string? FullName { get; set; }
    public string? AvatarUrl { get; set; }
}

public class ViewHistoryDto
{
    public int Id { get; set; }
    public int FilmId { get; set; }
    public FilmListDto Film { get; set; } = null!;
    public int? EpisodeId { get; set; }
    public int EpisodeNumber { get; set; }
    public int Progress { get; set; }
    public DateTime ViewedAt { get; set; }
}

public class UpdateProgressDto
{
    public int FilmId { get; set; }
    public int? EpisodeId { get; set; }
    public int Progress { get; set; }
}
