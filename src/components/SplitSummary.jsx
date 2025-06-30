export default function SplitSummary({ expenses }) {
  if (expenses.length === 0) return <p>No summary to display</p>;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const names = [...new Set(expenses.map(e => e.name))];
  const perPerson = total / names.length;

  const paid = {};
  names.forEach(n => paid[n] = 0);
  expenses.forEach(e => paid[e.name] += e.amount);

  const diff = names.map(n => ({ name: n, diff: paid[n] - perPerson }));

  const creditors = diff.filter(d => d.diff > 0);
  const debtors = diff.filter(d => d.diff < 0);

  const summary = [];
  creditors.forEach(c => {
    debtors.forEach(d => {
      if (d.diff === 0) return;
      const amount = Math.min(c.diff, -d.diff);
      if (amount > 0) {
        summary.push(`${d.name} owes ${c.name} ₹${amount.toFixed(2)}`);
        c.diff -= amount;
        d.diff += amount;
      }
    });
  });

  return (
    <div>
      <p>Total Spent: ₹{total.toFixed(2)}</p>
      {summary.length === 0 ? (
        <p>Everyone is settled</p>
      ) : (
        summary.map((s, i) => <p key={i}>{s}</p>)
      )}
    </div>
  );
}

