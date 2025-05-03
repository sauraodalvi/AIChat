// Chat functionality with enhanced character interactions

// Global state
let chatHistory = [];
let activeCharacters = [];
let currentStoryArc = null;
let moodStates = [];
let chatRoom = null;
let relationships = [];

// Function to initialize the chat room
function initializeChatRoom(roomName, characters, scenario = null) {
    // Set the chat room name
    document.getElementById('chat-room-name').textContent = roomName || 'Chat Room';

    // Clear previous messages
    document.getElementById('chat-messages').innerHTML = '';

    // Clear previous active characters
    document.getElementById('active-characters-list').innerHTML = '';

    // Reset global state
    chatHistory = [];
    activeCharacters = characters || [];
    moodStates = [];
    relationships = [];

    // Initialize chat room object
    chatRoom = {
        name: roomName,
        description: scenario?.description || '',
        type: scenario?.type || 'general'
    };

    // Initialize story arc if scenario is provided
    if (scenario) {
        currentStoryArc = window.storyArcUtils.initializeStoryArc(
            roomName,
            scenario.description,
            scenario.type
        );
    } else {
        currentStoryArc = window.storyArcUtils.initializeStoryArc(
            roomName,
            '',
            'general'
        );
    }

    // Initialize mood states for all characters
    activeCharacters.forEach(character => {
        const moodState = window.moodUtils.initializeMoodState(character);
        moodStates.push(moodState);
    });

    // Add a system message to start the chat
    addSystemMessage(`Welcome to "${roomName}". The conversation has begun.`);

    // Add scenario description if available
    if (scenario && scenario.description) {
        addSystemMessage(`**${scenario.description}**`);
    }

    // Add story context if available
    if (currentStoryArc && currentStoryArc.currentContext) {
        addSystemMessage(`**${currentStoryArc.currentContext}**`);
    }

    // Display active characters
    updateActiveCharactersList();
}

// Function to update the active characters list in the UI
function updateActiveCharactersList() {
    const activeCharactersList = document.getElementById('active-characters-list');
    activeCharactersList.innerHTML = '';

    activeCharacters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.className = 'active-character';

        // Get current mood
        const moodState = window.moodUtils.getMoodState(moodStates, character.name, character);
        const currentMood = moodState.currentMood;

        characterElement.innerHTML = `
            <div class="character-avatar">${character.avatar || character.name.charAt(0)}</div>
            <div class="character-info">
                <div class="character-name">${character.name}</div>
                <div class="character-mood">${currentMood}</div>
            </div>
        `;

        activeCharactersList.appendChild(characterElement);
    });
}

// Function to add a system message to the chat
function addSystemMessage(text) {
    const chatMessages = document.getElementById('chat-messages');

    const messageElement = document.createElement('div');
    messageElement.className = 'message system';

    // Process text for environmental events (bold with asterisks)
    let processedText = text;
    if (text.startsWith('**') && text.endsWith('**')) {
        processedText = `<div class="environmental-event">${text.substring(2, text.length - 2)}</div>`;
    }

    messageElement.innerHTML = `
        <div class="message-bubble system-message">
            ${processedText}
        </div>
    `;

    chatMessages.appendChild(messageElement);
    scrollToBottom();

    // Add to chat history
    chatHistory.push({
        id: Date.now(),
        type: 'system',
        text: text,
        timestamp: new Date().toISOString()
    });
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

    // Add to chat history
    chatHistory.push({
        id: Date.now(),
        type: 'user',
        speaker: 'You',
        text: text,
        timestamp: new Date().toISOString()
    });

    // Trigger character responses
    triggerCharacterResponses(text);
}

// Function to add a character message to the chat
function addCharacterMessage(character, text) {
    const chatMessages = document.getElementById('chat-messages');

    const messageElement = document.createElement('div');
    messageElement.className = 'message character';

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Process text for character actions (asterisks)
    let processedText = text;

    // Replace *action* with styled action
    processedText = processedText.replace(/\*([^*]+)\*/g, '<span class="character-action">$1</span>');

    messageElement.innerHTML = `
        <div class="message-info">
            <span class="message-sender">${character.name}</span>
            <span class="message-time">${timestamp}</span>
        </div>
        <div class="message-bubble character-bubble">
            ${processedText}
        </div>
    `;

    chatMessages.appendChild(messageElement);
    scrollToBottom();

    // Add to chat history
    chatHistory.push({
        id: Date.now(),
        type: 'character',
        speaker: character.name,
        character: character,
        text: text,
        timestamp: new Date().toISOString()
    });

    // Update story arc based on new message
    updateStoryArc();

    // Possibly trigger an environmental event (5% chance)
    if (Math.random() < 0.05) {
        triggerEnvironmentalEvent();
    }
}

