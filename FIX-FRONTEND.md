# 🔧 Fix Frontend Tailwind Error

## ❌ Lỗi hiện tại

```
Cannot apply unknown utility class `rounded-lg`
```

Frontend đang dùng Tailwind CSS v4 (mới) nhưng code dùng cú pháp v3.

## ✅ Đã fix

1. ✅ Downgrade Tailwind về v3.4.1
2. ✅ Cài đặt PostCSS và Autoprefixer
3. ✅ Tạo file `postcss.config.js`
4. ✅ Xóa cache `.next`

## 🚀 Cách chạy lại

### Bước 1: Stop server hiện tại
Trong terminal frontend, nhấn `Ctrl + C`

### Bước 2: Chạy lại
```powershell
cd frontend
npm run dev
```

Server sẽ chạy tại: http://localhost:3000

---

## 📝 Nếu vẫn lỗi

### Option 1: Reinstall dependencies
```powershell
cd frontend
rm -r node_modules
rm package-lock.json
npm install
npm run dev
```

### Option 2: Clear all cache
```powershell
cd frontend
rm -r .next
rm -r node_modules/.cache
npm run dev
```

---

## ✨ Đã thay đổi gì?

### package.json
```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.1",      // Downgrade từ v4
    "postcss": "^8.4.35",          // Thêm mới
    "autoprefixer": "^10.4.17"     // Thêm mới
  }
}
```

### postcss.config.js (Mới)
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 🎯 Kết quả mong đợi

Sau khi restart, frontend sẽ:
- ✅ Compile thành công
- ✅ Không có lỗi Tailwind
- ✅ Hiển thị UI đúng
- ✅ Hot reload hoạt động

---

**Hãy restart dev server để áp dụng thay đổi!**
