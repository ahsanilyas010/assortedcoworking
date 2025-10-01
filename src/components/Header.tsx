import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gradient">Assorted Co-working</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("home")} className="text-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className="text-foreground hover:text-primary transition-colors">
              About Us
            </button>
            <button onClick={() => scrollToSection("pricing")} className="text-foreground hover:text-primary transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-foreground hover:text-primary transition-colors">
              Contact
            </button>
            <Button variant="accent" onClick={() => scrollToSection("contact")}>
              Book a Tour
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="md:hidden py-4 bg-background border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection("home")} className="text-foreground hover:text-primary transition-colors py-2">
                Home
              </button>
              <button onClick={() => scrollToSection("about")} className="text-foreground hover:text-primary transition-colors py-2">
                About Us
              </button>
              <button onClick={() => scrollToSection("pricing")} className="text-foreground hover:text-primary transition-colors py-2">
                Pricing
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-foreground hover:text-primary transition-colors py-2">
                Contact
              </button>
              <Button variant="accent" onClick={() => scrollToSection("contact")} className="w-full">
                Book a Tour
              </Button>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;