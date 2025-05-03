// Character utility functions for Velora
// Handles character response generation with enhanced features

/**
 * Generate a response from a character based on the message and chat history
 *
 * @param {Object} character - The character object
 * @param {string} message - The message to respond to
 * @param {Array} chatHistory - The chat history
 * @param {Object} storyPhase - Current story phase information
 * @param {Object} chatRoom - Optional chat room object containing scenario information
 * @param {Array} relationships - Optional array of character relationships
 * @returns {string} - The generated response
 */
function generateCharacterResponse(character, message, chatHistory, storyPhase = {}, chatRoom = null, relationships = []) {
  // Extract character properties
  const { 
    name, 
    description, 
    mood = 'neutral', 
    voiceStyle = '', 
    personality = {}, 
    catchphrases = [],
    type = 'modern',
    role = ''
  } = character;

  // Extract personality traits with defaults
  const analyticalLevel = personality.analytical || 5;
  const emotionalLevel = personality.emotional || 5;
  const humorLevel = personality.humor || 5;
  const philosophicalLevel = personality.philosophical || 5;
  const confidenceLevel = personality.confidence || 5;

  // Extract story phase information
  const currentPhase = storyPhase.currentPhase || 'introduction';
  const currentContext = storyPhase.currentContext || '';

  // Extract keywords from the message
  const keywords = message.toLowerCase().split(/\s+/).filter(word => word.length > 3);
  const messageTopics = extractTopics(message);

  // Base templates for different response types
  let templates = [];

  // Add templates based on character type
  if (type === 'fantasy') {
    templates = [
      `I sense there's more to ${messageTopics[0] || 'this matter'} than meets the eye.`,
      `The ancient wisdom speaks of such things as ${messageTopics[0] || 'this'}...`,
      `By the powers that guide us, I shall consider what you say about ${messageTopics[0] || 'this matter'}.`
    ];
  } else if (type === 'scifi') {
    templates = [
      `My scanners indicate interesting patterns in what you say about ${messageTopics[0] || 'this topic'}.`,
      `According to my calculations, ${messageTopics[0] || 'this'} has a 78.3% probability of success.`,
      `I've analyzed multiple timelines where ${messageTopics[0] || 'this scenario'} plays out differently.`
    ];
  } else if (type === 'historical') {
    templates = [
      `In my experience, matters like ${messageTopics[0] || 'this'} require careful consideration.`,
      `History has taught us much about ${messageTopics[0] || 'such situations'}.`,
      `As they said in my time, "${messageTopics[0] || 'This'} tests the mettle of one's character."`
    ];
  } else {
    templates = [
      `I've been thinking about ${messageTopics[0] || 'that'} quite a bit lately.`,
      `That's an interesting perspective on ${messageTopics[0] || 'things'}.`,
      `I wonder what would happen if we approached ${messageTopics[0] || 'this'} differently.`
    ];
  }

  // Select a template
  const template = templates[Math.floor(Math.random() * templates.length)];

  // Build the response components
  let selfReference = '';
  let moodPrefix = '';
  let historyReference = '';
  let relationshipReference = '';
  let characterSpecificContent = '';
  let catchphrase = '';
  let voiceStyleInfluence = '';
  let roleBasedContent = '';
  let storyPhaseContent = '';

  // Add self-reference based on confidence
  if (confidenceLevel > 7 && Math.random() > 0.5) {
    selfReference = `As ${name}, ${description.split('.')[0]}. `;
  }

  // Add mood-based prefix
  if (mood && mood !== 'neutral') {
    const moodPrefixes = {
      'angry': `*with barely contained anger* `,
      'sad': `*sighing deeply* `,
      'happy': `*smiling brightly* `,
      'excited': `*with visible excitement* `,
      'nervous': `*fidgeting slightly* `,
      'thoughtful': `*pondering carefully* `,
      'mysterious': `*with an enigmatic expression* `,
      'intense': `*intensely focused* `,
      'confident': `*confidently* `,
      'determined': `*with determination* `
    };
    
    moodPrefix = moodPrefixes[mood.toLowerCase()] || `*${mood}* `;
  }

  // Add reference to chat history if analytical
  if (analyticalLevel > 7 && chatHistory.length > 2) {
    const previousTopic = extractTopics(chatHistory[chatHistory.length - 2]?.text || '')[0];
    if (previousTopic) {
      historyReference = `Regarding our earlier discussion about ${previousTopic}, `;
    }
  }

  // Add relationship reference if available
  if (relationships.length > 0 && Math.random() > 0.7) {
    const relationship = relationships[Math.floor(Math.random() * relationships.length)];
    relationshipReference = `${relationship.targetName}, ${relationship.description}. `;
  }

  // Add catchphrase if available (30% chance)
  if (catchphrases.length > 0 && Math.random() > 0.7) {
    catchphrase = ` ${catchphrases[Math.floor(Math.random() * catchphrases.length)]}`;
  }

  // Add voice style influence
  if (voiceStyle && Math.random() > 0.6) {
    voiceStyleInfluence = ` *${voiceStyle.split(' ')[0]}*`;
  }

  // Add role-based content
  if (role && Math.random() > 0.7) {
    const rolePhrases = {
      'leader': ` As the leader, I must consider what's best for everyone.`,
      'healer': ` I sense your energy is troubled by this.`,
      'warrior': ` We must be prepared to fight if necessary.`,
      'scholar': ` The ancient texts speak of similar situations.`,
      'rogue': ` I know a few tricks that might help with this.`,
      'captain': ` I've navigated through worse storms than this.`,
      'detective': ` There are several clues we're overlooking here.`,
      'mentor': ` Let me share some wisdom that might help you.`,
      'creator': ` I could craft something to address this problem.`
    };
    
    roleBasedContent = rolePhrases[role.toLowerCase()] || ` As a ${role}, I have unique insight into this.`;
  }

  // Add story phase content
  if (currentPhase) {
    const phaseContent = {
      'introduction': ` We're just getting started here.`,
      'conflict': ` We need to address this threat immediately.`,
      'planning': ` We should develop a strategy before proceeding.`,
      'climax': ` This is the moment that will define everything.`,
      'resolution': ` Now that we've overcome the challenge, we can reflect.`
    };
    
    if (Math.random() > 0.7) {
      storyPhaseContent = phaseContent[currentPhase] || '';
    }
  }

  // Adjust response based on personality traits
  let personalityAdjustment = '';
  
  if (analyticalLevel > 7) {
    personalityAdjustment = ` I've analyzed this extensively and found ${Math.floor(Math.random() * 3) + 2} distinct factors at play.`;
  } else if (emotionalLevel > 7) {
    personalityAdjustment = ` I feel strongly that ${messageTopics[0] || 'this'} matters deeply to all of us.`;
  } else if (humorLevel > 7) {
    personalityAdjustment = ` Though I must say, talking about ${messageTopics[0] || 'this'} always makes me smile.`;
  } else if (philosophicalLevel > 7) {
    personalityAdjustment = ` This question has deeper implications than most realize.`;
  }

  // Construct the final response
  let finalResponse = '';
  
  // Determine if we should add a character action (30% chance)
  const shouldAddAction = Math.random() < 0.3;
  let characterAction = '';
  
  if (shouldAddAction) {
    // Generate action based on character type
    if (type === 'fantasy') {
      const fantasyActions = [
        `*traces ancient runes in the air*`,
        `*adjusts magical amulet thoughtfully*`,
        `*whispers an incantation under breath*`,
        `*eyes briefly glow with mystical energy*`,
        `*cloak billows slightly from magical energy*`
      ];
      characterAction = fantasyActions[Math.floor(Math.random() * fantasyActions.length)];
    } else if (type === 'scifi') {
      const scifiActions = [
        `*checks readings on wrist device*`,
        `*adjusts neural interface settings*`,
        `*scans surroundings with holographic visor*`,
        `*cybernetic implants pulse briefly*`,
        `*taps sequence on digital console*`
      ];
      characterAction = scifiActions[Math.floor(Math.random() * scifiActions.length)];
    } else if (type === 'historical') {
      const historicalActions = [
        `*adjusts period attire with practiced grace*`,
        `*consults a weathered journal briefly*`,
        `*straightens posture according to proper etiquette*`,
        `*gestures with formal decorum*`,
        `*touches family heirloom for reassurance*`
      ];
      characterAction = historicalActions[Math.floor(Math.random() * historicalActions.length)];
    } else {
      const modernActions = [
        `*runs hand through hair thoughtfully*`,
        `*leans forward with interest*`,
        `*gestures expressively while speaking*`,
        `*takes a moment to collect thoughts*`,
        `*shifts posture to face you directly*`
      ];
      characterAction = modernActions[Math.floor(Math.random() * modernActions.length)];
    }
  }

  // Determine response length based on context
  const isLongResponse = Math.random() > 0.5;
  
  if (isLongResponse) {
    // Longer, more detailed response
    finalResponse = `${characterAction ? characterAction + '\n\n' : ''}${selfReference}${moodPrefix}${historyReference}${relationshipReference}${template}${characterSpecificContent}${catchphrase}${voiceStyleInfluence}${roleBasedContent}${storyPhaseContent}${personalityAdjustment}`;
  } else {
    // Shorter, more direct response
    finalResponse = `${characterAction ? characterAction + '\n\n' : ''}${moodPrefix}${template}${catchphrase}`;
  }

  return finalResponse;
}

