#!/bin/bash

# Create a temporary directory for the deployment
mkdir -p gh-pages-deploy

# Copy the necessary files to the temporary directory
cp index.html gh-pages-deploy/
cp -r css gh-pages-deploy/
cp -r js gh-pages-deploy/
cp -r images gh-pages-deploy/ 2>/dev/null || :
cp -r assets gh-pages-deploy/ 2>/dev/null || :
cp -r fonts gh-pages-deploy/ 2>/dev/null || :
touch gh-pages-deploy/.nojekyll

# Create a README.md file
cat > gh-pages-deploy/README.md << 'EOF'
# Velora - Your Portal to Living Conversations

Velora is a completely autonomous, login-free, character-driven chat world where users can:

- Instantly select characters and start talking
- Create custom fantasy, deep talk, or random chat scenarios
- Talk in many-to-many group chats (not boring 1-1)
- Save chats locally (as JSON) and upload them later to resume conversations
- Paste a video link to theme their chat room based on the video's vibe

## Live Demo

Visit the live demo at [https://sauraodalvi.github.io/AIChat/](https://sauraodalvi.github.io/AIChat/)

## Features

- **No Login Required**: Just start chatting
- **Character Selection**: Choose from a variety of pre-defined characters
- **Custom Characters**: Create your own characters with unique personalities
- **Scenario Creation**: Set up custom scenarios for your characters
- **Local Save/Load**: Save your chats locally and resume them later
- **Theme Generation**: Generate themes based on video links

## Technologies Used

- HTML, CSS, JavaScript
- CSS from [nsui.irung.me](https://nsui.irung.me/)
- Tailwind CSS

## License

MIT

---

"Instant Connection, Infinite Worlds."
EOF

# Initialize a new git repository in the temporary directory
cd gh-pages-deploy
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Add the GitHub repository as a remote
git remote add origin https://github.com/sauraodalvi/AIChat.git

# Force push to the gh-pages branch
git push -f origin main:gh-pages

# Clean up
cd ..
rm -rf gh-pages-deploy

echo "Deployment to GitHub Pages completed!"
