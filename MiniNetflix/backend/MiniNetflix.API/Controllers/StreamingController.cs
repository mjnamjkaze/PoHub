using Microsoft.AspNetCore.Mvc;
using MiniNetflix.Core.Interfaces;

namespace MiniNetflix.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StreamingController : ControllerBase
{
    private readonly IGoogleDriveService _driveService;

    public StreamingController(IGoogleDriveService driveService)
    {
        _driveService = driveService;
    }

    [HttpGet("{fileId}")]
    public async Task<ActionResult<object>> GetStreamingUrl(string fileId)
    {
        try
        {
            var streamingUrl = await _driveService.GetStreamingUrlAsync(fileId);
            var metadata = await _driveService.GetFileMetadataAsync(fileId);

            return Ok(new
            {
                streamingUrl,
                metadata
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
            var metadata = await _driveService.GetFileMetadataAsync(fileId);
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
            var streamingUrl = await _driveService.GetStreamingUrlAsync(fileId);
            return Redirect(streamingUrl);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
