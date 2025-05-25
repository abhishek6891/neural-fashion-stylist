
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { message } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert AI fashion stylist. Your role is to provide personalized fashion advice, style recommendations, and outfit suggestions. You should:
            
            1. Analyze the user's style preferences, body type, and lifestyle
            2. Suggest specific clothing items, colors, and combinations
            3. Provide tips for different occasions (casual, formal, business, etc.)
            4. Recommend fashion brands and shopping suggestions
            5. Give advice on color coordination and styling techniques
            6. Help with wardrobe organization and capsule wardrobe creation
            7. Suggest accessories and how to incorporate trends
            
            Always be encouraging, specific, and helpful. If users ask about specific items, provide detailed styling advice. Be concise but informative.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const stylistResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      response: stylistResponse,
      images: getStyleImages(message) 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-stylist function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getStyleImages(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  
  // Return relevant style images based on the message content
  if (lowerMessage.includes('formal') || lowerMessage.includes('business')) {
    return [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-0da9d6d6f1b7?w=300&h=400&fit=crop"
    ];
  }
  
  if (lowerMessage.includes('casual') || lowerMessage.includes('everyday')) {
    return [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=400&fit=crop"
    ];
  }
  
  if (lowerMessage.includes('wedding') || lowerMessage.includes('special occasion')) {
    return [
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&h=400&fit=crop"
    ];
  }
  
  // Default stylish outfit images
  return [
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
  ];
}
