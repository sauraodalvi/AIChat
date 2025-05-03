// Story arc utility functions for Velora
// Handles story phase tracking and progression

/**
 * Initialize a story arc based on the scenario type and prompt
 * 
 * @param {string} scenarioTitle - The title of the scenario
 * @param {string} scenarioPrompt - The scenario description
 * @param {string} scenarioTheme - The theme of the scenario (e.g., "superhero", "fantasy")
 * @returns {Object} - Initial story arc object
 */
function initializeStoryArc(scenarioTitle, scenarioPrompt, scenarioTheme) {
  // Default story arc structure
  const storyArc = {
    title: scenarioTitle,
    theme: scenarioTheme || detectThemeFromPrompt(scenarioPrompt),
    currentPhase: 'introduction',
    currentGoal: '',
    currentTension: 'medium',
    keyCharacters: [],
    keyLocations: [],
    plotPoints: [],
    currentContext: '',
    previousContext: '',
  };

  // Customize based on known scenarios
  if (scenarioTitle === "Avengers: Alien Invasion" && scenarioTheme === "superhero") {
    return {
      ...storyArc,
      currentPhase: 'conflict',
      currentGoal: 'Defend New York City from the alien invasion',
      currentTension: 'high',
      keyCharacters: ['Iron Man', 'Captain America', 'Thor', 'Hulk'],
      keyLocations: ['New York City', 'Alien Mothership', 'Stark Tower'],
      plotPoints: [
        'Aliens have begun their invasion of New York',
        'The Avengers are fighting to protect civilians',
        'The team needs to find the aliens\' weakness',
        'The final battle will take place on the mothership'
      ],
      currentContext: 'The Avengers are in the midst of battle against alien forces in downtown New York. Civilians are being evacuated while the team fights to push back the invasion. The alien mothership looms overhead, continuously sending down reinforcements. The team needs to coordinate their defense while looking for a way to stop the invasion at its source.',
    };
  } else if (scenarioTheme === "fantasy") {
    return {
      ...storyArc,
      currentPhase: 'introduction',
      currentTension: 'building',
      currentContext: 'The party has just begun their adventure, getting to know one another and establishing their quest objectives.',
    };
  } else if (scenarioTheme === "scifi") {
    return {
      ...storyArc,
      currentPhase: 'introduction',
      currentTension: 'building',
      currentContext: 'The crew is aboard their spacecraft, preparing for the challenges that lie ahead in the vast unknown of space.',
    };
  } else if (scenarioTheme === "mystery") {
    return {
      ...storyArc,
      currentPhase: 'discovery',
      currentTension: 'building',
      currentContext: 'The first clues have been discovered, raising more questions than answers as the investigation begins.',
    };
  }

  // For custom scenarios, extract context from the prompt
  return {
    ...storyArc,
    currentContext: extractContextFromPrompt(scenarioPrompt),
  };
}

/**
 * Update the story arc based on recent chat messages
 * 
 * @param {Object} currentArc - The current story arc
 * @param {Array} recentMessages - Recent chat messages
 * @param {number} messageCount - Number of messages to analyze
 * @returns {Object} - Updated story arc
 */
function updateStoryArc(currentArc, recentMessages, messageCount = 5) {
  if (!currentArc || !recentMessages || recentMessages.length === 0) {
    return currentArc;
  }

  // Get the most recent messages for analysis
  const messagesToAnalyze = recentMessages.slice(-messageCount);
  
  // Extract key information from recent messages
  const combinedContent = messagesToAnalyze
    .map(msg => msg.text)
    .join(' ');
  
  // Create a copy of the current arc to update
  const updatedArc = { ...currentArc };
  
  // Store previous context
  updatedArc.previousContext = currentArc.currentContext;
  
  // Check for phase transitions
  if (currentArc.currentPhase === 'introduction' && 
      (combinedContent.includes('attack') || 
       combinedContent.includes('fight') || 
       combinedContent.includes('battle'))) {
    updatedArc.currentPhase = 'conflict';
    updatedArc.currentTension = 'high';
  } else if (currentArc.currentPhase === 'conflict' && 
            (combinedContent.includes('plan') || 
             combinedContent.includes('strategy') || 
             combinedContent.includes('weakness'))) {
    updatedArc.currentPhase = 'planning';
  } else if (currentArc.currentPhase === 'planning' && 
            (combinedContent.includes('final') || 
             combinedContent.includes('confront') || 
             combinedContent.includes('ready'))) {
    updatedArc.currentPhase = 'climax';
    updatedArc.currentTension = 'very high';
  } else if (currentArc.currentPhase === 'climax' && 
            (combinedContent.includes('victory') || 
             combinedContent.includes('defeated') || 
             combinedContent.includes('over'))) {
    updatedArc.currentPhase = 'resolution';
    updatedArc.currentTension = 'falling';
  }
  
  // Update context based on phase changes
  if (updatedArc.currentPhase !== currentArc.currentPhase) {
    updatedArc.currentContext = updateContextForPhase(updatedArc);
  }
  
  return updatedArc;
}

