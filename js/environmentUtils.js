// Environment utility functions for Velora
// Handles environmental events and scene transitions

/**
 * Generate environmental events based on scenario type and current context
 * 
 * @param {Array} chatHistory - The chat history
 * @param {Object} scenario - The current scenario
 * @param {string} scenarioType - The type of scenario (adventure, mystery, etc.)
 * @param {boolean} isMajorEvent - Whether this should be a major event (more impactful)
 * @returns {string} - A description of the environmental event
 */
function generateEnvironmentalEvent(chatHistory, scenario, scenarioType = 'adventure', isMajorEvent = false) {
  // Extract recent topics from chat history
  const recentMessages = chatHistory.slice(-5);
  const recentTopics = extractTopicsFromMessages(recentMessages);
  
  // Select appropriate event pool based on scenario type
  let eventPool = [];
  
  if (scenarioType === 'fantasy') {
    eventPool = isMajorEvent ? majorFantasyEvents : minorFantasyEvents;
  } else if (scenarioType === 'scifi') {
    eventPool = isMajorEvent ? majorScifiEvents : minorScifiEvents;
  } else if (scenarioType === 'mystery') {
    eventPool = isMajorEvent ? majorMysteryEvents : minorMysteryEvents;
  } else if (scenarioType === 'superhero') {
    eventPool = isMajorEvent ? majorSuperheroEvents : minorSuperheroEvents;
  } else if (scenarioType === 'historical') {
    eventPool = isMajorEvent ? majorHistoricalEvents : minorHistoricalEvents;
  } else {
    eventPool = isMajorEvent ? majorGeneralEvents : minorGeneralEvents;
  }
  
  // Select a random event from the pool
  let event = eventPool[Math.floor(Math.random() * eventPool.length)];
  
  // If we have topics, try to incorporate them into the event
  if (recentTopics.length > 0 && Math.random() > 0.5) {
    const topic = recentTopics[Math.floor(Math.random() * recentTopics.length)];
    
    // Create topic-specific events
    const topicEvents = [
      `**The conversation about ${topic} is interrupted by a sudden change in the environment.**`,
      `**As if responding to the mention of ${topic}, the surroundings shift dramatically.**`,
      `**The mention of ${topic} seems to have triggered something in the environment.**`
    ];
    
    event = topicEvents[Math.floor(Math.random() * topicEvents.length)];
  }
  
  return event;
}

/**
 * Extract topics from messages
 * 
 * @param {Array} messages - Array of message objects
 * @returns {Array} - Array of topics
 */
function extractTopicsFromMessages(messages) {
  if (!messages || messages.length === 0) return [];
  
  // Combine all message text
  const combinedText = messages.map(msg => msg.text || '').join(' ');
  
  // Extract topics (simple implementation)
  const words = combinedText.toLowerCase().split(/\s+/);
  const stopWords = ['the', 'and', 'or', 'but', 'because', 'as', 'if', 'when', 'than', 'then', 'that', 'this', 'these', 'those'];
  
  // Filter out stop words and short words
  const topics = words.filter(word => !stopWords.includes(word) && word.length > 4);
  
  // Return unique topics
  return [...new Set(topics)];
}

// Event pools for different scenario types
const minorFantasyEvents = [
  "**A gentle breeze carries the scent of distant flowers through the area.**",
  "**The light shifts as clouds pass overhead, casting moving shadows.**",
  "**A small magical creature darts past, leaving a trail of sparkling dust.**",
  "**The ambient magic in the area causes small objects to float momentarily.**",
  "**Distant chimes can be heard, perhaps from a nearby village or temple.**",
  "**The temperature drops suddenly, causing everyone's breath to become visible.**",
  "**Ancient runes on a nearby wall begin to glow faintly.**",
  "**A flock of exotic birds passes overhead, their calls echoing.**"
];

const majorFantasyEvents = [
  "**The ground trembles violently! Cracks appear in the earth, and everyone struggles to maintain balance.**",
  "**A massive portal tears open in the air nearby, swirling with arcane energy and unknown possibilities.**",
  "**The sky darkens unnaturally as storm clouds gather with impossible speed. Lightning strikes nearby!**",
  "**Ancient statues around the area suddenly animate, their stone eyes following everyone's movements.**",
  "**A deafening roar echoes from the distance - something massive is approaching.**",
  "**The very fabric of reality seems to waver, causing disorienting visual distortions for everyone.**",
  "**A powerful magical surge sweeps through the area, causing all enchanted items to activate simultaneously.**",
  "**The moon suddenly turns blood red, casting an eerie crimson light over everything.**"
];

const minorScifiEvents = [
  "**The ship's systems emit a series of diagnostic beeps as routine checks complete.**",
  "**Holographic displays flicker with incoming data streams.**",
  "**The artificial gravity fluctuates momentarily, causing a brief sensation of weightlessness.**",
  "**Distant mechanical sounds echo through the corridors.**",
  "**The environmental systems adjust, creating a subtle change in temperature.**",
  "**A service drone passes by, carrying out its programmed tasks.**",
  "**The viewport shows a passing asteroid field, beautiful but distant.**",
  "**Communication channels briefly fill with static before clearing again.**"
];

