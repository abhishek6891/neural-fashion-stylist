
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";
import ProfileForm from "@/components/ProfileForm";

const Signup = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<"customer" | "designer">("customer");
  const navigate = useNavigate();

  const handleSignupSuccess = (
    userId: string,
    userType: "customer" | "designer"
  ) => {
    console.log("Signup success, showing profile form for:", { userId, userType });
    // Store the user ID and show the profile form
    setUserId(userId);
    setUserType(userType);
    setShowProfileForm(true);
  };

  const handleUserTypeChange = (type: "customer" | "designer") => {
    console.log("User type changed to:", type);
    setUserType(type);
  };

  const handleProfileComplete = () => {
    console.log("Profile completed for user type:", userType);
    // Store user type in localStorage
    localStorage.setItem('userType', userType);
    navigate("/");
  };

  return (
    <>
      <AuthLayout 
        title="Create"
        titleHighlight="Account"
        description="Sign up for your Neural Threads account"
        linkText="Log in"
        linkDescription="Already have an account?"
        linkHref="/login"
      >
        <SignupForm 
          onSignupSuccess={handleSignupSuccess}
          userType={userType}
          onUserTypeChange={handleUserTypeChange}
        />
      </AuthLayout>

      {/* Profile Form - only show after successful signup */}
      {userId && showProfileForm && (
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

export default Signup;
