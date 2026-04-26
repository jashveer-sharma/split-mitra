import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, User, IndianRupee, FileText, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExpenseForm({ onAddExpense, members }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const nameRef = useRef(null);

  const suggestions = members.filter(
    (m) => m.toLowerCase().includes(name.toLowerCase()) && name.length > 0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter a name 👤');
      nameRef.current?.focus();
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount 💸');
      return;
    }

    onAddExpense({
      id: Date.now(),
      name: name.trim(),
      amount: parseFloat(amount),
      reason: reason.trim() || 'General',
      timestamp: new Date().toISOString(),
    });

    toast.success(`₹${parseFloat(amount).toFixed(2)} added for ${name.trim()} ✨`);
    setName('');
    setAmount('');
    setReason('');
    nameRef.current?.focus();
  };

  const quickReasons = ['🍕 Food', '🚗 Travel', '🎬 Entertainment', '🛒 Shopping', '🏠 Rent', '💊 Medical'];

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: 'rgba(168,85,247,0.15)',
            border: '1px solid rgba(168,85,247,0.25)',
          }}
        >
          <Plus size={16} style={{ color: '#a855f7' }} />
        </div>
        <span>Add Expense</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name Input with autocomplete */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }}>
            <User size={16} />
          </div>
          <input
            ref={nameRef}
            className="input-field"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Who paid?"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onFocus={() => name && setShowSuggestions(true)}
            autoComplete="off"
            id="expense-name"
          />
          {/* Autocomplete dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-20"
                style={{
                  background: 'rgba(15, 15, 40, 0.95)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                }}
                initial={{ opacity: 0, y: -5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
              >
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2"
                    style={{ color: '#94a3b8' }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(168,85,247,0.1)';
                      e.target.style.color = '#c084fc';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#94a3b8';
                    }}
                    onClick={() => {
                      setName(s);
                      setShowSuggestions(false);
                    }}
                  >
                    <User size={14} />
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Amount */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }}>
            <IndianRupee size={16} />
          </div>
          <input
            className="input-field"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Amount (₹)"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            id="expense-amount"
          />
        </div>

        {/* Reason */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }}>
            <FileText size={16} />
          </div>
          <input
            className="input-field"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="What for? (optional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            id="expense-reason"
          />
        </div>

        {/* Quick reason tags */}
        <div className="flex flex-wrap gap-1.5">
          {quickReasons.map((r, i) => (
            <motion.button
              key={i}
              type="button"
              className="text-xs px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
              style={{
                background: reason === r.split(' ').slice(1).join(' ')
                  ? 'rgba(168,85,247,0.2)'
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${reason === r.split(' ').slice(1).join(' ') ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.06)'}`,
                color: reason === r.split(' ').slice(1).join(' ') ? '#c084fc' : '#64748b',
              }}
              onClick={() => setReason(r.split(' ').slice(1).join(' '))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {r}
            </motion.button>
          ))}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-base"
          whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(168,85,247,0.35)' }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles size={18} />
          Add Expense
        </motion.button>
      </form>
    </motion.div>
  );
}
