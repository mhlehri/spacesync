import { Link, Outlet } from "react-router-dom";

export default function AdminDashboardLayout() {
  return (
    <div className="flex ">
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <nav>
                <ul className="flex border  hover:*:bg-indigo-400 w-fit bg-indigo-500   text-white rounded">
                  <li>
                    <Link
                      to="/dashboard/room-management"
                      className="inline-block p-3"
                    >
                      Room Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/slot-management"
                      className="inline-block p-3"
                    >
                      Slot Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/booking-management"
                      className="inline-block p-3"
                    >
                      Booking Management
                    </Link>
                  </li>
                </ul>
              </nav>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
