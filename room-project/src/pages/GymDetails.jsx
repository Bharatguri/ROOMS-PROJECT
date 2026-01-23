import DashboardLayout from "../components/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";

export default function GymDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Dummy gyms data (later API se aayega)
    const gyms = [
        {
            id: "1",
            name: "Gold Gym",
            place: "Mansarovar, Hisar",
            rating: "4.5",
            price: "₹999/month",
            about:
                "Premium gym with cardio, strength training, certified trainers and modern equipments.",
            timings: "6:00 AM - 10:00 PM",
            trainers: ["Amit Sharma", "Neha Verma", "Rahul Singh"],
            facilities: ["Cardio Zone", "Weights", "Crossfit", "Locker", "Shower"],
        },
        {
            id: "2",
            name: "Fitness Arena",
            place: "Vaishali Nagar, Hisar",
            rating: "4.2",
            price: "₹799/month",
            about:
                "Affordable gym with great atmosphere, personal training and group workouts.",
            timings: "5:30 AM - 9:30 PM",
            trainers: ["Kunal", "Pooja"],
            facilities: ["Cardio", "Strength", "Zumba"],
        },
        {
            id: "3",
            name: "Power House Gym",
            place: "Malviya Nagar, Hisar",
            rating: "4.7",
            price: "₹1299/month",
            about:
                "High-end fitness center for strength training, bodybuilding and weight loss programs.",
            timings: "6:00 AM - 11:00 PM",
            trainers: ["Ravi", "Sandeep", "Kriti"],
            facilities: ["Bodybuilding", "Supplements Bar", "Steam", "Yoga"],
        },
    ];

    const gym = gyms.find((g) => g.id === id);

    if (!gym) {
        return (
            <DashboardLayout>
                <h2 className="text-2xl font-bold text-red-600">Gym Not Found ❌</h2>
                <button
                    onClick={() => navigate("/searchgym")}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Back to Search
                </button>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-sm font-semibold text-blue-600 hover:underline"
            >
                ← Back
            </button>

            {/* Top Card */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="h-56 bg-gray-200"></div>

                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-800">
                                {gym.name}
                            </h2>
                            <p className="text-gray-500 mt-1">{gym.place}</p>
                            <p className="text-sm mt-2 font-semibold text-green-600">
                                ⭐ {gym.rating} Rating
                            </p>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-xl">
                            <p className="text-sm text-gray-600">Membership</p>
                            <p className="text-2xl font-bold text-blue-600">{gym.price}</p>
                            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
                                Join Now
                            </button>
                        </div>
                    </div>

                    {/* About */}
                    <div className="mt-6">
                        <h3 className="text-lg font-bold text-gray-800">About</h3>
                        <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                            {gym.about}
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Timings */}
                        <div className="bg-gray-50 p-5 rounded-xl border">
                            <h4 className="font-bold text-gray-800">🕒 Morning Timings</h4>
                            <p className="text-gray-600 text-sm mt-2">{gym.timings}</p>
                        </div>

                        {/* Facilities */}
                        <div className="bg-gray-50 p-5 rounded-xl border">
                            <h4 className="font-bold text-gray-800">✅ Facilities</h4>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {gym.facilities.map((f) => (
                                    <span
                                        key={f}
                                        className="text-xs bg-white border px-3 py-1 rounded-full font-semibold text-gray-700"
                                    >
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Trainers */}
                    <div className="mt-6">
                        <h3 className="text-lg font-bold text-gray-800">Top Trainers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                            {gym.trainers.map((t) => (
                                <div
                                    key={t}
                                    className="bg-gray-50 border p-4 rounded-xl flex items-center justify-between"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-800">{t}</p>
                                        <p className="text-xs text-gray-500">Certified Trainer</p>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/book-trainer/${encodeURIComponent(t)}`)}
                                        className="text-sm bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition"
                                    >
                                        Book
                                    </button>



                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="mt-8 flex flex-col md:flex-row gap-3">
                        <button
                            onClick={() => navigate("/trainer-profile")}
                            className="flex-1 border border-gray-300 py-2 rounded-xl font-semibold hover:bg-gray-50 transition"
                        >
                            View All Trainers
                        </button>
                        <button
                            onClick={() => navigate("/supplements")}
                            className="flex-1 bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition"
                        >
                            Buy Supplements
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
