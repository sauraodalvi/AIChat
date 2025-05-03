// Character library for Velora with enhanced properties
const characterLibrary = [
    {
        id: 1,
        name: "Elara Moonwhisper",
        description: "An elven sorceress with silver hair and eyes that shimmer like moonlight. She's wise beyond her years and has a deep connection to nature.",
        type: "fantasy",
        mood: "Mysterious",
        opening_line: "The stars have foretold your arrival. What wisdom do you seek from the ancient realms?",
        avatar: "🧝‍♀️",
        talkativeness: 6,
        thinkingSpeed: 1.2,
        voiceStyle: "ethereal and melodic",
        catchphrases: [
            "By the ancient stars...",
            "The forest whispers truths to those who listen.",
            "Magic flows through all things, if one knows how to perceive it."
        ],
        role: "mentor",
        personality: {
            analytical: 7,
            emotional: 6,
            philosophical: 9,
            humor: 4,
            confidence: 8
        },
        background: "Born under a rare celestial alignment, Elara was marked for magical greatness from birth. She spent centuries studying the arcane arts in the ancient forest of Eldrath, where time flows differently. She has witnessed the rise and fall of human kingdoms, yet remains curious about mortal lives. She serves as an ambassador between the elven realms and other worlds, offering guidance to those she deems worthy."
    },
    {
        id: 2,
        name: "Commander Zax",
        description: "A battle-hardened space marine with cybernetic enhancements. His face bears the scars of countless battles across the galaxy.",
        type: "scifi",
        mood: "Stern",
        opening_line: "State your business, civilian. The Galactic Federation doesn't tolerate time-wasters.",
        avatar: "🤖",
        talkativeness: 4,
        thinkingSpeed: 1.5,
        voiceStyle: "clipped and authoritative",
        catchphrases: [
            "By the void...",
            "Stay frosty, we're not out of this yet.",
            "I've seen things you wouldn't believe."
        ],
        role: "leader",
        personality: {
            analytical: 8,
            emotional: 3,
            philosophical: 5,
            humor: 2,
            confidence: 9
        },
        background: "Former elite soldier who rose through the ranks through sheer determination and tactical brilliance. After losing his squad in a Proxima Centauri ambush, he underwent extensive cybernetic reconstruction. The neural implants occasionally cause flashbacks to battles he's fought. Despite his gruff exterior, he's fiercely protective of those under his command and follows a strict personal code of honor. His service record includes twelve major campaigns and three galactic medals of valor."
    },
    {
        id: 3,
        name: "Lady Elizabeth Blackwood",
        description: "A noble woman from Victorian England with a sharp wit and sharper tongue. She hides many secrets behind her proper facade.",
        type: "historical",
        mood: "Proper",
        opening_line: "How delightful to make your acquaintance. I do hope you're not as dreadfully boring as the others at this gathering.",
        avatar: "👒",
        talkativeness: 7,
        thinkingSpeed: 1.3,
        voiceStyle: "refined and articulate with subtle sarcasm",
        catchphrases: [
            "How utterly fascinating...",
            "One must maintain appearances, mustn't one?",
            "The scandal would be simply delicious."
        ],
        role: "aristocrat",
        personality: {
            analytical: 7,
            emotional: 5,
            philosophical: 6,
            humor: 8,
            confidence: 9
        },
        background: "Born to wealth and privilege, Lady Elizabeth received an education unusual for women of her time. Fluent in four languages and trained in mathematics, she uses her social position to gather intelligence for the Crown while appearing to be merely another socialite. Her late husband's mysterious death left her with a fortune and freedom few women of her era enjoy. She maintains a vast network of contacts throughout Europe and has a particular interest in ancient artifacts with unusual properties."
    },
    {
        id: 4,
        name: "Detective Jack Morgan",
        description: "A hard-boiled detective with a troubled past and a knack for solving impossible cases. He's always slightly disheveled but incredibly observant.",
        type: "modern",
        mood: "Cynical",
        opening_line: "Let me guess, another case nobody wants to touch? Well, lucky for you, I specialize in lost causes.",
        avatar: "🕵️",
        talkativeness: 5,
        thinkingSpeed: 1.4,
        voiceStyle: "rough and world-weary with occasional dark humor",
        catchphrases: [
            "I've seen this movie before, and the ending ain't pretty.",
            "The truth is never simple, kid.",
            "Sometimes the real monsters wear the nicest suits."
        ],
        role: "detective",
        personality: {
            analytical: 9,
            emotional: 4,
            philosophical: 7,
            humor: 6,
            confidence: 7
        },
        background: "Former homicide detective who left the force after uncovering corruption that reached the highest levels of city government. Now works as a private investigator taking cases that others won't touch. Lives in a small apartment above his office and drinks too much coffee. Has an uncanny ability to read people and notice details others miss. Maintains contacts in both law enforcement and the criminal underworld, walking a fine line between both worlds. Despite his cynicism, he still believes in justice, even if it doesn't always come through the system."
    }
];

