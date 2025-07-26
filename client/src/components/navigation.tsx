import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Building2 } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#process", label: "Process" },
    { href: "#team", label: "Team" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 fessa-blue rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">IEO</h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                Federal Emergency & Social Security Administration
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-fessa-blue transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <Link href="/apply">
              <Button className="fessa-blue hover:fessa-blue-dark text-white">
                Apply Now
              </Button>
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:block text-right">
            <p className="text-sm text-gray-600">info@ieo-us.org</p>
            <p className="text-sm font-semibold text-gray-900">(651) 300-9503</p>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left py-2 text-gray-700 hover:text-fessa-blue transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <Link href="/apply" onClick={() => setIsOpen(false)}>
                  <Button className="w-full fessa-blue hover:fessa-blue-dark text-white mt-4">
                    Apply Now
                  </Button>
                </Link>
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">info@ieo-us.org</p>
                  <p className="text-sm font-semibold text-gray-900">(651) 300-9503</p>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}