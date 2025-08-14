// Application constants for VoxFoundry

// File Upload Limits
export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const ALLOWED_EPUB_TYPES = ['application/epub+zip'];
export const ALLOWED_AUDIO_TYPES = ['audio/wav', 'audio/mp3', 'audio/ogg'];

// Processing Limits
export const MAX_CHARACTERS_PER_BOOK = 50;
export const MAX_VOICE_SAMPLES_PER_PROFILE = 20;
export const MIN_VOICE_SAMPLE_DURATION = 5; // seconds
export const MAX_VOICE_SAMPLE_DURATION = 300; // 5 minutes

// AI Provider Settings
export const LLM_PROVIDERS = {
  OPENAI: {
    name: 'OpenAI',
    models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    maxTokens: 4096,
  },
  ANTHROPIC: {
    name: 'Anthropic',
    models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    maxTokens: 4096,
  },
  GOOGLE: {
    name: 'Google',
    models: ['gemini-pro', 'gemini-pro-vision'],
    maxTokens: 4096,
  },
} as const;

export const TTS_PROVIDERS = {
  ELEVENLABS: {
    name: 'ElevenLabs',
    maxCharacters: 5000,
    supportedFormats: ['mp3', 'wav'],
  },
  AZURE: {
    name: 'Azure Speech',
    maxCharacters: 10000,
    supportedFormats: ['mp3', 'wav', 'ogg'],
  },
  GOOGLE: {
    name: 'Google TTS',
    maxCharacters: 5000,
    supportedFormats: ['mp3', 'wav'],
  },
} as const;

// Voice Characteristics
export const VOICE_GENDERS = ['male', 'female', 'non-binary'] as const;
export const AGE_RANGES = ['child', 'teen', 'young-adult', 'adult', 'elderly'] as const;
export const VOICE_TONES = ['warm', 'cool', 'neutral', 'bright', 'dark'] as const;
export const VOICE_EMOTIONS = ['calm', 'energetic', 'dramatic', 'gentle', 'authoritative'] as const;

// Audio Settings
export const AUDIO_FORMATS = {
  MP3: { extension: 'mp3', mimeType: 'audio/mpeg' },
  WAV: { extension: 'wav', mimeType: 'audio/wav' },
  OGG: { extension: 'ogg', mimeType: 'audio/ogg' },
} as const;

export const AUDIO_QUALITY = {
  LOW: { bitrate: 64, sampleRate: 22050 },
  MEDIUM: { bitrate: 128, sampleRate: 44100 },
  HIGH: { bitrate: 320, sampleRate: 48000 },
} as const;

// Rate Limiting
export const RATE_LIMITS = {
  API_REQUESTS: {
    window: 15 * 60 * 1000, // 15 minutes
    max: 100,
  },
  FILE_UPLOADS: {
    window: 60 * 60 * 1000, // 1 hour
    max: 10,
  },
  AI_REQUESTS: {
    window: 60 * 60 * 1000, // 1 hour
    max: 50,
  },
} as const;

// Processing Status
export const PROCESSING_STATUS = {
  UPLOADED: 'uploaded',
  PARSING: 'parsing',
  ANALYZING: 'analyzing',
  SYNTHESIZING: 'synthesizing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

// Character Roles
export const CHARACTER_ROLES = {
  PROTAGONIST: 'protagonist',
  ANTAGONIST: 'antagonist',
  SUPPORTING: 'supporting',
  MINOR: 'minor',
} as const;

// Emotion Categories
export const EMOTIONS = [
  'anger', 'anticipation', 'disgust', 'fear', 'joy', 'sadness', 'surprise', 'trust',
  'love', 'hate', 'excitement', 'boredom', 'pride', 'shame', 'anxiety', 'relief'
] as const;

// Acting Directions
export const ACTING_DIRECTIONS = [
  'whispered', 'shouted', 'laughing', 'crying', 'confused', 'confident',
  'hesitant', 'rushed', 'deliberate', 'sarcastic', 'sincere', 'mysterious'
] as const;

// Error Codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  PROCESSING_FAILED: 'PROCESSING_FAILED',
  AI_PROVIDER_ERROR: 'AI_PROVIDER_ERROR',
  VOICE_SYNTHESIS_ERROR: 'VOICE_SYNTHESIS_ERROR',
} as const;

// Default Values
export const DEFAULTS = {
  PAGINATION: {
    limit: 20,
    maxLimit: 100,
  },
  VOICE_QUALITY_THRESHOLD: 0.7,
  CONFIDENCE_THRESHOLD: 0.8,
  SYNTHESIS_SPEED: 1.0,
  PAUSE_LENGTH: 500, // milliseconds
} as const;