# 📊 Database Seed Data - PoHub

## 🎬 Films (4 phim mẫu)

### 1. **Avengers: Endgame** (2019)
- **ID**: 1
- **Thể loại**: Hành Động, Khoa Học Viễn Tưởng
- **Rating**: 8.4/10
- **Đạo diễn**: Anthony Russo, Joe Russo
- **Diễn viên**: Robert Downey Jr., Chris Evans, Mark Ruffalo
- **Badge**: Hot 🔥
- **Mô tả**: Sau sự kiện tàn khốc của Infinity War, các siêu anh hùng còn sống sót tập hợp lại để đảo ngược hành động của Thanos.
- **Poster**: https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg

### 2. **Spider-Man: No Way Home** (2021)
- **ID**: 2
- **Thể loại**: Hành Động, Khoa Học Viễn Tưởng
- **Rating**: 8.2/10
- **Đạo diễn**: Jon Watts
- **Diễn viên**: Tom Holland, Zendaya, Benedict Cumberbatch
- **Badge**: New ⭐
- **Mô tả**: Peter Parker phải đối mặt với hậu quả khi danh tính của anh bị tiết lộ.
- **Poster**: https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg

### 3. **The Batman** (2022)
- **ID**: 3
- **Thể loại**: Hành Động
- **Rating**: 7.8/10
- **Đạo diễn**: Matt Reeves
- **Diễn viên**: Robert Pattinson, Zoë Kravitz, Paul Dano
- **Badge**: Hot 🔥
- **Mô tả**: Batman khám phá tham nhũng ở Gotham City và mối liên hệ với gia đình của mình.
- **Poster**: https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg

### 4. **Guardians of the Galaxy Vol. 3** (2023)
- **ID**: 4
- **Thể loại**: Hành Động, Hài Hước, Khoa Học Viễn Tưởng
- **Rating**: 8.0/10
- **Đạo diễn**: James Gunn
- **Diễn viên**: Chris Pratt, Zoe Saldana, Dave Bautista
- **Badge**: New ⭐
- **Mô tả**: Đội Vệ Binh Dải Ngân Hà tiếp tục cuộc phiêu lưu của họ.
- **Poster**: https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg

---

## 🎭 Genres (8 thể loại)

1. **Hành Động** (`hanh-dong`)
   - Phim hành động gay cấn
   - 4 phim

2. **Hài Hước** (`hai-huoc`)
   - Phim hài vui nhộn
   - 1 phim

3. **Tình Cảm** (`tinh-cam`)
   - Phim tình cảm lãng mạn
   - 0 phim

4. **Kinh Dị** (`kinh-di`)
   - Phim kinh dị rùng rợn
   - 0 phim

5. **Khoa Học Viễn Tưởng** (`khoa-hoc-vien-tuong`)
   - Phim sci-fi
   - 3 phim

6. **Hoạt Hình** (`hoat-hinh`)
   - Phim hoạt hình animation
   - 0 phim

7. **Phiêu Lưu** (`phieu-luu`)
   - Phim phiêu lưu mạo hiểm
   - 0 phim

8. **Tâm Lý** (`tam-ly`)
   - Phim tâm lý xã hội
   - 0 phim

---

## 🎥 Video Sources

Mỗi phim có 1 video source mặc định:
- **Type**: External
- **URL**: YouTube Trailer
- **Quality**: 1080p
- **Server**: YouTube Trailer

---

## 📊 Xem Data trong Prisma Studio

### Cách 1: Prisma Studio (GUI)
```powershell
cd backend-nodejs
npm run prisma:studio
```
Mở browser: **http://localhost:5555**

### Cách 2: API Endpoints

#### Get all films
```bash
curl http://localhost:5000/api/films
```

#### Get film by ID
```bash
curl http://localhost:5000/api/films/1
```

#### Get all genres
```bash
curl http://localhost:5000/api/genres
```

#### Get films by genre
```bash
curl http://localhost:5000/api/genres/hanh-dong
```

#### Search films
```bash
curl "http://localhost:5000/api/films/search/suggest?q=spider"
```

#### Get trending films
```bash
curl http://localhost:5000/api/films/trending
```

---

## 🔧 Thêm Data Mới

### Cách 1: Qua Prisma Studio
1. Mở http://localhost:5555
2. Click vào table "films"
3. Click "Add record"
4. Điền thông tin
5. Save

### Cách 2: Qua API (cần implement admin endpoints)
```bash
curl -X POST http://localhost:5000/api/films \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Movie",
    "year": 2024,
    "rating": 8.5,
    ...
  }'
```

### Cách 3: Sửa file seeder
Edit `backend-nodejs/src/seeders/index.ts` và chạy:
```powershell
npm run seed
```

---

## 📈 Database Statistics

- **Total Films**: 4
- **Total Genres**: 8
- **Total Film-Genre Relations**: 7
- **Total Video Sources**: 4
- **Total Users**: 0
- **Total View History**: 0
- **Total Favorites**: 0
- **Total Film Views**: 0

---

## 🎯 Test Data

### Test với Frontend
1. Mở http://localhost:3000
2. Xem 4 phim hiển thị trên homepage
3. Click vào phim để xem chi tiết
4. Test search với từ khóa "spider", "batman", "avengers"

### Test với API
```powershell
# Health check
curl http://localhost:5000/api/health

# Get all films
curl http://localhost:5000/api/films

# Get trending
curl http://localhost:5000/api/films/trending

# Search
curl "http://localhost:5000/api/films/search/suggest?q=batman"
```

---

## 📝 Notes

- Tất cả phim đều có `isActive = true`
- Tất cả phim đều là `type = "Movie"` (phim lẻ)
- View count ban đầu = 0
- Chưa có user nào trong database
- Video sources đều link đến YouTube trailers

---

## 🚀 Next Steps

1. ✅ Xem data trong Prisma Studio
2. ✅ Test API endpoints
3. ✅ Test Frontend UI
4. 📝 Thêm phim mới
5. 📝 Tạo user accounts
6. 📝 Test authentication
7. 📝 Test favorites & history

---

**Database đã sẵn sàng với 4 phim mẫu!** 🎬
