// Sample character data
const characters = [
    {
        id: 1,
        name: "Elara Moonwhisper",
        description: "An elven sorceress with silver hair and eyes that shimmer like moonlight. She's wise beyond her years and has a deep connection to nature.",
        type: "fantasy",
        mood: "Mysterious and serene",
        openingLine: "The stars have foretold your arrival. What wisdom do you seek from the ancient realms?"
    },
    {
        id: 2,
        name: "Commander Zax",
        description: "A battle-hardened space marine with cybernetic enhancements. His face bears the scars of countless battles across the galaxy.",
        type: "scifi",
        mood: "Stern but fair",
        openingLine: "State your business, civilian. The Galactic Federation doesn't tolerate time-wasters."
    },
    {
        id: 3,
        name: "Lady Elizabeth Blackwood",
        description: "A noble woman from Victorian England with a sharp wit and sharper tongue. She hides many secrets behind her proper facade.",
        type: "historical",
        mood: "Proper yet mischievous",
        openingLine: "How delightful to make your acquaintance. I do hope you're not as dreadfully boring as the others at this gathering."
    },
    {
        id: 4,
        name: "Detective Jack Morgan",
        description: "A hard-boiled detective with a troubled past and a knack for solving impossible cases. He's always slightly disheveled but incredibly observant.",
        type: "modern",
        mood: "Cynical and witty",
        openingLine: "Let me guess, another case nobody wants to touch? Well, lucky for you, I specialize in lost causes."
    }
];

// Function to populate the character grid
function populateCharacterGrid(filter = 'all') {
    const grid = document.getElementById('characters-grid');
    grid.innerHTML = '';
    
    const filteredCharacters = filter === 'all' 
        ? characters 
        : characters.filter(char => char.type === filter);
    
    filteredCharacters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.dataset.id = character.id;
        
        card.innerHTML = `
            <h3>${character.name}</h3>
            <p>${character.description}</p>
            <p><strong>Type:</strong> ${character.type}</p>
            <p><strong>Mood:</strong> ${character.mood}</p>
        `;
        
        card.addEventListener('click', () => toggleCharacterSelection(card, character));
        
        grid.appendChild(card);
    });
}

// Function to toggle character selection
function toggleCharacterSelection(card, character) {
    card.classList.toggle('selected');
    
    const selectedCharacters = getSelectedCharacters();
    const startChatBtn = document.getElementById('start-chat-btn');
    
    // Enable/disable start chat button based on selection
    startChatBtn.disabled = selectedCharacters.length === 0;
}

// Function to get selected characters
function getSelectedCharacters() {
    const selectedCards = document.querySelectorAll('.character-card.selected');
    return Array.from(selectedCards).map(card => {
        const characterId = parseInt(card.dataset.id);
        return characters.find(char => char.id === characterId);
    });
}

// Export functions for use in other modules
window.characterModule = {
    populateCharacterGrid,
    getSelectedCharacters,
    characters
};
