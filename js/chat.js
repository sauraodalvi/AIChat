// Chat functionality

// Function to initialize the chat room
function initializeChatRoom(roomName, characters) {
    // Set the chat room name
    document.getElementById('chat-room-name').textContent = roomName || 'Chat Room';
    
    // Clear previous messages
    document.getElementById('chat-messages').innerHTML = '';
    
    // Clear previous active characters
    document.getElementById('active-characters-list').innerHTML = '';
    
    // Add a system message to start the chat
    addSystemMessage(`Welcome to "${roomName}". The conversation has begun.`);
}

// Function to add a system message to the chat
function addSystemMessage(text) {
    const chatMessages = document.getElementById('chat-messages');
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message system';
    
    messageElement.innerHTML = `
        <div class="message-bubble system-message">
            <p>${text}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

// Function to add a user message to the chat
function addUserMessage(text) {
    const chatMessages = document.getElementById('chat-messages');
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message user';
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageElement.innerHTML = `
        <div class="message-info">
            <span class="message-sender">You</span>
            <span class="message-time">${timestamp}</span>
        </div>
        <div class="message-bubble">
            <p>${text}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

// Function to scroll the chat to the bottom
function scrollToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to handle sending a message
function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (message) {
        // Add the user message to the chat
        addUserMessage(message);
        
        // Clear the input
        chatInput.value = '';
    }
}

// Export functions for use in other modules
window.chatModule = {
    initializeChatRoom,
    addSystemMessage,
    addUserMessage,
    sendMessage
};
