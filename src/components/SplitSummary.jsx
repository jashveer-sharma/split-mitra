import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Scale, IndianRupee, Users } from 'lucide-react';

export default function SplitSummary({ expenses }) {
  if (expenses.length === 0) {
    return (
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="section-title">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(59,130,246,0.15)',
              border: '1px solid rgba(59,130,246,0.25)',
            }}
          >
            <Scale size={16} style={{ color: '#3b82f6' }} />
          </div>
          <span>Settlement</span>
        </h2>
        <div className="empty-state">
          <div className="empty-icon">⚖️</div>
          <div className="empty-text">
            Add expenses to see who owes whom. Fair splits made easy!
          </div>
        </div>
      </motion.div>
    );
  }

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const people = {};
  expenses.forEach((e) => {
    people[e.name] = (people[e.name] || 0) + e.amount;
  });

  const names = Object.keys(people);
  const perPerson = total / names.length;

  // Calculate balances
  const balances = {};
  names.forEach((n) => {
    balances[n] = people[n] - perPerson;
  });

  // Simplify debts — greedy algorithm
  const settlements = [];
  const debtors = [];
  const creditors = [];

  Object.entries(balances).forEach(([name, bal]) => {
    if (bal < -0.01) debtors.push({ name, amount: Math.abs(bal) });
    else if (bal > 0.01) creditors.push({ name, amount: bal });
  });

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  let di = 0, ci = 0;
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

  const isSettled = settlements.length === 0;

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="section-title">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: 'rgba(59,130,246,0.15)',
            border: '1px solid rgba(59,130,246,0.25)',
          }}
        >
          <Scale size={16} style={{ color: '#3b82f6' }} />
        </div>
        <span>Settlement</span>
      </h2>

      {/* Summary stats */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="stat-mini flex-1">
          <div className="stat-value gradient-text">₹{total.toFixed(0)}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-mini flex-1">
          <div className="stat-value gradient-text-blue">{names.length}</div>
          <div className="stat-label">People</div>
        </div>
        <div className="stat-mini flex-1">
          <div className="stat-value gradient-text-warm">₹{perPerson.toFixed(0)}</div>
          <div className="stat-label">Per Head</div>
        </div>
      </div>

      <div className="divider" />

      {/* Settlements */}
      {isSettled ? (
        <motion.div
          className="flex flex-col items-center py-4 gap-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle size={40} style={{ color: '#10b981' }} />
          </motion.div>
          <span className="text-sm font-medium" style={{ color: '#10b981' }}>
            Everyone is settled up! 🎉
          </span>
        </motion.div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Users size={14} style={{ color: '#64748b' }} />
            <span className="text-xs font-medium" style={{ color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Who pays whom
            </span>
          </div>
          {settlements.map((s, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 p-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {/* From */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: 'rgba(239,68,68,0.12)',
                  color: '#f87171',
                  border: '1px solid rgba(239,68,68,0.2)',
                }}
              >
                {s.from.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium truncate" style={{ color: '#f87171' }}>
                {s.from}
              </span>

              {/* Arrow */}
              <motion.div
                className="flex-shrink-0 flex items-center gap-1"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={14} style={{ color: '#64748b' }} />
              </motion.div>

              {/* To */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: 'rgba(16,185,129,0.12)',
                  color: '#34d399',
                  border: '1px solid rgba(16,185,129,0.2)',
                }}
              >
                {s.to.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium truncate" style={{ color: '#34d399' }}>
                {s.to}
              </span>

              {/* Amount */}
              <div className="ml-auto flex items-center gap-0.5 flex-shrink-0">
                <IndianRupee size={13} style={{ color: '#fbbf24' }} />
                <span className="text-sm font-bold" style={{ color: '#fbbf24', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {s.amount.toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
