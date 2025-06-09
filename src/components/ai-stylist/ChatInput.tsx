
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  selectedImages: string[];
  onImagesSelected: (images: string[]) => void;
}

const ChatInput = ({ 
  input, 
  onInputChange, 
  onSend, 
  onKeyPress, 
  isLoading,
  selectedImages,
  onImagesSelected
}: ChatInputProps) => {
  const handleSend = () => {
    if (input.trim() || selectedImages.length > 0) {
      onSend();
    }
  };

  return (
    <div className="pt-2 border-t space-y-3">
      <ImageUpload 
        selectedImages={selectedImages}
        onImagesSelected={onImagesSelected}
      />
      
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Ask for style suggestions or upload outfit photos..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={isLoading || (!input.trim() && selectedImages.length === 0)}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
