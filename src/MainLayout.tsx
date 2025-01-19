import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { ScrollToTopButton } from "./components/layout/ScrollToTopButton";

export default function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
