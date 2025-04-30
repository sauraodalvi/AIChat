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
    // Navigate to the chat room
    navigateTo(chatRoomPage);
}

// Handle random surprise
function handleRandomSurprise() {
    // Navigate to the chat room
    navigateTo(chatRoomPage);
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

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
