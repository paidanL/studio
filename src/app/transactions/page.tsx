'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TransactionsPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // This ensures the component re-renders whenever the URL changes.
  }, [router.asPath]);

  const handleButtonClick = async (action: string) => {
    setError(null); // Reset error state before making a new request
    if (action === 'add') {
      router.push('/transactions/add');
      return;
    }
    // For actions other than 'add', construct the API endpoint
    const endpoint = `/api/transactions?action=${action}`;
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to perform action: ${action}`);
      }
      // Handle successful response, e.g., show a success message or update the UI
      console.log(`Action ${action} successful`);
    } catch (err: any) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Actions</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Button to navigate to the new transaction form */}
        <button onClick={() => handleButtonClick('add')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New Transaction</button>
        {/* Buttons for other API calls */}
        <button onClick={() => handleButtonClick('get')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Get Transactions</button>
        <button onClick={() => handleButtonClick('update')} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Update Transactions</button>
        <button onClick={() => handleButtonClick('delete')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Transactions</button>
        {/* Add more buttons as needed for other actions */}
      </div>
    </div>
  );
};

export default TransactionsPage;