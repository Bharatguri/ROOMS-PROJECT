import DashboardLayout from "../components/DashboardLayout";
// import DefaultImg from "../assets/trainers/2.webp"
import DefaultImg2 from "../assets/supliment/Cratin.webp"


export default function Supplements() {
  const products = [
    { id: 1, name: "Whey Protein", price: "₹1999",imageUrl:DefaultImg, },
    { id: 2, name: "Creatine", price: "₹899",imageUrl:DefaultImg2, },
    { id: 3, name: "Multivitamin", price: "₹499" },
     { id: 4, name: "Fish oil", price: "₹2199" },
      { id: 5, name: "Protin", price: "₹2499" },
       { id: 6, name: "Wight Gainner", price: "₹1499" },
        { id: 7, name: "Pre Workout", price: "₹699" },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Buy Supplements</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <div className="">
              <img src={t.imageUrl || DefaultImg}/>
            </div>
            <div>
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-green-600 font-bold mt-2">{p.price}</p>
            </div>
            
            <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
