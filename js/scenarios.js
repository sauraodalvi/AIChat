// Scenario functionality with enhanced details

// Sample scenario templates
const scenarioTemplates = [
    {
        id: 1,
        title: "The Lost Artifact",
        description: "Embark on an epic quest to recover a powerful magical artifact hidden in the ancient ruins of a forgotten civilization. Dark forces are also seeking the artifact, and time is running out.",
        type: "fantasy",
        characterTypes: ["fantasy"],
        setting: "Ancient ruins in a mystical forest",
        time: "Dawn, as the first light filters through the dense canopy",
        weather: "Misty and cool, with occasional magical disturbances",
        mood: "Mysterious and tense",
        conflict: "The artifact must be found before it falls into the wrong hands",
        goals: ["Locate the hidden entrance to the ruins", "Solve the ancient puzzles guarding the artifact", "Retrieve the artifact before the dark forces arrive"],
        keyLocations: ["The Whispering Forest", "The Ruined Temple", "The Chamber of Echoes", "The Artifact Vault"],
        environmentalEvents: [
            "Ancient runes on the walls begin to glow with an eerie blue light.",
            "The ground trembles as ancient magic stirs beneath the ruins.",
            "Ghostly whispers echo through the corridors, speaking in a forgotten language.",
            "A beam of sunlight breaks through the ceiling, illuminating a hidden pathway."
        ]
    },
    {
        id: 2,
        title: "Deep Space Anomaly",
        description: "Your starship has detected a mysterious anomaly at the edge of known space. As you investigate, you discover it's unlike anything encountered before, potentially changing our understanding of the universe.",
        type: "scifi",
        characterTypes: ["scifi"],
        setting: "Aboard the research vessel Horizon, at the edge of charted space",
        time: "Ship's time indicates 0300 hours, deep in the night cycle",
        weather: "The void of space, with unusual energy readings disrupting ship's sensors",
        mood: "Tense and curious",
        conflict: "The anomaly is growing and may pose a threat to nearby systems",
        goals: ["Analyze the anomaly's composition", "Determine if it poses a threat", "Establish communication if it shows signs of intelligence"],
        keyLocations: ["The Bridge", "Science Lab", "Observation Deck", "Engine Room"],
        environmentalEvents: [
            "Ship's lights flicker as the anomaly emits an energy pulse.",
            "Gravity temporarily fails as the ship passes through a distortion field.",
            "Holographic displays show impossible readings, forming patterns that shouldn't exist.",
            "A strange humming sound resonates through the hull, affecting the crew's concentration."
        ]
    },
    {
        id: 3,
        title: "The Venetian Conspiracy",
        description: "In 1789 Venice, you've uncovered evidence of a conspiracy that threatens to topple governments across Europe. With a network of spies hunting you, you must gather allies and expose the truth.",
        type: "historical",
        characterTypes: ["historical"],
        setting: "Venice during Carnival season, where masks hide true identities",
        time: "Evening, as lanterns illuminate the canals and festivities begin",
        weather: "Cool and damp, with a thick fog rolling in from the lagoon",
        mood: "Secretive and dangerous",
        conflict: "The conspiracy must be exposed before the conspirators silence you permanently",
        goals: ["Identify the conspiracy's leaders", "Gather evidence of their plans", "Find trustworthy allies", "Expose the truth at the Doge's grand ball"],
        keyLocations: ["The Grand Canal", "Doge's Palace", "Saint Mark's Square", "The Secret Archives"],
        environmentalEvents: [
            "Church bells ring out across the city, signaling the hour.",
            "A gondola passes silently through the fog, its occupants speaking in hushed tones.",
            "Masked revelers fill the streets as Carnival celebrations intensify.",
            "A sealed letter is delivered by a mysterious messenger who disappears into the crowd."
        ]
    },
    {
        id: 4,
        title: "Corporate Intrigue",
        description: "As a new executive at Nexus Technologies, you've discovered the company's revolutionary AI project has a dangerous secret. Your investigation puts you in the crosshairs of powerful people who will stop at nothing to protect their interests.",
        type: "modern",
        characterTypes: ["modern"],
        setting: "The gleaming headquarters of Nexus Technologies in a major metropolitan city",
        time: "Late evening, when most employees have gone home",
        weather: "Heavy rain against floor-to-ceiling windows, occasional thunder",
        mood: "Tense and paranoid",
        conflict: "The truth about the AI project must be revealed before it's too late",
        goals: ["Access restricted project files", "Identify trustworthy allies within the company", "Gather evidence of wrongdoing", "Expose the truth without being silenced"],
        keyLocations: ["Executive Suite", "R&D Laboratory", "Server Room", "Underground Parking Garage"],
        environmentalEvents: [
            "Security systems suddenly activate, locking down sections of the building.",
            "Power fluctuates, causing momentary darkness before emergency systems engage.",
            "A confidential alert appears on all computer screens before being remotely deleted.",
            "Surveillance cameras pivot to track movement through the corridors."
        ]
    },
    {
        id: 5,
        title: "Avengers: Alien Invasion",
        description: "A massive alien fleet has appeared over New York City. As Earth's mightiest heroes, the Avengers must unite to repel the invasion and discover why Earth has been targeted.",
        type: "superhero",
        characterTypes: ["modern", "scifi"],
        setting: "New York City under attack, with the Avengers Tower as your base of operations",
        time: "Mid-day, as civilians flee and buildings crumble",
        weather: "Clear skies filled with alien ships, smoke rising from damaged structures",
        mood: "Urgent and heroic",
        conflict: "The alien invasion must be stopped before Earth falls",
        goals: ["Evacuate civilians from danger zones", "Identify the aliens' weakness", "Disable the mothership", "Prevent global panic"],
        keyLocations: ["Avengers Tower", "Grand Central Station", "The alien mothership", "City streets"],
        environmentalEvents: [
            "A massive explosion rocks the city as an alien weapon discharges.",
            "Civilians scream and run for cover as smaller alien craft swoop down between buildings.",
            "The sky darkens as the mothership moves into position above Manhattan.",
            "Emergency services sirens wail continuously in the background."
        ]
    }
];

