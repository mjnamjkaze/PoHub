using Microsoft.EntityFrameworkCore;
using PoHub.API.Models;

namespace PoHub.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Film> Films { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<FilmGenre> FilmGenres { get; set; }
    public DbSet<Episode> Episodes { get; set; }
    public DbSet<VideoSource> VideoSources { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<ViewHistory> ViewHistories { get; set; }
    public DbSet<UserFavorite> UserFavorites { get; set; }
    public DbSet<FilmView> FilmViews { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure FilmGenre many-to-many relationship
        modelBuilder.Entity<FilmGenre>()
            .HasKey(fg => new { fg.FilmId, fg.GenreId });

        modelBuilder.Entity<FilmGenre>()
            .HasOne(fg => fg.Film)
            .WithMany(f => f.FilmGenres)
            .HasForeignKey(fg => fg.FilmId);

        modelBuilder.Entity<FilmGenre>()
            .HasOne(fg => fg.Genre)
            .WithMany(g => g.FilmGenres)
            .HasForeignKey(fg => fg.GenreId);

        // Configure Film indexes
        modelBuilder.Entity<Film>()
            .HasIndex(f => f.Title);

        modelBuilder.Entity<Film>()
            .HasIndex(f => f.Type);

        modelBuilder.Entity<Film>()
            .HasIndex(f => f.Year);

        modelBuilder.Entity<Film>()
            .HasIndex(f => f.ViewCount);

        modelBuilder.Entity<Film>()
            .HasIndex(f => f.CreatedAt);

        // Configure Genre unique slug
        modelBuilder.Entity<Genre>()
            .HasIndex(g => g.Slug)
            .IsUnique();

        // Configure User unique email and username
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        // Configure ViewHistory indexes
        modelBuilder.Entity<ViewHistory>()
            .HasIndex(vh => vh.UserId);

        modelBuilder.Entity<ViewHistory>()
            .HasIndex(vh => new { vh.UserId, vh.FilmId });

        // Configure FilmView indexes for trending
        modelBuilder.Entity<FilmView>()
            .HasIndex(fv => fv.FilmId);

        modelBuilder.Entity<FilmView>()
            .HasIndex(fv => fv.ViewedAt);

        // Seed data
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        // Seed Genres
        var genres = new[]
        {
            new Genre { Id = 1, Name = "Hành Động", Slug = "hanh-dong", Description = "Phim hành động gay cấn" },
            new Genre { Id = 2, Name = "Hài Hước", Slug = "hai-huoc", Description = "Phim hài hước vui nhộn" },
            new Genre { Id = 3, Name = "Lãng Mạn", Slug = "lang-man", Description = "Phim tình cảm lãng mạn" },
            new Genre { Id = 4, Name = "Kinh Dị", Slug = "kinh-di", Description = "Phim kinh dị rùng rợn" },
            new Genre { Id = 5, Name = "Khoa Học Viễn Tưởng", Slug = "khoa-hoc-vien-tuong", Description = "Phim khoa học viễn tưởng" },
            new Genre { Id = 6, Name = "Phiêu Lưu", Slug = "phieu-luu", Description = "Phim phiêu lưu mạo hiểm" },
            new Genre { Id = 7, Name = "Tâm Lý", Slug = "tam-ly", Description = "Phim tâm lý" },
            new Genre { Id = 8, Name = "Hoạt Hình", Slug = "hoat-hinh", Description = "Phim hoạt hình anime" }
        };

        modelBuilder.Entity<Genre>().HasData(genres);
    }
}