/**
 * Update context based on the current story phase
 * 
 * @param {Object} currentArc - The current story arc
 * @returns {string} - Updated context description
 */
function updateContextForPhase(currentArc) {
  let updatedContext = currentArc.currentContext;
  
  // Update context based on theme and phase
  if (currentArc.theme === "superhero") {
    if (currentArc.title === "Avengers: Alien Invasion") {
      if (currentArc.currentPhase === 'introduction') {
        updatedContext = `The Avengers have assembled in response to reports of unusual activity in the skies above New York. Initial scans suggest an alien presence, but the full scale of the threat is not yet known.`;
      } else if (currentArc.currentPhase === 'conflict') {
        updatedContext = `The alien invasion is in full swing. The streets of New York are chaotic as civilians flee and structures are damaged. The Avengers are engaged in battle, trying to contain the threat and protect the people.`;
      } else if (currentArc.currentPhase === 'planning') {
        updatedContext = `The team has gained some ground against the alien forces. Now they need to analyze the aliens' technology and tactics to find a weakness. The mothership remains the primary target, but they need a plan to reach it and shut it down.`;
      } else if (currentArc.currentPhase === 'climax') {
        updatedContext = `The Avengers have identified the aliens' weakness and are preparing for a final assault on the mothership. This will be the decisive battle that determines the fate of New York City and possibly the world.`;
      } else if (currentArc.currentPhase === 'resolution') {
        updatedContext = `The alien threat has been neutralized. The city is safe, though damaged. The team can now reflect on their victory and begin the process of rebuilding.`;
      }
    }
  } else if (currentArc.theme === "fantasy") {
    if (currentArc.currentPhase === 'introduction') {
      updatedContext = `The party members are getting acquainted in a tavern, sharing stories and learning about each other's abilities. A quest awaits, but first they must build trust.`;
    } else if (currentArc.currentPhase === 'conflict') {
      updatedContext = `The party has encountered their first major obstacle - whether a monster, a rival group, or a natural barrier. They must work together to overcome it.`;
    } else if (currentArc.currentPhase === 'planning') {
      updatedContext = `Having faced initial challenges, the party now understands the true scope of their quest. They must gather information, resources, and allies before proceeding.`;
    } else if (currentArc.currentPhase === 'climax') {
      updatedContext = `The final challenge lies before them - a dragon's lair, an ancient temple, or a dark wizard's tower. Everything they've learned will be put to the test.`;
    } else if (currentArc.currentPhase === 'resolution') {
      updatedContext = `The quest has been completed. The party celebrates their victory, divides their rewards, and considers what adventures might lie ahead.`;
    }
  } else if (currentArc.theme === "scifi") {
    if (currentArc.currentPhase === 'introduction') {
      updatedContext = `The crew is aboard their spacecraft, receiving their mission briefing and checking systems. The vastness of space awaits them.`;
    } else if (currentArc.currentPhase === 'conflict') {
      updatedContext = `An unexpected anomaly, hostile ship, or system failure has created an immediate threat. The crew must respond quickly to survive.`;
    } else if (currentArc.currentPhase === 'planning') {
      updatedContext = `Having survived the initial crisis, the crew must analyze data, repair systems, or negotiate with alien entities to find a path forward.`;
    } else if (currentArc.currentPhase === 'climax') {
      updatedContext = `The final challenge approaches - a wormhole jump, a confrontation with the main antagonist, or a race against time to prevent catastrophe.`;
    } else if (currentArc.currentPhase === 'resolution') {
      updatedContext = `The mission is complete. The crew has survived and succeeded, though perhaps changed by their experiences. They prepare for the journey home or their next assignment.`;
    }
  }
  
  return updatedContext;
}

