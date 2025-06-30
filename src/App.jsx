import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import PieChartSummary from './components/PieChartSummary';
import SplitSummary from './components/SplitSummary';
import ExpensesList from './components/ExpensesList';
import SettleUpButton from './components/SettleUpButton';
import HistoryLog from './components/HistoryLog';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [expenses, setExpenses] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleAddExpense = (expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const handleSettle = () => {
    if (expenses.length === 0) return;

    // Save current expenses as a history block
    setHistory(prev => [
      ...prev,
      {
        date: new Date().toLocaleString(),
        expenses
      }
    ]);

    setExpenses([]); // clear current
  };

  return (
    <div className={`p-4 min-h-screen ${theme === 'light' ? 'bg-[#f8f8f8] text-black' : 'bg-background text-textLight'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-primary">Split Mitra</h1>
        <select
          className="bg-[#2b1e1e] dark:bg-[#2b1e1e] text-textLight border border-primary rounded px-2 py-1"
          value={theme}
          onChange={e => setTheme(e.target.value)}
        >
          <option value="dark">🌙 Dark Mode</option>
          <option value="light">🌤️ Light Mode</option>
        </select>
      </div>

      <div className="border-b border-black/50 dark:border-white/30 pb-4 mb-4">
        <ExpenseForm onAddExpense={handleAddExpense} />
      </div>

      <div className="md:grid md:grid-cols-2 gap-4 border-b border-black/50 dark:border-white/30 pb-4 mb-4">
        <PieChartSummary expenses={expenses} />
        <SplitSummary expenses={expenses} />
      </div>

      <div className="border-b border-black/50 dark:border-white/30 pb-4 mb-4">
        <ExpensesList expenses={expenses} />
      </div>

      <SettleUpButton onSettle={handleSettle} />

      <div className="border-t border-black/50 dark:border-white/30 mt-6 pt-4">
        <h2 className="text-2xl font-bold mb-2">📜 History</h2>
        <HistoryLog history={history} />
      </div>
    </div>
  );
}


