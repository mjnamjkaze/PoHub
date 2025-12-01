using Microsoft.AspNetCore.Mvc;
using MiniNetflix.Core.Entities;
using MiniNetflix.Core.Interfaces;
using MiniNetflix.Infrastructure.Data;

namespace MiniNetflix.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly IFileStorageService _storageService;
    private readonly ApplicationDbContext _context;

    public UploadController(IFileStorageService storageService, ApplicationDbContext context)
    {
        _storageService = storageService;
        _context = context;
    }

    [HttpPost("movie")]
    public async Task<ActionResult<object>> UploadMovie([FromForm] IFormFile file, [FromForm] int movieId, [FromForm] string? folderId = null)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded");
        }

        try
        {
            using var stream = file.OpenReadStream();
            var fileId = await _driveService.UploadFileAsync(stream, file.FileName, file.ContentType, folderId);
            
            // Get metadata
            var metadata = await _driveService.GetFileMetadataAsync(fileId);

            // Save to database
            var driveFile = new GoogleDriveFile
            {
                FileId = fileId,
                FileName = file.FileName,
                MimeType = file.ContentType,
                FileSize = file.Length,
                MovieId = movieId,
                FileType = FileType.Video,
                CreatedAt = DateTime.UtcNow
            };

            if (metadata.ContainsKey("duration"))
            {
                driveFile.Duration = Convert.ToInt32(metadata["duration"]);
            }
            if (metadata.ContainsKey("resolution"))
            {
                driveFile.Resolution = metadata["resolution"].ToString();
            }

            _context.GoogleDriveFiles.Add(driveFile);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                fileId,
                fileName = file.FileName,
                size = file.Length,
                metadata
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("subtitle")]
    public async Task<ActionResult<object>> UploadSubtitle([FromForm] IFormFile file, [FromForm] int movieId, [FromForm] string? folderId = null)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded");
        }

        try
        {
            using var stream = file.OpenReadStream();
            var fileId = await _driveService.UploadFileAsync(stream, file.FileName, "text/vtt", folderId);

            // Save to database
            var driveFile = new GoogleDriveFile
            {
                FileId = fileId,
                FileName = file.FileName,
                MimeType = "text/vtt",
                FileSize = file.Length,
                MovieId = movieId,
                FileType = FileType.Subtitle,
                CreatedAt = DateTime.UtcNow
            };

            _context.GoogleDriveFiles.Add(driveFile);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                fileId,
                fileName = file.FileName,
                size = file.Length
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("folder")]
    public async Task<ActionResult<object>> CreateFolder([FromBody] CreateFolderRequest request)
    {
        try
        {
            var folderId = await _driveService.CreateFolderAsync(request.FolderName, request.ParentFolderId);
            
            return Ok(new
            {
                folderId,
                folderName = request.FolderName
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}

public class CreateFolderRequest
{
    public string FolderName { get; set; } = string.Empty;
    public string? ParentFolderId { get; set; }
}
