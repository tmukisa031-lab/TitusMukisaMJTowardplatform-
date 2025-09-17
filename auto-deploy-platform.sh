#!/bin/bash
# =========================================
# Script: Auto Deploy + Custom Domain (Git + GitHub + Vercel)
# Author: Mukisa Titus Mwanje
# Supports JSX / React / Next.js projects
# Auto-detects Vercel project and sets custom domain
# =========================================

# === Step 1: Variables ===
PROJECT_DIR="/path/to/your/project"          # Change to your project folder
GITHUB_USERNAME="USERNAME"                   # Replace with your GitHub username
GITHUB_REPO="TitusMukisaMJTowardplatform"   # Your GitHub repo name
GITHUB_URL="https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"
VERCEL_PROJECT_NAME="TitusMukisaMJTowardplatform"  # Vercel project name
CUSTOM_DOMAIN="platform.titusmukisa.com.free"     # Your subdomain

# === Step 2: Navigate to Project Directory ===
cd "$PROJECT_DIR" || { echo "Project folder not found!"; exit 1; }

# === Step 3: Initialize Git if not exists ===
if [ ! -d ".git" ]; then
    git init
    echo "Git repository initialized."
else
    echo "Git repository already exists."
fi

# === Step 4: Add & Commit ===
git add .
git commit -m "Update project" || echo "Nothing to commit."

# === Step 5: Add GitHub Remote if not exists ===
if ! git remote | grep -q origin; then
    git remote add origin "$GITHUB_URL"
fi
git branch -M main

echo "Pushing to GitHub..."
git push -u origin main

# === Step 6: Build Project if package.json exists ===
if [ -f "package.json" ]; then
    echo "package.json detected — installing dependencies..."
    npm install

    if grep -q "next" package.json; then
        echo "Next.js detected — building..."
        npm run build
    elif grep -q "react-scripts" package.json; then
        echo "React (CRA) detected — building..."
        npm run build
    else
        echo "Unknown JS project — skipping build."
    fi
else
    echo "No package.json — assuming static HTML/JS."
fi

# === Step 7: Deploy to Vercel (auto) ===
echo "Deploying to Vercel..."
vercel --prod --confirm --name "$VERCEL_PROJECT_NAME"

# === Step 8: Add / Link Custom Domain ===
echo "Linking custom domain: $CUSTOM_DOMAIN"
vercel domains add "$CUSTOM_DOMAIN" --project "$VERCEL_PROJECT_NAME" --confirm
vercel domains alias "$CUSTOM_DOMAIN" --project "$VERCEL_PROJECT_NAME" --confirm
p
echo "✅ Deployment Complete! Your site is live at: https://$CUSTOM_DOMAIN"