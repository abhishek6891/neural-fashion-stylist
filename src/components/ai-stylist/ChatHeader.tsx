
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, RefreshCw, X } from "lucide-react";

interface ChatHeaderProps {
  onRetry: () => void;
  onClose: () => void;
  isLoading: boolean;
}

const ChatHeader = ({ onRetry, onClose, isLoading }: ChatHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
      <CardTitle className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-purple-500" />
        AI Fashion Stylist
      </CardTitle>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Retry
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
