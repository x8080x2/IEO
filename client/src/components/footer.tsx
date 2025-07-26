import { Link } from "wouter";
import { Building2, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-8 flex items-center justify-center">
                <div className="text-2xl font-bold text-white" style={{fontFamily: 'serif'}}>
                  IEO
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">IEO</h3>
                <p className="text-sm text-gray-400">
                  International Economic Organization
                </p>
              </div>
            </div>
            <p className="text-gray-400">
              Providing financial assistance and support to individuals and families in need across the United States.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div className="text-gray-300">
                  <p>1 United Nation Plaza</p>
                  <p>New York, NY 10017 USA</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <p className="text-gray-300">info@ieo-us.org</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <p className="text-gray-300">(651) 300-9503</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("#about")}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("#process")}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("#team")}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Our Team
              </button>
              <button
                onClick={() => scrollToSection("#testimonials")}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Testimonials
              </button>
              <Link href="/apply" className="block text-gray-300 hover:text-white transition-colors">
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© ieo-us.org, All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
