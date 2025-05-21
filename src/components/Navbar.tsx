
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const Navbar = () => {
  const isMobile = useIsMobile();

  const navItems = [
    { name: "Discover", path: "/discover" },
    { name: "Tailors", path: "/tailors" },
    { name: "AI Stylist", path: "/ai-stylist" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fashion-purple to-fashion-pink flex items-center justify-center text-white font-bold text-lg">
            NT
          </div>
          {!isMobile && (
            <span className="text-xl font-bold gradient-text">
              Neural Threads
            </span>
          )}
        </Link>

        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link to={item.path}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link to="/login" className="text-fashion-pink font-medium">
                  Log In
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/signup" className="text-fashion-purple font-medium">
                  Sign Up
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-foreground/80 hover:text-fashion-purple transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
