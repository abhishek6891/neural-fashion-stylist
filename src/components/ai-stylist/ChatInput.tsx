
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

const ChatInput = ({ input, onInputChange, onSend, onKeyPress, isLoading }: ChatInputProps) => {
  return (
    <div className="flex gap-2 pt-2 border-t">
      <Input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="Ask for style suggestions..."
        disabled={isLoading}
        className="flex-1"
      />
      <Button onClick={onSend} disabled={isLoading || !input.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
