
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Message } from "./ai-stylist/types";
import { getFallbackResponse } from "./ai-stylist/fallbackResponses";
import ChatHeader from "./ai-stylist/ChatHeader";
import MessageList from "./ai-stylist/MessageList";
import ChatInput from "./ai-stylist/ChatInput";

interface AiStylistChatProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AiStylistChat = ({ isOpen, onOpenChange }: AiStylistChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Fashion Stylist. I can help you find the perfect outfit for any occasion, suggest color combinations, and provide personalized style advice. You can also upload photos of outfits for me to analyze and give feedback! What fashion help do you need today?",
      isUser: false
    }
  ]);
  const [input, setInput] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (retryMessage?: string, retryImages?: string[]) => {
    const messageToSend = retryMessage || input;
    const imagesToSend = retryImages || selectedImages;
    
    if (!messageToSend.trim() && imagesToSend.length === 0) return;

    if (!retryMessage) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: messageToSend || "Please analyze these outfit photos",
        isUser: true,
        uploadedImages: imagesToSend
      };
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      setSelectedImages([]);
    }
    
    setIsLoading(true);

    try {
      console.log("Sending message to AI stylist:", { message: messageToSend, images: imagesToSend });
      
      const { data, error } = await supabase.functions.invoke('ai-stylist', {
        body: { 
          message: messageToSend,
          images: imagesToSend
        }
      });

      if (error) {
        console.error('AI stylist error:', error);
        throw error;
      }

      console.log("AI stylist response:", data);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data?.response || getFallbackResponse(messageToSend),
        isUser: false,
        images: data?.images || []
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
      
      toast.error("I'm having a moment, but I provided some general advice above. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const retryLastMessage = () => {
    const lastUserMessage = [...messages].reverse().find(msg => msg.isUser);
    if (lastUserMessage) {
      sendMessage(lastUserMessage.content, lastUserMessage.uploadedImages);
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
      <Card className="w-full max-w-4xl h-[85vh] flex flex-col">
        <ChatHeader 
          onRetry={retryLastMessage}
          onClose={() => onOpenChange(false)}
          isLoading={isLoading}
        />
        
        <CardContent className="flex-1 flex flex-col p-4 min-h-0 overflow-hidden">
          <MessageList messages={messages} isLoading={isLoading} />
          <ChatInput 
            input={input}
            onInputChange={setInput}
            onSend={() => sendMessage()}
            onKeyPress={handleKeyPress}
            isLoading={isLoading}
            selectedImages={selectedImages}
            onImagesSelected={setSelectedImages}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AiStylistChat;
