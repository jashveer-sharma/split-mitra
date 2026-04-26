import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Receipt, Clock, IndianRupee } from 'lucide-react';

export default function ExpensesList({ expenses, onDelete }) {
  const formatTime = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const getReasonEmoji = (reason) => {
    const map = {
      food: '🍕',
      travel: '🚗',
      entertainment: '🎬',
      shopping: '🛒',
      rent: '🏠',
      medical: '💊',
      general: '📝',
    };
    const key = (reason || '').toLowerCase();
    for (const [k, v] of Object.entries(map)) {
      if (key.includes(k)) return v;
    }
    return '📝';
  };

  const getColorByIndex = (i) => {
    const colors = ['#a855f7', '#ec4899', '#3b82f6', '#14b8a6', '#f59e0b', '#ef4444'];
    return colors[i % colors.length];
  };

  if (expenses.length === 0) {
    return (
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="section-title">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(236,72,153,0.15)',
              border: '1px solid rgba(236,72,153,0.25)',
            }}
          >
            <Receipt size={16} style={{ color: '#ec4899' }} />
          </div>
          <span>Expenses</span>
        </h2>
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <div className="empty-text">
            No expenses yet! Add your first expense above to start tracking.
          </div>
        </div>
      </motion.div>
    );
  }

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(236,72,153,0.15)',
              border: '1px solid rgba(236,72,153,0.25)',
            }}
          >
            <Receipt size={16} style={{ color: '#ec4899' }} />
          </div>
          <span>Expenses</span>
          <span className="badge badge-pink ml-1">{expenses.length}</span>
        </h2>
        <div className="text-right">
          <div className="text-xs" style={{ color: '#64748b' }}>Total</div>
          <div className="text-lg font-bold gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            ₹{totalAmount.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
        <AnimatePresence mode="popLayout">
          {expenses.map((exp, i) => (
            <motion.div
              key={exp.id}
              layout
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-xl group cursor-default transition-all"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
              whileHover={{
                background: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(168,85,247,0.15)',
                scale: 1.01,
              }}
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
                style={{
                  background: `${getColorByIndex(i)}15`,
                  color: getColorByIndex(i),
                  border: `1px solid ${getColorByIndex(i)}30`,
                }}
              >
                {exp.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold truncate" style={{ color: '#f1f5f9' }}>
                    {exp.name}
                  </span>
                  <span className="text-xs" title={exp.reason}>
                    {getReasonEmoji(exp.reason)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs" style={{ color: '#64748b' }}>
                    {exp.reason || 'General'}
                  </span>
                  {exp.timestamp && (
                    <span className="text-xs flex items-center gap-1" style={{ color: '#475569' }}>
                      <Clock size={10} />
                      {formatTime(exp.timestamp)}
                    </span>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-bold flex items-center gap-0.5" style={{ color: '#10b981', fontFamily: "'Space Grotesk', sans-serif" }}>
                  <IndianRupee size={13} />
                  {exp.amount.toFixed(2)}
                </div>
              </div>

              {/* Delete */}
              <motion.button
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg flex-shrink-0"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239,68,68,0.15)',
                }}
                onClick={() => onDelete(exp.id)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                title="Remove expense"
              >
                <Trash2 size={14} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
