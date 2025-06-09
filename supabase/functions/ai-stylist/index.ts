
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

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Add retry logic for rate limiting
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        // Prepare messages for OpenAI
        const messages = [
          {
            role: 'system',
            content: `You are an expert AI fashion stylist. Your role is to provide personalized fashion advice, style recommendations, and outfit analysis. You should:
            
            1. Analyze clothing items, colors, and style combinations
            2. Suggest specific clothing items, colors, and combinations
            3. Provide tips for different occasions (casual, formal, business, etc.)
            4. Recommend fashion brands and shopping suggestions
            5. Give advice on color coordination and styling techniques
            6. Help with wardrobe organization and capsule wardrobe creation
            7. Suggest accessories and how to incorporate trends
            8. When analyzing outfit photos, comment on fit, color harmony, styling, and suggest improvements
            
            Always be encouraging, specific, and helpful. If users upload photos, provide detailed analysis and constructive feedback. Be concise but informative.`
          }
        ];

        // If images are provided, create a message with both text and images
        if (images && images.length > 0) {
          const content = [
            {
              type: 'text',
              text: message || 'Please analyze these outfit photos and provide styling advice.'
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

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: messages,
            temperature: 0.7,
            max_tokens: 800,
          }),
        });

        if (response.status === 429) {
          // Rate limited, wait and retry
          retryCount++;
          if (retryCount < maxRetries) {
            const waitTime = Math.pow(2, retryCount) * 1000; // Exponential backoff
            await new Promise(resolve => setTimeout(resolve, waitTime));
            continue;
          }
          throw new Error('Rate limit exceeded. Please try again in a few moments.');
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error('OpenAI API error response:', errorText);
          throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          console.error('Invalid OpenAI response structure:', data);
          throw new Error('Invalid response from OpenAI API');
        }

        const stylistResponse = data.choices[0].message.content;

        return new Response(JSON.stringify({ 
          response: stylistResponse,
          images: getStyleImages(message) 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error('Error in AI stylist retry loop:', error);
        if (retryCount === maxRetries - 1) {
          throw error;
        }
        retryCount++;
        const waitTime = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  } catch (error) {
    console.error('Error in ai-stylist function:', error);
    
    // Provide a fallback response for rate limiting
    if (error.message.includes('Rate limit') || error.message.includes('429')) {
      return new Response(JSON.stringify({ 
        response: "I'm currently experiencing high demand. Here are some general style tips: Consider your body type when choosing clothes, stick to a cohesive color palette, and invest in quality basics like a well-fitted blazer, good jeans, and comfortable shoes. What specific style question can I help you with?",
        images: getStyleImages("general styling tips")
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "I apologize, but I'm having technical difficulties right now. Here's some general styling advice: Focus on fit first, then color coordination, and don't forget accessories to complete your look!"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getStyleImages(message: string): string[] {
  const lowerMessage = (message || '').toLowerCase();
  
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
