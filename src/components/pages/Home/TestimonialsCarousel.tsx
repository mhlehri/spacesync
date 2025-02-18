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
    image:
      "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    testimonial:
      "SpaceSync has revolutionized the way we book meeting rooms. It’s efficient and user-friendly.",
  },
  {
    name: "Jane Smith",
    role: "Project Manager at Organization",
    image:
      "https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    testimonial:
      "The seamless booking experience with SpaceSync has saved us so much time.",
  },
  // Add more testimonials as needed
];

export default function TestimonialsCarousel() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-8 underline underline-offset-8 text-center">
          What Our Customers Say
        </h2>
        <Carousel className="relative">
          <CarouselContent className="flex gap-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="flex-shrink-0 w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
              >
                <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
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
          <div className="justify-center mt-6 gap-4 hidden md:flex">
            <CarouselPrevious className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full">
              Previous
            </CarouselPrevious>
            <CarouselNext className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full">
              Next
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
