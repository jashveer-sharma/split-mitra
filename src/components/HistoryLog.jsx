export default function HistoryLog({ history }) {
  if (history.length === 0) {
    return <p className="text-textSecondary">No history yet</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">📜 History</h2>

      {history.map((split, idx) => {
        const { expenses, date } = split;

        // Calculate total
        const total = expenses.reduce((sum, e) => sum + e.amount, 0);

        // Group by name
        const totalsByName = {};
        expenses.forEach(e => {
          totalsByName[e.name] = (totalsByName[e.name] || 0) + e.amount;
        });

        const names = Object.keys(totalsByName);
        const perPerson = total / names.length;

        const owes = names.map(name => ({
          name,
          diff: totalsByName[name] - perPerson
        }));

        const creditors = owes.filter(o => o.diff > 0);
        const debtors = owes.filter(o => o.diff < 0);

        const summary = [];
        creditors.forEach(c => {
          debtors.forEach(d => {
            if (d.diff === 0) return;
            const amt = Math.min(c.diff, -d.diff);
            if (amt > 0) {
              summary.push(`${d.name} owes ${c.name} ₹${amt.toFixed(2)}`);
              c.diff -= amt;
              d.diff += amt;
            }
          });
        });

        return (
          <div key={idx} className="border border-primary rounded p-3 space-y-1">
            <p className="text-sm text-primary">📅 {date}</p>
            <p className="font-medium">💸 Total spent: ₹{total.toFixed(2)}</p>

            <div>
              <p className="font-medium">📝 Payments:</p>
              {Object.entries(totalsByName).map(([name, amt], i) => (
                <p key={i} className="text-sm">
                  {name} paid ₹{amt.toFixed(2)}
                </p>
              ))}
            </div>

            <div>
              <p className="font-medium">🤝 Owes summary:</p>
              {summary.length === 0 ? (
                <p className="text-sm text-textSecondary">Everyone is settled</p>
              ) : (
                summary.map((line, i) => (
                  <p key={i} className="text-sm">{line}</p>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

