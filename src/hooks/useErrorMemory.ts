import { useState, useEffect, useCallback } from 'react';
import {
  ErrorEntry,
  readErrorMemory,
  addError,
  searchErrors,
  updateError,
  getErrorById
} from '../utils/errorMemory';

/**
 * React hook for working with the error memory system
 */
export function useErrorMemory() {
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Load all errors
  const refreshErrors = useCallback(() => {
    try {
      setIsLoading(true);
      const memory = readErrorMemory();
      setErrors(memory.errors);
      setLastUpdated(memory.lastUpdated);
    } catch (error) {
      console.error('Failed to load error memory:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshErrors();
  }, [refreshErrors]);

  // Add a new error
  const addNewError = useCallback((description: string, context: string, solution: string) => {
    const newError = addError(description, context, solution);
    refreshErrors();
    return newError;
  }, [refreshErrors]);

  // Search for errors
  const searchForErrors = useCallback((query: string) => {
    return searchErrors(query);
  }, []);

  // Update an error
  const updateExistingError = useCallback((
    id: string, 
    updates: Partial<Omit<ErrorEntry, 'id' | 'timestamp'>>
  ) => {
    const updated = updateError(id, updates);
    if (updated) {
      refreshErrors();
    }
    return updated;
  }, [refreshErrors]);

  // Get error by ID
  const getError = useCallback((id: string) => {
    return getErrorById(id);
  }, []);

  return {
    errors,
    isLoading,
    lastUpdated,
    refreshErrors,
    addError: addNewError,
    searchErrors: searchForErrors,
    updateError: updateExistingError,
    getError
  };
} 