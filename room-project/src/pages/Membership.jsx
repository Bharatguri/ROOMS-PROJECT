import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function Membership() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const plans = [
    {
      id: "basic",
      name: "Silver ⭐",
      price: "₹499 / month",
      tag: "Starter",
      highlight: false,
      perks: [
        "Gym access (Morning)",
        "Free 1 Diet Guide PDF",
        "2% Supplements Discount",
        "No Trainer Discount",
      ],
      offers: [
        { title: "Supplements Discount", value: "2% OFF" },
        { title: "Trainer Discount", value: "0%" },
        { title: "Special Offer", value: "Free Diet PDF" },
      ],
    },
    {
      id: "pro",
      name: "Gold💰",
      price: "₹999 / month",
      tag: "Most Popular",
      highlight: true,
      perks: [
        "Gym access (Full Day)",
        "Diet Plan (Weekly)",
        "10% Supplements Discount",
        "15% Trainer Discount",
        "Free 2 Trial PT Sessions",
      ],
      offers: [
        { title: "Supplements Discount", value: "10% OFF" },
        { title: "Trainer Discount", value: "15% OFF" },
        { title: "Special Offer", value: "2 Free PT Sessions" },
      ],
    },
    {
      id: "elite",
      name: "VIP 🤴",
      price: "₹1999 / month",
      tag: "Premium",
      highlight: false,
      perks: [
        "Gym access (24/7)",
        "Personalized Diet (Daily)",
        "20% Supplements Discount",
        "30% Trainer Discount",
        "Priority Trainer Booking",
        "Monthly Body Checkup",
      ],
      offers: [
        { title: "Supplements Discount", value: "20% OFF" },
        { title: "Trainer Discount", value: "30% OFF" },
        { title: "Special Offer", value: "Free Body Checkup" },
      ],
    },
  ];

  const handleBuy = () => {
    const plan = plans.find((p) => p.id === selectedPlan);
    alert(`✅ Membership Selected: ${plan.name}\nPrice: ${plan.price}`);
    // future: Razorpay payment route
    // navigate("/payment");
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 md:p-8 shadow mb-8">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/15 rounded-full blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Beast House Membership 💀
          </h2>
          <p className="text-white/80 mt-2 text-sm md:text-base max-w-2xl">
            Choose your membership and unlock discounts on supplements, trainer
            sessions, diet plans and exclusive offers.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`cursor-pointer rounded-3xl border shadow-sm transition overflow-hidden bg-white hover:shadow-xl
              ${
                selectedPlan === plan.id
                  ? "border-blue-600 ring-2 ring-blue-200"
                  : "border-gray-200"
              }
            `}
          >
            {/* Top */}
            <div
              className={`p-6 ${
                plan.highlight
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold">{plan.name}</h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold
                  ${
                    plan.highlight
                      ? "bg-white/15 border border-white/20 text-white"
                      : "bg-gray-900 text-white"
                  }`}
                >
                  {plan.tag}
                </span>
              </div>

              <p
                className={`mt-3 text-2xl font-extrabold ${
                  plan.highlight ? "text-white" : "text-gray-900"
                }`}
              >
                {plan.price}
              </p>

              <p
                className={`text-sm mt-1 ${
                  plan.highlight ? "text-white/80" : "text-gray-500"
                }`}
              >
                Best for {plan.tag.toLowerCase()} users.
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-sm font-bold text-gray-800 mb-3">
                Special Offers 🔥
              </p>

              <div className="grid grid-cols-1 gap-3 mb-5">
                {plan.offers.map((o, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-50 border rounded-2xl px-4 py-3"
                  >
                    <span className="text-sm text-gray-700 font-semibold">
                      {o.title}
                    </span>
                    <span className="text-sm font-extrabold text-blue-700">
                      {o.value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm font-bold text-gray-800 mb-2">
                Membership Benefits ✅
              </p>

              <ul className="space-y-2 text-sm text-gray-600">
                {plan.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-[2px]">✔️</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <button
                className={`mt-6 w-full py-3 rounded-2xl font-extrabold transition
                  ${
                    selectedPlan === plan.id
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-900 text-white hover:bg-black"
                  }`}
              >
                {selectedPlan === plan.id ? "Selected ✅" : "Choose Plan"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 bg-white rounded-3xl shadow p-6 md:p-8 border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-gray-800">
              Unlock premium offers now 💪
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Pro & Elite members get huge discounts on supplements and trainers.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/supplements")}
              className="px-5 py-3 rounded-2xl border font-bold hover:bg-gray-50 transition"
            >
              View Supplements
            </button>

            <button
              onClick={handleBuy}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-extrabold hover:opacity-95 transition"
            >
              Buy Membership
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
