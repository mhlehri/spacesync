import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative h-[80vh] sm:h-[90vh]">
      <img
        src="https://images.unsplash.com/photo-1503418895522-46f9804cda40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Modern workspace"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 z-10 bg-black/50 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ">
          Book Your Ideal Meeting Room with Ease
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-8 opacity-80">
          Efficient, hassle-free room booking for all your meeting needs
        </p>
        <Link
          to="/meeting-rooms"
          className="bg-indigo-200 border-2 border-indigo-700 flex gap-2 items-center hover:bg-indigo-700 text-indigo-700 font-bold hover:text-white py-3 px-8 rounded text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Book Now <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
