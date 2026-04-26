import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BarChart3, IndianRupee } from 'lucide-react';

const COLORS = ['#a855f7', '#ec4899', '#3b82f6', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div
        style={{
          background: 'rgba(15, 15, 40, 0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '10px 14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        }}
      >
        <p style={{ color: data.payload.fill, fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>
          {data.name}
        </p>
        <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
          ₹{data.value.toFixed(2)} ({data.payload.percent}%)
        </p>
      </div>
    );
  }
  return null;
};

export default function PieChartSummary({ expenses }) {
  const chartData = useMemo(() => {
    if (!expenses.length) return [];
    const map = {};
    expenses.forEach((e) => {
      map[e.name] = (map[e.name] || 0) + e.amount;
    });
    const total = Object.values(map).reduce((s, v) => s + v, 0);
    return Object.entries(map).map(([name, value], i) => ({
      name,
      value,
      fill: COLORS[i % COLORS.length],
      percent: ((value / total) * 100).toFixed(1),
    }));
  }, [expenses]);

  const reasonData = useMemo(() => {
    if (!expenses.length) return [];
    const map = {};
    expenses.forEach((e) => {
      const r = e.reason || 'General';
      map[r] = (map[r] || 0) + e.amount;
    });
    const total = Object.values(map).reduce((s, v) => s + v, 0);
    return Object.entries(map)
      .map(([name, value], i) => ({
        name,
        value,
        fill: COLORS[(i + 3) % COLORS.length],
        percent: ((value / total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="section-title">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(20,184,166,0.15)',
              border: '1px solid rgba(20,184,166,0.25)',
            }}
          >
            <BarChart3 size={16} style={{ color: '#14b8a6' }} />
          </div>
          <span>Analytics</span>
        </h2>
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <div className="empty-text">
            Charts will appear here once you add some expenses.
          </div>
        </div>
      </motion.div>
    );
  }

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="section-title">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: 'rgba(20,184,166,0.15)',
            border: '1px solid rgba(20,184,166,0.25)',
          }}
        >
          <BarChart3 size={16} style={{ color: '#14b8a6' }} />
        </div>
        <span>Analytics</span>
      </h2>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* By Person */}
        <div>
          <p className="text-xs font-medium mb-2" style={{ color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            By Person
          </p>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="45%"
                  outerRadius="75%"
                  paddingAngle={3}
                  stroke="none"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center mt-1">
            {chartData.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
                <span className="truncate max-w-[80px]">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* By Category */}
        <div>
          <p className="text-xs font-medium mb-2" style={{ color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            By Category
          </p>
          <div className="space-y-2">
            {reasonData.slice(0, 5).map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span style={{ color: '#94a3b8' }}>{d.name}</span>
                  <span style={{ color: d.fill, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                    ₹{d.value.toFixed(0)}
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: d.fill }}
                    initial={{ width: 0 }}
                    animate={{ width: `${d.percent}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Total footer */}
      <div className="divider" />
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: '#64748b' }}>Grand Total</span>
        <span className="text-lg font-bold gradient-text flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <IndianRupee size={16} />
          {total.toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
}
