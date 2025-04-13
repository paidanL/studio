import React, { useState } from 'react';
import { FormHelper } from '@/components/ui/form';
import { TableHelper } from '@/components/ui/table';

interface Transaction {
  id: number;
  name: string;
  value: number;
}
const FormItem = FormHelper.Item;
const FormLabel = FormHelper.Label;
const FormInput = FormHelper.Input;
const FormButton = FormHelper.Button;

const Table = TableHelper.Table;
const TableHead = TableHelper.Head;
const TableRow = TableHelper.Row;
const TableCell = TableHelper.Cell;

const TransactionsPage: React.FC = () => { 
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionName, setTransactionName] = useState<string>('');
  const [transactionValue, setTransactionValue] = useState<number | string>('');
  const [nextId, setNextId] = useState<number>(1);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionName(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
        setTransactionValue(value === '' ? '' : parseFloat(value));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (transactionName.trim() === '' || typeof transactionValue !== 'number' || isNaN(transactionValue)) {
      return;
    }
    const newTransaction: Transaction = {
      id: nextId,
      name: transactionName,
      value: transactionValue,
    };
    setTransactions([...transactions, newTransaction]);
    setTransactionName('');
    setTransactionValue('');
    setNextId(nextId + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label htmlFor="transactionName" className="block text-gray-700">
            Transaction Name:
          </label>
          <input
            type="text"
            id="transactionName"
            value={transactionName}
            onChange={handleNameChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="transactionValue" className="block text-gray-700">
            Transaction Value:
          </label>
          <input
            type="text"
            id="transactionValue"
            value={transactionValue}
            onChange={handleValueChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Transaction
        </button>
      </form>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>{transaction.value}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionsPage;