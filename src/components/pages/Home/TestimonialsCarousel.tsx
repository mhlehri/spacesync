import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO at Company",
    image: "/path/to/image1.jpg",
    testimonial:
      "SpaceSync has revolutionized the way we book meeting rooms. It’s efficient and user-friendly.",
  },
  {
    name: "Jane Smith",
    role: "Project Manager at Organization",
    image: "/path/to/image2.jpg",
    testimonial:
      "The seamless booking experience with SpaceSync has saved us so much time.",
  },
  // Add more testimonials as needed
];

export default function TestimonialsCarousel() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          What Our Customers Say
        </h2>
        <Carousel>
          <CarouselContent className="flex gap-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="flex-shrink-0 w-full md:w-1/3"
              >
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-700 mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {testimonial.role}
                  </p>
                  <p className="text-gray-600">{testimonial.testimonial}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-between mt-4">
            <CarouselPrevious className="bg-gray-200 p-2 rounded-full">
              Previous
            </CarouselPrevious>
            <CarouselNext className="bg-gray-200 p-2 rounded-full">
              Next
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
