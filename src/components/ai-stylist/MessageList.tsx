
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "./types";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
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
              
              {message.uploadedImages && message.uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {message.uploadedImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Uploaded outfit ${index + 1}`}
                      className="rounded-md w-full h-32 object-cover"
                    />
                  ))}
                </div>
              )}
              
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
  );
};

export default MessageList;
