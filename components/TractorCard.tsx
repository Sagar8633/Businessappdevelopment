
import React, { useState } from 'react';
import { Tractor, TractorStatus, Customer } from '../types';

interface TractorCardProps {
  tractor: Tractor;
  onEdit: (tractor: Tractor) => void;
  onSell: (tractor: Tractor, customer: Omit<Customer, 'id'>, salePrice: number) => void;
}

const SellModal: React.FC<{
    tractor: Tractor;
    onClose: () => void;
    onConfirm: (customer: Omit<Customer, 'id'>, salePrice: number) => void;
}> = ({ tractor, onClose, onConfirm }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [salePrice, setSalePrice] = useState(tractor.listingPrice);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const customer = { name: customerName, address: customerAddress, phone: customerPhone, email: customerEmail };
        onConfirm(customer, salePrice);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Sell Tractor: {tractor.name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4">
                        <input type="text" placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} required className="p-2 border rounded" />
                        <input type="text" placeholder="Customer Address" value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} required className="p-2 border rounded" />
                        <input type="tel" placeholder="Customer Phone" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} required className="p-2 border rounded" />
                         <input type="email" placeholder="Customer Email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} required className="p-2 border rounded" />
                        <input type="number" placeholder="Sale Price" value={salePrice} onChange={e => setSalePrice(Number(e.target.value))} required className="p-2 border rounded" />
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Confirm Sale</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const TractorCard: React.FC<TractorCardProps> = ({ tractor, onEdit, onSell }) => {
    const [showSellModal, setShowSellModal] = useState(false);

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    
    const handleConfirmSale = (customer: Omit<Customer, 'id'>, salePrice: number) => {
        onSell(tractor, customer, salePrice);
        setShowSellModal(false);
    }
  
    const isAvailable = tractor.status === TractorStatus.Available;
    const statusColor = isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105 duration-300">
                <img src={tractor.imageUrl} alt={tractor.name} className="w-full h-48 object-cover"/>
                <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-800">{tractor.name}</h3>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor}`}>{tractor.status}</span>
                    </div>
                    <p className="text-sm text-gray-500">{tractor.model} - {tractor.year}</p>
                    <p className="text-sm text-gray-600 my-2 flex-grow">{tractor.description}</p>
                    
                    <div className="mt-auto pt-2">
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(tractor.listingPrice)}</p>
                        <p className="text-xs text-gray-500">Purchase Price: {formatCurrency(tractor.purchasePrice)}</p>

                        <div className="mt-4 flex space-x-2">
                            <button onClick={() => onEdit(tractor)} className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm font-semibold">Edit</button>
                            {isAvailable && (
                                <button onClick={() => setShowSellModal(true)} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm font-semibold">Sell</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showSellModal && <SellModal tractor={tractor} onClose={() => setShowSellModal(false)} onConfirm={handleConfirmSale} />}
        </>
    );
};

export default TractorCard;
