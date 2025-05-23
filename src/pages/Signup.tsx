
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
    // Store the user ID and show the profile form
    setUserId(userId);
    setUserType(userType);
    setShowProfileForm(true);
  };

  const handleUserTypeChange = (type: "customer" | "designer") => {
    setUserType(type);
  };

  const handleProfileComplete = () => {
    navigate("/");
    // Store user type in localStorage
    localStorage.setItem('userType', userType);
    // Refresh the page to reflect changes
    window.location.reload();
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

      {/* Profile Measurements Form */}
      {userId && (
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
