@echo off
REM 🌍 Universal Media Hub Windows Auto Installer
REM Author: Mukisa Titus Mwanje
REM Date: 2025-11-30

echo Installing Universal Media Hub...

:: 1️⃣ Check for Node.js
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js not found. Installing...
    powershell -Command "Invoke-WebRequest -Uri https://nodejs.org/dist/v20.6.0/node-v20.6.0-x64.msi -OutFile nodejs.msi"
    msiexec /i nodejs.msi /quiet /norestart
) ELSE (
    echo Node.js already installed
)

:: 2️⃣ Check for Git
git --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Git not found. Installing...
    powershell -Command "Invoke-WebRequest -Uri https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.1/Git-2.42.0-64-bit.exe -OutFile git.exe"
    start /wait git.exe /VERYSILENT
) ELSE (
    echo Git already installed
)

:: 3️⃣ Clone or update repo
IF NOT EXIST "UMH-Platform" (
    git clone https://github.com/yourusername/UMH-Platform.git
) ELSE (
    cd UMH-Platform
    git pull
    cd ..
)

:: 4️⃣ Install backend dependencies
cd UMH-Platform\backend
npm install
cd ..

:: 5️⃣ Install frontend dependencies
cd frontend
npm install
cd ..

:: 6️⃣ Copy environment template
IF NOT EXIST ".env" (
    copy ..\installer\config-template.env .env
    echo Please update .env with API keys and DB URL
)

:: 7️⃣ Start backend server
start cmd /k "cd UMH-Platform\backend && node server.js"

echo ✅ Universal Media Hub installation complete!
pause