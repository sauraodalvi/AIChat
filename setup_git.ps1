Write-Host "Setting up Git repository in C:\git_projects\chat"

Set-Location -Path "C:\git_projects\chat"

Write-Host "Initializing Git repository..."
git init

Write-Host "Configuring Git..."
git config --local user.name "Saura Odalvi"
git config --local user.email "sauraodalvi@gmail.com"

Write-Host "Adding all files..."
git add .

Write-Host "Committing changes..."
git commit -m "Initial commit"

Write-Host "Adding remote repository..."
git remote add origin git@github.com:sauraodalvi/VeloraChat.git

Write-Host "Renaming branch to main..."
git branch -M main

Write-Host "Pushing to GitHub..."
git push -u origin main

Write-Host "Done!"
