
import React, { useState, useCallback } from 'react';
import { Tractor } from '../types';
import { generateTractorDescription } from '../services/geminiService';

interface TractorFormProps {
  onClose: () => void;
  onSave: (tractor: Omit<Tractor, 'id' | 'status' | 'imageUrl'>) => void;
  tractor: Tractor | null;
}

const TractorForm: React.FC<TractorFormProps> = ({ onClose, onSave, tractor }) => {
  const [formData, setFormData] = useState({
    name: tractor?.name || '',
    model: tractor?.model || '',
    year: tractor?.year || new Date().getFullYear(),
    purchasePrice: tractor?.purchasePrice || 0,
    listingPrice: tractor?.listingPrice || 0,
    description: tractor?.description || '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'year' || name.includes('Price') ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const handleGenerateDescription = useCallback(async () => {
    const { name, model, year } = formData;
    if (!name || !model || !year) {
      alert("Please fill in Name, Model, and Year to generate a description.");
      return;
    }
    setIsGenerating(true);
    const details = `Name: ${name}, Model: ${model}, Year: ${year}`;
    try {
      const description = await generateTractorDescription(details);
      setFormData(prev => ({ ...prev, description }));
    } catch (error) {
      console.error(error);
      // user-facing error is handled in the service
    } finally {
      setIsGenerating(false);
    }
  }, [formData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{tractor ? 'Edit Tractor' : 'Add New Tractor'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Tractor Name (e.g., John Deere 5075E)" value={formData.name} onChange={handleChange} required className="p-3 border rounded-lg" />
              <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleChange} required className="p-3 border rounded-lg" />
              <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required className="p-3 border rounded-lg" />
              <input type="number" name="purchasePrice" placeholder="Purchase Price" value={formData.purchasePrice} onChange={handleChange} required className="p-3 border rounded-lg" />
              <input type="number" name="listingPrice" placeholder="Listing Price" value={formData.listingPrice} onChange={handleChange} required className="p-3 border rounded-lg" />
            </div>
            <div className="mt-4">
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows={4} className="w-full p-3 border rounded-lg"></textarea>
              <button 
                type="button" 
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  'Generate Description with AI ✨'
                )}
              </button>
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-end space-x-4 rounded-b-xl">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 font-semibold">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">Save Tractor</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TractorForm;
