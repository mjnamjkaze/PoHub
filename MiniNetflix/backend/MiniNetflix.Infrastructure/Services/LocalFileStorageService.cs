using MiniNetflix.Core.Entities;
using MiniNetflix.Core.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Diagnostics;

namespace MiniNetflix.Infrastructure.Services;

public class LocalFileStorageService : IFileStorageService
{
    private readonly string _basePath;
    private readonly IConfiguration _configuration;

    public LocalFileStorageService(IConfiguration configuration)
    {
        _configuration = configuration;
        _basePath = _configuration["Storage:LocalPath"] ?? "D:\\film";
        
        // Ensure base directory exists
        if (!Directory.Exists(_basePath))
        {
            Directory.CreateDirectory(_basePath);
        }
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string mimeType, string? folderId = null)
    {
        try
        {
            // Create folder path
            var folderPath = string.IsNullOrEmpty(folderId) 
                ? _basePath 
                : Path.Combine(_basePath, folderId);

            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            // Generate unique filename to avoid conflicts
            var uniqueFileName = $"{Guid.NewGuid()}_{fileName}";
            var filePath = Path.Combine(folderPath, uniqueFileName);

            // Save file
            using (var fileStreamOutput = new FileStream(filePath, FileMode.Create, FileAccess.Write))
            {
                await fileStream.CopyToAsync(fileStreamOutput);
            }

            // Return relative path as file ID
            return Path.GetRelativePath(_basePath, filePath);
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to upload file to local storage: {ex.Message}", ex);
        }
    }

    public Task<string> CreateFolderAsync(string folderName, string? parentFolderId = null)
    {
        try
        {
            var folderPath = string.IsNullOrEmpty(parentFolderId)
                ? Path.Combine(_basePath, folderName)
                : Path.Combine(_basePath, parentFolderId, folderName);

            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            // Return relative path as folder ID
            return Task.FromResult(Path.GetRelativePath(_basePath, folderPath));
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to create folder: {ex.Message}", ex);
        }
    }

    public Task<string> GetStreamingUrlAsync(string fileId)
    {
        // For local files, return API endpoint URL
        // The actual streaming will be handled by StreamingController
        var streamingUrl = $"/api/streaming/local/{Uri.EscapeDataString(fileId)}";
        return Task.FromResult(streamingUrl);
    }

