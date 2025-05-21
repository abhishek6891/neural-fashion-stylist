
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-muted py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fashion-purple to-fashion-pink flex items-center justify-center text-white font-bold text-lg">
                NT
              </div>
              <span className="text-xl font-bold gradient-text">
                Neural Threads
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              Connecting fashion designers, customers, and tailors through the power of AI and personalization.
            </p>
            <div className="flex gap-4">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4" aria-hidden="true"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Platform</h3>
            <ul className="space-y-3">
              {[
                { name: "Discover Designers", path: "/discover" },
                { name: "AI Stylist", path: "/ai-stylist" },
                { name: "Find Tailors", path: "/tailors" },
                { name: "How It Works", path: "/how-it-works" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-muted-foreground hover:text-fashion-purple transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Careers", path: "/careers" },
                { name: "Blog", path: "/blog" },
                { name: "Press", path: "/press" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-muted-foreground hover:text-fashion-purple transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {[
                { name: "Help Center", path: "/help" },
                { name: "Contact Us", path: "/contact" },
                { name: "FAQs", path: "/faqs" },
                { name: "Privacy Policy", path: "/privacy" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-muted-foreground hover:text-fashion-purple transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Neural Threads. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { name: "Privacy", path: "/privacy" },
              { name: "Terms", path: "/terms" },
              { name: "Cookies", path: "/cookies" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm text-muted-foreground hover:text-fashion-purple transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
