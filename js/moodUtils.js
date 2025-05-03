// Mood utility functions for Velora
// Handles character mood tracking and changes

/**
 * Initialize a character's mood state
 * 
 * @param {Object} character - The character object
 * @returns {Object} - The initial mood state
 */
function initializeMoodState(character) {
  return {
    characterId: character.name,
    baseMood: character.mood || 'Neutral',
    currentMood: character.mood || 'Neutral',
    intensity: 5, // Range from 1-10
    triggers: [], // What caused mood changes
    lastChange: null, // Timestamp of last mood change
    history: [] // History of mood changes
  };
}

/**
 * Get a mood state for a character, or create it if it doesn't exist
 * 
 * @param {Array} moodStates - Array of all mood states
 * @param {string} characterId - Character's identifier (name)
 * @param {Object} character - The character object (used if state needs to be created)
 * @returns {Object} - The mood state object
 */
function getMoodState(moodStates, characterId, character) {
  // Check if mood state exists
  const existingState = moodStates.find(state => state.characterId === characterId);
  
  if (existingState) {
    return existingState;
  }
  
  // Create new mood state if it doesn't exist
  const newState = initializeMoodState(character);
  moodStates.push(newState);
  return newState;
}

/**
 * Update a character's mood based on an interaction
 * 
 * @param {Object} moodState - The mood state to update
 * @param {string} trigger - What triggered the mood change
 * @param {number} emotionalImpact - How much to change the mood (-3 to +3)
 * @param {string} interactionType - Type of interaction (e.g., 'agreement', 'disagreement', 'question', 'help')
 * @returns {Object} - The updated mood state
 */
function updateMood(moodState, trigger, emotionalImpact, interactionType) {
  // Create a copy of the mood state to update
  const updatedState = { ...moodState };
  
  // Add to mood history
  const moodChange = {
    timestamp: new Date().toISOString(),
    previousMood: updatedState.currentMood,
    trigger: trigger,
    impact: emotionalImpact,
    type: interactionType
  };
  
  updatedState.history = [moodChange, ...updatedState.history].slice(0, 10);
  updatedState.lastChange = moodChange.timestamp;
  
  // Update intensity based on emotional impact
  updatedState.intensity = Math.max(1, Math.min(10, updatedState.intensity + emotionalImpact));
  
  // Update current mood based on intensity and impact
  if (emotionalImpact >= 2) {
    // Strong positive impact
    updatedState.currentMood = getPositiveMood(updatedState.baseMood, updatedState.intensity);
  } else if (emotionalImpact <= -2) {
    // Strong negative impact
    updatedState.currentMood = getNegativeMood(updatedState.baseMood, updatedState.intensity);
  } else if (updatedState.intensity <= 3) {
    // Low intensity - return to neutral
    updatedState.currentMood = 'Neutral';
  }
  
  // Add trigger
  updatedState.triggers.push(trigger);
  if (updatedState.triggers.length > 5) {
    updatedState.triggers.shift(); // Keep only the 5 most recent triggers
  }
  
  return updatedState;
}

/**
 * Get a positive mood variant based on base mood and intensity
 * 
 * @param {string} baseMood - The character's base mood
 * @param {number} intensity - The intensity level (1-10)
 * @returns {string} - A positive mood variant
 */
function getPositiveMood(baseMood, intensity) {
  const baseMoodLower = baseMood.toLowerCase();
  
  // High intensity positive moods
  if (intensity >= 8) {
    if (baseMoodLower.includes('angry') || baseMoodLower.includes('stern')) {
      return 'Satisfied';
    } else if (baseMoodLower.includes('sad') || baseMoodLower.includes('gloomy')) {
      return 'Relieved';
    } else if (baseMoodLower.includes('serious') || baseMoodLower.includes('stoic')) {
      return 'Pleased';
    } else {
      return 'Ecstatic';
    }
  }
  
  // Medium intensity positive moods
  if (intensity >= 5) {
    if (baseMoodLower.includes('angry') || baseMoodLower.includes('stern')) {
      return 'Approving';
    } else if (baseMoodLower.includes('sad') || baseMoodLower.includes('gloomy')) {
      return 'Hopeful';
    } else if (baseMoodLower.includes('serious') || baseMoodLower.includes('stoic')) {
      return 'Amused';
    } else {
      return 'Happy';
    }
  }
  
  // Low intensity positive moods
  return 'Content';
}

/**
 * Get a negative mood variant based on base mood and intensity
 * 
 * @param {string} baseMood - The character's base mood
 * @param {number} intensity - The intensity level (1-10)
 * @returns {string} - A negative mood variant
 */
