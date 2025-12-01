using MiniNetflix.Core.Entities;
using MiniNetflix.Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace MiniNetflix.Infrastructure.Services;

public class FileStorageFactory
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<FileStorageFactory> _logger;

    public FileStorageFactory(IConfiguration configuration, ILogger<FileStorageFactory> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public IFileStorageService CreateStorageService()
    {
        var storageType = _configuration["Storage:Type"] ?? "Auto";
        
        // Check if Google Drive credentials are configured
        var credentialPath = _configuration["GoogleDrive:CredentialPath"];
        var hasGoogleDrive = !string.IsNullOrEmpty(credentialPath) && 
                            File.Exists(credentialPath) &&
                            credentialPath != "path/to/your/google-credentials.json";

        IFileStorageService storageService;

        if (storageType.Equals("Local", StringComparison.OrdinalIgnoreCase))
        {
            _logger.LogInformation("Using Local File Storage (forced by configuration)");
            storageService = new LocalFileStorageService(_configuration);
        }
        else if (storageType.Equals("GoogleDrive", StringComparison.OrdinalIgnoreCase))
        {
            if (!hasGoogleDrive)
            {
                throw new InvalidOperationException("GoogleDrive storage type is configured but credentials are not available");
            }
            _logger.LogInformation("Using Google Drive Storage (forced by configuration)");
            storageService = new GoogleDriveService(_configuration);
        }
        else // Auto
        {
            if (hasGoogleDrive)
            {
                _logger.LogInformation("Using Google Drive Storage (auto-detected credentials)");
                storageService = new GoogleDriveService(_configuration);
            }
            else
            {
                var localPath = _configuration["Storage:LocalPath"] ?? "D:\\film";
                _logger.LogInformation($"Using Local File Storage at {localPath} (no Google Drive credentials found)");
                storageService = new LocalFileStorageService(_configuration);
            }
        }

        return storageService;
    }
}
