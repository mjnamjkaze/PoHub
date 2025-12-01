using Microsoft.AspNetCore.Mvc;
using MiniNetflix.Core.Interfaces;
using MiniNetflix.Core.Entities;

namespace MiniNetflix.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StreamingController : ControllerBase
{
    private readonly IFileStorageService _storageService;

    public StreamingController(IFileStorageService storageService)
    {
        _storageService = storageService;
    }

    [HttpGet("{fileId}")]
    public async Task<ActionResult<object>> GetStreamingUrl(string fileId)
    {
        try
        {
            var streamingUrl = await _storageService.GetStreamingUrlAsync(fileId);
            var metadata = await _storageService.GetFileMetadataAsync(fileId);

            return Ok(new
            {
                streamingUrl,
                metadata,
                storageType = _storageService.GetStorageType().ToString()
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("{fileId}/metadata")]
    public async Task<ActionResult<Dictionary<string, object>>> GetMetadata(string fileId)
    {
        try
        {
            var metadata = await _storageService.GetFileMetadataAsync(fileId);
            return Ok(metadata);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("{fileId}/direct")]
    public async Task<IActionResult> GetDirectStream(string fileId)
    {
        try
        {
            var streamingUrl = await _storageService.GetStreamingUrlAsync(fileId);
            return Redirect(streamingUrl);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("local/{*fileId}")]
    public async Task<IActionResult> StreamLocalFile(string fileId)
    {
        try
        {
            // Only serve local files through this endpoint
            if (_storageService.GetStorageType() != StorageType.Local)
            {
                return BadRequest(new { error = "This endpoint is only for local files" });
            }

            var stream = await _storageService.GetFileStreamAsync(fileId);
            var metadata = await _storageService.GetFileMetadataAsync(fileId);
            
            var mimeType = metadata.ContainsKey("mimeType") 
                ? metadata["mimeType"].ToString() 
                : "application/octet-stream";

            return File(stream, mimeType ?? "application/octet-stream", enableRangeProcessing: true);
        }
        catch (FileNotFoundException)
        {
            return NotFound(new { error = "File not found" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
