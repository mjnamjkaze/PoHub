# 🎬 PoHub - Full Stack Node.js + Prisma + SQLite

## ✅ Đã hoàn thành migration sang Node.js!

Backend đã được chuyển đổi hoàn toàn từ **.NET + MySQL** sang **Node.js + Prisma + SQLite**

---

## 🚀 Cách chạy Project

### Lần đầu tiên (Setup)

#### 1. Cài đặt Backend
```powershell
cd backend-nodejs
npm install
```

#### 2. Setup Database
```powershell
# Generate Prisma Client
npm run prisma:generate

# Tạo database (SQLite - tự động tạo file dev.db)
npm run prisma:push

# Thêm dữ liệu mẫu
npm run seed
```

#### 3. Cài đặt Frontend (nếu chưa)
```powershell
cd ..\frontend
npm install
```

Tạo file `.env.local` trong frontend:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### Chạy hàng ngày

**Terminal 1 - Backend:**
```powershell
cd backend-nodejs
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

Hoặc dùng script tự động:
```powershell
.\start-nodejs.ps1
```

---

## 🌐 Truy cập

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health
- **Prisma Studio** (GUI Database): `npm run prisma:studio`

---

## 📚 API Endpoints

### 🎬 Films
- `GET /api/films` - Danh sách phim (có filter, pagination)
  - Query params: `page`, `limit`, `type`, `genreSlug`, `year`, `country`, `sortBy`, `order`
- `GET /api/films/:id` - Chi tiết phim
- `GET /api/films/trending` - Phim trending
- `GET /api/films/search/suggest?q=keyword` - Tìm kiếm autocomplete

### 🎭 Genres
- `GET /api/genres` - Danh sách thể loại
- `GET /api/genres/:slug` - Phim theo thể loại

### 🔐 Authentication
- `POST /api/auth/register` - Đăng ký
  ```json
  {
    "email": "user@example.com",
    "username": "username",
    "password": "password123",
    "fullName": "Full Name"
  }
  ```
- `POST /api/auth/login` - Đăng nhập
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### 👤 User (Cần Authentication)
- `GET /api/users/me` - Thông tin user
- `GET /api/users/favorites` - Danh sách yêu thích
- `POST /api/users/favorites/:filmId` - Thêm vào yêu thích
- `DELETE /api/users/favorites/:filmId` - Xóa khỏi yêu thích
- `GET /api/users/history` - Lịch sử xem
- `POST /api/users/history/:filmId` - Cập nhật tiến trình
  ```json
  {
    "progress": 1200
  }
  ```

---

## 🧪 Test API

### Health Check
```powershell
curl http://localhost:5000/api/health
```

### Get Films
```powershell
curl http://localhost:5000/api/films
```

### Get Genres
```powershell
curl http://localhost:5000/api/genres
```

### Register
```powershell
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@test.com\",\"username\":\"testuser\",\"password\":\"123456\",\"fullName\":\"Test User\"}'
```

---

## � Database

### SQLite
- File database: `backend-nodejs/prisma/dev.db`
- Không cần cài đặt MySQL
- Tự động tạo khi chạy `prisma:push`

### Prisma Studio (GUI)
```powershell
cd backend-nodejs
npm run prisma:studio
```
Mở browser tại: http://localhost:5555

### Models (9 tables)
- **films** - Thông tin phim
- **genres** - Thể loại
- **film_genres** - Quan hệ Film-Genre
- **episodes** - Tập phim
- **video_sources** - Nguồn video
- **users** - Người dùng
- **view_histories** - Lịch sử xem
- **user_favorites** - Yêu thích
- **film_views** - Tracking lượt xem

---

## 🛠️ Commands

### Backend
```powershell
npm run dev              # Development server
npm run build            # Build TypeScript
npm start                # Production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:push      # Push schema to database
npm run prisma:studio    # Open Prisma Studio
npm run seed             # Seed database
```

### Frontend
```powershell
npm run dev              # Development server
npm run build            # Build production
npm start                # Run production
```

---

## 📁 Cấu trúc Backend

```
backend-nodejs/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── dev.db           # SQLite database file
├── src/
│   ├── controllers/     # Business logic
│   │   ├── auth.controller.ts
│   │   ├── film.controller.ts
│   │   ├── genre.controller.ts
│   │   └── user.controller.ts
│   ├── routes/          # API routes
│   │   ├── auth.routes.ts
│   │   ├── film.routes.ts
│   │   ├── genre.routes.ts
│   │   └── user.routes.ts
│   ├── middleware/      # Middleware
│   │   └── auth.middleware.ts
│   ├── lib/             # Utilities
│   │   └── prisma.ts
│   ├── seeders/         # Database seeders
│   │   └── index.ts
│   └── index.ts         # Entry point
├── .env                 # Environment variables
├── package.json
└── tsconfig.json
```

---

## 🎯 So sánh: .NET vs Node.js

| Feature | .NET (Cũ) | Node.js (Mới) |
|---------|-----------|---------------|
| **Language** | C# | TypeScript |
| **Framework** | ASP.NET Core | Express |
| **ORM** | Entity Framework | Prisma |
| **Database** | MySQL | SQLite |
| **Setup** | Cần MySQL server | Không cần (SQLite) |
| **Migration** | EF Migrations | Prisma Migrate |
| **GUI Tool** | MySQL Workbench | Prisma Studio |

---

## ✨ Ưu điểm của Stack mới

### 1. **Đơn giản hơn**
- ✅ Không cần cài MySQL
- ✅ SQLite tự động tạo file database
- ✅ Setup nhanh hơn

### 2. **Developer Experience tốt hơn**
- ✅ Prisma Studio - GUI đẹp và dễ dùng
- ✅ TypeScript - Type safety
- ✅ Hot reload với nodemon
- ✅ Prisma Client - Auto-completion tốt

### 3. **Portable**
- ✅ Database là file - dễ backup và share
- ✅ Không phụ thuộc external services
- ✅ Deploy dễ dàng hơn

---

## 🔐 Authentication

API sử dụng JWT (JSON Web Tokens).

### Cách sử dụng:
1. Đăng ký hoặc đăng nhập
2. Lưu `token` từ response
3. Thêm vào header khi gọi API:
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```

---

## 🐛 Troubleshooting

### ❌ Port 5000 đã được sử dụng
Sửa file `.env`:
```env
PORT=5001
```

### ❌ Lỗi "Module not found"
```powershell
npm install
npm run prisma:generate
```

### ❌ Database bị lỗi
Xóa file `dev.db` và chạy lại:
```powershell
rm prisma/dev.db
npm run prisma:push
npm run seed
```

### ❌ Frontend không kết nối được Backend
Kiểm tra file `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## � Tech Stack

### Backend
- **Node.js 21** - JavaScript runtime
- **Express** - Web framework
- **Prisma 5** - Modern ORM
- **SQLite** - Embedded database
- **TypeScript** - Type safety
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **Next.js 15** - React framework
- **React 19** - UI library
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

---

## 🎉 Hoàn thành!

Backend đã được migrate hoàn toàn sang Node.js + Prisma + SQLite.

### Bạn có thể:
- ✅ Xem danh sách phim
- ✅ Tìm kiếm phim
- ✅ Xem chi tiết phim
- ✅ Đăng ký/Đăng nhập
- ✅ Thêm vào yêu thích
- ✅ Lưu lịch sử xem
- ✅ Quản lý database với Prisma Studio

### Next Steps:
1. Cập nhật Frontend để sử dụng API mới
2. Thêm tính năng upload phim
3. Thêm admin panel
4. Deploy lên production

---

**Happy Coding! 🚀**
