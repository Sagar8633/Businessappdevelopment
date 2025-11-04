
import { useState } from 'react';
import { Tractor, Transaction, Customer, TractorStatus } from '../types';

const initialTractors: Tractor[] = [
  { id: 'T001', name: 'John Deere 5075E', model: '5 Series', year: 2022, purchasePrice: 45000, listingPrice: 55000, status: TractorStatus.Available, imageUrl: 'https://picsum.photos/seed/T001/600/400', description: 'A reliable and powerful utility tractor, perfect for a variety of tasks on the farm.' },
  { id: 'T002', name: 'Case IH Farmall 100A', model: 'Farmall A Series', year: 2021, purchasePrice: 58000, listingPrice: 69000, status: TractorStatus.Available, imageUrl: 'https://picsum.photos/seed/T002/600/400', description: 'Experience superior comfort and performance with this versatile and efficient tractor.' },
  { id: 'T003', name: 'New Holland T4', model: 'T4 Series', year: 2020, purchasePrice: 38000, listingPrice: 46000, status: TractorStatus.Sold, imageUrl: 'https://picsum.photos/seed/T003/600/400', description: 'Compact yet powerful, this tractor is ideal for smaller farms and tight spaces.' },
  { id: 'T004', name: 'Kubota M7', model: 'M7 Series', year: 2023, purchasePrice: 95000, listingPrice: 110000, status: TractorStatus.Available, imageUrl: 'https://picsum.photos/seed/T004/600/400', description: 'Top-of-the-line performance and technology for demanding agricultural operations.' },
];

const initialTransactions: Transaction[] = [
  { id: 'TRN001', tractor: initialTractors[2], customer: { id: 'C001', name: 'Rajesh Kumar', address: '123 Farmingdale Rd, Punjab', phone: '9876543210', email: 'rajesh.k@example.com' }, salePrice: 45500, date: '2023-08-15' },
];

const useMockData = () => {
  const [tractors, setTractors] = useState<Tractor[]>(initialTractors);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTractor = (tractor: Omit<Tractor, 'id' | 'status' | 'imageUrl'>) => {
    const newTractor: Tractor = {
      ...tractor,
      id: `T${String(tractors.length + 1).padStart(3, '0')}`,
      status: TractorStatus.Available,
      imageUrl: `https://picsum.photos/seed/T${tractors.length + 1}/600/400`,
    };
    setTractors(prev => [newTractor, ...prev]);
  };

  const updateTractor = (updatedTractor: Tractor) => {
    setTractors(prev => prev.map(t => t.id === updatedTractor.id ? updatedTractor : t));
  };
  
  const addTransaction = (tractor: Tractor, customer: Omit<Customer, 'id'>, salePrice: number) => {
    const newCustomer: Customer = {
        ...customer,
        id: `C${String(transactions.length+1).padStart(3, '0')}`
    };

    const newTransaction: Transaction = {
        id: `TRN${String(transactions.length + 1).padStart(3, '0')}`,
        tractor,
        customer: newCustomer,
        salePrice,
        date: new Date().toISOString().split('T')[0],
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    updateTractor({ ...tractor, status: TractorStatus.Sold });
  };

  return { tractors, transactions, addTractor, updateTractor, addTransaction };
};

export default useMockData;