// Function to generate a random scenario
function generateRandomScenario(selectedCharacters = []) {
    // Select a random template
    const template = scenarioTemplates[Math.floor(Math.random() * scenarioTemplates.length)];

    // Generate the scenario details
    const scenario = {
        title: template.title,
        description: template.description,
        type: template.type,
        setting: template.setting,
        time: template.time,
        weather: template.weather,
        mood: template.mood,
        conflict: template.conflict,
        goals: template.goals || [],
        keyLocations: template.keyLocations || [],
        environmentalEvents: template.environmentalEvents || [],
        characters: selectedCharacters.length > 0 ? selectedCharacters : []
    };

    return scenario;
}

// Function to generate additional scenario details
function generateAdditionalScenarioDetails(keywords) {
    // Extract key themes from keywords
    const keywordList = keywords.toLowerCase().split(/[,\s]+/).filter(k => k.length > 3);

    // Generate additional context based on keywords
    let additionalDetails = '';

    if (keywordList.includes('magic') || keywordList.includes('fantasy') || keywordList.includes('wizard')) {
        additionalDetails += "The air is thick with magical energy, causing small objects to occasionally float or shimmer with arcane light. Ancient runes carved into the walls pulse with power when approached.\n\n";
    }

    if (keywordList.includes('space') || keywordList.includes('scifi') || keywordList.includes('alien')) {
        additionalDetails += "Advanced technology surrounds you, with holographic displays showing real-time data and automated systems maintaining life support. Through the viewports, the vastness of space stretches endlessly, dotted with distant stars and cosmic phenomena.\n\n";
    }

    if (keywordList.includes('mystery') || keywordList.includes('detective') || keywordList.includes('crime')) {
        additionalDetails += "Clues are scattered throughout the environment, some obvious and others requiring careful observation. The tension is palpable as everyone seems to be hiding something, their true motives obscured behind carefully crafted facades.\n\n";
    }

    if (keywordList.includes('history') || keywordList.includes('ancient') || keywordList.includes('medieval')) {
        additionalDetails += "The weight of history is evident in every stone and artifact. Centuries of human experience have shaped this place, leaving behind echoes of past lives and forgotten events that still influence the present.\n\n";
    }

    // If no specific keywords matched, generate generic additional details
    if (!additionalDetails) {
        additionalDetails = "The environment is rich with sensory details - distinctive sounds, smells, and textures that create a vivid atmosphere. The setting feels alive, responding to actions and events in dynamic ways.\n\n";
    }

    return additionalDetails;
}

// Function to get a specific scenario by title
function getScenarioByTitle(title) {
    return scenarioTemplates.find(scenario => scenario.title === title) || null;
}

// Function to get the Avengers scenario
function getAvengersScenario() {
    return getScenarioByTitle("Avengers: Alien Invasion");
}

// Export functions for use in other modules
window.scenarioModule = {
    generateRandomScenario,
    generateAdditionalScenarioDetails,
    getScenarioByTitle,
    getAvengersScenario,
    scenarioTemplates
};
