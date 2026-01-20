import DashboardLayout from "../components/DashboardLayout";

export default function Supplements() {
  const products = [
    { id: 1, name: "Whey Protein", price: "₹1999" },
    { id: 2, name: "Creatine", price: "₹899" },
    { id: 3, name: "Multivitamin", price: "₹499" },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Buy Supplements</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-green-600 font-bold mt-2">{p.price}</p>

            <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
