
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import ProfileForm from "@/components/ProfileForm";

const Login = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<"customer" | "designer" | null>(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (
    userId: string, 
    userType: "customer" | "designer" | null
  ) => {
    console.log("Login success:", { userId, userType });
    
    if (userType) {
      // User has a profile, redirect to home immediately
      localStorage.setItem('userType', userType);
      navigate("/");
      // No need to reload the page, just navigate
    } else {
      // If no profile found, show the profile form
      console.log("No profile found, showing profile creation form");
      setUserId(userId);
      setUserType("customer"); // Default to customer
      setShowProfileForm(true);
    }
  };

  const handleProfileComplete = () => {
    console.log("Profile completed for user type:", userType);
    navigate("/");
    // Store user type in localStorage
    if (userType) {
      localStorage.setItem('userType', userType);
    }
  };

  return (
    <>
      <AuthLayout 
        title="Welcome"
        titleHighlight="Back"
        description="Log in to your Neural Threads account"
        linkText="Sign up"
        linkDescription="Don't have an account?"
        linkHref="/signup"
      >
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </AuthLayout>
      
      {/* Profile Measurements Form - only show if user has no profile */}
      {userId && userType && showProfileForm && (
        <ProfileForm 
          isOpen={showProfileForm}
          onOpenChange={setShowProfileForm} 
          userId={userId} 
          userType={userType}
          onComplete={handleProfileComplete}
        />
      )}
    </>
  );
};

export default Login;
