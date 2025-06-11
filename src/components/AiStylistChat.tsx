
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ChatHeader from "./ai-stylist/ChatHeader";
import MessageList from "./ai-stylist/MessageList";
import ChatInput from "./ai-stylist/ChatInput";
import { Message } from "./ai-stylist/types";
import { supabase } from "@/integrations/supabase/client";

interface AiStylistChatProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AiStylistChat = ({ isOpen, onOpenChange }: AiStylistChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI fashion stylist. I can help you with outfit suggestions, color coordination, styling tips, and analyze your wardrobe photos. What would you like to know about fashion today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if ((!input.trim() && selectedImages.length === 0) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
      uploadedImages: selectedImages.length > 0 ? [...selectedImages] : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log('Sending request to AI stylist...');
      
      const { data, error } = await supabase.functions.invoke('ai-stylist', {
        body: {
          message: input,
          images: selectedImages
        }
      });

      console.log('AI stylist response:', data, error);

      if (error) {
        throw new Error(error.message || 'Failed to get AI response');
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I apologize, but I'm having trouble generating a response right now. Please try again.",
        isUser: false,
        timestamp: new Date(),
        images: data.images || [],
      };

      setMessages(prev => [...prev, aiMessage]);
      setSelectedImages([]);
    } catch (error) {
      console.error('Error calling AI stylist:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm experiencing some technical difficulties. Please try again in a moment. In the meantime, here's a quick tip: Always consider your body type and personal style when choosing outfits!",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Unable to reach the AI stylist. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRetry = () => {
    if (messages.length > 1) {
      const lastUserMessage = messages.filter(m => m.isUser).pop();
      if (lastUserMessage) {
        setInput(lastUserMessage.content);
        setSelectedImages(lastUserMessage.uploadedImages || []);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 gap-0">
        <Card className="h-full border-none shadow-none">
          <ChatHeader 
            onRetry={handleRetry}
            onClose={() => onOpenChange(false)}
            isLoading={isLoading}
          />
          <CardContent className="flex flex-col h-[calc(100%-5rem)] p-4">
            <MessageList messages={messages} isLoading={isLoading} />
            <ChatInput
              input={input}
              onInputChange={setInput}
              onSend={handleSend}
              onKeyPress={handleKeyPress}
              isLoading={isLoading}
              selectedImages={selectedImages}
              onImagesSelected={setSelectedImages}
            />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AiStylistChat;
