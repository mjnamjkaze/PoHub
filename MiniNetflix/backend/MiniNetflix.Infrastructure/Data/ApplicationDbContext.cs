using Microsoft.EntityFrameworkCore;
using MiniNetflix.Core.Entities;

namespace MiniNetflix.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Movie> Movies { get; set; }
    public DbSet<Episode> Episodes { get; set; }
    public DbSet<GoogleDriveFile> GoogleDriveFiles { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<WatchHistory> WatchHistories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Movie configuration
        modelBuilder.Entity<Movie>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Description).HasMaxLength(2000);
            entity.Property(e => e.Genre).HasMaxLength(200);
            entity.Property(e => e.ImdbRating).HasColumnType("decimal(3,1)");
            entity.HasIndex(e => e.Title);
            entity.HasIndex(e => e.Genre);
            entity.HasIndex(e => e.ViewCount);
        });

        // Episode configuration
        modelBuilder.Entity<Episode>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Description).HasMaxLength(2000);
            entity.HasIndex(e => new { e.MovieId, e.SeasonNumber, e.EpisodeNumber }).IsUnique();
            
            entity.HasOne(e => e.Movie)
                .WithMany(m => m.Episodes)
                .HasForeignKey(e => e.MovieId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // GoogleDriveFile configuration
        modelBuilder.Entity<GoogleDriveFile>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FileId).IsRequired().HasMaxLength(100);
            entity.Property(e => e.FileName).IsRequired().HasMaxLength(500);
            entity.Property(e => e.MimeType).IsRequired().HasMaxLength(100);
            entity.HasIndex(e => e.FileId).IsUnique();
            
            entity.HasOne(e => e.Movie)
                .WithMany(m => m.DriveFiles)
                .HasForeignKey(e => e.MovieId)
                .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasOne(e => e.Episode)
                .WithMany(ep => ep.DriveFiles)
                .HasForeignKey(e => e.EpisodeId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // User configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Username).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
            entity.HasIndex(e => e.Username).IsUnique();
            entity.HasIndex(e => e.Email).IsUnique();
        });

        // WatchHistory configuration
        modelBuilder.Entity<WatchHistory>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => new { e.UserId, e.MovieId, e.EpisodeId });
            
            entity.HasOne(e => e.User)
                .WithMany(u => u.WatchHistories)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            entity.HasOne(e => e.Movie)
                .WithMany(m => m.WatchHistories)
                .HasForeignKey(e => e.MovieId)
                .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasOne(e => e.Episode)
                .WithMany(ep => ep.WatchHistories)
                .HasForeignKey(e => e.EpisodeId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
