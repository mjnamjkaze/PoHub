# Hướng Dẫn Hoàn Chỉnh - PoHub

## 📋 Tổng Quan Dự Án

PoHub là nền tảng xem phim online với các tính năng:
- 🎬 Quản lý phim lẻ và phim bộ
- 🔍 Tìm kiếm realtime với autocomplete
- 🔥 Trending films (24h/7 ngày)
- 🎯 Lọc theo thể loại, quốc gia, năm
- 📺 Video player với nhiều nguồn phát
- 👤 Đăng ký/Đăng nhập (JWT)
- 📝 Lịch sử xem và yêu thích

## 🛠️ Công Nghệ

### Backend
- .NET 8.0
- Entity Framework Core 8.0.11
- MySQL (Pomelo provider 8.0.2)
- JWT Authentication
- Swagger UI

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Turbopack

## 📁 Cấu Trúc Dự Án

```
PoHub/
├── backend/              # .NET Core Web API
│   ├── Controllers/      # API Controllers
│   ├── Models/          # Entity models
│   ├── Data/            # DbContext
│   ├── DTOs/            # Data Transfer Objects
│   └── Migrations/      # EF Core migrations (sẽ tạo)
│
├── frontend/            # Next.js App
│   ├── app/            # Next.js App Router
│   ├── components/     # React components
│   └── lib/            # Utilities, API client
│
└── README.md
```

## 🚀 Cài Đặt Chi Tiết

### Bước 1: Cài Đặt MySQL

1. **Tải MySQL Community Server:**
   - Tải từ: https://dev.mysql.com/downloads/mysql/
   - Hoặc cài XAMPP/WAMP (có sẵn MySQL)

2. **Tạo Database:**
   ```sql
   CREATE DATABASE pohub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Tạo User (nếu cần):**
   ```sql
   CREATE USER 'pohub_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON pohub.* TO 'pohub_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Bước 2: Cấu Hình Backend

1. **Di chuyển vào thư mục backend:**
   ```powershell
   cd d:\PoHub\backend
   ```

2. **Cập nhật Connection String:**
   
   Mở file `appsettings.json` và sửa:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=pohub;User=root;Password=YOUR_MYSQL_PASSWORD;"
     }
   }
   ```
   
   Thay `YOUR_MYSQL_PASSWORD` bằng mật khẩu MySQL của bạn.

3. **Restore packages:**
   ```powershell
   dotnet restore
   ```

4. **Tạo Migration:**
   ```powershell
   dotnet ef migrations add InitialCreate
   ```

5. **Cập nhật Database:**
   ```powershell
   dotnet ef database update
   ```

6. **Chạy API:**
   ```powershell
   dotnet run
   ```
   
   API sẽ chạy tại:
   - HTTPS: `https://localhost:5001`
   - HTTP: `http://localhost:5000`
   - Swagger UI: `https://localhost:5001/swagger`

### Bước 3: Cấu Hình Frontend

1. **Di chuyển vào thư mục frontend:**
   ```powershell
   cd d:\PoHub\frontend
   ```

2. **Cài đặt dependencies:**
   ```powershell
   npm install
   ```

3. **Tạo file environment:**
   
   Tạo file `.env.local` với nội dung:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Chạy Development Server:**
   ```powershell
   npm run dev
   ```
   
   Frontend sẽ chạy tại: `http://localhost:3000`

## 🗄️ Database Schema

### Tables

#### Films
```sql
- Id (PK)
- Title, OriginalTitle
- Description
- PosterUrl, BackgroundUrl  
- Year, Country
- Rating, ViewCount
- TotalEpisodes
- Type (Movie/Series)
- Badge (New/Hot/Full/Trailer)
- CreatedAt, UpdatedAt
- IsActive
```

#### Genres
```sql
- Id (PK)
- Name
- Slug (unique)
- Description
```

#### FilmGenres (Many-to-Many)
```sql
- FilmId (FK)
- GenreId (FK)
```

#### Episodes
```sql
- Id (PK)
- FilmId (FK)
- EpisodeNumber
- Title, Description
- Duration
- CreatedAt, UpdatedAt
```

#### VideoSources
```sql
- Id (PK)
- EpisodeId (FK, nullable)
- FilmId (FK, nullable)
- SourceType (Drive/Local/External)
- Url
- Quality (720p/1080p/4K)
- ServerName
- SubtitleUrl
- IsDefault
```

#### Users
```sql
- Id (PK)
- Email (unique)
- Username (unique)
- PasswordHash
- FullName, AvatarUrl
- CreatedAt, LastLoginAt
- IsActive
```

#### ViewHistory
```sql
- Id (PK)
- UserId (FK)
- FilmId (FK)
- EpisodeId (FK, nullable)
- Progress (seconds)
- ViewedAt, UpdatedAt
```

#### UserFavorites
```sql
- Id (PK)
- UserId (FK)
- FilmId (FK)
- CreatedAt
```

