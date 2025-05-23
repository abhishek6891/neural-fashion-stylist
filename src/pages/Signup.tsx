
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/ProfileForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<"customer" | "designer">("customer");
  const navigate = useNavigate();

  // Check if Supabase credentials are available
  const hasSupabaseCredentials = 
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY;

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    if (!hasSupabaseCredentials) {
      toast.error("Authentication is not available");
      return;
    }

    setIsLoading(true);

    try {
      // We'll use dynamic import to prevent the error when Supabase isn't available
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
      );
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Account created successfully!");

      // Check if user has profile measurements
      if (authData?.user?.id) {
        setUserId(authData.user.id);
        setShowProfileForm(true);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 container">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Create <span className="gradient-text">Account</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign up for your Neural Threads account
          </p>

          {!hasSupabaseCredentials && (
            <Alert className="mb-8 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30">
              <AlertDescription>
                Authentication is not available because Supabase is not connected.
                Please connect your project to Supabase to enable authentication features.
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <p className="text-sm font-medium">I am a:</p>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={userType === "customer" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => handleUserTypeChange("customer")}
                  >
                    Customer
                  </Button>
                  <Button
                    type="button"
                    variant={userType === "designer" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => handleUserTypeChange("designer")}
                  >
                    Designer/Tailor
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !hasSupabaseCredentials}>
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </form>
          </Form>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-fashion-purple hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>

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

      <Footer />
    </div>
  );
};

export default Signup;
