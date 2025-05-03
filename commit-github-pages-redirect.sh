#!/bin/bash
git add redirect-index.html
git add .github/workflows/github-pages.yml
git commit -m "Add redirect to Vercel deployment for GitHub Pages"
git push origin main
