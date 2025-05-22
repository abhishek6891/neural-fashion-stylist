
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

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if Supabase credentials are available
  const hasSupabaseCredentials = 
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
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
      
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Logged in successfully!");

      // Check if user has profile measurements
      if (authData?.user?.id) {
        setUserId(authData.user.id);
        
        const { data: profileData, error: profileError } = await supabase
          .from('profile_measurements')
          .select('*')
          .eq('user_id', authData.user.id)
          .single();
        
        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
          console.error("Error checking profile:", profileError);
        }
        
        // If no profile data found, show the profile form
        if (!profileData) {
          setShowProfileForm(true);
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 container">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Welcome <span className="gradient-text">Back</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Log in to your Neural Threads account
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
                          placeholder="Enter your password" 
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

              <Button type="submit" className="w-full" disabled={isLoading || !hasSupabaseCredentials}>
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </Form>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-fashion-purple hover:underline">
                Sign up
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
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Login;
