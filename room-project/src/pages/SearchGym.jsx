import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import DefaultImg from "../assets/gym/empty-gym.webp"
import DefaultImg2 from "../assets/gym/2.webp"
import DefaultImg3 from "../assets/gym/3.webp"

export default function SearchGym() {
  const gyms = [
    { id: 1, name: "Gold Gym", place: "Hisar", rating: "4.5" ,imageUrl:DefaultImg, },
    { id: 2, name: "Fitness Arena", place: "Red Square (Hisar)", rating: "4.2" ,imageUrl:DefaultImg2, },
    { id: 3, name: "Power House Gym", place: "Rishi Nagar (Hisar)", rating: "4.7" ,imageUrl:DefaultImg3, },
  ];

  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">  
        <h2 className="text-2xl font-bold">Search Gym</h2>
        <input
          placeholder="Search gym name / area..."
          className="px-4 py-2 border rounded-lg w-72"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gyms.map((g) => (
          <div key={g.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">

            <div className="">
              <img src={g.imageUrl || DefaultImg} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{g.name}</h3>
              <p className="text-gray-500 text-sm">{g.place}</p>
              <p className="mt-2 text-sm font-semibold text-green-600">
                ⭐ Rating: {g.rating}
              </p>
            </div>

            <button
              onClick={() => navigate(`/gym/${g.id}`)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              View Details
            </button>

          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
