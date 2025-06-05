
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const bookingSchema = z.object({
  serviceType: z.string().min(1, "Service type is required"),
  notes: z.string().optional(),
  bookingDate: z.date({
    required_error: "Please select a booking date",
  }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  designerId: string;
  customerId: string;
  onBookingCreated?: () => void;
}

const BookingForm = ({ isOpen, onOpenChange, designerId, customerId, onBookingCreated }: BookingFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceType: "",
      notes: "",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    if (!customerId || !designerId) {
      toast.error("Please log in to book a service");
      return;
    }

    setIsLoading(true);
    console.log("Starting booking creation...", { customerId, designerId, data });

    try {
      // Validate inputs before sending
      if (!data.serviceType.trim()) {
        toast.error("Please specify the service type");
        setIsLoading(false);
        return;
      }

      if (!data.bookingDate) {
        toast.error("Please select a booking date");
        setIsLoading(false);
        return;
      }

      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to book a service");
        setIsLoading(false);
        return;
      }

      console.log("Calling create-booking function with:", {
        p_customer_id: customerId,
        p_designer_id: designerId,
        p_service_type: data.serviceType.trim(),
        p_notes: data.notes?.trim() || null,
        p_booking_date: data.bookingDate.toISOString(),
      });

      // Use the edge function to create booking
      const { data: result, error } = await supabase.functions.invoke('create-booking', {
        body: {
          p_customer_id: customerId,
          p_designer_id: designerId,
          p_service_type: data.serviceType.trim(),
          p_notes: data.notes?.trim() || null,
          p_booking_date: data.bookingDate.toISOString(),
        }
      });

      console.log("Function response:", { result, error });

      if (error) {
        console.error('Booking creation error:', error);
        toast.error(`Failed to create booking: ${error.message || 'Unknown error occurred'}`);
        return;
      }

      if (result?.error) {
        console.error('Server error:', result.error);
        toast.error(`Booking failed: ${result.error}`);
        return;
      }

      // Success case
      console.log("Booking created successfully:", result);
      toast.success("🎉 Booking request sent successfully! The designer will be notified and will contact you soon.", {
        duration: 5000,
        style: {
          background: '#10B981',
          color: 'white',
        },
      });
      
      // Reset form and close dialog
      form.reset();
      onOpenChange(false);
      
      // Call the callback if provided
      if (onBookingCreated) {
        onBookingCreated();
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error("Failed to create booking. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">Book a Service</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Custom suit, Wedding dress, Alterations" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your requirements, preferred style, timeline, etc..." 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bookingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preferred Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className="w-full pl-3 text-left font-normal"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1" 
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary/90" 
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Request"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
