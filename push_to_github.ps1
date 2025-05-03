Set-Location -Path "c:\git_projects\chat"
Write-Host "Current directory: $(Get-Location)"

# Try to checkout gh-pages branch or create it if it doesn't exist
try {
    $checkoutResult = (git checkout gh-pages 2>&1)
    Write-Host "Checkout result: $checkoutResult"
} catch {
    Write-Host "Error checking out existing branch: $_"
    try {
        $createResult = (git checkout -b gh-pages 2>&1)
        Write-Host "Create branch result: $createResult"
    } catch {
        Write-Host "Error creating branch: $_"
    }
}

# Add all changes
Write-Host "Adding changes..."
git add .

# Commit changes
Write-Host "Committing changes..."
git commit -m "Update gh-pages branch"

# Push to remote
Write-Host "Pushing to remote..."
git push origin gh-pages

Write-Host "Done!"
Read-Host "Press Enter to continue..."
