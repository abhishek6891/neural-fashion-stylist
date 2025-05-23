
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
    if (userType) {
      setUserId(userId);
      setUserType(userType);
      navigate("/");
    } else {
      // If no profile found, show the profile form
      setUserId(userId);
      setUserType("customer");
      setShowProfileForm(true);
    }
  };

  const handleProfileComplete = () => {
    navigate("/");
    // Store user type in localStorage
    if (userType) {
      localStorage.setItem('userType', userType);
    }
    // Refresh the page to reflect changes
    window.location.reload();
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
      
      {/* Profile Measurements Form */}
      {userId && userType && (
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