function getNegativeMood(baseMood, intensity) {
  const baseMoodLower = baseMood.toLowerCase();
  
  // High intensity negative moods
  if (intensity >= 8) {
    if (baseMoodLower.includes('happy') || baseMoodLower.includes('cheerful')) {
      return 'Disappointed';
    } else if (baseMoodLower.includes('calm') || baseMoodLower.includes('peaceful')) {
      return 'Agitated';
    } else if (baseMoodLower.includes('confident') || baseMoodLower.includes('proud')) {
      return 'Humiliated';
    } else {
      return 'Furious';
    }
  }
  
  // Medium intensity negative moods
  if (intensity >= 5) {
    if (baseMoodLower.includes('happy') || baseMoodLower.includes('cheerful')) {
      return 'Concerned';
    } else if (baseMoodLower.includes('calm') || baseMoodLower.includes('peaceful')) {
      return 'Tense';
    } else if (baseMoodLower.includes('confident') || baseMoodLower.includes('proud')) {
      return 'Defensive';
    } else {
      return 'Angry';
    }
  }
  
  // Low intensity negative moods
  return 'Annoyed';
}

/**
 * Determine if a mood change should be announced
 * 
 * @param {Object} previousState - The previous mood state
 * @param {Object} currentState - The current mood state
 * @returns {boolean} - Whether the mood change should be announced
 */
function shouldAnnounceMoodChange(previousState, currentState) {
  // Don't announce if the mood hasn't changed
  if (previousState.currentMood === currentState.currentMood) {
    return false;
  }
  
  // Always announce high intensity mood changes
  if (currentState.intensity >= 8) {
    return true;
  }
  
  // Announce medium intensity changes with 50% probability
  if (currentState.intensity >= 5) {
    return Math.random() > 0.5;
  }
  
  // Announce low intensity changes with 20% probability
  return Math.random() > 0.8;
}

/**
 * Get a description of a mood change
 * 
 * @param {Object} character - The character whose mood changed
 * @param {string} previousMood - The previous mood
 * @param {string} currentMood - The current mood
 * @returns {string} - A description of the mood change
 */
function getMoodChangeDescription(character, previousMood, currentMood) {
  const name = character.name;
  const type = character.type || 'modern';
  
  // Fantasy character mood changes
  if (type === 'fantasy') {
    if (isPositiveChange(previousMood, currentMood)) {
      return `**${name}'s expression brightens, a magical aura briefly shimmering around them as their mood shifts to ${currentMood.toLowerCase()}.**`;
    } else {
      return `**${name}'s eyes darken, the air around them growing heavy as their mood becomes ${currentMood.toLowerCase()}.**`;
    }
  }
  
  // Sci-fi character mood changes
  else if (type === 'scifi') {
    if (isPositiveChange(previousMood, currentMood)) {
      return `**${name}'s neural indicators shift to a positive spectrum as their mood changes to ${currentMood.toLowerCase()}.**`;
    } else {
      return `**${name}'s biometric readings show increased stress patterns as their mood turns ${currentMood.toLowerCase()}.**`;
    }
  }
  
  // Historical character mood changes
  else if (type === 'historical') {
    if (isPositiveChange(previousMood, currentMood)) {
      return `**${name}'s demeanor softens, their formal posture relaxing slightly as they become ${currentMood.toLowerCase()}.**`;
    } else {
      return `**${name} adjusts their attire with tension evident in their movements, their mood now ${currentMood.toLowerCase()}.**`;
    }
  }
  
  // Default/modern character mood changes
  else {
    if (isPositiveChange(previousMood, currentMood)) {
      return `**${name}'s body language shifts, becoming more open and animated as their mood changes to ${currentMood.toLowerCase()}.**`;
    } else {
      return `**${name}'s expression clouds over, their posture becoming more guarded as their mood turns ${currentMood.toLowerCase()}.**`;
    }
  }
}

/**
 * Determine if a mood change is positive
 * 
 * @param {string} previousMood - The previous mood
 * @param {string} currentMood - The current mood
 * @returns {boolean} - Whether the change is positive
 */
function isPositiveChange(previousMood, currentMood) {
  const positiveMoods = ['happy', 'content', 'pleased', 'ecstatic', 'joyful', 'excited', 'amused', 'satisfied', 'hopeful', 'relieved'];
  const negativeMoods = ['angry', 'sad', 'annoyed', 'furious', 'disappointed', 'concerned', 'tense', 'agitated', 'defensive', 'humiliated'];
  
  const prevIsNegative = negativeMoods.some(mood => previousMood.toLowerCase().includes(mood));
  const currIsPositive = positiveMoods.some(mood => currentMood.toLowerCase().includes(mood));
  
  return currIsPositive || (prevIsNegative && !negativeMoods.some(mood => currentMood.toLowerCase().includes(mood)));
}

// Export functions
window.moodUtils = {
  initializeMoodState,
  getMoodState,
  updateMood,
  shouldAnnounceMoodChange,
  getMoodChangeDescription
};
