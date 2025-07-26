import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Tommy G Griffin",
    role: "Electrician",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    quote: "Thanks a million for the great service from the IEO Fund. They processed my application quickly and got me a refundable check, which has made a huge difference. The application process was a breeze. Cheers to IEO!"
  },
  {
    id: 2,
    name: "Kortney Clark",
    role: "Real Estate Broker",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    quote: "I received a generous grant from the IEO Fund. I can assure you they’re the real deal. This support is truly appreciated. Thank you!"
  },
  {
    id: 3,
    name: "Richard Leon Peak",
    role: "Construction Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    quote: "I am deeply grateful for the supporting received from the IEO Fund. No repayment obligation, and it means the world to me. I wholeheartedly recommend the IEO Fund to others in need. Thank you, IEO."
  },
  {
    id: 4,
    name: "Elizabeth Newcomer",
    role: "Registered Nurse",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    quote: "I'm incredibly proud to share that the IEO Fund has truly transformed my life. Nothing much to say tbh. Thank you IEO."
  }
];

export default function TestimonialCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 fessa-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-yellow-300 font-semibold text-lg mb-2">Testimonial</p>
          <h2 className="text-4xl font-bold text-white">What Our Clients Say!</h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto">
                    <div className="flex items-start space-x-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                          "{testimonial.quote}"
                        </p>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
