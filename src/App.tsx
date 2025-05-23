
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Discover from "./pages/Discover";
import AiStylist from "./pages/AiStylist";
import Tailors from "./pages/Tailors";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Initialize React Query
const queryClient = new QueryClient();

// Check if we have Supabase credentials available
const hasSupabaseCredentials = 
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY;

// If credentials are missing, we'll show a message in the console
if (!hasSupabaseCredentials) {
  console.warn(
    "Supabase credentials are missing. Some features will be limited. " +
    "Please connect your project to Supabase using the Supabase integration button."
  );
}

// Main App component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/ai-stylist" element={<AiStylist />} />
          <Route path="/tailors" element={<Tailors />} />
          <Route path="/about" element={<About />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
