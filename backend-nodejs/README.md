# 🎬 PoHub Backend - Node.js + Express + Prisma

Backend API cho ứng dụng xem phim PoHub, được xây dựng với Node.js, Express, Prisma ORM và MySQL.

## 🚀 Công nghệ sử dụng

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma** - ORM (Object-Relational Mapping)
- **MySQL** - Database
- **TypeScript** - Type safety
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📋 Yêu cầu

- Node.js 21+ (hoặc 20.19+, 22.12+, 24.0+)
- MySQL 8.0+
- npm hoặc yarn

## 🔧 Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình Database

Tạo database MySQL:

```sql
CREATE DATABASE pohub;
```

### 3. Cấu hình Environment Variables

Copy file `.env.example` thành `.env` và cập nhật thông tin:

```bash
cp .env.example .env
```

Sửa file `.env`:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/pohub"
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

### 4. Chạy Prisma Migrations

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push
```

### 5. Seed Database (Optional)

Thêm dữ liệu mẫu:

```bash
npm run seed
```

## 🎯 Chạy Development Server

```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:5000`

## 📦 Build Production

```bash
npm run build
npm start
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký user mới
- `POST /api/auth/login` - Đăng nhập

### Films
- `GET /api/films` - Lấy danh sách phim (có filter, pagination)
- `GET /api/films/:id` - Lấy chi tiết phim
- `GET /api/films/trending` - Lấy phim trending
- `GET /api/films/search/suggest` - Tìm kiếm autocomplete
- `POST /api/films` - Tạo phim mới (admin)
- `PUT /api/films/:id` - Cập nhật phim (admin)
- `DELETE /api/films/:id` - Xóa phim (admin)

### Genres
- `GET /api/genres` - Lấy danh sách thể loại
- `GET /api/genres/:slug` - Lấy phim theo thể loại

### Users (Requires Authentication)
- `GET /api/users/me` - Lấy thông tin user
- `GET /api/users/favorites` - Lấy danh sách yêu thích
- `POST /api/users/favorites/:filmId` - Thêm vào yêu thích
- `DELETE /api/users/favorites/:filmId` - Xóa khỏi yêu thích
- `GET /api/users/history` - Lấy lịch sử xem
- `POST /api/users/history/:filmId` - Cập nhật tiến trình xem

### Health Check
- `GET /api/health` - Kiểm tra server status

## 🗄️ Database Schema

### Models
- **Film** - Thông tin phim
- **Genre** - Thể loại phim
- **FilmGenre** - Quan hệ Film-Genre (many-to-many)
- **Episode** - Tập phim (cho phim bộ)
- **VideoSource** - Nguồn video
- **User** - Người dùng
- **ViewHistory** - Lịch sử xem
- **UserFavorite** - Danh sách yêu thích
- **FilmView** - Tracking lượt xem

## 🛠️ Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# Push schema without migration
npm run prisma:push

# Open Prisma Studio (GUI)
npm run prisma:studio
```

## 📁 Cấu trúc Project

```
backend-nodejs/
├── prisma/
│   └── schema.prisma          # Prisma schema
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── film.controller.ts
│   │   ├── genre.controller.ts
│   │   └── user.controller.ts
│   ├── routes/                # Route definitions
│   │   ├── auth.routes.ts
│   │   ├── film.routes.ts
│   │   ├── genre.routes.ts
│   │   └── user.routes.ts
│   ├── middleware/            # Middleware functions
│   │   └── auth.middleware.ts
│   ├── lib/                   # Utilities
│   │   └── prisma.ts
│   ├── seeders/               # Database seeders
│   │   └── index.ts
│   └── index.ts               # Entry point
├── .env                       # Environment variables
├── .env.example               # Environment template
├── tsconfig.json              # TypeScript config
├── nodemon.json               # Nodemon config
└── package.json               # Dependencies
```

## 🔐 Authentication

API sử dụng JWT (JSON Web Tokens) cho authentication.

### Đăng ký:
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "fullName": "Full Name"
}
```

### Đăng nhập:
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response sẽ trả về `token`, sử dụng token này trong header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## 🐛 Troubleshooting

### Lỗi Prisma Client
```bash
npm run prisma:generate
```

### Lỗi Database Connection
- Kiểm tra MySQL đang chạy
- Kiểm tra `DATABASE_URL` trong `.env`
- Kiểm tra username/password MySQL

### Port đã được sử dụng
Thay đổi `PORT` trong file `.env`

## 📝 License

ISC
