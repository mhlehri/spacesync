import { Menu, X, Home, Calendar, BookOpen, Building } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    to: "/dashboard/room-management",
    label: "Room Management",
    icon: <Building size={20} />,
  },
  {
    to: "/dashboard/slot-management",
    label: "Slot Management",
    icon: <Calendar size={20} />,
  },
  {
    to: "/dashboard/booking-management",
    label: "Booking Management",
    icon: <BookOpen size={20} />,
  },
  { to: "/", label: "Back to Home", icon: <Home size={20} /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-indigo-500 text-white rounded-md lg:hidden"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-indigo-500 text-white transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6 text-right lg:text-left pl-2">
            Dashboard
          </h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center p-3 rounded hover:bg-indigo-400 transition-colors ${
                    location.pathname === item.to ? "bg-indigo-600" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
