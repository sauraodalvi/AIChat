@echo off
echo Setting up Git repository...

echo Adding remote repository...
git remote add origin git@github.com:sauraodalvi/VeloraChat.git

echo Renaming branch to main...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo Done!
pause
