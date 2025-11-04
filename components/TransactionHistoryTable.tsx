
import React, { useState } from 'react';
import { Transaction } from '../types';
import InvoiceModal from './InvoiceModal';

interface TransactionHistoryTableProps {
  transactions: Transaction[];
  showInvoiceButton: boolean;
}

const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({ transactions, showInvoiceButton }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB');

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tractor</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Price</th>
              {showInvoiceButton && <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">{formatDate(transaction.date)}</td>
                <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.tractor.name}</td>
                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">{transaction.customer.name}</td>
                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">{formatCurrency(transaction.salePrice)}</td>
                {showInvoiceButton && (
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                        <button
                            onClick={() => setSelectedTransaction(transaction)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            View Invoice
                        </button>
                    </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedTransaction && (
        <InvoiceModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </>
  );
};

export default TransactionHistoryTable;
