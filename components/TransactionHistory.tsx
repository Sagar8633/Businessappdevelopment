
import React from 'react';
import useMockData from '../hooks/useMockData';
import TransactionHistoryTable from './TransactionHistoryTable';

type TransactionHistoryProps = Pick<ReturnType<typeof useMockData>, 'transactions'>;

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Transaction History</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {transactions.length > 0 ? (
          <TransactionHistoryTable transactions={transactions} showInvoiceButton={true} />
        ) : (
          <p className="text-gray-500 italic text-center py-8">No transactions have been recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
