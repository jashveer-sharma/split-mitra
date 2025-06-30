export default function SettleUpButton({ onSettle }) {
  return (
    <button onClick={onSettle} className="bg-primary text-white w-full p-2 rounded my-4">
      Settle Up
    </button>
  );
}
