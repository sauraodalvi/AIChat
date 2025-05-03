@echo off
cd c:\git_projects\chat
git checkout gh-pages || git checkout -b gh-pages
git add .
git commit -m "Update gh-pages branch"
git push origin gh-pages
echo Done!
pause
