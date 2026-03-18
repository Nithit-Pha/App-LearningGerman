@echo off
title German Learning App - Launcher
color 0A

echo ============================================
echo      German Learning App - Launcher
echo ============================================
echo.

:: Step 1: Start Ollama (in background)
echo [1/2] Starting Ollama...
where ollama >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo  WARNING: Ollama not found! AI conversation mode will not work.
    echo  Please install Ollama from https://ollama.com
    echo.
) else (
    :: Check if ollama is already running
    tasklist /FI "IMAGENAME eq ollama.exe" 2>nul | find /I "ollama.exe" >nul
    if %ERRORLEVEL% NEQ 0 (
        start "" /B ollama serve
        echo  Ollama started successfully.
    ) else (
        echo  Ollama is already running.
    )
)

:: Wait a moment for ollama to be ready
timeout /T 2 /NOBREAK >nul

:: Step 2: Start the app
echo [2/2] Starting the German Learning App...
echo.
echo  The app will open automatically in your browser.
echo  Keep this window open while using the app.
echo  Close this window to stop the app.
echo.
echo ============================================
echo.

:: Move into the app folder and run the dev server
cd /d "%~dp0"
npm run dev

:: When the user closes with Ctrl+C, this message shows
echo.
echo App stopped. You can close this window.
pause
