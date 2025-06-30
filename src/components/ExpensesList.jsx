export default function ExpensesList({ expenses }) {
  if (expenses.length === 0) return <p>No expenses yet</p>;
  return (
    <ul className="space-y-1">
      {expenses.map((e, i) => (
        <li key={i}>
          {e.name} paid ₹{e.amount.toFixed(2)} {e.reason && `for ${e.reason}`}
        </li>
      ))}
    </ul>
  );
}
