import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, RefreshCw, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  images?: string[];
}

interface AiStylistChatProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AiStylistChat = ({ isOpen, onOpenChange }: AiStylistChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Fashion Stylist. I can help you find the perfect outfit for any occasion, suggest color combinations, and provide personalized style advice. What fashion help do you need today?",
      isUser: false
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFallbackResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('color') || lowerMessage.includes('colour')) {
      return "For color coordination, consider these tips: Stick to a maximum of 3 colors in one outfit. Use the color wheel - complementary colors (opposite on the wheel) create striking looks, while analogous colors (next to each other) create harmony. Neutral colors like black, white, gray, and beige work with almost everything!";
    }
    
    if (lowerMessage.includes('formal') || lowerMessage.includes('business')) {
      return "For formal/business attire: Choose well-fitted pieces in classic colors (navy, black, gray). A blazer instantly elevates any outfit. For men: suit or dress pants with button-down shirt. For women: blazer with dress pants/skirt, or a sheath dress. Always ensure your shoes are polished and professional.";
    }
    
    if (lowerMessage.includes('casual')) {
      return "For casual looks: Dark jeans are versatile and flattering. Layer with cardigans, blazers, or jackets. Choose comfortable but fitted pieces. Mix textures for interest. Sneakers, loafers, or ankle boots work well. Don't forget accessories - they can make a simple outfit look intentional!";
    }
    
    if (lowerMessage.includes('body type') || lowerMessage.includes('figure')) {
      return "Dressing for your body type: Focus on fit over trends. Emphasize your favorite features. A-line cuts flatter most body types. High-waisted bottoms create a longer leg line. V-necks elongate the torso. The most important thing is wearing clothes that make YOU feel confident!";
    }
    
    return "I'd love to help with your style questions! Here are some universal style tips: Invest in quality basics, ensure proper fit, choose a cohesive color palette, and add personality with accessories. What specific style area would you like advice on - colors, occasions, body type, or something else?";
  };

  const sendMessage = async (retryMessage?: string) => {
    const messageToSend = retryMessage || input;
    if (!messageToSend.trim()) return;

    if (!retryMessage) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: messageToSend,
        isUser: true
      };
      setMessages(prev => [...prev, userMessage]);
      setInput("");
    }
    
    setIsLoading(true);

    try {
      console.log("Sending message to AI stylist:", messageToSend);
      
      const { data, error } = await supabase.functions.invoke('ai-stylist', {
        body: { message: messageToSend }
      });

      if (error) {
        console.error('AI stylist error:', error);
        throw error;
      }

      console.log("AI stylist response:", data);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || getFallbackResponse(messageToSend),
        isUser: false,
        images: data.images || []
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getFallbackResponse(messageToSend),
        isUser: false
      };
      setMessages(prev => [...prev, fallbackMessage]);
      
      if (!error.message?.includes('Rate limit') && !error.message?.includes('429')) {
        toast.error("I'm having a moment, but I provided some general advice above. Please try again!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const retryLastMessage = () => {
    const lastUserMessage = [...messages].reverse().find(msg => msg.isUser);
    if (lastUserMessage) {
      sendMessage(lastUserMessage.content);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl h-[80vh] max-h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            AI Fashion Stylist
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={retryLastMessage}
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Retry
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-4 min-h-0">
          <ScrollArea className="flex-1 pr-2 mb-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    
                    {message.images && message.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {message.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Style suggestion ${index + 1}`}
                            className="rounded-md w-full h-32 object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="flex gap-2 pt-2 border-t">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for style suggestions..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={() => sendMessage()} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiStylistChat;
