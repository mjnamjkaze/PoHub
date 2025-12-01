using MiniNetflix.Core.Entities;

namespace MiniNetflix.Core.Interfaces;

public interface IFileStorageService
{
    /// <summary>
    /// Upload a file to storage and return the file identifier
    /// </summary>
    Task<string> UploadFileAsync(Stream fileStream, string fileName, string mimeType, string? folderId = null);
    
    /// <summary>
    /// Create a folder in storage
    /// </summary>
    Task<string> CreateFolderAsync(string folderName, string? parentFolderId = null);
    
    /// <summary>
    /// Get the streaming URL for a file
    /// </summary>
    Task<string> GetStreamingUrlAsync(string fileId);
    
    /// <summary>
    /// Get file metadata including duration, resolution, size
    /// </summary>
    Task<Dictionary<string, object>> GetFileMetadataAsync(string fileId);
    
    /// <summary>
    /// Delete a file from storage
    /// </summary>
    Task<bool> DeleteFileAsync(string fileId);
    
    /// <summary>
    /// Get file stream for direct serving
    /// </summary>
    Task<Stream> GetFileStreamAsync(string fileId);
    
    /// <summary>
    /// Get the storage type (GoogleDrive or Local)
    /// </summary>
    StorageType GetStorageType();
    
    /// <summary>
    /// List files in a folder
    /// </summary>
    Task<List<GoogleDriveFile>> ListFilesInFolderAsync(string folderId);
}
