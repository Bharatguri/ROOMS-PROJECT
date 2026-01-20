export default function Input({ type = "text", placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full mb-4 px-4 py-2 border rounded-lg
      focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
