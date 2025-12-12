# PoHub - Nền Tảng Xem Phim Online

Ứng dụng xem phim online với đầy đủ tính năng quản lý phim lẻ, phim bộ, tìm kiếm, trending và lịch sử xem.

## Công Nghệ Sử Dụng

### Backend
- **.NET Core 10** - Web API
- **Entity Framework Core** - ORM
- **MySQL** - Database
- **Pomelo.EntityFrameworkCore.MySql** - MySQL Provider
- **JWT Bearer** - Authentication

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **TurboBank**

## Tính Năng

### 1. Quản Lý Phim
- ✅ Danh sách phim với phân trang
- ✅ Lọc theo thể loại, quốc gia, năm, loại phim
- ✅ Sắp xếp theo: Mới cập nhật, Năm, Lượt xem, A-Z
- ✅ Badge: New, Hot, Full, Trailer
- ✅ Chi tiết phim với poster và background

### 2. Tìm Kiếm
- ✅ Tìm kiếm realtime với autocomplete
- ✅ Hiển thị poster, năm, loại phim trong kết quả

### 3. Trending
- ✅ Top 10 phim trending 24h/7 ngày
- ✅ Hero slider trên trang chủ

### 4. Thể Loại
- ✅ 8 thể loại: Hành Động, Hài Hước, Lãng Mạn, Kinh Dị, Khoa Học Viễn Tưởng, Phiêu Lưu, Tâm Lý, Hoạt Hình
- ✅ URL thân thiện: `/the-loai/hanh-dong`

### 5. Video Player (Coming Soon)
- Nhiều nguồn phát: Google Drive, Local, External
- Phụ đề .vtt
- Chọn chất lượng
- Ghi nhớ progress

### 6. User Features (Coming Soon)
- Đăng ký/Đăng nhập với JWT
- Lưu lịch sử xem
- Danh sách yêu thích

## Cài Đặt

### Yêu Cầu
- Node.js 18+ và npm
- .NET SDK 8.0+
- MySQL 8.0+

### 1. Clone Repository
\`\`\`bash
git clone <repository-url>
cd PoHub
\`\`\`

### 2. Cài Đặt Backend

\`\`\`bash
cd backend

# Restore packages
dotnet restore

# Cập nhật connection string trong appsettings.json
# Thay đổi: Server, Database, User, Password

# Tạo database và chạy migrations
dotnet ef migrations add InitialCreate
dotnet ef database update

# Chạy API
dotnet run
\`\`\`

API sẽ chạy tại: `https://localhost:5001` hoặc `http://localhost:5000`

### 3. Cài Đặt Frontend

\`\`\`bash
cd frontend

# Cài đặt dependencies
npm install

# Tạo file .env.local và thêm:
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Chạy dev server
npm run dev
\`\`\`

Frontend sẽ chạy tại: `http://localhost:3000`

## Cấu Trúc Database

### Films
- Thông tin phim: Title, Description, Poster, Background
- Rating, ViewCount, Year, Country
- Type: Movie/Series
- Badge: New/Hot/Full/Trailer

### Genres
- 8 thể loại chính
- Slug cho URL thân thiện

### Episodes (Cho phim bộ)
- EpisodeNumber, Title, Duration
- Liên kết với VideoSources

### VideoSources
- SourceType: Drive/Local/External
- URL, Quality, ServerName
- SubtitleUrl

### Users (Optional)
- Email, Username, PasswordHash
- ViewHistories, Favorites

## API Endpoints

### Films
- `GET /api/films` - Lấy danh sách phim (với filters)
- `GET /api/films/{id}` - Chi tiết phim
- `GET /api/films/trending?period=24h|7d` - Trending films
- `GET /api/films/search/suggest?q={query}` - Tìm kiếm gợi ý

### Genres
- `GET /api/genres` - Danh sách thể loại
- `GET /api/genres/{slug}` - Chi tiết thể loại

## Filters

Khi gọi `GET /api/films`, có thể dùng các params sau:

- `search` - Tìm kiếm theo tên
- `genres` - Lọc theo slug thể loại (có thể nhiều)
- `country` - Lọc theo quốc gia
- `year` - Lọc theo năm
- `type` - Movie/Series
- `minEpisodes`, `maxEpisodes` - Lọc số tập (cho Series)
- `sortBy` - updated/year/views/title/rating
- `page`, `pageSize` - Phân trang

## Development

### Thêm Migration (Backend)
\`\`\`bash
cd backend
dotnet ef migrations add <MigrationName>
dotnet ef database update
\`\`\`

### Build Production

**Backend:**
\`\`\`bash
cd backend
dotnet publish -c Release -o ./publish
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm run build
npm start
\`\`\`

## Roadmap

- [ ] Video player với nhiều nguồn phát
- [ ] Hỗ trợ phụ đề
- [ ] User authentication với JWT
- [ ] Lịch sử xem và resume watching
- [ ] Danh sách yêu thích
- [ ] Comment và rating từ users
- [ ] Admin panel để quản lý phim
- [ ] Upload phim và tự động encode
- [ ] Mobile app (React Native)

## License

MIT

## Liên Hệ

- GitHub: [Your GitHub]
- Email: [Your Email]
