
import React from 'react';
import { Tractor, Transaction, TractorStatus } from '../types';
import { Page } from '../App';
import TransactionHistoryTable from './TransactionHistoryTable';

interface DashboardProps {
  tractors: Tractor[];
  transactions: Transaction[];
  setCurrentPage: (page: Page) => void;
}

const StatCard: React.FC<{ title: string; value: string; color: string; }> = ({ title, value, color }) => (
    <div className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${color}`}>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ tractors, transactions, setCurrentPage }) => {
    const availableTractors = tractors.filter(t => t.status === TractorStatus.Available).length;
    const totalInventoryValue = tractors
        .filter(t => t.status === TractorStatus.Available)
        .reduce((sum, t) => sum + t.listingPrice, 0);
    
    const monthlySales = transactions
        .filter(t => new Date(t.date).getMonth() === new Date().getMonth())
        .reduce((sum, t) => sum + t.salePrice, 0);

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Available Tractors" value={String(availableTractors)} color="border-blue-500" />
                <StatCard title="Total Inventory Value" value={formatCurrency(totalInventoryValue)} color="border-green-500" />
                <StatCard title="Sales This Month" value={formatCurrency(monthlySales)} color="border-yellow-500" />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Recent Transactions</h2>
                    <button 
                        onClick={() => setCurrentPage('transactions')} 
                        className="text-blue-600 hover:underline font-medium"
                    >
                        View All
                    </button>
                </div>
                <TransactionHistoryTable transactions={transactions.slice(0, 5)} showInvoiceButton={false} />
            </div>
        </div>
    );
};

export default Dashboard;
