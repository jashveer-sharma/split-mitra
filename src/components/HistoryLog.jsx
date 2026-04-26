import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2, ChevronDown, ChevronUp, IndianRupee, Calendar, Users } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function HistoryLog({ history, onClearHistory, onDeleteEntry }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!history || history.length === 0) {
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
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.25)',
            }}
          >
            <Clock size={16} style={{ color: '#f59e0b' }} />
          </div>
          <span>History</span>
        </h2>
        <div className="empty-state">
          <div className="empty-icon">📜</div>
          <div className="empty-text">
            No history yet. Settle up your expenses to create a history entry!
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.25)',
            }}
          >
            <Clock size={16} style={{ color: '#f59e0b' }} />
          </div>
          <span>History</span>
          <span className="badge badge-amber ml-1">{history.length}</span>
        </h2>
        <motion.button
          className="btn-danger text-xs flex items-center gap-1"
          onClick={() => {
            onClearHistory();
            toast.success('History cleared! 🗑️');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 size={12} />
          Clear All
        </motion.button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
        <AnimatePresence>
          {history.map((entry, i) => {
            const isExpanded = expandedId === entry.id;
            return (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {/* Header row */}
                <button
                  className="w-full flex items-center gap-3 p-3 text-left transition-colors"
                  style={{ background: 'transparent' }}
                  onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(245,158,11,0.1)',
                      border: '1px solid rgba(245,158,11,0.15)',
                    }}
                  >
                    <Calendar size={16} style={{ color: '#f59e0b' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: '#f1f5f9' }}>
                      {entry.date}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs flex items-center gap-1" style={{ color: '#64748b' }}>
                        <Users size={10} />
                        {entry.people} people
                      </span>
                      <span className="text-xs" style={{ color: '#475569' }}>•</span>
                      <span className="text-xs" style={{ color: '#64748b' }}>
                        {entry.expenses.length} expenses
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 mr-2">
                    <div className="text-sm font-bold flex items-center gap-0.5" style={{ color: '#fbbf24', fontFamily: "'Space Grotesk', sans-serif" }}>
                      <IndianRupee size={13} />
                      {entry.total.toFixed(0)}
                    </div>
                  </div>
                  <div style={{ color: '#64748b' }}>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Expandable details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3">
                        <div className="divider" />

                        {/* Expenses */}
                        <p className="text-xs font-medium mb-2" style={{ color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          💸 Expenses
                        </p>
                        <div className="space-y-1 mb-3">
                          {entry.expenses.map((e, j) => (
                            <div key={j} className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                              <span style={{ color: '#94a3b8' }}>
                                <span style={{ color: '#c084fc', fontWeight: 600 }}>{e.name}</span> — {e.reason || 'General'}
                              </span>
                              <span style={{ color: '#10b981', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                                ₹{e.amount.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Settlements */}
                        {entry.settlements && entry.settlements.length > 0 && (
                          <>
                            <p className="text-xs font-medium mb-2" style={{ color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              🤝 Settlements
                            </p>
                            <div className="space-y-1 mb-3">
                              {entry.settlements.map((s, j) => (
                                <div key={j} className="text-xs py-1.5 px-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', color: '#94a3b8' }}>
                                  <span style={{ color: '#f87171' }}>{s.from}</span>
                                  {' → '}
                                  <span style={{ color: '#34d399' }}>{s.to}</span>
                                  {': '}
                                  <span style={{ color: '#fbbf24', fontWeight: 600 }}>₹{s.amount.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {/* Delete entry */}
                        <motion.button
                          className="w-full text-xs py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
                          style={{
                            background: 'rgba(239,68,68,0.08)',
                            color: '#ef4444',
                            border: '1px solid rgba(239,68,68,0.12)',
                          }}
                          onClick={() => {
                            onDeleteEntry(entry.id);
                            toast.success('Entry removed 🗑️');
                          }}
                          whileHover={{ scale: 1.02, background: 'rgba(239,68,68,0.15)' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Trash2 size={12} />
                          Delete this entry
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
