import React, { useState } from 'react';
import { useErrorMemory } from '../../hooks/useErrorMemory';
import { ErrorEntry } from '../../utils/errorMemory';

const ErrorMemoryManager: React.FC = () => {
  const {
    errors,
    isLoading,
    lastUpdated,
    addError,
    searchErrors,
    updateError
  } = useErrorMemory();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ErrorEntry[]>([]);
  const [isAddingError, setIsAddingError] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    context: '',
    solution: ''
  });
  const [editingErrorId, setEditingErrorId] = useState<string | null>(null);

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results = searchErrors(searchQuery);
    setSearchResults(results);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission for adding new error
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { description, context, solution } = formData;
    
    if (!description || !solution) {
      alert('Description and solution are required');
      return;
    }
    
    addError(description, context, solution);
    setFormData({ description: '', context: '', solution: '' });
    setIsAddingError(false);
  };

  // Handle starting to edit an error
  const startEditing = (error: ErrorEntry) => {
    setEditingErrorId(error.id);
    setFormData({
      description: error.description,
      context: error.context,
      solution: error.solution
    });
  };

  // Handle form submission for editing an error
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingErrorId) return;
    
    const { description, context, solution } = formData;
    
    if (!description || !solution) {
      alert('Description and solution are required');
      return;
    }
    
    updateError(editingErrorId, { description, context, solution });
    setFormData({ description: '', context: '', solution: '' });
    setEditingErrorId(null);
  };

  // Cancel form submission
  const cancelForm = () => {
    setFormData({ description: '', context: '', solution: '' });
    setIsAddingError(false);
    setEditingErrorId(null);
  };

  // Display loading state
  if (isLoading) {
    return <div className="p-4">Loading error memory...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Error Memory Manager</h2>
      
      {/* Last updated info */}
      <p className="text-sm text-gray-500 mb-4">
        Last updated: {new Date(lastUpdated).toLocaleString()}
      </p>
      
      {/* Search section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search errors..."
            className="flex-1 p-2 border rounded"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        
        {searchResults.length > 0 && (
          <div className="mt-2">
            <h3 className="font-semibold mb-2">Search Results ({searchResults.length})</h3>
            <ul className="space-y-2">
              {searchResults.map(error => (
                <li key={error.id} className="p-3 bg-white rounded shadow">
                  <h4 className="font-medium">{error.description}</h4>
                  <p className="text-sm text-gray-600 mt-1">{error.solution}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Add error button */}
      {!isAddingError && !editingErrorId && (
        <button
          onClick={() => setIsAddingError(true)}
          className="mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New Error
        </button>
      )}
      
      {/* Add/Edit error form */}
      {(isAddingError || editingErrorId) && (
        <form 
          onSubmit={editingErrorId ? handleEditSubmit : handleAddSubmit} 
          className="mb-6 p-4 bg-gray-50 rounded-lg"
        >
          <h3 className="font-semibold mb-4">
            {editingErrorId ? 'Edit Error' : 'Add New Error'}
          </h3>
          
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Describe the error"
              className="w-full p-2 border rounded"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1 font-medium">Context</label>
            <textarea
              name="context"
              placeholder="When does this error occur?"
              className="w-full p-2 border rounded h-24"
              value={formData.context}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1 font-medium">Solution</label>
            <textarea
              name="solution"
              placeholder="How to solve this error"
              className="w-full p-2 border rounded h-24"
              value={formData.solution}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingErrorId ? 'Update Error' : 'Add Error'}
            </button>
            <button
              type="button"
              onClick={cancelForm}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      {/* List of all errors */}
      <div>
        <h3 className="font-semibold mb-4">All Errors ({errors.length})</h3>
        {errors.length === 0 ? (
          <p className="text-gray-500">No errors in memory yet.</p>
        ) : (
          <ul className="space-y-4">
            {errors.map(error => (
              <li key={error.id} className="p-4 bg-white rounded shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{error.description}</h4>
                  <button 
                    onClick={() => startEditing(error)}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </div>
                
                <div className="text-sm mb-2">
                  <span className="font-medium text-gray-700">Context: </span>
                  <span className="text-gray-600">{error.context}</span>
                </div>
                
                <div className="text-sm mb-2">
                  <span className="font-medium text-gray-700">Solution: </span>
                  <span className="text-gray-600">{error.solution}</span>
                </div>
                
                <div className="text-xs text-gray-400 mt-2">
                  ID: {error.id} • Added: {new Date(error.timestamp).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ErrorMemoryManager; 