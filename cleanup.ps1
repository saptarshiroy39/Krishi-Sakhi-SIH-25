# Krishi Sakhi - Project Cleanup Script
# This script removes unnecessary files and directories

Write-Host "🧹 Starting Krishi Sakhi Cleanup..." -ForegroundColor Green
Write-Host ""

# Remove __pycache__ directories
Write-Host "📦 Removing Python cache directories..." -ForegroundColor Yellow
$pycacheDirs = Get-ChildItem -Path . -Recurse -Directory -Filter "__pycache__" -Force
foreach ($dir in $pycacheDirs) {
    Write-Host "   Removing: $($dir.FullName)" -ForegroundColor Gray
    Remove-Item -Path $dir.FullName -Recurse -Force
}

# Remove .pyc files
Write-Host "🗑️  Removing .pyc files..." -ForegroundColor Yellow
$pycFiles = Get-ChildItem -Path . -Recurse -Filter "*.pyc" -Force
foreach ($file in $pycFiles) {
    Write-Host "   Removing: $($file.FullName)" -ForegroundColor Gray
    Remove-Item -Path $file.FullName -Force
}

# Remove .pyo files
Write-Host "🗑️  Removing .pyo files..." -ForegroundColor Yellow
$pyoFiles = Get-ChildItem -Path . -Recurse -Filter "*.pyo" -Force
foreach ($file in $pyoFiles) {
    Write-Host "   Removing: $($file.FullName)" -ForegroundColor Gray
    Remove-Item -Path $file.FullName -Force
}

Write-Host ""
Write-Host "✅ Cleanup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "   - Removed $($pycacheDirs.Count) __pycache__ directories" -ForegroundColor White
Write-Host "   - Removed $($pycFiles.Count) .pyc files" -ForegroundColor White
Write-Host "   - Removed $($pyoFiles.Count) .pyo files" -ForegroundColor White
Write-Host ""
Write-Host "💡 Note: The following directories are kept (needed for development):" -ForegroundColor Yellow
Write-Host "   - node_modules/ (Frontend dependencies)" -ForegroundColor Gray
Write-Host "   - dist/ (Build output)" -ForegroundColor Gray
Write-Host "   - instance/ (Database files)" -ForegroundColor Gray
Write-Host "   - .env (Environment variables)" -ForegroundColor Gray
Write-Host ""
