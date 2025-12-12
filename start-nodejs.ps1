# PoHub - Full Stack Startup Script (Node.js Backend)
# Chạy cả Backend (Node.js) và Frontend (Next.js)

Write-Host "🎬 Starting PoHub Full Stack Application..." -ForegroundColor Cyan
Write-Host ""

# Check if MySQL is running
Write-Host "📊 Checking MySQL connection..." -ForegroundColor Yellow
$mysqlRunning = $false
try {
    $null = mysql -u root -e "SELECT 1" 2>$null
    $mysqlRunning = $true
    Write-Host "✅ MySQL is running" -ForegroundColor Green
} catch {
    Write-Host "❌ MySQL is not running or not accessible" -ForegroundColor Red
    Write-Host "   Please start MySQL (XAMPP/WAMP) or install MySQL" -ForegroundColor Yellow
    Write-Host ""
}

# Start Backend (Node.js)
Write-Host ""
Write-Host "🚀 Starting Backend (Node.js + Express + Prisma)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend-nodejs'; Write-Host '🔧 Backend Server' -ForegroundColor Green; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🎨 Starting Frontend (Next.js)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host '💻 Frontend Server' -ForegroundColor Blue; npm run dev"

# Wait for servers to start
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "✨ Application is starting..." -ForegroundColor Green
Write-Host ""
Write-Host "📍 URLs:" -ForegroundColor Cyan
Write-Host "   Backend API:  http://localhost:5000" -ForegroundColor White
Write-Host "   Frontend:     http://localhost:3000" -ForegroundColor White
Write-Host "   API Health:   http://localhost:5000/api/health" -ForegroundColor White
Write-Host ""
Write-Host "📝 Notes:" -ForegroundColor Yellow
Write-Host "   - Backend: Node.js + Express + Prisma + MySQL" -ForegroundColor White
Write-Host "   - Frontend: Next.js 15 + React 19 + Tailwind CSS" -ForegroundColor White
Write-Host "   - Press Ctrl+C in each terminal to stop servers" -ForegroundColor White
Write-Host ""
Write-Host "🔧 First time setup:" -ForegroundColor Magenta
Write-Host "   1. cd backend-nodejs" -ForegroundColor White
Write-Host "   2. npm install" -ForegroundColor White
Write-Host "   3. Copy .env.example to .env and update DATABASE_URL" -ForegroundColor White
Write-Host "   4. npm run prisma:push" -ForegroundColor White
Write-Host "   5. npm run seed (optional)" -ForegroundColor White
Write-Host ""

# Open browser
Start-Sleep -Seconds 3
Write-Host "🌐 Opening browser..." -ForegroundColor Cyan
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "✅ Done! Check the opened terminal windows." -ForegroundColor Green
Write-Host ""
