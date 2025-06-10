
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
    const { message, images } = await req.json();
    console.log('Received request:', { message, imageCount: images?.length || 0 });

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key not configured',
        response: "I'm having trouble connecting to my AI brain right now. Here's some general styling advice: Focus on fit first - well-fitted clothes always look better regardless of style. Consider your color palette and stick to 2-3 colors max per outfit."
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are an expert AI fashion stylist with years of experience in personal styling, fashion trends, and wardrobe consulting. Your role is to provide detailed, personalized fashion advice and style recommendations. You should:
        
        1. Analyze clothing items, colors, fits, and style combinations in detail
        2. Suggest specific clothing items, brands, colors, and styling techniques
        3. Provide comprehensive tips for different occasions (casual, formal, business, date nights, etc.)
        4. Recommend fashion brands and detailed shopping suggestions with price ranges
        5. Give expert advice on color coordination, seasonal styling, and body type considerations
        6. Help with complete wardrobe organization and capsule wardrobe creation
        7. Suggest accessories, shoes, and how to incorporate current trends tastefully
        8. When analyzing outfit photos, provide detailed feedback on fit, color harmony, styling choices, and specific improvement suggestions
        9. Consider factors like skin tone, body shape, lifestyle, and personal preferences
        10. Provide styling alternatives and multiple outfit options

        Always be encouraging, highly specific, and provide actionable advice. Give detailed explanations for your recommendations. If users upload photos, provide comprehensive analysis with constructive feedback and specific suggestions for improvement or styling alternatives.`
      }
    ];

    // If images are provided, create a message with both text and images
    if (images && images.length > 0) {
      const content = [
        {
          type: 'text',
          text: message || 'Please analyze these outfit photos and provide detailed styling advice, including specific suggestions for improvement, color coordination, fit assessment, and styling alternatives.'
        }
      ];
      
      // Add each image to the content
      images.forEach((image: string) => {
        content.push({
          type: 'image_url',
          image_url: {
            url: image,
            detail: 'high'
          }
        });
      });

      messages.push({
        role: 'user',
        content: content
      });
    } else {
      // Text-only message
      messages.push({
        role: 'user',
        content: message
      });
    }

    console.log('Calling OpenAI API with GPT-4.1...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      
      // Handle specific error cases
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          response: "I'm currently experiencing high demand. Here's some quick styling advice: For a polished look, focus on well-fitted basics in neutral colors. Layer strategically and add one statement piece. What specific style question can I help you with?",
          images: getStyleImages(message)
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      throw new Error('Invalid response from OpenAI API');
    }

    const stylistResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      response: stylistResponse,
      images: getStyleImages(message || '') 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-stylist function:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "I apologize for the technical difficulty. Here's some general styling advice: Start with well-fitted basics in colors that complement your skin tone. Build your wardrobe around versatile pieces that can be mixed and matched. What specific styling help do you need?"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getStyleImages(message: string): string[] {
  const lowerMessage = (message || '').toLowerCase();
  
  // Return relevant style images based on the message content
  if (lowerMessage.includes('formal') || lowerMessage.includes('business') || lowerMessage.includes('professional')) {
    return [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-0da9d6d6f1b7?w=300&h=400&fit=crop"
    ];
  }
  
  if (lowerMessage.includes('casual') || lowerMessage.includes('everyday') || lowerMessage.includes('weekend')) {
    return [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=400&fit=crop"
    ];
  }
  
  if (lowerMessage.includes('wedding') || lowerMessage.includes('special occasion') || lowerMessage.includes('party')) {
    return [
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&h=400&fit=crop"
    ];
  }

  if (lowerMessage.includes('beach') || lowerMessage.includes('summer') || lowerMessage.includes('vacation')) {
    return [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544957992-20514f595d6f?w=300&h=400&fit=crop"
    ];
  }
  
  // Default stylish outfit images
  return [
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
  ];
}
