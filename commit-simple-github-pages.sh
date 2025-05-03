#!/bin/bash
git add .github/workflows/deploy.yml
git add simple-index.html
git commit -m "Add simple HTML page for GitHub Pages deployment"
git push origin main