const majorScifiEvents = [
  "**WARNING! Multiple system failures detected! Red emergency lights flash as alarms blare throughout the ship.**",
  "**A massive energy surge overloads nearby systems, causing explosions and electrical arcs!**",
  "**The ship violently shudders as it's hit by something massive. Artificial gravity fails momentarily!**",
  "**Proximity alarms scream as an unidentified vessel drops out of hyperspace dangerously close!**",
  "**The AI system suddenly announces a quarantine protocol activation. Bulkheads begin sealing!**",
  "**A temporal anomaly engulfs the area, causing time to flow inconsistently for several moments!**",
  "**The main power core begins an unexpected shutdown sequence. Backup systems engage.**",
  "**A blinding flash outside the viewports reveals a nearby star undergoing an unexpected event!**"
];

const minorMysteryEvents = [
  "**A creaking floorboard breaks the silence, though no one appears to have moved.**",
  "**The lights flicker briefly, casting momentary shadows.**",
  "**A distant clock chimes an incorrect hour.**",
  "**The temperature drops noticeably in one corner of the room.**",
  "**A door that was closed is now slightly ajar.**",
  "**The scent of an unfamiliar perfume or cologne wafts through the air.**",
  "**Papers on a desk rustle as if disturbed by a breeze, though the windows are closed.**",
  "**A reflection in a mirror or window seems to move independently for just a moment.**"
];

const majorMysteryEvents = [
  "**The lights suddenly go out completely! When they return seconds later, something in the room has changed.**",
  "**A previously locked door flies open with tremendous force, revealing a hidden passage!**",
  "**A crucial piece of evidence spontaneously changes its appearance or location!**",
  "**A disembodied voice delivers a cryptic warning that echoes throughout the room!**",
  "**The discovery of a hidden message reveals that someone present has been lying all along!**",
  "**A previously unnoticed secret compartment dramatically reveals itself, containing shocking evidence!**",
  "**An unexpected witness arrives with information that changes everything about the case!**",
  "**A violent thunderstorm erupts outside, and in a flash of lightning, a shadowy figure is visible through the window!**"
];

const minorSuperheroEvents = [
  "**Distant sirens can be heard as emergency vehicles respond to incidents across the city.**",
  "**Breaking news alerts appear on nearby screens, reporting on recent events.**",
  "**Civilians point and stare as they recognize the heroes in their midst.**",
  "**The sky briefly lights up with unusual energy patterns, possibly from another hero's powers.**",
  "**Communication devices buzz with updates from headquarters or team members.**",
  "**A helicopter passes overhead, its searchlight scanning the area below.**",
  "**The ground trembles slightly from distant superhuman activity.**",
  "**Weather patterns shift unnaturally, possibly due to powered individuals elsewhere.**"
];

const majorSuperheroEvents = [
  "**BOOM! A massive explosion rocks the area as a building or vehicle is destroyed nearby!**",
  "**The sky tears open as a portal to another dimension forms above the city!**",
  "**Civilians scream and run for cover as debris rains down from damaged structures!**",
  "**A known supervillain makes a dramatic entrance, challenging the heroes directly!**",
  "**The hero's communication system broadcasts an urgent distress call from allies!**",
  "**A massive robot or alien craft suddenly appears, towering over the surrounding buildings!**",
  "**Power across the entire area fails as something or someone absorbs the electrical grid!**",
  "**The ground shakes violently as something massive emerges from beneath the streets!**"
];

const minorHistoricalEvents = [
  "**A messenger arrives with a sealed letter for someone in the vicinity.**",
  "**The town crier passes by, announcing local news and royal decrees.**",
  "**Church bells ring in the distance, marking the hour or a significant event.**",
  "**A carriage or horseman passes by, splashing through puddles on the cobblestone street.**",
  "**The weather shifts, bringing a light rain or clearing to sunshine.**",
  "**Merchants call out their wares in a nearby marketplace.**",
  "**A group of soldiers marches past, their armor and weapons gleaming.**",
  "**Music from a street performer or tavern creates a fitting atmosphere.**"
];

const majorHistoricalEvents = [
  "**The warning bells ring frantically throughout the town! An attack or disaster is imminent!**",
  "**A royal procession unexpectedly arrives, forcing everyone to bow or show respect!**",
  "**Flames and smoke become visible as a fire breaks out in a nearby structure!**",
  "**Armed soldiers burst in, searching for someone or something with urgent purpose!**",
  "**A public execution or punishment is announced, drawing crowds to the town square!**",
  "**Cannons or explosions are heard as a battle begins or moves closer to the area!**",
  "**A plague victim collapses in the street, causing panic among the witnesses!**",
  "**A famous historical figure makes a surprise appearance, changing the course of events!**"
];

const minorGeneralEvents = [
  "**The wind picks up, rustling leaves and papers.**",
  "**Distant thunder signals an approaching storm.**",
  "**The lighting in the room changes as clouds pass over the sun.**",
  "**A phone rings or a notification sounds from nearby.**",
  "**Someone passes by outside, briefly visible through a window.**",
  "**The ambient temperature noticeably shifts warmer or cooler.**",
  "**A clock chimes, marking the hour.**",
  "**The scent of food or drink wafts in from another room.**"
];

const majorGeneralEvents = [
  "**A tremendous crash is heard as something large falls or breaks nearby!**",
  "**The power suddenly fails, plunging the area into darkness!**",
  "**Someone bursts in with urgent news that demands immediate attention!**",
  "**A violent storm erupts outside, with wind and rain lashing against the windows!**",
  "**An alarm blares, signaling an emergency situation!**",
  "**The ground shakes in a minor earthquake, rattling objects and nerves alike!**",
  "**Shouting and commotion outside indicate some kind of disturbance or fight!**",
  "**A previously unnoticed threat suddenly reveals itself in dramatic fashion!**"
];

// Export functions
window.environmentUtils = {
  generateEnvironmentalEvent,
  extractTopicsFromMessages
};
