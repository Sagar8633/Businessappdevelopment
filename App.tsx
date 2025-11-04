
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import InventoryList from './components/InventoryList';
import TransactionHistory from './components/TransactionHistory';
import Analytics from './components/Analytics';
import useMockData from './hooks/useMockData';

export type Page = 'dashboard' | 'inventory' | 'transactions' | 'analytics';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const mockData = useMockData();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard {...mockData} setCurrentPage={setCurrentPage} />;
      case 'inventory':
        return <InventoryList {...mockData} />;
      case 'transactions':
        return <TransactionHistory {...mockData} />;
      case 'analytics':
        return <Analytics {...mockData} />;
      default:
        return <Dashboard {...mockData} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
