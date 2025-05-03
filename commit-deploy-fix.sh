#!/bin/bash
git add .github/workflows/deploy.yml
git add vercel.json
git add velora/src/styles/nsui.css
git add velora/src/main.jsx
git commit -m "Fix deployment issues and update CSS to use nsui.irung.me"
git push origin main
