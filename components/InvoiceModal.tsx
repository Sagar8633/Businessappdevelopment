
import React, { useRef } from 'react';
import { Transaction } from '../types';

interface InvoiceModalProps {
  transaction: Transaction;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ transaction, onClose }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB');

  const handlePrint = () => {
    const printContent = invoiceRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;
    if (printContent) {
        document.body.innerHTML = `<html><head><title>Print</title><script src="https://cdn.tailwindcss.com"></script></head><body class="p-8">${printContent}</body></html>`;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // Reload to restore React app state
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div ref={invoiceRef} className="p-8 md:p-12">
            <div className="flex justify-between items-start border-b pb-6 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Kunal Tractors</h1>
                    <p className="text-gray-500">123 Tractor Lane, Punjab, India</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700">INVOICE</h2>
                    <p className="text-gray-500">#{transaction.id}</p>
                    <p className="text-gray-500">Date: {formatDate(transaction.date)}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="font-semibold text-gray-600 mb-2">BILL TO</h3>
                    <p className="font-bold text-gray-800">{transaction.customer.name}</p>
                    <p className="text-gray-500">{transaction.customer.address}</p>
                    <p className="text-gray-500">{transaction.customer.phone}</p>
                    <p className="text-gray-500">{transaction.customer.email}</p>
                </div>
            </div>

            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 font-semibold text-sm">Item</th>
                        <th className="p-3 font-semibold text-sm text-right">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="p-3">
                            <p className="font-bold">{transaction.tractor.name}</p>
                            <p className="text-sm text-gray-600">{transaction.tractor.model} - {transaction.tractor.year}</p>
                        </td>
                        <td className="p-3 text-right">{formatCurrency(transaction.salePrice)}</td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-end mt-8">
                <div className="w-full max-w-xs">
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(transaction.salePrice)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-t-2 border-gray-300">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-lg">{formatCurrency(transaction.salePrice)}</span>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center text-sm text-gray-500">
                <p>Thank you for your business!</p>
            </div>
        </div>
        <div className="bg-gray-50 p-4 flex justify-end space-x-3 rounded-b-lg">
          <button onClick={onClose} className="px-6 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">Close</button>
          <button onClick={handlePrint} className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">Print</button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
