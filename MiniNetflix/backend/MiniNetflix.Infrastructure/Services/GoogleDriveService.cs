using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Upload;
using MiniNetflix.Core.Entities;
using MiniNetflix.Core.Interfaces;
using Microsoft.Extensions.Configuration;

namespace MiniNetflix.Infrastructure.Services;

public class GoogleDriveService : IFileStorageService
{
    private readonly DriveService _driveService;
    private readonly IConfiguration _configuration;

    public GoogleDriveService(IConfiguration configuration)
    {
        _configuration = configuration;
        
        // Initialize Google Drive service with service account credentials
        var credentialPath = _configuration["GoogleDrive:CredentialPath"];
        GoogleCredential credential;

        if (!string.IsNullOrEmpty(credentialPath) && File.Exists(credentialPath))
        {
            using var stream = new FileStream(credentialPath, FileMode.Open, FileAccess.Read);
            credential = GoogleCredential.FromStream(stream)
                .CreateScoped(DriveService.ScopeConstants.Drive);
        }
        else
        {
            // Fallback to default credentials or throw exception
            throw new InvalidOperationException("Google Drive credentials not found. Please configure GoogleDrive:CredentialPath in appsettings.json");
        }

        _driveService = new DriveService(new BaseClientService.Initializer
        {
            HttpClientInitializer = credential,
            ApplicationName = "MiniNetflix"
        });
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string mimeType, string? folderId = null)
    {
        var fileMetadata = new Google.Apis.Drive.v3.Data.File
        {
            Name = fileName,
            Parents = folderId != null ? new List<string> { folderId } : null
        };

        var request = _driveService.Files.Create(fileMetadata, fileStream, mimeType);
        request.Fields = "id, name, size, mimeType, createdTime";

        var progress = await request.UploadAsync();
        
        if (progress.Status == UploadStatus.Failed)
        {
            throw new Exception($"Upload failed: {progress.Exception?.Message}");
        }

        var file = request.ResponseBody;
        
        // Make file publicly accessible for streaming
        await MakeFilePublicAsync(file.Id);
        
        return file.Id;
    }

    public async Task<string> CreateFolderAsync(string folderName, string? parentFolderId = null)
    {
        var folderMetadata = new Google.Apis.Drive.v3.Data.File
        {
            Name = folderName,
            MimeType = "application/vnd.google-apps.folder",
            Parents = parentFolderId != null ? new List<string> { parentFolderId } : null
        };

        var request = _driveService.Files.Create(folderMetadata);
        request.Fields = "id";
        
        var folder = await request.ExecuteAsync();
        return folder.Id;
    }

    public async Task<string> GetStreamingUrlAsync(string fileId)
    {
        // For direct streaming, use the webContentLink or construct a direct link
        var request = _driveService.Files.Get(fileId);
        request.Fields = "webContentLink, id";
        
        var file = await request.ExecuteAsync();
        
        // Return direct download link for streaming
        return $"https://drive.google.com/uc?export=download&id={fileId}";
    }

    public async Task<Dictionary<string, object>> GetFileMetadataAsync(string fileId)
    {
        var request = _driveService.Files.Get(fileId);
        request.Fields = "id, name, size, mimeType, createdTime, videoMediaMetadata";
        
        var file = await request.ExecuteAsync();
        
        var metadata = new Dictionary<string, object>
        {
            ["id"] = file.Id,
            ["name"] = file.Name,
            ["size"] = file.Size ?? 0,
            ["mimeType"] = file.MimeType,
            ["createdTime"] = file.CreatedTime
        };

        // Extract video metadata if available
        if (file.VideoMediaMetadata != null)
        {
            metadata["duration"] = file.VideoMediaMetadata.DurationMillis / 1000; // Convert to seconds
            metadata["width"] = file.VideoMediaMetadata.Width ?? 0;
            metadata["height"] = file.VideoMediaMetadata.Height ?? 0;
            
            // Determine resolution
            var height = file.VideoMediaMetadata.Height ?? 0;
            metadata["resolution"] = height switch
            {
                >= 2160 => "4K",
                >= 1080 => "1080p",
                >= 720 => "720p",
                >= 480 => "480p",
                _ => "SD"
            };
        }

        return metadata;
    }

    public async Task<bool> DeleteFileAsync(string fileId)
    {
        try
        {
            await _driveService.Files.Delete(fileId).ExecuteAsync();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<List<GoogleDriveFile>> ListFilesInFolderAsync(string folderId)
    {
        var request = _driveService.Files.List();
        request.Q = $"'{folderId}' in parents and trashed=false";
        request.Fields = "files(id, name, size, mimeType, videoMediaMetadata)";
        
        var result = await request.ExecuteAsync();
        var driveFiles = new List<GoogleDriveFile>();

        foreach (var file in result.Files)
        {
            var driveFile = new GoogleDriveFile
            {
                FileId = file.Id,
                FileName = file.Name,
                MimeType = file.MimeType,
                FileSize = file.Size ?? 0,
                FileType = DetermineFileType(file.MimeType),
                StorageType = StorageType.GoogleDrive,
                CreatedAt = DateTime.UtcNow
            };

            if (file.VideoMediaMetadata != null)
            {
                driveFile.Duration = (int?)(file.VideoMediaMetadata.DurationMillis / 1000);
                var height = file.VideoMediaMetadata.Height ?? 0;
                driveFile.Resolution = height switch
                {
                    >= 2160 => "4K",
                    >= 1080 => "1080p",
                    >= 720 => "720p",
                    >= 480 => "480p",
                    _ => "SD"
                };
            }

            driveFiles.Add(driveFile);
        }

        return driveFiles;
    }

    public async Task<Stream> GetFileStreamAsync(string fileId)
    {
        var request = _driveService.Files.Get(fileId);
        var stream = new MemoryStream();
        
        await request.DownloadAsync(stream);
        stream.Position = 0;
        
        return stream;
    }

    public StorageType GetStorageType()
    {
        return StorageType.GoogleDrive;
    }

    private async Task MakeFilePublicAsync(string fileId)
    {
        var permission = new Google.Apis.Drive.v3.Data.Permission
        {
            Type = "anyone",
            Role = "reader"
        };

        await _driveService.Permissions.Create(permission, fileId).ExecuteAsync();
    }

    private FileType DetermineFileType(string mimeType)
    {
        return mimeType.ToLower() switch
        {
            var mt when mt.StartsWith("video/") => FileType.Video,
            var mt when mt.StartsWith("image/") => FileType.Poster,
            var mt when mt.Contains("subtitle") || mt.EndsWith("vtt") || mt.EndsWith("srt") => FileType.Subtitle,
            _ => FileType.Video
        };
    }
}
