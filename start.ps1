# Quick Start Script for PoHub
# Run this script to start both backend and frontend

Write-Host "🎬 Starting PoHub..." -ForegroundColor Green
Write-Host ""

# Check if MySQL is running
Write-Host "Checking MySQL..." -ForegroundColor Yellow
$mysqlRunning = Get-Process -Name "mysqld" -ErrorAction SilentlyContinue
if (-not $mysqlRunning) {
    Write-Host "⚠️  MySQL is not running. Please start MySQL first!" -ForegroundColor Red
    Write-Host "   - Start XAMPP/WAMP, or"
    Write-Host "   - Start MySQL service: net start MySQL80" -ForegroundColor Gray
    exit
} else {
    Write-Host "✓ MySQL is running" -ForegroundColor Green
}

Write-Host ""

# Start Backend
Write-Host "Starting Backend API..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host '🔧 Backend API' -ForegroundColor Cyan; dotnet run"

Write-Host "✓ Backend starting on http://localhost:5000" -ForegroundColor Green
Write-Host "  Swagger UI: http://localhost:5000/swagger" -ForegroundColor Gray

Start-Sleep -Seconds 3

# Start Frontend
Write-Host ""
Write-Host "Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host '⚛️  Frontend App' -ForegroundColor Cyan; npm run dev"

Write-Host "✓ Frontend starting on http://localhost:3000" -ForegroundColor Green

Write-Host ""
Write-Host "✅ PoHub is starting up!" -ForegroundColor Green
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop the servers." -ForegroundColor Gray
