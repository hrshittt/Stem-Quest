@echo off
echo ========================================
echo    STEM Quest - Project Setup
echo ========================================
echo.

echo Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    echo Please make sure Node.js is installed and try again
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.
echo Starting development server...
echo The website will open in your browser at http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause
