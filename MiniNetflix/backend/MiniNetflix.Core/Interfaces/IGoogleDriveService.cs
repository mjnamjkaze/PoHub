using MiniNetflix.Core.Entities;

namespace MiniNetflix.Core.Interfaces;

public interface IGoogleDriveService
{
    Task<string> UploadFileAsync(Stream fileStream, string fileName, string mimeType, string? folderId = null);
    Task<string> CreateFolderAsync(string folderName, string? parentFolderId = null);
    Task<string> GetStreamingUrlAsync(string fileId);
    Task<Dictionary<string, object>> GetFileMetadataAsync(string fileId);
    Task<bool> DeleteFileAsync(string fileId);
    Task<List<GoogleDriveFile>> ListFilesInFolderAsync(string folderId);
}
