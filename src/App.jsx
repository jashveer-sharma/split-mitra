import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExpenseForm from './components/ExpenseForm';
import ExpensesList from './components/ExpensesList';
import SplitSummary from './components/SplitSummary';
import PieChartSummary from './components/PieChartSummary';
import SettleUpButton from './components/SettleUpButton';
import HistoryLog from './components/HistoryLog';
import Footer from './components/Footer';

// ═══════════════════════════════════════════════════════════════
// localStorage helpers
// ═══════════════════════════════════════════════════════════════
const STORAGE_KEYS = {
  EXPENSES: 'splitMitra_expenses',
  HISTORY: 'splitMitra_history',
};

function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage save failed:', e);
  }
}

// ═══════════════════════════════════════════════════════════════
// Page transition variants
// ═══════════════════════════════════════════════════════════════
const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: { duration: 0.3 },
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [expenses, setExpenses] = useState(() =>
    loadFromStorage(STORAGE_KEYS.EXPENSES, [])
  );
  const [history, setHistory] = useState(() =>
    loadFromStorage(STORAGE_KEYS.HISTORY, [])
  );

  // Persist to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.EXPENSES, expenses);
  }, [expenses]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.HISTORY, history);
  }, [history]);

  // Unique member names for autocomplete
  const members = useMemo(() => {
    const names = new Set();
    expenses.forEach((e) => names.add(e.name));
    history.forEach((h) => h.expenses.forEach((e) => names.add(e.name)));
    return Array.from(names);
  }, [expenses, history]);

  // ── Handlers ──────────────────────────────────────────────

  const handleAddExpense = useCallback((expense) => {
    setExpenses((prev) => [...prev, expense]);
  }, []);

  const handleDeleteExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleSettle = useCallback(() => {
    if (expenses.length === 0) return;

    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const people = {};
    expenses.forEach((e) => {
      people[e.name] = (people[e.name] || 0) + e.amount;
    });
    const names = Object.keys(people);
    const perPerson = total / names.length;

    // Calculate settlements
    const balances = {};
    names.forEach((n) => {
      balances[n] = people[n] - perPerson;
    });
    const settlements = [];
    const debtors = [];
    const creditors = [];

    Object.entries(balances).forEach(([name, bal]) => {
      if (bal < -0.01) debtors.push({ name, amount: Math.abs(bal) });
      else if (bal > 0.01) creditors.push({ name, amount: bal });
    });

    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    let di = 0,
      ci = 0;
    while (di < debtors.length && ci < creditors.length) {
      const pay = Math.min(debtors[di].amount, creditors[ci].amount);
      if (pay > 0.01) {
        settlements.push({
          from: debtors[di].name,
          to: creditors[ci].name,
          amount: pay,
        });
      }
      debtors[di].amount -= pay;
      creditors[ci].amount -= pay;
      if (debtors[di].amount < 0.01) di++;
      if (creditors[ci].amount < 0.01) ci++;
    }

    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-IN', {
        dateStyle: 'medium',
      }),
      total,
      people: names.length,
      expenses: [...expenses],
      settlements,
    };

    setHistory((prev) => [entry, ...prev]);
    setExpenses([]);
  }, [expenses]);

  const handleReset = useCallback(() => {
    setExpenses([]);
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const handleDeleteHistoryEntry = useCallback((id) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Particle Background */}
      <ParticleBackground />

      {/* Ambient glow effects */}
      <div className="ambient-glow glow-purple" />
      <div className="ambient-glow glow-pink" />
      <div className="ambient-glow glow-blue" />

      {/* App Container */}
      <div className="app-container">
        {/* Navbar */}
        <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Page Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HeroSection onGetStarted={() => handleTabChange('split')} />
            </motion.div>
          )}

          {activeTab === 'split' && (
            <motion.div
              key="split"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-24 pb-12 px-4"
            >
              <div className="max-w-6xl mx-auto">
                {/* Page Header */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h1
                    className="text-3xl sm:text-4xl font-bold mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    ✂️ <span className="gradient-text">Split Expenses</span>
                  </h1>
                  <p className="text-sm" style={{ color: '#64748b' }}>
                    Add expenses, see who owes whom, and settle up in one click
                  </p>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
                  {/* Left Column */}
                  <div className="lg:col-span-4 space-y-4 sm:space-y-5">
                    <ExpenseForm
                      onAddExpense={handleAddExpense}
                      members={members}
                    />
                    <SettleUpButton
                      expenses={expenses}
                      onSettle={handleSettle}
                      onReset={handleReset}
                    />
                  </div>

                  {/* Middle Column */}
                  <div className="lg:col-span-4 space-y-4 sm:space-y-5">
                    <ExpensesList
                      expenses={expenses}
                      onDelete={handleDeleteExpense}
                    />
                    <SplitSummary expenses={expenses} />
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-4 space-y-4 sm:space-y-5">
                    <PieChartSummary expenses={expenses} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-24 pb-12 px-4"
            >
              <div className="max-w-3xl mx-auto">
                {/* Page Header */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h1
                    className="text-3xl sm:text-4xl font-bold mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    📜 <span className="gradient-text">History</span>
                  </h1>
                  <p className="text-sm" style={{ color: '#64748b' }}>
                    All your past settlements in one place
                  </p>
                </motion.div>

                <HistoryLog
                  history={history}
                  onClearHistory={handleClearHistory}
                  onDeleteEntry={handleDeleteHistoryEntry}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
