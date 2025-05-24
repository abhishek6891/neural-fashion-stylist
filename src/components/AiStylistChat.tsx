
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  images?: string[];
}

const styleImages = {
  formal: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1566479179817-0da9d6d6f1b7?w=300&h=400&fit=crop"
  ],
  casual: [
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=400&fit=crop"
  ],
  traditional: [
    "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop"
  ],
  wedding: [
    "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1566479179817-0da9d6d6f1b7?w=300&h=400&fit=crop"
  ]
};

const AiStylistChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Fashion Stylist. I can help you find the perfect outfit for any occasion. What are you looking for today?",
      isUser: false
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = (userMessage: string): { content: string; images?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('formal') || lowerMessage.includes('office') || lowerMessage.includes('business')) {
      return {
        content: "Great choice! For formal occasions, I recommend classic tailored pieces. Here are some elegant formal wear options that would look stunning:",
        images: styleImages.formal
      };
    }
    
    if (lowerMessage.includes('casual') || lowerMessage.includes('everyday') || lowerMessage.includes('relaxed')) {
      return {
        content: "Perfect! For casual wear, comfort meets style. Here are some trendy casual outfits that are both comfortable and fashionable:",
        images: styleImages.casual
      };
    }
    
    if (lowerMessage.includes('traditional') || lowerMessage.includes('ethnic') || lowerMessage.includes('saree') || lowerMessage.includes('kurta')) {
      return {
        content: "Wonderful! Traditional wear has such timeless elegance. Here are some beautiful traditional outfits that celebrate cultural fashion:",
        images: styleImages.traditional
      };
    }
    
    if (lowerMessage.includes('wedding') || lowerMessage.includes('bride') || lowerMessage.includes('groom') || lowerMessage.includes('ceremony')) {
      return {
        content: "How exciting! Wedding attire should be absolutely special. Here are some gorgeous wedding outfit inspirations:",
        images: styleImages.wedding
      };
    }
    
    return {
      content: "That sounds interesting! Could you tell me more about the occasion or style you're looking for? I can suggest formal wear, casual outfits, traditional clothing, or wedding attire with visual examples."
    };
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const response = generateResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        isUser: false,
        images: response.images
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI Fashion Stylist
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  
                  {message.images && (
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
                <div className="bg-muted px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask for style suggestions..."
            disabled={isLoading}
          />
          <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiStylistChat;