    public async Task<Dictionary<string, object>> GetFileMetadataAsync(string fileId)
    {
        var filePath = Path.Combine(_basePath, fileId);

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"File not found: {fileId}");
        }

        var fileInfo = new FileInfo(filePath);
        var metadata = new Dictionary<string, object>
        {
            ["id"] = fileId,
            ["name"] = fileInfo.Name,
            ["size"] = fileInfo.Length,
            ["mimeType"] = GetMimeType(fileInfo.Extension),
            ["createdTime"] = fileInfo.CreationTimeUtc
        };

        // Try to extract video metadata using FFprobe if available
        if (IsVideoFile(fileInfo.Extension))
        {
            try
            {
                var videoMetadata = await ExtractVideoMetadataAsync(filePath);
                foreach (var kvp in videoMetadata)
                {
                    metadata[kvp.Key] = kvp.Value;
                }
            }
            catch
            {
                // If FFprobe is not available, skip video metadata extraction
            }
        }

        return metadata;
    }

    public Task<bool> DeleteFileAsync(string fileId)
    {
        try
        {
            var filePath = Path.Combine(_basePath, fileId);
            
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                return Task.FromResult(true);
            }
            
            return Task.FromResult(false);
        }
        catch
        {
            return Task.FromResult(false);
        }
    }

    public Task<Stream> GetFileStreamAsync(string fileId)
    {
        var filePath = Path.Combine(_basePath, fileId);

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"File not found: {fileId}");
        }

        Stream stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
        return Task.FromResult(stream);
    }

    public StorageType GetStorageType()
    {
        return StorageType.Local;
    }

    public Task<List<GoogleDriveFile>> ListFilesInFolderAsync(string folderId)
    {
        var folderPath = Path.Combine(_basePath, folderId);
        var driveFiles = new List<GoogleDriveFile>();

        if (!Directory.Exists(folderPath))
        {
            return Task.FromResult(driveFiles);
        }

        var files = Directory.GetFiles(folderPath);
        
        foreach (var file in files)
        {
            var fileInfo = new FileInfo(file);
            var relativePath = Path.GetRelativePath(_basePath, file);
            
            var driveFile = new GoogleDriveFile
            {
                FileId = relativePath,
                FileName = fileInfo.Name,
                MimeType = GetMimeType(fileInfo.Extension),
                FileSize = fileInfo.Length,
                FileType = DetermineFileType(fileInfo.Extension),
                StorageType = StorageType.Local,
                CreatedAt = fileInfo.CreationTimeUtc
            };

            driveFiles.Add(driveFile);
        }

        return Task.FromResult(driveFiles);
    }

    private async Task<Dictionary<string, object>> ExtractVideoMetadataAsync(string filePath)
    {
        var metadata = new Dictionary<string, object>();

        try
        {
            // Use FFprobe to extract video metadata
            var startInfo = new ProcessStartInfo
            {
                FileName = "ffprobe",
                Arguments = $"-v quiet -print_format json -show_format -show_streams \"{filePath}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = Process.Start(startInfo);
            if (process != null)
            {
                var output = await process.StandardOutput.ReadToEndAsync();
                await process.WaitForExitAsync();

                if (process.ExitCode == 0 && !string.IsNullOrEmpty(output))
                {
                    // Parse FFprobe JSON output
                    var json = System.Text.Json.JsonDocument.Parse(output);
                    
                    // Get duration
                    if (json.RootElement.TryGetProperty("format", out var format))
                    {
                        if (format.TryGetProperty("duration", out var duration))
                        {
                            if (double.TryParse(duration.GetString(), out var durationSeconds))
                            {
                                metadata["duration"] = (int)durationSeconds;
                            }
                        }
                    }

                    // Get video stream info
                    if (json.RootElement.TryGetProperty("streams", out var streams))
                    {
                        foreach (var stream in streams.EnumerateArray())
                        {
                            if (stream.TryGetProperty("codec_type", out var codecType) && 
                                codecType.GetString() == "video")
                            {
                                if (stream.TryGetProperty("width", out var width))
                                {
                                    metadata["width"] = width.GetInt32();
                                }
                                
                                if (stream.TryGetProperty("height", out var height))
                                {
                                    var heightValue = height.GetInt32();
                                    metadata["height"] = heightValue;
                                    
                                    // Determine resolution
                                    metadata["resolution"] = heightValue switch
                                    {
                                        >= 2160 => "4K",
                                        >= 1080 => "1080p",
                                        >= 720 => "720p",
                                        >= 480 => "480p",
                                        _ => "SD"
                                    };
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }
        catch
        {
            // FFprobe not available or failed, return empty metadata
        }

        return metadata;
    }

    private string GetMimeType(string extension)
    {
        return extension.ToLower() switch
        {
            ".mp4" => "video/mp4",
            ".webm" => "video/webm",
            ".mkv" => "video/x-matroska",
            ".avi" => "video/x-msvideo",
            ".mov" => "video/quicktime",
            ".vtt" => "text/vtt",
            ".srt" => "application/x-subrip",
            ".jpg" or ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".webp" => "image/webp",
            _ => "application/octet-stream"
        };
    }

    private bool IsVideoFile(string extension)
    {
        var videoExtensions = new[] { ".mp4", ".webm", ".mkv", ".avi", ".mov" };
        return videoExtensions.Contains(extension.ToLower());
    }

    private FileType DetermineFileType(string extension)
    {
        return extension.ToLower() switch
        {
            ".mp4" or ".webm" or ".mkv" or ".avi" or ".mov" => FileType.Video,
            ".vtt" or ".srt" => FileType.Subtitle,
            ".jpg" or ".jpeg" or ".png" or ".webp" => FileType.Poster,
            _ => FileType.Video
        };
    }
}
