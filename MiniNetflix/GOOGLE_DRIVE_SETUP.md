# Google Drive API Setup Guide

This guide will help you set up Google Drive API credentials for the Mini-Netflix project.

## Step-by-Step Instructions

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click **"New Project"**
4. Enter project name: `MiniNetflix` (or your preferred name)
5. Click **"Create"**

### 2. Enable Google Drive API

1. In the Google Cloud Console, make sure your project is selected
2. Go to **"APIs & Services"** > **"Library"**
3. Search for **"Google Drive API"**
4. Click on it and click **"Enable"**

### 3. Create Service Account Credentials

1. Go to **"APIs & Services"** > **"Credentials"**
2. Click **"Create Credentials"** > **"Service Account"**
3. Fill in the details:
   - **Service account name**: `mininetflix-service`
   - **Service account ID**: (auto-generated)
   - **Description**: `Service account for MiniNetflix video streaming`
4. Click **"Create and Continue"**
5. For role, select **"Basic"** > **"Editor"** (or create custom role with Drive permissions)
6. Click **"Continue"** and then **"Done"**

### 4. Generate and Download JSON Key

1. In the **Credentials** page, find your service account under **"Service Accounts"**
2. Click on the service account email
3. Go to the **"Keys"** tab
4. Click **"Add Key"** > **"Create new key"**
5. Select **"JSON"** as the key type
6. Click **"Create"**
7. The JSON file will automatically download to your computer
8. **Important**: Keep this file secure! It contains sensitive credentials

### 5. Configure the Backend

1. Move the downloaded JSON file to a secure location, for example:
   ```
   C:\MiniNetflix\credentials\google-drive-credentials.json
   ```

2. Update `appsettings.json` in the backend:
   ```json
   {
     "GoogleDrive": {
       "CredentialPath": "C:/MiniNetflix/credentials/google-drive-credentials.json",
       "ApplicationName": "MiniNetflix"
     }
   }
   ```

### 6. Test the Connection

1. Run the backend API:
   ```bash
   cd backend/MiniNetflix.API
   dotnet run
   ```

2. Open Swagger UI at `http://localhost:5000/swagger`

3. Try the upload endpoint to test the connection

## Important Security Notes

⚠️ **Never commit the credentials JSON file to version control!**

Add to `.gitignore`:
```
**/google-drive-credentials.json
credentials/
*.json
```

⚠️ **For production:**
- Use environment variables or Azure Key Vault
- Implement proper access controls
- Rotate credentials regularly
- Use least privilege principle

## Alternative: OAuth 2.0 (User Authentication)

If you want users to access their own Google Drive:

1. Create **OAuth 2.0 Client ID** instead of Service Account
2. Download client secrets JSON
3. Implement OAuth flow in the application
4. Users will authenticate with their Google account

## Troubleshooting

### Error: "The caller does not have permission"

**Solution**: Make sure the service account has the correct permissions and the API is enabled.

### Error: "File not found" when uploading

**Solution**: Check that the `CredentialPath` in `appsettings.json` is correct and the file exists.

### Error: "Invalid credentials"

**Solution**: 
1. Verify the JSON file is not corrupted
2. Make sure you downloaded the correct key type (JSON)
3. Try creating a new key

### Files not accessible for streaming

**Solution**: The GoogleDriveService automatically makes files public. If this fails:
1. Manually share the file in Google Drive
2. Set sharing to "Anyone with the link"
3. Check Google Drive API quotas

## API Quotas

Google Drive API has the following default quotas:
- **Queries per 100 seconds per user**: 1,000
- **Queries per day**: 1,000,000,000

For production applications with high traffic:
1. Request quota increase in Google Cloud Console
2. Implement caching to reduce API calls
3. Consider using a CDN for frequently accessed files

## Testing Your Setup

After configuration, test with this curl command:

```bash
# Upload a test file
curl -X POST "http://localhost:5000/api/upload/movie" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/test-video.mp4" \
  -F "movieId=1"
```

If successful, you'll receive a response with the Google Drive file ID.

## Next Steps

Once Google Drive API is set up:
1. ✅ Upload test videos
2. ✅ Verify streaming works
3. ✅ Test metadata extraction
4. ✅ Check Hangfire background jobs

## Resources

- [Google Drive API Documentation](https://developers.google.com/drive/api/v3/about-sdk)
- [Service Account Authentication](https://developers.google.com/identity/protocols/oauth2/service-account)
- [Google Cloud Console](https://console.cloud.google.com/)

---

**Need Help?** Check the [README.md](README.md) for more information or open an issue.
