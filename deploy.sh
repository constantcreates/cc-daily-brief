#!/bin/bash
# Constant Creates Daily Brief — One-Command Deploy
# Run this from the cc-daily-brief folder

echo "🚀 Deploying Constant Creates Daily Brief..."

# Step 1: Init git repo
git init
echo "node_modules/" > .gitignore
echo ".DS_Store" >> .gitignore
git add -A
git commit -m "Initial commit: Constant Creates Daily Brief Dashboard"

# Step 2: Create GitHub repo and push
gh repo create cc-daily-brief --public --push --source .

echo ""
echo "✅ Pushed to GitHub!"
echo ""
echo "Now deploy to Vercel:"
echo "  1. Go to https://vercel.com/new"
echo "  2. Import your cc-daily-brief repo"
echo "  3. Click Deploy (Vite auto-detected)"
echo "  4. Add custom domain in Settings → Domains"
echo ""
echo "Or deploy via CLI:"
echo "  npx vercel --prod"
