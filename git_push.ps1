Write-Host "Setting up Git repository in the chat folder..."

# Navigate to the chat folder
Set-Location -Path "c:\git_projects\chat"

# Initialize Git repository
Write-Host "Initializing Git repository..."
git init

# Add all files
Write-Host "Adding all files to Git..."
git add .

# Commit changes
Write-Host "Committing changes..."
git commit -m "Initial commit"

# Add remote repository
Write-Host "Adding remote repository..."
git remote add origin git@github.com:sauraodalvi/VeloraChat.git

# Rename branch to main
Write-Host "Renaming branch to main..."
git branch -M main

# Push to GitHub
Write-Host "Pushing to GitHub..."
git push -u origin main

Write-Host "Done!"
