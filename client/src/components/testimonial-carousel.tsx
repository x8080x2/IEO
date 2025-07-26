import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Tommy G Griffin",
    role: "Electrician",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    quote: "Thank you so much for the outstanding service the Federal Emergency and Social Security Administration funds (FESSA Fund) provided. They efficiently reviewed my application and executed the program. I received a $550,000.00 refundable check payment, which has made a significant difference in my life. The eligibility and application process with FESSA was straightforward and reliable. Thank you, FESSA, for your support."
  },
  {
    id: 2,
    name: "Kortney Clark",
    role: "Real Estate Broker",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    quote: "I've received a significant $750,000.00 grant from the FESSA Fund. Initially, I had doubts when I came across them online, but after speaking directly with their representative, I can confidently affirm their legitimacy. This support is genuine and greatly appreciated. Thank you."
  },
  {
    id: 3,
    name: "Richard Leon Peak",
    role: "Construction Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    quote: "I am deeply grateful for the $450,000.00 direct deposit I received from the IEO Fund today. This generous support comes with no repayment obligation, and it means the world to me. I wholeheartedly recommend the IEO Fund to others in need. Thank you, IEO."
  },
  {
    id: 4,
    name: "Elizabeth Newcomer",
    role: "Registered Nurse",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    quote: "I'm incredibly proud to share that the IEO Fund has truly transformed my life. I recently received a life-changing $450,000.00 check delivered to my home. My husband, my daughter, and I are overjoyed. I strongly urge everyone to explore this program – it's a genuine opportunity. Thank you, IEO Fund!"
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
