#!/bin/bash

# Create a temporary directory for the new repository
mkdir -p velora-pages

# Copy the simple index.html file to the temporary directory
cp github-pages-index.html velora-pages/index.html
touch velora-pages/.nojekyll

# Create a README.md file
cat > velora-pages/README.md << 'EOF'
# Velora - Your Portal to Living Conversations

Velora is a completely autonomous, login-free, character-driven chat world where users can:

- Instantly select characters and start talking
- Create custom fantasy, deep talk, or random chat scenarios
- Talk in many-to-many group chats (not boring 1-1)
- Save chats locally (as JSON) and upload them later to resume conversations
- Paste a video link to theme their chat room based on the video's vibe

## Live Demo

Visit the live demo at [https://ai-chat-eight-red.vercel.app/](https://ai-chat-eight-red.vercel.app/)

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

echo "Files for the new GitHub Pages repository have been created in the 'velora-pages' directory."
echo "Please follow these steps to create a new GitHub repository and deploy to GitHub Pages:"
echo ""
echo "1. Go to https://github.com/new"
echo "2. Create a new repository named 'velora-pages'"
echo "3. Initialize it with a README.md file"
echo "4. Clone the repository to your local machine"
echo "5. Copy the files from the 'velora-pages' directory to the cloned repository"
echo "6. Commit and push the changes"
echo "7. Go to the repository settings on GitHub"
echo "8. Navigate to 'Pages' in the left sidebar"
echo "9. Under 'Source', select 'Deploy from a branch'"
echo "10. Select the 'main' branch and '/ (root)' folder"
echo "11. Click 'Save'"
echo "12. Wait for the GitHub Pages deployment to complete"
echo "13. Your site will be available at https://sauraodalvi.github.io/velora-pages/"
