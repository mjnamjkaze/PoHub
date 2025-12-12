namespace PoHub.API.DTOs;

public class FilmListDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? OriginalTitle { get; set; }
    public string? PosterUrl { get; set; }
    public int Year { get; set; }
    public string? Country { get; set; }
    public decimal Rating { get; set; }
    public long ViewCount { get; set; }
    public int TotalEpisodes { get; set; }
    public string Type { get; set; } = "Movie";
    public string? Badge { get; set; }
    public List<string> Genres { get; set; } = new();
    public DateTime UpdatedAt { get; set; }
}

public class FilmDetailDto : FilmListDto
{
    public string? Description { get; set; }
    public string? BackgroundUrl { get; set; }
    public string? Director { get; set; }
    public string? Cast { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<EpisodeDto> Episodes { get; set; } = new();
    public List<VideoSourceDto> VideoSources { get; set; } = new();
}

public class EpisodeDto
{
    public int Id { get; set; }
    public int EpisodeNumber { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int Duration { get; set; }
    public List<VideoSourceDto> VideoSources { get; set; } = new();
}

public class VideoSourceDto
{
    public int Id { get; set; }
    public string SourceType { get; set; } = "Local";
    public string Url { get; set; } = string.Empty;
    public string? Quality { get; set; }
    public string? ServerName { get; set; }
    public string? SubtitleUrl { get; set; }
    public bool IsDefault { get; set; }
}

public class FilmFilterDto
{
    public string? Search { get; set; }
    public List<string>? Genres { get; set; }
    public string? Country { get; set; }
    public int? Year { get; set; }
    public string? Type { get; set; }
    public int? MinEpisodes { get; set; }
    public int? MaxEpisodes { get; set; }
    public string SortBy { get; set; } = "updated";
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 24;
}

public class PaginatedResult<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
}

public class GenreDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int FilmCount { get; set; }
}
