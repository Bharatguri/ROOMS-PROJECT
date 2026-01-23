import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

export default function TrainerBooking() {
  const navigate = useNavigate();
  const { name } = useParams();

  const trainerName = decodeURIComponent(name);

  const today = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = [
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  const handleConfirm = () => {
    if (!selectedSlot) {
      alert("Please select a time slot ✅");
      return;
    }
    alert(
      `Booking Confirmed ✅\nTrainer: ${trainerName}\nDate: ${selectedDate}\nSlot: ${selectedSlot}`
    );
    navigate("/dashboard");
  };

  return (
    <DashboardLayout>
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm font-semibold text-blue-600 hover:underline"
      >
        ← Back
      </button>

      {/* Booking Card */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6">
          <h2 className="text-2xl font-extrabold">Book Trainer 🧑‍🏫</h2>
          <p className="text-sm opacity-90 mt-1">
            Schedule your session with{" "}
            <span className="font-semibold">{trainerName}</span>
          </p>
        </div>

        <div className="p-6">
          {/* Trainer Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div className="bg-gray-50 border rounded-xl p-4">
              <p className="text-xs text-gray-500">Trainer</p>
              <p className="text-lg font-bold text-gray-800 mt-1">
                {trainerName}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Certified Fitness Coach
              </p>
            </div>

            <div className="bg-gray-50 border rounded-xl p-4">
              <p className="text-xs text-gray-500">Session Type</p>
              <p className="text-lg font-bold text-gray-800 mt-1">
                Personal Training
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Strength • Fat Loss • Muscle Gain
              </p>
            </div>

            <div className="bg-gray-50 border rounded-xl p-4">
              <p className="text-xs text-gray-500">Fee</p>
              <p className="text-lg font-bold text-green-600 mt-1">₹299</p>
              <p className="text-xs text-gray-500 mt-1">Per session</p>
            </div>
          </div>

          {/* Date Picker */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800">
              Select Date 📅
            </h3>
            <input
              type="date"
              value={selectedDate}
              min={today}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-3 px-4 py-2 border rounded-xl w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Slots */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800">
              Select Time Slot ⏰
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 rounded-xl font-semibold border transition
                    ${
                      selectedSlot === slot
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-gray-800 hover:bg-gray-50"
                    }
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 border p-5 rounded-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Booking Summary ✅
            </h3>

            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Trainer:</span> {trainerName}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {selectedDate}
              </p>
              <p>
                <span className="font-semibold">Slot:</span>{" "}
                {selectedSlot || "Not Selected"}
              </p>
              <p>
                <span className="font-semibold">Fee:</span>{" "}
                <span className="text-green-700 font-bold">₹299</span>
              </p>
            </div>

            <button
              onClick={handleConfirm}
              className="mt-5 w-full bg-purple-600 text-white py-3 rounded-xl font-extrabold hover:bg-purple-700 transition"
            >
              Confirm Booking
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              After confirmation, you’ll get trainer session details.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
