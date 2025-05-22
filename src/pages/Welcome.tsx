
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  const [userType, setUserType] = useState<"customer" | "designer" | null>(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const navigate = useNavigate();

  const handleUserTypeSelection = (type: "customer" | "designer") => {
    setUserType(type);
    setShowProfileForm(true);
  };

  const handleProfileComplete = () => {
    navigate("/");
    // Refresh the page to reflect changes
    window.location.reload();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 container">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to <span className="gradient-text">Neural Threads</span>
          </h1>
          
          {!userType ? (
            <>
              <p className="text-muted-foreground mb-10">
                Are you joining us as a designer/tailor or as a customer?
              </p>
              
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 justify-center">
                <Button 
                  onClick={() => handleUserTypeSelection("designer")}
                  className="bg-gradient-to-r from-fashion-purple to-fashion-pink hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  I'm a Designer/Tailor
                </Button>
                
                <Button 
                  onClick={() => handleUserTypeSelection("customer")}
                  variant="outline"
                  size="lg"
                >
                  I'm a Customer
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </main>
      
      {userType && (
        <ProfileForm 
          isOpen={showProfileForm}
          onOpenChange={(open) => {
            setShowProfileForm(open);
            if (!open) navigate("/");
          }}
          userId={userType} // Using userType as a stand-in for userId
          userType={userType}
          onComplete={handleProfileComplete}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Welcome;
