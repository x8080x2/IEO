import Navigation from "@/components/navigation";
import HeroCarousel from "@/components/hero-carousel";
import TestimonialCarousel from "@/components/testimonial-carousel";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { 
  FileText, 
  Search, 
  CheckCircle, 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  Building2,
  Target,
  Heart,
  DollarSign
} from "lucide-react";

const teamMembers = [
  {
    name: "Eileen Briggs",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    slug: "eileen-briggs"
  },
  {
    name: "Tammy Nolen",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    slug: "tammy-nolen"
  },
  {
    name: "Amanda Rios Heintz",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    slug: "amanda-rios-heintz"
  }
];

export default function Home() {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof contactForm) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon.",
      });
      setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(contactForm);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroCarousel />
      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <Badge className="fessa-accent text-gray-900 font-semibold mb-3">About Us</Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  We provide relief for people in need
                </h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>The primary objective of the International Economic Organization Funds (IEO) Program is to enhance the health and economic well-being of United States citizens. This is achieved by providing an extensive and curated catalog of third-party resources.</p>
                <p>
                  Our commitment is to offer an extensive nationwide directory encompassing resources, 
                  benefits, and programs to support individuals and families facing various hardships.
                </p>
                <p>
                  For those with limited income facing the challenges of basic living expenses, 
                  government assistance may be available to help with essential needs such as food, 
                  housing, medical, and more.
                </p>
                <p>
                  Our mission is to assist individuals in achieving financial stability, debt 
                  reduction, and a more tranquil lifestyle. The benefits we provide do not require 
                  repayment.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <Card className="p-4 text-center">
                  <Target className="w-8 h-8 text-fessa-blue mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Our Mission</h4>
                  <p className="text-sm text-gray-600">Financial stability and debt reduction</p>
                </Card>
                <Card className="p-4 text-center">
                  <Heart className="w-8 h-8 text-fessa-blue mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Our Vision</h4>
                  <p className="text-sm text-gray-600">Comprehensive nationwide support directory</p>
                </Card>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Professional office setting"
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 fessa-blue text-white p-6 rounded-xl shadow-lg">
                <DollarSign className="w-8 h-8 mb-2" />
                <p className="text-xl font-bold">GET YOUR FUNDS</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="fessa-accent text-gray-900 font-semibold mb-3">GET YOUR FUNDS</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How The Process Works</h2>
            <p className="text-xl text-fessa-blue font-semibold">INTERNATIONAL ECONOMIC ORGANIZATION FUNDS (IEO International Economic Organization)</p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 fessa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Application</h3>
              <p className="text-gray-600">
                Complete our comprehensive application form with your personal and financial information.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 fessa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Review</h3>
              <p className="text-gray-600">
                Our team reviews your application and matches you with appropriate funding programs.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 fessa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Approval</h3>
              <p className="text-gray-600">
                Upon approval, receive your funding with no repayment requirements.
              </p>
            </Card>
          </div>

          {/* Process Description */}
          <div className="prose prose-lg text-gray-600 max-w-5xl mx-auto space-y-6">
            <p>
              There are moments when external assistance becomes necessary, particularly when seeking 
              financial, housing, and family services to navigate challenging circumstances. Our 
              unwavering commitment lies in furnishing you with a nationwide, comprehensive directory 
              replete with resources, benefits, and programs designed to offer support to individuals 
              and families experiencing adversity.
            </p>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-2xl font-bold text-fessa-blue mb-4">Federal Government Assistance</h3>
              <p>
                For those with limited income who require assistance with fundamental living expenses, 
                the potential for eligibility exists for government aid, which can encompass support 
                for food, housing, medical, and other essential costs. This government support category 
                includes federal assistance, reserve, or funds.
              </p>
            </Card>

            <p>
              Managing monthly expenses can sometimes be daunting, so we have curated a thorough 
              directory of benefits, resources, programs, and assistance for those who qualify. This 
              directory encompasses various local, state, and federal government organizations.
            </p>

            <p>
              Across the nation, more than 1,100 community action agencies are dedicated to serving 
              low and moderate-income families with an array of valuable services. These programs and 
              resources are designed to offer short-term financial relief for individuals struggling 
              to meet their financial obligations.
            </p>
          </div>

          <div className="text-center mt-12">
            <Link href="/apply">
              <Button size="lg" className="fessa-blue hover:fessa-blue-dark text-white font-semibold text-lg px-8 py-4">
                APPLY NOW
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="fessa-accent text-gray-900 font-semibold mb-3">Our Team</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Exclusive Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <Link href={`/team/${member.slug}`}>
                    <Button variant="link" className="text-fessa-blue hover:text-blue-800 font-semibold p-0">
                      Bio →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <TestimonialCarousel />
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <Badge className="fessa-accent text-gray-900 font-semibold mb-3">Get In Touch</Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Request A Call-Back</h2>
              </div>

              {/* Contact Info */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 fessa-blue rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">1 United Nation Plaza, New York, NY 10017 USA</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 fessa-blue rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">(651) 300-9503</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 fessa-blue rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@ieo-us.org</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8 shadow-lg">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="Your Mobile"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  />
                </div>

                <div>
                  <Input
                    placeholder="Subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                </div>

                <div>
                  <Textarea
                    placeholder="Message"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full fessa-blue hover:fessa-blue-dark text-white font-semibold"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Sending..." : "Submit Now"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}