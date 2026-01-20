import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Navbar />
      <main className="ml-64 mt-16 p-6">{children}</main>
    </div>
  );
}
