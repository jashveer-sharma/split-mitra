import { useState } from 'react';

export default function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    onAddExpense({
      name,
      amount: parseFloat(amount),
      reason
    });
    setName('');
    setAmount('');
    setReason('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="w-full p-2 rounded bg-[#2b1e1e] border border-primary"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="w-full p-2 rounded bg-[#2b1e1e] border border-primary"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <input
        className="w-full p-2 rounded bg-[#2b1e1e] border border-primary"
        placeholder="Reason"
        value={reason}
        onChange={e => setReason(e.target.value)}
      />
      <button className="bg-primary text-white w-full p-2 rounded">Add Expense</button>
    </form>
  );
}