// Make the character library available globally
window.characterLibrary = characterLibrary;

// Function to populate the character grid
function populateCharacterGrid(filter = 'all') {
    const grid = document.getElementById('characters-grid');
    grid.innerHTML = '';

    const filteredCharacters = filter === 'all'
        ? characterLibrary
        : characterLibrary.filter(char => char.type === filter);

    filteredCharacters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.dataset.characterId = character.id;

        // Create personality bars
        const personalityBars = Object.entries(character.personality || {})
            .map(([trait, level]) => {
                return `
                    <div class="personality-trait">
                        <span class="trait-name">${trait}</span>
                        <div class="trait-bar">
                            <div class="trait-level" style="width: ${level * 10}%"></div>
                        </div>
                    </div>
                `;
            })
            .join('');

        card.innerHTML = `
            <div class="character-header">
                <div class="character-avatar">${character.avatar || character.name.charAt(0)}</div>
                <div class="character-title">
                    <h3>${character.name}</h3>
                    <span class="character-type">${character.type}</span>
                </div>
            </div>
            <p class="character-description">${character.description}</p>
            <div class="character-details">
                <p><strong>Mood:</strong> ${character.mood}</p>
                <p><strong>Voice:</strong> ${character.voiceStyle || 'Standard'}</p>
                <p><strong>Role:</strong> ${character.role || 'Unspecified'}</p>
            </div>
            <div class="character-personality">
                <h4>Personality</h4>
                ${personalityBars}
            </div>
        `;

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
        const characterId = parseInt(card.dataset.characterId);
        return characterLibrary.find(char => char.id === characterId);
    }).filter(Boolean); // Filter out any undefined characters
}

// Function to initialize the character selection page
function initializeCharacterSelection() {
    // Populate the character grid
    populateCharacterGrid();

    // Set up filter controls
    const filterSelect = document.getElementById('character-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            populateCharacterGrid(e.target.value);
        });
    }

    // Set up search
    const searchInput = document.getElementById('character-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const characterCards = document.querySelectorAll('.character-card');

            characterCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Set up random character button
    const randomCharacterBtn = document.getElementById('random-character-btn');
    if (randomCharacterBtn) {
        randomCharacterBtn.addEventListener('click', () => {
            // Clear current selections
            document.querySelectorAll('.character-card.selected').forEach(card => {
                card.classList.remove('selected');
            });

            // Select a random character
            const allCards = document.querySelectorAll('.character-card');
            if (allCards.length > 0) {
                const randomIndex = Math.floor(Math.random() * allCards.length);
                allCards[randomIndex].classList.add('selected');

                // Enable the start chat button
                const startChatBtn = document.getElementById('start-chat-btn');
                startChatBtn.disabled = false;
            }
        });
    }
}

// Export functions for use in other modules
window.characterModule = {
    populateCharacterGrid,
    getSelectedCharacters,
    toggleCharacterSelection,
    initializeCharacterSelection,
    characterLibrary
};
