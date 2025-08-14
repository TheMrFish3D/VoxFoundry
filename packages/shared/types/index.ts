// Core shared types for VoxFoundry application

import { z } from 'zod';

// User Management Types
export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export const CreateUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(50),
  password: z.string().min(8),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

// Book/EPUB Types
export interface Book {
  id: string;
  userId: string;
  title: string;
  author?: string;
  filePath: string;
  fileSize: number;
  uploadDate: Date;
  processingStatus: 'uploaded' | 'parsing' | 'analyzing' | 'synthesizing' | 'completed' | 'failed';
  metadata?: BookMetadata;
}

export interface BookMetadata {
  language?: string;
  publisher?: string;
  publishDate?: string;
  isbn?: string;
  description?: string;
  genres?: string[];
  wordCount?: number;
  chapterCount?: number;
}

export const UploadBookSchema = z.object({
  title: z.string().min(1).max(500),
  author: z.string().max(255).optional(),
  file: z.instanceof(File).refine(
    (file) => file.type === 'application/epub+zip' || file.name.endsWith('.epub'),
    'File must be an EPUB'
  ),
});

export type UploadBookInput = z.infer<typeof UploadBookSchema>;

// Character Types
export interface Character {
  id: string;
  bookId: string;
  name: string;
  description?: string;
  assignedVoiceId?: string;
  characterTraits?: CharacterTraits;
  dialogueCount: number;
}

export interface CharacterTraits {
  gender?: 'male' | 'female' | 'non-binary' | 'unknown';
  age?: 'child' | 'teen' | 'young-adult' | 'adult' | 'elderly';
  personality?: string[];
  role?: 'protagonist' | 'antagonist' | 'supporting' | 'minor';
  importance?: number; // 1-10 scale
}

// Voice Profile Types
export interface VoiceProfile {
  id: string;
  name: string;
  description?: string;
  gender?: 'male' | 'female' | 'non-binary';
  ageRange?: string;
  accent?: string;
  voiceCharacteristics?: VoiceCharacteristics;
  sampleFiles: string[];
  qualityScore?: number; // 0-1 scale
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoiceCharacteristics {
  pitch?: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
  tone?: 'warm' | 'cool' | 'neutral' | 'bright' | 'dark';
  pace?: 'very-slow' | 'slow' | 'medium' | 'fast' | 'very-fast';
  emotion?: 'calm' | 'energetic' | 'dramatic' | 'gentle' | 'authoritative';
  clarity?: number; // 0-1 scale
  naturalness?: number; // 0-1 scale
}

export const CreateVoiceProfileSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  gender: z.enum(['male', 'female', 'non-binary']).optional(),
  ageRange: z.string().max(50).optional(),
  accent: z.string().max(100).optional(),
});

export type CreateVoiceProfileInput = z.infer<typeof CreateVoiceProfileSchema>;

// Acting Notes Types
export interface ActingNote {
  id: string;
  bookId: string;
  characterId?: string;
  chapterNumber: number;
  paragraphIndex: number;
  originalText: string;
  actingDirection?: string;
  emotion?: string;
  tone?: string;
  emphasisWords?: string[];
  llmProvider: string;
  confidenceScore?: number; // 0-1 scale
}

export interface DialogueAnalysis {
  emotion: string;
  intensity: number; // 0-1 scale
  pace: 'slow' | 'medium' | 'fast';
  volume: 'whisper' | 'quiet' | 'normal' | 'loud' | 'shout';
  emphasis: string[];
  pauses: number[]; // positions in text for pauses
}

// AI Integration Types
export interface LLMProvider {
  name: string;
  type: 'openai' | 'anthropic' | 'google' | 'azure';
  model: string;
  apiKey: string;
  enabled: boolean;
}

export interface AnalysisContext {
  bookTitle: string;
  author?: string;
  genre?: string;
  targetAudience?: 'children' | 'young-adult' | 'adult';
  tone?: 'serious' | 'humorous' | 'dramatic' | 'casual';
}

// Voice Synthesis Types
export interface SynthesisJob {
  id: string;
  bookId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  startTime?: Date;
  endTime?: Date;
  errorMessage?: string;
  outputFiles?: string[];
}

export interface SynthesisOptions {
  voiceId: string;
  stability?: number; // 0-1 scale
  similarityBoost?: number; // 0-1 scale
  speed?: number; // 0.5-2.0
  pauseLength?: number; // milliseconds
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Error Types
export class VoxFoundryError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'VoxFoundryError';
  }
}

export class ValidationError extends VoxFoundryError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends VoxFoundryError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends VoxFoundryError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
    this.name = 'UnauthorizedError';
  }
}

// Export all types
export * from './types';
export * from './utils';
export * from './validators';
export * from './constants';