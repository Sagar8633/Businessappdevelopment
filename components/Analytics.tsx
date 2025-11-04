
import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateYearlySummary } from '../services/geminiService';
import { Transaction } from '../types';

interface AnalyticsProps {
  transactions: Transaction[];
}

const Analytics: React.FC<AnalyticsProps> = ({ transactions }) => {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const months = Array(12).fill(0).map((_, i) => ({
      name: new Date(0, i).toLocaleString('default', { month: 'short' }),
      sales: 0,
    }));
    
    transactions.forEach(t => {
      const monthIndex = new Date(t.date).getMonth();
      months[monthIndex].sales += t.salePrice;
    });

    setChartData(months);
  }, [transactions]);
  
  const handleGenerateSummary = useCallback(async () => {
    setIsLoading(true);
    try {
        const result = await generateYearlySummary(transactions);
        setSummary(result);
    } catch (e) {
        setSummary("An error occurred while generating the summary.");
    } finally {
        setIsLoading(false);
    }
  }, [transactions]);
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    compactDisplay: 'short'
  }).format(value);


  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Monthly Sales Performance</h2>
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={formatCurrency}/>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Legend />
                        <Bar dataKey="sales" fill="#3b82f6" name="Sales (INR)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">AI-Powered Yearly Summary</h2>
            <button
              onClick={handleGenerateSummary}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Summary'}
            </button>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg min-h-[300px] prose prose-sm max-w-none">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : (
                    summary ? <div dangerouslySetInnerHTML={{__html: summary.replace(/\n/g, '<br />')}} /> : <p className="text-gray-500">Click the button to generate an AI summary of your yearly business performance.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
