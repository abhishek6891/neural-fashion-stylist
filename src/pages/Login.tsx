
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
    } else {
      // If no profile found, we shouldn't show profile creation during login
      // Just redirect to home and let them create profile later if needed
      console.log("No profile found during login, redirecting to home");
      navigate("/");
    }
  };

  return (
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
  );
};

export default Login;
