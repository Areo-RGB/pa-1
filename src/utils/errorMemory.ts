import fs from 'fs';
import path from 'path';

export interface ErrorEntry {
  id: string;
  description: string;
  context: string;
  solution: string;
  timestamp: string;
}

export interface ErrorMemory {
  errors: ErrorEntry[];
  lastUpdated: string;
}

const ERROR_MEMORY_PATH = path.join(process.cwd(), 'src/utils/error-memory.json');

/**
 * Read the current error memory
 */
export function readErrorMemory(): ErrorMemory {
  try {
    const data = fs.readFileSync(ERROR_MEMORY_PATH, 'utf8');
    return JSON.parse(data) as ErrorMemory;
  } catch (error) {
    // If file doesn't exist or has invalid JSON, return empty error memory
    return {
      errors: [],
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Add a new error to the memory
 */
export function addError(description: string, context: string, solution: string): ErrorEntry {
  const memory = readErrorMemory();
  
  // Generate a new ID
  const id = `err-${String(memory.errors.length + 1).padStart(3, '0')}`;
  
  const newError: ErrorEntry = {
    id,
    description,
    context,
    solution,
    timestamp: new Date().toISOString()
  };
  
  memory.errors.push(newError);
  memory.lastUpdated = new Date().toISOString();
  
  // Save the updated memory
  fs.writeFileSync(ERROR_MEMORY_PATH, JSON.stringify(memory, null, 2), 'utf8');
  
  return newError;
}

/**
 * Search for errors by partial text match
 */
export function searchErrors(query: string): ErrorEntry[] {
  const memory = readErrorMemory();
  const lowerQuery = query.toLowerCase();
  
  return memory.errors.filter(error => 
    error.description.toLowerCase().includes(lowerQuery) ||
    error.context.toLowerCase().includes(lowerQuery) ||
    error.solution.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Update an existing error entry
 */
export function updateError(id: string, updates: Partial<Omit<ErrorEntry, 'id' | 'timestamp'>>): ErrorEntry | null {
  const memory = readErrorMemory();
  const errorIndex = memory.errors.findIndex(err => err.id === id);
  
  if (errorIndex === -1) {
    return null;
  }
  
  memory.errors[errorIndex] = {
    ...memory.errors[errorIndex],
    ...updates,
    timestamp: new Date().toISOString() // Update timestamp
  };
  
  memory.lastUpdated = new Date().toISOString();
  fs.writeFileSync(ERROR_MEMORY_PATH, JSON.stringify(memory, null, 2), 'utf8');
  
  return memory.errors[errorIndex];
}

/**
 * Get all errors in the memory
 */
export function getAllErrors(): ErrorEntry[] {
  return readErrorMemory().errors;
}

/**
 * Get a specific error by ID
 */
export function getErrorById(id: string): ErrorEntry | undefined {
  return readErrorMemory().errors.find(err => err.id === id);
} 