/**
 * Generate writing instructions based on the current story arc
 * 
 * @param {Object} storyArc - The current story arc
 * @param {Object} character - The character who will be speaking
 * @returns {Object} - Writing instructions object
 */
function generateWritingInstructions(storyArc, character) {
  if (!storyArc) return null;
  
  const instructions = {
    storyArc: storyArc.currentPhase,
    writingStyle: 'balanced',
    responseLength: 'medium',
    characterReminders: '',
    generalNotes: ''
  };
  
  // Customize based on story phase
  if (storyArc.currentPhase === 'introduction') {
    instructions.generalNotes = 'Focus on establishing character relationships and setting the scene. Keep tension moderate but building.';
  } else if (storyArc.currentPhase === 'conflict') {
    instructions.generalNotes = 'Emphasize action and immediate threats. Responses should be urgent and focused on the current battle.';
  } else if (storyArc.currentPhase === 'planning') {
    instructions.generalNotes = 'Focus on strategy and analysis. Characters should be thinking about next steps and discussing the enemy\'s weaknesses.';
  } else if (storyArc.currentPhase === 'climax') {
    instructions.generalNotes = 'This is the height of tension. Responses should be dramatic and decisive. Every action has major consequences.';
  } else if (storyArc.currentPhase === 'resolution') {
    instructions.generalNotes = 'Focus on reflection, celebration, and looking to the future. The main conflict has been resolved.';
  }
  
  // Add character-specific reminders
  if (character) {
    instructions.characterReminders = `Remember that ${character.name} is ${character.description.split('.')[0]}. Their current mood is ${character.mood}.`;
  }
  
  return instructions;
}

/**
 * Detect theme from scenario prompt
 * 
 * @param {string} prompt - The scenario prompt
 * @returns {string} - Detected theme
 */
function detectThemeFromPrompt(prompt) {
  if (!prompt) return 'general';
  
  const promptLower = prompt.toLowerCase();
  
  if (promptLower.includes('magic') || 
      promptLower.includes('dragon') || 
      promptLower.includes('sword') || 
      promptLower.includes('quest') ||
      promptLower.includes('wizard')) {
    return 'fantasy';
  } else if (promptLower.includes('space') || 
             promptLower.includes('alien') || 
             promptLower.includes('future') || 
             promptLower.includes('robot') ||
             promptLower.includes('technology')) {
    return 'scifi';
  } else if (promptLower.includes('detective') || 
             promptLower.includes('crime') || 
             promptLower.includes('clue') || 
             promptLower.includes('mystery')) {
    return 'mystery';
  } else if (promptLower.includes('superhero') || 
             promptLower.includes('power') || 
             promptLower.includes('villain') || 
             promptLower.includes('hero')) {
    return 'superhero';
  } else if (promptLower.includes('history') || 
             promptLower.includes('century') || 
             promptLower.includes('ancient') || 
             promptLower.includes('medieval')) {
    return 'historical';
  } else if (promptLower.includes('romance') || 
             promptLower.includes('love') || 
             promptLower.includes('relationship')) {
    return 'romance';
  }
  
  return 'general';
}

/**
 * Extract context from scenario prompt
 * 
 * @param {string} prompt - The scenario prompt
 * @returns {string} - Extracted context
 */
function extractContextFromPrompt(prompt) {
  if (!prompt) return '';
  
  // For a simple implementation, just return the prompt
  // In a more sophisticated version, this would extract key elements
  return prompt;
}

// Export functions
window.storyArcUtils = {
  initializeStoryArc,
  updateStoryArc,
  generateWritingInstructions,
  detectThemeFromPrompt,
  extractContextFromPrompt
};
