export default function Button({ text }) {
  return (
    <button
      className="w-full bg-blue-600 text-white py-2 rounded-lg
      font-semibold hover:bg-blue-700 transition duration-200"
    >
      {text}
    </button>
  );
}
