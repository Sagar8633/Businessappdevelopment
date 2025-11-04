
import React, { useState } from 'react';
import { Tractor, TractorStatus } from '../types';
import TractorCard from './TractorCard';
import TractorForm from './TractorForm';
import useMockData from '../hooks/useMockData';

type InventoryListProps = ReturnType<typeof useMockData>;

const InventoryList: React.FC<InventoryListProps> = ({ tractors, addTractor, updateTractor, addTransaction }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTractor, setEditingTractor] = useState<Tractor | null>(null);

  const handleEdit = (tractor: Tractor) => {
    setEditingTractor(tractor);
    setShowForm(true);
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTractor(null);
  };
  
  const handleSaveTractor = (tractorData: Omit<Tractor, 'id' | 'status' | 'imageUrl'>) => {
    if (editingTractor) {
        const updated: Tractor = { ...editingTractor, ...tractorData };
        updateTractor(updated);
    } else {
        addTractor(tractorData);
    }
    handleCloseForm();
  };

  const availableTractors = tractors.filter(t => t.status === TractorStatus.Available);
  const soldTractors = tractors.filter(t => t.status === TractorStatus.Sold);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Inventory</h1>
        <button
          onClick={() => { setEditingTractor(null); setShowForm(true); }}
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          + Add Tractor
        </button>
      </div>

      {showForm && (
        <TractorForm
          onClose={handleCloseForm}
          onSave={handleSaveTractor}
          tractor={editingTractor}
        />
      )}
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Available Tractors ({availableTractors.length})</h2>
        {availableTractors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {availableTractors.map(tractor => (
                    <TractorCard key={tractor.id} tractor={tractor} onEdit={handleEdit} onSell={addTransaction}/>
                ))}
            </div>
        ) : (
            <p className="text-gray-500 italic">No tractors currently available.</p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Sold Tractors ({soldTractors.length})</h2>
        {soldTractors.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {soldTractors.map(tractor => (
                    <TractorCard key={tractor.id} tractor={tractor} onEdit={handleEdit} onSell={addTransaction}/>
                ))}
            </div>
        ) : (
            <p className="text-gray-500 italic">No tractors have been sold yet.</p>
        )}
      </section>
    </div>
  );
};

export default InventoryList;
