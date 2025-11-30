#!/bin/bash
# UMH Auto Installer Script
# Author: Mukisa Titus Mwanje
# Date: 2025-11-30

echo "🌍 Universal Media Hub Auto Installer Starting..."

# 1️⃣ Update system
sudo apt update && sudo apt upgrade -y

# 2️⃣ Install Node.js & npm
if ! command -v node &> /dev/null
then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
else
    echo "Node.js already installed"
fi

# 3️⃣ Install MongoDB (optional: change to PostgreSQL if preferred)
if ! command -v mongod &> /dev/null
then
    echo "Installing MongoDB..."
    sudo apt install -y mongodb
    sudo systemctl start mongodb
    sudo systemctl enable mongodb
else
    echo "MongoDB already installed"
fi

# 4️⃣ Clone repo
if [ ! -d "UMH-Platform" ]; then
    git clone https://github.com/yourusername/UMH-Platform.git
else
    echo "UMH-Platform already exists, pulling latest..."
    cd UMH-Platform && git pull
fi

cd UMH-Platform

# 5️⃣ Install backend dependencies
cd backend
npm install

# 6️⃣ Install frontend dependencies (if using a build tool like Vite/React)
cd ../frontend
npm install

# 7️⃣ Copy .env template
if [ ! -f "../.env" ]; then
    cp ../installer/config-template.env ../.env
    echo "Please update .env with your API keys & DB URL"
fi

# 8️⃣ Setup systemd service for backend
sudo tee /etc/systemd/system/umh-backend.service > /dev/null <<EOL
[Unit]
Description=UMH Backend
After=network.target

[Service]
ExecStart=$(which node) $PWD/backend/server.js
WorkingDirectory=$PWD
Restart=always
User=$(whoami)
EnvironmentFile=$PWD/../.env

[Install]
WantedBy=multi-user.target
EOL

sudo systemctl daemon-reload
sudo systemctl enable umh-backend
sudo systemctl start umh-backend

echo "✅ Universal Media Hub installation complete!"
echo "Access your platform via http://localhost:3000"