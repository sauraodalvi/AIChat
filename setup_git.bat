@echo off
echo Setting up Git repository in C:\git_projects\chat

cd C:\git_projects\chat

echo Initializing Git repository...
git init

echo Configuring Git...
git config --local user.name "Saura Odalvi"
git config --local user.email "sauraodalvi@gmail.com"

echo Adding all files...
git add .

echo Committing changes...
git commit -m "Initial commit"

echo Adding remote repository...
git remote add origin git@github.com:sauraodalvi/VeloraChat.git

echo Renaming branch to main...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo Done!
pause