#### FilmViews (for trending)
```sql
- Id (PK)
- FilmId (FK)
- IpAddress
- UserId (nullable)
- ViewedAt
```

## 🔌 API Endpoints

### Films
```
GET    /api/films              - Lấy danh sách phim (có filter, sort, paging)
GET    /api/films/{id}         - Lấy chi tiết phim
GET    /api/films/trending     - Lấy top trending (?period=24h|7d)
GET    /api/films/search/suggest  - Tìm kiếm gợi ý (?q=query)
```

### Genres
```
GET    /api/genres             - Lấy tất cả thể loại
GET    /api/genres/{slug}      - Lấy chi tiết thể loại
```

### Query Parameters cho GET /api/films

- `search` - Tìm theo tên phim
- `genres` - Lọc theo thể loại (slug), có thể nhiều
- `country` - Lọc theo quốc gia
- `year` - Lọc theo năm
- `type` - Movie hoặc Series
- `minEpisodes` - Số tập tối thiểu
- `maxEpisodes` - Số tập tối đa
- `sortBy` - updated (mặc định), year, views, title, rating
- `page` - Trang hiện tại (mặc định: 1)
- `pageSize` - Số phim trên mỗi trang (mặc định: 24)

Ví dụ:
```
/api/films?genres=hanh-dong&year=2024&sortBy=views&page=1&pageSize=12
```

## 📝 Seed Data Mặc Định

Backend đã có sẵn 8 thể loại:
1. Hành Động (hanh-dong)
2. Hài Hước (hai-huoc)
3. Lãng Mạn (lang-man)
4. Kinh Dị (kinh-di)
5. Khoa Học Viễn Tưởng (khoa-hoc-vien-tuong)
6. Phiêu Lưu (phieu-luu)
7. Tâm Lý (tam-ly)
8. Hoạt Hình (hoat-hinh)

## 🎨 Giao Diện Components

### Components Đã Tạo

1. **Sidebar** (`components/Sidebar.tsx`)
   - Navigation menu
   - Categories list
   - Search input
   - Responsive với mobile hamburger menu

2. **Header** (`components/Header.tsx`)
   - Search bar
   - Login/Register buttons
   - Sticky top navigation

3. **SearchBar** (`components/SearchBar.tsx`)
   - Realtime autocomplete
   - Debounced API calls
   - Dropdown results với thumbnail

4. **FilmCard** (`components/FilmCard.tsx`)
   - Poster image
   - Rating, year, badge
   - Hover effects
   - Episode count (cho Series)

### Pages Đã Tạo

1. **HomePage** (`app/page.tsx`)
   - Hero slider với top trending films
   - Trending section
   - Latest films grid
   - Auto-playing carousel

## 🔧 Troubleshooting

### Lỗi MySQL Connection
```
Access denied for user 'root'@'localhost'
```
**Giải pháp:**
- Kiểm tra mật khẩu MySQL trong `appsettings.json`
- Kiểm tra MySQL service đang chạy
- Tạo user mới với quyền phù hợp

### Lỗi CORS
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Giải pháp:**
- Kiểm tra backend đang chạy
- Đảm bảo `http://localhost:3000` có trong CORS policy (`Program.cs`)

### Lỗi Frontend không kết nối được API
**Giải pháp:**
- Kiểm tra file `.env.local` có đúng URL không
- Restart Next.js dev server sau khi thay đổi env
- Kiểm tra backend đang chạy tại port 5000

### Lỗi Migration
```
dotnet ef migrations add failed
```
**Giải pháp:**
- Đảm bảo đã cài `dotnet-ef` tool version 8.0.11
- Kiểm tra `global.json` đang dùng SDK 8.0
- Kiểm tra packages trong `.csproj` đều là version 8.0.x

## 📦 Build Production

### Backend
```powershell
cd backend
dotnet publish -c Release -o ./publish
```

Chạy production:
```powershell
cd publish
dotnet PoHub.API.dll
```

### Frontend
```powershell
cd frontend
npm run build
npm start
```

## 🌟 Features Tiếp Theo

#### Phase 2 - Video Player
- [ ] Custom video player component
- [ ] Multi-source support (Drive, Local, Embed)
- [ ] Subtitle support (.vtt)
- [ ] Quality selector
- [ ] Progress tracking
- [ ] Next/Previous episode

#### Phase 3 - User Features
- [ ] JWT Authentication
- [ ] User registration/login
- [ ] View history
- [ ] Favorites list
- [ ] Continue watching

#### Phase 4 - Admin Panel
- [ ] Film management CRUD
- [ ] Episode management
- [ ] Video source management
- [ ] User management
- [ ] Statistics dashboard

#### Phase 5 - Advanced Features
- [ ] Comments and ratings
- [ ] Recommendations
- [ ] Watch together
- [ ] Mobile apps
- [ ] Video encoding pipeline

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra logs trong terminal
2. Kiểm tra browser console (F12)
3. Kiểm tra Swagger UI để test API
4. Xem lại các bước cài đặt

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.
