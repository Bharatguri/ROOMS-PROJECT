import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import DefaultImg from "../assets/trainers/2.webp"
import DefaultImg2 from "../assets/trainers/sonu.jpg"
import DefaultImg3 from "../assets/trainers/3.webp"
import DefaultImg4 from "../assets/trainers/4.webp"
import DefaultImg5 from "../assets/trainers/5.webp"
import DefaultImg6 from "../assets/trainers/6.webp"
import DefaultImg7 from "../assets/trainers/8.webp"

export default function TrainerProfile() {
  const trainers = [
    { id: 1, name: "Sonu King", exp: "5 Years", spec: "All Training",imageUrl:DefaultImg2, },
    { id: 2, name: "Neha Verma", exp: "3 Years", spec: "Muscle Gain",imageUrl:DefaultImg4, },
    { id: 3, name: "Rahul Singh", exp: "7 Years", spec: "Strength Training",imageUrl:DefaultImg5, },
    {id: 4, name: "Khushi Verma", exp: "2 Years", spec: "Fat Loss",imageUrl:DefaultImg3,},
    {id: 5, name: "Sanjana Rawat", exp: "1 Years", spec: "Athlate Training",imageUrl:DefaultImg7,},
    {id: 6, name: "Sonu Sharma", exp: "3 Years", spec: "Runnig Training",imageUrl:DefaultImg6,},
    {id: 7, name: "Amit Sharma", exp: "2.5 Years", spec: "Strength Training",imageUrl:DefaultImg,},
  ];
  const navigate = useNavigate();


  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Trainer Profiles</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainers.map((t) => (
          <div key={t.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <div className="">
              <img src={t.imageUrl || DefaultImg}/>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className="text-gray-500 text-sm">Experience: {t.exp}</p>
            <p className="text-gray-500 text-sm">Speciality: {t.spec}</p>
            </div>

            <button
              onClick={() => navigate(`/book-trainer/${encodeURIComponent(t.name)}`)}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg"
            >
              Book Trainer
            </button>

          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}