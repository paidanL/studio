'use client';

import React, { useState } from 'react';

const TransactionsPage: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const [date, setDate] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          date,
          type,
          description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Transaction created with ID: ${data.id}`);
        setAmount('');
        setDate('');
        setType('');
        setDescription('');
      } else {
        setError(data.error || 'Failed to create transaction');
      }
    } catch (err) {
      setError('An error occurred while creating the transaction');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{message}</div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block mb-2">Amount:</label>
          <input
            type="number"
            id="amount"
            className="border border-gray-300 px-3 py-2 rounded w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value === '' ? '' : parseFloat(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block mb-2">Date:</label>
          <input
            type="date"
            id="date"
            className="border border-gray-300 px-3 py-2 rounded w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="type" className="block mb-2">Type:</label>
          <input
            type="text"
            id="type"
            className="border border-gray-300 px-3 py-2 rounded w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">Description:</label>
          <textarea
            id="description"
            className="border border-gray-300 px-3 py-2 rounded w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionsPage;