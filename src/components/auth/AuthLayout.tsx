
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface AuthLayoutProps {
  title: string;
  titleHighlight: string;
  description: string;
  children: ReactNode;
  linkText: string;
  linkDescription: string;
  linkHref: string;
}

const AuthLayout = ({
  title,
  titleHighlight,
  description,
  children,
  linkText,
  linkDescription,
  linkHref,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 container">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            {title} <span className="gradient-text">{titleHighlight}</span>
          </h1>
          <p className="text-muted-foreground mb-8">{description}</p>

          {children}

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              {linkDescription}{" "}
              <Link to={linkHref} className="text-fashion-purple hover:underline">
                {linkText}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