// Function to trigger character responses to a user message
function triggerCharacterResponses(userMessage) {
    if (!activeCharacters || activeCharacters.length === 0) return;

    // Determine how many characters will respond (more likely to respond to longer messages)
    const responseChance = Math.min(0.8, 0.3 + (userMessage.length / 100));
    const respondingCharacters = activeCharacters.filter(() => Math.random() < responseChance);

    // If no one wants to respond, pick at least one character
    const responders = respondingCharacters.length > 0
        ? respondingCharacters
        : [activeCharacters[Math.floor(Math.random() * activeCharacters.length)]];

    // Sort responders by personality - more talkative characters respond first
    responders.sort((a, b) => {
        const aTalkativeness = a.talkativeness || 5;
        const bTalkativeness = b.talkativeness || 5;
        return bTalkativeness - aTalkativeness;
    });

    // Have characters respond with delays based on their thinking speed
    responders.forEach((character, index) => {
        const thinkingSpeed = character.thinkingSpeed || 1.0;
        const baseDelay = 1000 + (index * 1500); // Base delay plus staggering
        const adjustedDelay = baseDelay / thinkingSpeed; // Faster thinkers respond more quickly

        setTimeout(() => {
            // Get the character's current mood
            const characterMood = window.moodUtils.getMoodState(moodStates, character.name, character);

            // Create a copy of the character with the current mood
            const characterWithCurrentMood = {
                ...character,
                mood: characterMood.currentMood || character.mood
            };

            // Generate writing instructions based on story arc
            const responseInstructions = window.storyArcUtils.generateWritingInstructions(currentStoryArc, character);

            // Generate the response
            const response = window.characterUtils.generateCharacterResponse(
                characterWithCurrentMood,
                userMessage,
                chatHistory,
                currentStoryArc,
                chatRoom,
                relationships
            );

            // Add the response to chat
            addCharacterMessage(characterWithCurrentMood, response);

            // Update character's mood based on the interaction
            const messageTopics = window.characterUtils.extractTopics(userMessage);
            const emotionalImpact = Math.random() > 0.7 ? (Math.random() * 4) - 2 : 0; // Random impact between -2 and 2, 30% of the time

            if (emotionalImpact !== 0) {
                const updatedMoodState = window.moodUtils.updateMood(
                    characterMood,
                    messageTopics[0] || 'conversation',
                    emotionalImpact,
                    'user-interaction'
                );

                // Replace the old mood state with the updated one
                const moodIndex = moodStates.findIndex(state => state.characterId === character.name);
                if (moodIndex !== -1) {
                    moodStates[moodIndex] = updatedMoodState;

                    // Check if we should announce the mood change
                    if (window.moodUtils.shouldAnnounceMoodChange(characterMood, updatedMoodState)) {
                        const moodChangeDescription = window.moodUtils.getMoodChangeDescription(
                            character,
                            characterMood.currentMood,
                            updatedMoodState.currentMood
                        );

                        // Add the mood change as a system message
                        setTimeout(() => {
                            addSystemMessage(moodChangeDescription);
                        }, 1000);
                    }
                }
            }

            // Update the active characters list to show new moods
            updateActiveCharactersList();

        }, adjustedDelay);
    });
}

// Function to trigger an environmental event
function triggerEnvironmentalEvent() {
    if (!chatRoom) return;

    // Adjust event probability based on story arc phase
    let majorEventChance = 0.1; // Default 10% chance
    if (currentStoryArc) {
        if (currentStoryArc.currentPhase === 'climax') {
            majorEventChance = 0.3; // 30% chance during climax
        } else if (currentStoryArc.currentPhase === 'planning') {
            majorEventChance = 0.05; // 5% chance during planning
        }
    }

    // Determine if it's a major event
    const isMajorEvent = Math.random() < majorEventChance;

    // Generate the environmental event
    const environmentalEvent = window.environmentUtils.generateEnvironmentalEvent(
        chatHistory,
        chatRoom,
        chatRoom.type,
        isMajorEvent
    );

    // Add the event as a system message
    addSystemMessage(environmentalEvent);

    // Have a character respond to the event (50% chance)
    if (activeCharacters.length > 0 && Math.random() < 0.5) {
        // Select a random character to respond
        const respondingCharacter = activeCharacters[Math.floor(Math.random() * activeCharacters.length)];

        // Generate writing instructions for the event response
        const eventInstructions = {
            storyArc: currentStoryArc?.currentPhase || 'general',
            writingStyle: 'dramatic',
            responseLength: 'medium',
            characterReminders: '',
            generalNotes: 'Respond to the environmental change with appropriate emotion and action.'
        };

        // Get the character's current mood
        const characterMood = window.moodUtils.getMoodState(moodStates, respondingCharacter.name, respondingCharacter);

        // Create a copy of the character with the current mood
        const characterWithCurrentMood = {
            ...respondingCharacter,
            mood: characterMood.currentMood || respondingCharacter.mood
        };

        // Generate response after a delay
        setTimeout(() => {
            const response = `*${respondingCharacter.name} reacts to the sudden change*\n\n${window.characterUtils.generateCharacterResponse(
                characterWithCurrentMood,
                environmentalEvent,
                chatHistory,
                currentStoryArc,
                chatRoom,
                relationships
            )}`;

            // Add the response to chat
            addCharacterMessage(characterWithCurrentMood, response);
        }, 1500);
    }
}

// Function to update the story arc based on recent messages
function updateStoryArc() {
    if (!currentStoryArc || chatHistory.length < 3) return;

    // Update the story arc
    const updatedArc = window.storyArcUtils.updateStoryArc(currentStoryArc, chatHistory, 5);

    // Check if the phase has changed
    if (updatedArc.currentPhase !== currentStoryArc.currentPhase) {
        // Announce the phase change
        addSystemMessage(`**The story enters a new phase: ${updatedArc.currentPhase}**`);

        // If the context has changed, announce that too
        if (updatedArc.currentContext !== currentStoryArc.currentContext) {
            addSystemMessage(`**${updatedArc.currentContext}**`);
        }
    }

    // Update the current story arc
    currentStoryArc = updatedArc;
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
    addCharacterMessage,
    sendMessage,
    triggerEnvironmentalEvent,
    updateActiveCharactersList
};
