# 🧪 Quick Test Guide - PoHub

## Test Without MySQL (API Only)

Nếu bạn chưa có MySQL, bạn vẫn có thể test các phần sau:

### 1. Test Frontend Standalone
```powershell
cd frontend
npm run dev
```

Truy cập: http://localhost:3000

**Note:** UI sẽ hiển thị nhưng không có data từ API. Bạn sẽ thấy:
- ✅ Layout và navigation
- ✅ Components render
- ✅ Styling và animations
- ❌ Không có dữ liệu phim

### 2. Mock Data cho Frontend (Option)

Tạo file `frontend/lib/mock-data.ts`:

```typescript
export const mockFilms = [
  {
    id: 1,
    title: "Inception",
    posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    year: 2010,
    rating: 8.8,
    viewCount: 125000,
    type: "Movie",
    badge: "Hot",
    genres: ["Hành Động", "Khoa Học Viễn Tưởng"],
    // ... thêm fields khác
  },
  // ... thêm films
];
```

Dùng trong component:
```typescript
// Thay vì:
const data = await apiService.getFilms();

// Dùng:
import { mockFilms } from '@/lib/mock-data';
const data = { items: mockFilms, totalCount: mockFilms.length, page: 1, pageSize: 24 };
```

## Test With MySQL

### Prerequisites
```powershell
# Check MySQL đang chạy
Get-Process mysqld

# Nếu không chạy, start MySQL
# XAMPP: Start từ Control Panel
# Standalone: net start MySQL80
```

### Step-by-Step Test

#### 1. Create Database
```sql
mysql -u root -p
CREATE DATABASE pohub;
USE pohub;
```

#### 2. Run Backend
```powershell
cd d:\PoHub\backend

# Update migration
dotnet ef database update

# Run API
dotnet run
```

**Expected Output:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
```

#### 3. Test API với Swagger

Mở browser: https://localhost:5001/swagger

**Test các endpoints:**

1. **GET /api/genres** - Nên trả về 8 thể loại
2. **GET /api/films** - Nên trả về empty list (chưa có data)

#### 4. Seed Sample Data (Optional)

Update `Program.cs`, thêm trước `app.Run()`:

```csharp
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    PoHub.API.Seeders.FilmSeeder.SeedSampleFilms(context);
}
```

Restart API, bây giờ GET /api/films sẽ có 6 phim mẫu.

#### 5. Run Frontend
```powershell
cd d:\PoHub\frontend
npm run dev
```

Mở: http://localhost:3000

**Kiểm tra:**
- ✅ Trang chủ hiển thị films
- ✅ Search bar hoạt động
- ✅ Click vào film → Chi tiết phim
- ✅ Sidebar categories
- ✅ Responsive mobile view

## API Test Cases

### Test với cURL (Windows PowerShell)

```powershell
# 1. Get all genres
Invoke-WebRequest -Uri "http://localhost:5000/api/genres" -Method GET

# 2. Get all films
Invoke-WebRequest -Uri "http://localhost:5000/api/films" -Method GET

# 3. Get films with filter
Invoke-WebRequest -Uri "http://localhost:5000/api/films?sortBy=views&page=1" -Method GET

# 4. Search 
Invoke-WebRequest -Uri "http://localhost:5000/api/films/search/suggest?q=inc" -Method GET

# 5. Get trending
Invoke-WebRequest -Uri "http://localhost:5000/api/films/trending?period=24h" -Method GET

# 6. Get film detail
Invoke-WebRequest -Uri "http://localhost:5000/api/films/1" -Method GET
```

### Expected Responses

#### GET /api/genres
```json
[
  {
    "id": 1,
    "name": "Hành Động",
    "slug": "hanh-dong",
    "description": "Phim hành động gay cấn",
    "filmCount": 0
  },
  // ... 7 more
]
```

#### GET /api/films (with sample data)
```json
{
  "items": [
    {
      "id": 1,
      "title": "Inception",
      "year": 2010,
      "rating": 8.8,
      "viewCount": 125000,
      "type": "Movie",
      "badge": "Hot",
      "genres": ["Hành Động", "Khoa Học Viễn Tưởng"]
    }  
  ],
  "totalCount": 6,
  "page": 1,
  "pageSize": 24,
  "totalPages": 1
}
```

## Frontend Test Checklist

### Home Page (/)
- [ ] Hero slider hiển thị và auto-play
- [ ] Trending section có films
- [ ] Latest section có films
- [ ] Click film card → Navigate đến detail
- [ ] Responsive trên mobile/tablet

### Film Detail (/phim/1)
- [ ] Poster và background hiển thị
- [ ] Title, rating, year, genres đúng
- [ ] Description hiển thị
- [ ] Nút "Xem Phim" hiển thị
- [ ] Episodes grid (nếu là Series)
- [ ] Server selection (nếu có video sources)

### Search
- [ ] Type trong search bar → Dropdown xuất hiện
- [ ] Results hiển thị sau 2 ký tự
- [ ] Click result → Navigate đúng
- [ ] "Không tìm thấy" khi không có kết quả

### Sidebar
- [ ] Logo và navigation
- [ ] Categories list đầy đủ
- [ ] Active state khi navigate
- [ ] Mobile hamburger menu hoạt động

## Common Issues & Fixes

### ❌ Frontend không connect được API
```
TypeError: Failed to fetch
```
**Fix:**
1. Check backend đang chạy: `http://localhost:5000`
2. Check `.env.local` có `NEXT_PUBLIC_API_URL`
3. Restart Next.js dev server

### ❌ API trả về 500 Error
```
System.Data.SqlClient.SqlException
```
**Fix:**
1. Check MySQL đang chạy
2. Check connection string trong `appsettings.json`
3. Check database `pohub` đã tạo
4. Run `dotnet ef database update`

### ❌ CORS Error
```
Access to XMLHttpRequest blocked by CORS
```
**Fix:**
Backend `Program.cs` đã config CORS, nhưng verify:
- Frontend URL trong `WithOrigins()` đúng không
- `app.UseCors("AllowFrontend")` có được gọi không

### ❌ No films in database
**Fix:**
1. Seed sample data (xem Step 4 trên)
2. Hoặc add manual qua POST API (cần implement)

## Performance Test

### Load Testing (Optional)
```powershell
# Install Apache Bench
# Test API performance
ab -n 1000 -c 10 http://localhost:5000/api/films
```

### Frontend Performance
1. Open DevTools → Network
2. Check load times
3. Lighthouse score

**Target:**
- API response: < 200ms
- Page load: < 2s
- Lighthouse score: > 80

## Next: Add Your Own Films

Sau khi test xong, bạn có thể:

1. **Dùng Swagger UI** để POST films mới
2. **Dùng SQL** trực tiếp:
```sql
INSERT INTO Films (Title, Year, Rating, Type, ...) VALUES (...);
```
3. **Tạo Admin Panel** (Phase 5)

---

**✅ Happy Testing!**

Nếu gặp vấn đề, check:
1. Logs trong terminal
2. Browser DevTools console
3. MySQL error logs
4. `INSTALLATION.md` để recheck setup
