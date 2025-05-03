// Main application logic

// DOM Elements
const landingPage = document.getElementById('landing-page');
const characterSelectionPage = document.getElementById('character-selection-page');
const chatRoomPage = document.getElementById('chat-room-page');
const customScenarioPage = document.getElementById('custom-scenario-page');
const characterCreatorModal = document.getElementById('character-creator-modal');
const fileUploadModal = document.getElementById('file-upload-modal');

// Navigation buttons
const selectCharacterBtn = document.getElementById('select-character-btn');
const createScenarioBtn = document.getElementById('create-scenario-btn');
const randomSurpriseBtn = document.getElementById('random-surprise-btn');
const uploadChatBtn = document.getElementById('upload-chat-btn');
const backToLandingBtn = document.getElementById('back-to-landing-btn');
const startChatBtn = document.getElementById('start-chat-btn');
const backFromScenarioBtn = document.getElementById('back-from-scenario-btn');
const leaveChatBtn = document.getElementById('leave-chat-btn');

// Theme toggle
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeStylesheet = document.getElementById('theme-stylesheet');

// Initialize the application
function initApp() {
    // Set up event listeners
    setupEventListeners();

    // Check for dark mode preference
    checkDarkModePreference();

    // Initialize character selection
    if (window.characterModule) {
        window.characterModule.initializeCharacterSelection();
    }
}

// Set up event listeners
function setupEventListeners() {
    // Navigation
    selectCharacterBtn.addEventListener('click', () => navigateTo(characterSelectionPage));
    createScenarioBtn.addEventListener('click', () => navigateTo(customScenarioPage));
    randomSurpriseBtn.addEventListener('click', handleRandomSurprise);
    uploadChatBtn.addEventListener('click', () => toggleModal(fileUploadModal, true));
    backToLandingBtn.addEventListener('click', () => navigateTo(landingPage));
    startChatBtn.addEventListener('click', handleStartChat);
    backFromScenarioBtn.addEventListener('click', () => navigateTo(landingPage));
    leaveChatBtn.addEventListener('click', () => navigateTo(landingPage));

    // Theme toggle
    themeToggleBtn.addEventListener('click', toggleDarkMode);

    // Chat functionality
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message-btn');

    // Send message on button click
    sendMessageBtn.addEventListener('click', () => {
        window.chatModule.sendMessage();
    });

    // Send message on Enter key (but allow Shift+Enter for new lines)
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            window.chatModule.sendMessage();
        }
    });

    // Character selection
    document.addEventListener('click', (e) => {
        if (e.target.closest('.character-card')) {
            const card = e.target.closest('.character-card');
            card.classList.toggle('selected');

            // Enable/disable start chat button based on selection
            const selectedCharacters = document.querySelectorAll('.character-card.selected');
            startChatBtn.disabled = selectedCharacters.length === 0;
        }
    });
}

// Navigation function
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show the target page
    page.classList.add('active');
}

// Handle starting a chat
function handleStartChat() {
    // Get selected characters
    const selectedCharacters = getSelectedCharacters();

    if (selectedCharacters.length === 0) {
        alert('Please select at least one character');
        return;
    }

    // Create a default room name
    const roomName = `Chat with ${selectedCharacters.map(c => c.name).join(', ')}`;

    // Initialize the chat room
    window.chatModule.initializeChatRoom(roomName, selectedCharacters);

    // Navigate to the chat room
    navigateTo(chatRoomPage);

    // Add opening messages from characters
    setTimeout(() => {
        selectedCharacters.forEach((character, index) => {
            setTimeout(() => {
                if (character.opening_line) {
                    window.chatModule.addCharacterMessage(character, character.opening_line);
                }
            }, index * 1500);
        });
    }, 1000);
}

// Handle random surprise
function handleRandomSurprise() {
    // Generate a random scenario
    const scenario = window.scenarioModule.generateRandomScenario();

    // Get random characters (1-3)
    const characterCount = Math.floor(Math.random() * 3) + 1;
    const randomCharacters = [];

    // Get characters from the library
    const allCharacters = window.characterLibrary || [];

    for (let i = 0; i < characterCount; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        randomCharacters.push(allCharacters[randomIndex]);
    }

    // Initialize the chat room
    window.chatModule.initializeChatRoom(scenario.title, randomCharacters, scenario);

    // Navigate to the chat room
    navigateTo(chatRoomPage);

    // Add opening messages from characters
    setTimeout(() => {
        randomCharacters.forEach((character, index) => {
            setTimeout(() => {
                if (character.opening_line) {
                    window.chatModule.addCharacterMessage(character, character.opening_line);
                }
            }, index * 1500);
        });

        // Trigger an environmental event after all characters have spoken
        setTimeout(() => {
            window.chatModule.triggerEnvironmentalEvent();
        }, randomCharacters.length * 1500 + 1000);
    }, 1000);
}

// Toggle modal visibility
function toggleModal(modal, show) {
    if (show) {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const isDarkMode = themeStylesheet.disabled;

    // Toggle the stylesheet
    themeStylesheet.disabled = !isDarkMode;

    // Save preference
    localStorage.setItem('dark-mode', !isDarkMode);
}

// Check dark mode preference
function checkDarkModePreference() {
    const prefersDarkMode = localStorage.getItem('dark-mode') === 'true';

    // Set the stylesheet based on preference
    themeStylesheet.disabled = !prefersDarkMode;
}

// Get selected characters from the UI
function getSelectedCharacters() {
    // In a real implementation, this would get the selected characters from the UI
    // For now, we'll return a sample character

    // Check if we have a character library
    if (window.characterLibrary && window.characterLibrary.length > 0) {
        // Get selected characters from the UI
        const selectedElements = document.querySelectorAll('.character-card.selected');

        if (selectedElements.length > 0) {
            // Get the selected characters from the library
            return Array.from(selectedElements).map(element => {
                const characterId = element.dataset.characterId;
                return window.characterLibrary.find(c => c.id === parseInt(characterId));
            }).filter(c => c); // Filter out any undefined characters
        }

        // If no characters are selected, return a default character
        return [window.characterLibrary[0]];
    }

    // Fallback to a default character if no library is available
    return [{
        name: "Elara Moonwhisper",
        description: "An elven sorceress with silver hair and eyes that shimmer like moonlight. She's wise beyond her years and has a deep connection to nature.",
        type: "fantasy",
        mood: "Mysterious and serene",
        opening_line: "The stars have foretold your arrival. What wisdom do you seek from the ancient realms?",
        personality: {
            analytical: 7,
            emotional: 6,
            philosophical: 9,
            humor: 4,
            confidence: 8
        },
        voiceStyle: "ethereal and melodic",
        catchphrases: ["By the ancient stars...", "The forest whispers truths to those who listen."],
        role: "mentor"
    }];
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
