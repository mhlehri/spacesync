import FeaturedRooms from "@/components/pages/Home/FeaturedRooms";
import HeroSection from "@/components/pages/Home/HeroSection";
import HowItWorks from "@/components/pages/Home/HowItWorks";
import ServiceAdvertisement from "@/components/pages/Home/ServiceAdvertisement";
import TestimonialsCarousel from "@/components/pages/Home/TestimonialsCarousel";
import WhyChooseUs from "@/components/pages/Home/WhyChooseUs";
export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <ServiceAdvertisement />
        <FeaturedRooms />
        <WhyChooseUs />
        <HowItWorks />
        <TestimonialsCarousel />
      </div>
    </div>
  );
}
