// Scenario functionality

// Sample scenario templates
const scenarioTemplates = [
    {
        id: 1,
        title: "Fantasy Adventure",
        description: "Embark on an epic quest in a magical realm filled with wonder and danger.",
        type: "fantasy",
        characterTypes: ["fantasy"]
    },
    {
        id: 2,
        title: "Sci-Fi Exploration",
        description: "Venture into the unknown reaches of space, encountering alien civilizations and cosmic mysteries.",
        type: "scifi",
        characterTypes: ["scifi"]
    },
    {
        id: 3,
        title: "Historical Mystery",
        description: "Unravel secrets and solve puzzles in a richly detailed historical setting.",
        type: "historical",
        characterTypes: ["historical"]
    },
    {
        id: 4,
        title: "Modern Drama",
        description: "Navigate relationships, conflicts, and personal growth in contemporary settings.",
        type: "modern",
        characterTypes: ["modern"]
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
        characters: selectedCharacters.length > 0 ? selectedCharacters : []
    };
    
    return scenario;
}

// Export functions for use in other modules
window.scenarioModule = {
    generateRandomScenario,
    scenarioTemplates
};
