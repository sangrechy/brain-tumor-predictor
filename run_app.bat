@echo off
title 🚀 Brain Tumor Predictor - Launcher

:: Set project root (adjust this if the .bat is moved)
cd /d "%~dp0"

echo 📁 Navigating to backend and activating venv...
cd backend

IF NOT EXIST "venv\Scripts\activate.bat" (
    echo ❌ Virtual environment not found! Please run setup first.
    pause
    exit /b
)

:: Start backend in new terminal
start cmd /k "cd /d %cd% && call venv\Scripts\activate && uvicorn main:app --reload"

:: Go to frontend and launch http.server
cd ..
cd frontend

echo 🌐 Starting frontend server...
start cmd /k "cd /d %cd% && python -m http.server 3000"

timeout /t 3 >nul
start http://localhost:3000

echo ✅ App launched successfully.
pause
