# Enable detailed output
$ErrorActionPreference = "Continue"
$VerbosePreference = "Continue"

# Function to log messages
function Log-Message {
    param (
        [string]$Message,
        [string]$Type = "INFO"
    )
    Write-Host "[$Type] $Message"
}

# Navigate to repository directory
try {
    Log-Message "Navigating to repository directory..."
    Set-Location -Path "c:\git_projects\chat" -ErrorAction Stop
    Log-Message "Current directory: $(Get-Location)"
} catch {
    Log-Message "Failed to navigate to repository directory: $_" "ERROR"
    exit 1
}

# Check if git is installed
try {
    $gitVersion = git --version
    Log-Message "Git version: $gitVersion"
} catch {
    Log-Message "Git is not installed or not in PATH: $_" "ERROR"
    exit 1
}

# Check current branch
try {
    $currentBranch = git rev-parse --abbrev-ref HEAD
    Log-Message "Current branch: $currentBranch"
} catch {
    Log-Message "Failed to get current branch: $_" "ERROR"
}

# Check if gh-pages branch exists
$branchExists = $false
try {
    $branches = git branch
    Log-Message "Available branches: $branches"
    if ($branches -match "gh-pages") {
        $branchExists = $true
        Log-Message "gh-pages branch exists"
    } else {
        Log-Message "gh-pages branch does not exist, will create it"
    }
} catch {
    Log-Message "Failed to list branches: $_" "ERROR"
}

# Checkout or create gh-pages branch
try {
    if ($branchExists) {
        Log-Message "Checking out gh-pages branch..."
        git checkout gh-pages
    } else {
        Log-Message "Creating and checking out gh-pages branch..."
        git checkout -b gh-pages
    }
    Log-Message "Now on branch: $(git rev-parse --abbrev-ref HEAD)"
} catch {
    Log-Message "Failed to checkout/create gh-pages branch: $_" "ERROR"
    exit 1
}

# Add all changes
try {
    Log-Message "Adding all changes..."
    git add .
    Log-Message "Changes added to staging area"
} catch {
    Log-Message "Failed to add changes: $_" "ERROR"
    exit 1
}

# Check status
try {
    $status = git status
    Log-Message "Git status: $status"
} catch {
    Log-Message "Failed to get status: $_" "ERROR"
}

# Commit changes
try {
    Log-Message "Committing changes..."
    $commitOutput = git commit -m "Update gh-pages branch"
    Log-Message "Commit result: $commitOutput"
} catch {
    Log-Message "Failed to commit changes: $_" "ERROR"
    # Continue anyway as there might be no changes to commit
}

# Push to remote
try {
    Log-Message "Pushing to remote..."
    $pushOutput = git push origin gh-pages
    Log-Message "Push result: $pushOutput"
    Log-Message "Successfully pushed to gh-pages branch!" "SUCCESS"
} catch {
    Log-Message "Failed to push to remote: $_" "ERROR"
    exit 1
}

Log-Message "All operations completed!"
Write-Host "Press Enter to exit..."
$null = Read-Host
