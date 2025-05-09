import fs from 'fs';
import path from 'path';
import { ErrorEntry, ErrorMemory } from './errorMemory';

/**
 * Utility for Claude to interact with error memory
 * These functions can be used by Claude directly in chat sessions
 */

// Path to the error memory file
const ERROR_MEMORY_PATH = path.join(process.cwd(), 'src/utils/error-memory.json');

/**
 * Read the current error memory
 */
export function readMemory(): ErrorMemory {
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
export function addErrorToMemory(description: string, context: string, solution: string): ErrorEntry {
  const memory = readMemory();
  
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
export function findErrors(query: string): ErrorEntry[] {
  const memory = readMemory();
  const lowerQuery = query.toLowerCase();
  
  return memory.errors.filter(error => 
    error.description.toLowerCase().includes(lowerQuery) ||
    error.context.toLowerCase().includes(lowerQuery) ||
    error.solution.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all errors as a formatted string for Claude to read
 */
export function getAllErrorsFormatted(): string {
  const memory = readMemory();
  
  if (memory.errors.length === 0) {
    return "No errors have been recorded in memory yet.";
  }
  
  return memory.errors.map(error => `
ID: ${error.id}
Description: ${error.description}
Context: ${error.context}
Solution: ${error.solution}
Added: ${new Date(error.timestamp).toLocaleString()}
--------------------------
  `).join('\n');
}

/**
 * Check if the error memory contains errors related to a specific topic
 */
export function hasErrorsRelatedTo(topic: string): boolean {
  return findErrors(topic).length > 0;
}

/**
 * Get the most recent errors (up to a specified limit)
 */
export function getRecentErrors(limit: number = 5): ErrorEntry[] {
  const memory = readMemory();
  
  return [...memory.errors]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

/**
 * Format a single error for display
 */
export function formatError(error: ErrorEntry): string {
  return `
ID: ${error.id}
Description: ${error.description}
Context: ${error.context}
Solution: ${error.solution}
Added: ${new Date(error.timestamp).toLocaleString()}
  `;
}

/**
 * Helper function for Claude to recall similar errors
 * when encountering a new problem
 */
export function recallSimilarErrors(problem: string): string {
  const similars = findErrors(problem);
  
  if (similars.length === 0) {
    return "No similar errors found in memory.";
  }
  
  return `Found ${similars.length} similar errors:\n\n` + 
    similars.map(formatError).join('\n--------------------------\n');
} 