import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const currentYear = new Date().getFullYear();
  return <footer className="bg-foreground text-background">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Assorted Coworking</h3>
            <p className="text-background/80 mb-4">
              Premium coworking solutions for modern professionals and growing teams.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              
              
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection("home")} className="text-background/80 hover:text-background transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="text-background/80 hover:text-background transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("pricing")} className="text-background/80 hover:text-background transition-colors">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="text-background/80 hover:text-background transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                <span className="text-background/80">Our office is located at Sector D-12 Markaz, Zarpar Arcade, Office #27, Islamabad.</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-background/80">+92 3218526405
              </span>
              </li>
              
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="text-center text-background/80">
            <p>&copy; {currentYear} Assorted Coworking. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;