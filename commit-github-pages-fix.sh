#!/bin/bash
git add .github/workflows/deploy.yml
git add .nojekyll
git add README.md
git commit -m "Fix GitHub Pages deployment with improved workflow and documentation"
git push origin main