/**
 * Generate a character interaction response when one character responds to another
 *
 * @param {Object} respondingCharacter - The character who is responding
 * @param {string} targetCharacterName - The name of the character being responded to
 * @param {string} targetMessage - The message being responded to
 * @param {Array} chatHistory - The chat history
 * @param {Array} relationships - Array of character relationships
 * @returns {string} - The generated interaction response
 */
function generateCharacterInteraction(respondingCharacter, targetCharacterName, targetMessage, chatHistory, relationships = []) {
  // Get relationship between characters if it exists
  const relationship = relationships.find(r => 
    (r.sourceName === respondingCharacter.name && r.targetName === targetCharacterName) ||
    (r.targetName === respondingCharacter.name && r.sourceName === targetCharacterName)
  );

  // Generate response with relationship context
  let response = '';
  
  if (relationship) {
    // Use relationship to influence response
    if (relationship.attitude > 7) {
      // Positive relationship
      response = `*acknowledging ${targetCharacterName} with respect* `;
    } else if (relationship.attitude < 4) {
      // Negative relationship
      response = `*regarding ${targetCharacterName} with suspicion* `;
    } else {
      // Neutral relationship
      response = `*turning to ${targetCharacterName}* `;
    }
  } else {
    // Default interaction without established relationship
    response = `*addressing ${targetCharacterName}* `;
  }

  // Add the main response
  response += generateCharacterResponse(respondingCharacter, targetMessage, chatHistory);

  return response;
}

/**
 * Extract main topics from a message
 * 
 * @param {string} message - The message to analyze
 * @returns {Array} - Array of main topics
 */
function extractTopics(message) {
  if (!message) return [];
  
  // Simple keyword extraction (could be enhanced with NLP in a real implementation)
  const words = message.toLowerCase().split(/\s+/);
  const stopWords = ['the', 'and', 'or', 'but', 'because', 'as', 'if', 'when', 'than', 'then', 'that', 'this', 'these', 'those'];
  
  // Filter out stop words and short words
  const keywords = words.filter(word => !stopWords.includes(word) && word.length > 3);
  
  // Return up to 3 keywords as topics
  return keywords.slice(0, 3);
}

// Export functions
window.characterUtils = {
  generateCharacterResponse,
  generateCharacterInteraction,
  extractTopics
};
