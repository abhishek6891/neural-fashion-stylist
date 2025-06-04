
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting booking creation process...');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const requestBody = await req.json();
    console.log('Request body:', requestBody);

    const { 
      p_customer_id, 
      p_designer_id, 
      p_service_type, 
      p_notes, 
      p_booking_date 
    } = requestBody;

    console.log('Extracted parameters:', {
      p_customer_id,
      p_designer_id,
      p_service_type,
      p_notes,
      p_booking_date
    });

    // Validate required fields
    if (!p_customer_id || !p_designer_id || !p_service_type || !p_booking_date) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: customer_id, designer_id, service_type, and booking_date are required' 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Insert into the bookings table using the service role key
    console.log('Attempting to insert booking...');
    const { data, error } = await supabaseClient
      .from('bookings')
      .insert({
        customer_id: p_customer_id,
        designer_id: p_designer_id,
        service_type: p_service_type,
        notes: p_notes || null,
        booking_date: p_booking_date,
        status: 'pending', // Set initial status
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Booking created successfully:', data);

    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred while creating the booking'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
