# Mini-Netflix - Video Streaming Platform

A comprehensive video streaming platform built with ASP.NET Core, Next.js, and Google Drive integration. This mini-Netflix clone allows you to upload, manage, and stream movies directly from Google Drive with features like watch history, resume playback, and a beautiful Netflix-inspired UI.

## 🎬 Features

### Backend (ASP.NET Core)
- **Google Drive Integration**: Upload and stream videos directly from Google Drive
- **RESTful API**: Complete API for movies, streaming, uploads, and watch history
- **SQL Server Database**: Entity Framework Core with migrations
- **Background Jobs**: Hangfire for automated Drive sync and metadata extraction
- **Metadata Management**: Automatic extraction of video duration, resolution, and quality

### Frontend (Next.js)
- **Netflix-Inspired UI**: Beautiful dark theme with smooth animations
- **Video Player**: Video.js integration with subtitle support
- **Resume Playback**: Automatic progress tracking and resume functionality
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Movie Discovery**: Trending movies, genre categories, and search
- **Continue Watching**: Pick up where you left off

## 🚀 Tech Stack

### Backend
- ASP.NET Core 10.0 Web API
- Entity Framework Core 10.0
- SQL Server
- Google Drive API v3
- Hangfire (Background Jobs)
- Swashbuckle (Swagger/OpenAPI)

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Video.js
- Axios
- Lucide React (Icons)

## 📋 Prerequisites

- .NET 10.0 SDK
- Node.js 18+ and npm
- SQL Server (LocalDB or Full)
- Google Cloud Account (for Drive API)

## ⚙️ Setup Instructions

### 1. Google Drive API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Drive API**
4. Create credentials:
   - Go to **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **Service Account**
   - Download the JSON key file
5. Save the JSON file to a secure location

### 2. Backend Setup

```bash
cd backend

# Restore packages
dotnet restore

# Update appsettings.json
# - Set your SQL Server connection string
# - Set the path to your Google Drive credentials JSON file

# Run migrations
cd MiniNetflix.API
dotnet ef database update

# Run the API
dotnet run
```

The API will be available at `https://localhost:5001` (or `http://localhost:5000`)

#### appsettings.json Configuration

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MiniNetflix;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
  },
  "GoogleDrive": {
    "CredentialPath": "C:/path/to/your/google-credentials.json",
    "ApplicationName": "MiniNetflix"
  }
}
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file (copy from .env.example)
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
MiniNetflix/
├── backend/
│   ├── MiniNetflix.API/          # Web API project
│   │   ├── Controllers/          # API controllers
│   │   ├── Program.cs            # Application entry point
│   │   └── appsettings.json      # Configuration
│   ├── MiniNetflix.Core/         # Domain models & interfaces
│   │   ├── Entities/             # Database entities
│   │   └── Interfaces/           # Service interfaces
│   ├── MiniNetflix.Infrastructure/ # Data access & services
│   │   ├── Data/                 # DbContext
│   │   ├── Repositories/         # Data repositories
│   │   ├── Services/             # Google Drive service
│   │   └── Jobs/                 # Background jobs
│   └── MiniNetflix.sln           # Solution file
└── frontend/
    ├── app/                      # Next.js app router
    │   ├── page.tsx              # Home page
    │   ├── movie/[id]/           # Movie detail page
    │   └── watch/[id]/           # Video player page
    ├── components/               # React components
    │   ├── layout/               # Header, Footer
    │   ├── home/                 # Home page components
    │   └── player/               # Video player
    ├── services/                 # API services
    └── types/                    # TypeScript types
```

## 🎯 API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/trending?count=10` - Get trending movies
- `GET /api/movies/{id}` - Get movie by ID
- `GET /api/movies?search={query}` - Search movies
- `GET /api/movies?genre={genre}` - Filter by genre
- `POST /api/movies` - Create movie
- `PUT /api/movies/{id}` - Update movie
- `DELETE /api/movies/{id}` - Delete movie
- `POST /api/movies/{id}/view` - Increment view count

### Streaming
- `GET /api/streaming/{fileId}` - Get streaming URL and metadata
- `GET /api/streaming/{fileId}/metadata` - Get file metadata
- `GET /api/streaming/{fileId}/direct` - Redirect to direct stream

### Upload
- `POST /api/upload/movie` - Upload movie file
- `POST /api/upload/subtitle` - Upload subtitle file
- `POST /api/upload/folder` - Create folder

### Watch History
- `POST /api/watchhistory` - Save watch progress
- `GET /api/watchhistory/user/{userId}` - Get user history
- `GET /api/watchhistory/user/{userId}/movie/{movieId}` - Get progress
- `GET /api/watchhistory/user/{userId}/continue-watching` - Get continue watching

## 🎨 Features in Detail

### Video Streaming
- Direct streaming from Google Drive
- Automatic quality detection (4K, 1080p, 720p, 480p, SD)
- Subtitle support (VTT format)
- Resume playback from last position
- Progress auto-save every 10 seconds

### Movie Management
- Upload videos to Google Drive via API
- Automatic metadata extraction (duration, resolution)
- Support for movies and TV series with episodes
- Poster and backdrop image support
- Genre categorization

### User Experience
- Netflix-inspired dark theme
- Smooth animations and transitions
- Horizontal scrolling movie rows
- Hero banner with featured content
- Continue watching section
- Trending movies
- Search functionality (ready for implementation)

## 🔧 Development

### Backend Development
```bash
cd backend
dotnet watch run --project MiniNetflix.API
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Database Migrations
```bash
# Create new migration
dotnet ef migrations add MigrationName --project MiniNetflix.Infrastructure --startup-project MiniNetflix.API

# Update database
dotnet ef database update --project MiniNetflix.API
```

## 📊 Hangfire Dashboard

Access the Hangfire dashboard at `http://localhost:5000/hangfire` to monitor background jobs:
- Drive sync jobs
- Metadata extraction jobs

## 🚧 Upcoming Features

- [ ] HLS video conversion for better streaming
- [ ] User authentication and authorization
- [ ] Advanced search with filters
- [ ] Recommendations engine
- [ ] Social features (ratings, reviews, comments)
- [ ] Admin panel for content management
- [ ] Multi-language subtitle support
- [ ] Download for offline viewing
- [ ] Watchlist and favorites

## 📝 Notes

- The current implementation uses a demo user (userId = 1) for watch history
- Google Drive files must be made public for streaming (handled automatically)
- For production, implement proper authentication and user management
- Consider CDN integration for better performance at scale
- Google Drive API has rate limits (1000 requests per 100 seconds)

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🎓 Learning Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Google Drive API](https://developers.google.com/drive/api/v3/about-sdk)
- [Video.js Documentation](https://videojs.com/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)

---

**Built with ❤️ using ASP.NET Core and Next.js**
