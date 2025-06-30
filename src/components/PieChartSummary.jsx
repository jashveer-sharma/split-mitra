import { PieChart, Pie, Cell, Legend } from 'recharts';

export default function PieChartSummary({ expenses }) {
  if (expenses.length === 0) {
    return <p className="text-textSecondary">No data</p>;
  }

  // Aggregate data
  const totalsByName = {};
  let total = 0;
  expenses.forEach((exp) => {
    totalsByName[exp.name] = (totalsByName[exp.name] || 0) + exp.amount;
    total += exp.amount;
  });

  const data = Object.keys(totalsByName).map((name) => ({
    name,
    value: totalsByName[name],
  }));

  const COLORS = ['#8b5e3c', '#a97458', '#c2a58b', '#b0855b'];

  return (
    <div className="flex flex-wrap border-t border-primary pt-4">
     <div className="w-full md:w-1/2 flex justify-center">
  <div className="border border-primary rounded p-2" style={{ width: 300, height: 300 }}>
    <div className="flex h-full">
      {/* Pie chart left half of box */}
      <div className="w-1/2 flex items-center justify-center">
        <PieChart width={140} height={140}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={60}
            dataKey="value"
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Legend right half of box */}
      <div className="w-1/2 flex flex-col justify-center text-sm space-y-1">
        {data.map((d, idx) => (
          <div key={idx} className="flex items-center space-x-1">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: COLORS[idx % COLORS.length] }}
            ></div>
            <span>👤 {d.name}: ₹{d.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

      {/* Right section summary */}
      <div className="w-full md:w-1/2 p-2 space-y-2">
        <p className="font-medium">💸 Total spent: ₹{total.toFixed(2)}</p>
        <div>
          <p className="font-medium">📝 Payments:</p>
          {expenses.map((exp, idx) => (
            <p key={idx} className="text-sm">
              {exp.name} paid ₹{exp.amount.toFixed(2)} for {exp.reason || 'N/A'}
            </p>
          ))}
        </div>

        <div>
          <p className="font-medium">🤝 Owes summary:</p>
          {generateOwesSummary(data, total)}
        </div>
      </div>
    </div>
  );
}

// Helper to generate owes summary lines
function generateOwesSummary(data, total) {
  const perPerson = total / data.length;

  const owes = data.map((d) => ({
    name: d.name,
    diff: d.value - perPerson,
  }));

  const creditors = owes.filter((o) => o.diff > 0);
  const debtors = owes.filter((o) => o.diff < 0);

  const summary = [];
  creditors.forEach((c) => {
    debtors.forEach((d) => {
      if (d.diff === 0) return;
      const amt = Math.min(c.diff, -d.diff);
      if (amt > 0) {
        summary.push(
          <p key={`${c.name}-${d.name}`} className="text-sm">
            {d.name} owes {c.name} ₹{amt.toFixed(2)}
          </p>
        );
        c.diff -= amt;
        d.diff += amt;
      }
    });
  });

  if (summary.length === 0) {
    return <p className="text-sm text-textSecondary">Everyone is settled</p>;
  }
  return summary;
}


