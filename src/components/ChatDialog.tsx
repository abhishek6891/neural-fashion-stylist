
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  id: string;
  message: string;
  sender_id: string;
  created_at: string;
}

interface ChatDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  currentUserId: string;
}

const ChatDialog = ({ isOpen, onOpenChange, bookingId, currentUserId }: ChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isOpen || !bookingId) return;

    // For now, we'll use a simple demo chat since the chat_messages table isn't in TypeScript types yet
    const demoMessages: Message[] = [
      {
        id: "1",
        message: "Hello! I'm interested in your design services.",
        sender_id: currentUserId,
        created_at: new Date().toISOString()
      },
      {
        id: "2", 
        message: "Hi! I'd be happy to help you with your design needs. What are you looking for?",
        sender_id: "designer-demo",
        created_at: new Date().toISOString()
      }
    ];
    
    setMessages(demoMessages);
  }, [isOpen, bookingId, currentUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      // Create a new message locally for demo purposes
      const newMsg: Message = {
        id: Date.now().toString(),
        message: newMessage.trim(),
        sender_id: currentUserId,
        created_at: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, newMsg]);
      setNewMessage("");
      
      // Simulate a response after a delay
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          message: "Thanks for your message! I'll get back to you soon with more details.",
          sender_id: "designer-demo",
          created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Chat</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender_id === currentUserId ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg ${
                    message.sender_id === currentUserId
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="flex gap-2 p-4 border-t">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isLoading}
          />
          <Button onClick={sendMessage} disabled={isLoading || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
