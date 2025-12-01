# Hướng dẫn sử dụng ảnh local cho MiniNetflix

## Cấu trúc thư mục ảnh

```
frontend/public/
├── images/
│   ├── posters/          # Ảnh poster phim (tỷ lệ 2:3)
│   │   ├── action-1.png
│   │   ├── scifi-1.png
│   │   └── romance-1.png
│   └── backdrops/        # Ảnh backdrop phim (tỷ lệ 16:9)
│       ├── action-1.png
│       ├── scifi-1.png
│       └── romance-1.png
├── placeholder-movie.jpg     # Placeholder cho poster
└── placeholder-backdrop.svg  # Placeholder cho backdrop
```

## Cách sử dụng

### 1. Thêm ảnh mới

Để thêm ảnh mới cho phim:

1. **Poster**: Thêm ảnh vào `public/images/posters/` với tỷ lệ 2:3 (ví dụ: 400x600px)
2. **Backdrop**: Thêm ảnh vào `public/images/backdrops/` với tỷ lệ 16:9 (ví dụ: 1920x1080px)

### 2. Cập nhật database

Khi tạo/cập nhật phim trong database, sử dụng đường dẫn local:

```json
{
  "title": "Action Movie",
  "posterUrl": "/images/posters/action-1.png",
  "backdropUrl": "/images/backdrops/action-1.png",
  ...
}
```

### 3. Ví dụ dữ liệu mẫu

```json
[
  {
    "id": 1,
    "title": "Dark Shadows",
    "description": "An intense action thriller with dramatic twists",
    "year": 2024,
    "genre": "Action, Thriller",
    "runtime": 142,
    "imdbRating": 8.5,
    "posterUrl": "/images/posters/action-1.png",
    "backdropUrl": "/images/backdrops/action-1.png",
    "isSeries": false,
    "viewCount": 0
  },
  {
    "id": 2,
    "title": "Neon Future",
    "description": "A sci-fi adventure in a futuristic world",
    "year": 2024,
    "genre": "Sci-Fi, Adventure",
    "runtime": 128,
    "imdbRating": 8.2,
    "posterUrl": "/images/posters/scifi-1.png",
    "backdropUrl": "/images/backdrops/scifi-1.png",
    "isSeries": false,
    "viewCount": 0
  },
  {
    "id": 3,
    "title": "Love in Paris",
    "description": "A romantic drama set in the city of lights",
    "year": 2024,
    "genre": "Romance, Drama",
    "runtime": 115,
    "imdbRating": 7.8,
    "posterUrl": "/images/posters/romance-1.png",
    "backdropUrl": "/images/backdrops/romance-1.png",
    "isSeries": false,
    "viewCount": 0
  }
]
```

## Lưu ý

1. **Đường dẫn**: Luôn bắt đầu bằng `/` để Next.js hiểu đây là file trong thư mục `public`
2. **Tỷ lệ ảnh**: 
   - Poster: 2:3 (chiều dọc)
   - Backdrop: 16:9 (chiều ngang)
3. **Placeholder**: Nếu không có ảnh, hệ thống tự động sử dụng placeholder
4. **Format**: Hỗ trợ PNG, JPG, WEBP, SVG

## Tạo ảnh mới

Bạn có thể:
1. Tải ảnh từ internet và lưu vào thư mục tương ứng
2. Sử dụng AI để tạo ảnh mới
3. Chụp screenshot từ phim/trailer

## Backend API

Khi tạo phim mới qua API, gửi request:

```http
POST /api/movies
Content-Type: application/json

{
  "title": "New Movie",
  "posterUrl": "/images/posters/new-movie.png",
  "backdropUrl": "/images/backdrops/new-movie.png",
  ...
}
```

Ảnh sẽ được serve trực tiếp từ Next.js mà không cần qua TMDB.
