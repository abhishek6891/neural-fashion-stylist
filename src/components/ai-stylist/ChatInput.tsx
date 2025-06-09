
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Camera, X } from "lucide-react";
import { useState } from "react";

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
  const [isDragOver, setIsDragOver] = useState(false);

  const handleSend = () => {
    if (input.trim() || selectedImages.length > 0) {
      onSend();
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              onImagesSelected([...selectedImages, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    onImagesSelected(updatedImages);
  };

  return (
    <div className="pt-2 border-t space-y-3">
      {selectedImages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-16 h-16 object-cover rounded border"
              />
              <Button
                onClick={() => removeImage(index)}
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-3 text-center transition-colors ${
          isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
      >
        <p className="text-sm text-muted-foreground mb-2">
          Drop outfit photos here or use the camera button to upload
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Ask for style suggestions or upload outfit photos..."
          disabled={isLoading}
          className="flex-1"
        />
        
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          id="image-upload"
        />
        
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => document.getElementById('image-upload')?.click()}
          disabled={isLoading}
        >
          <Camera className="h-4 w-4" />
        </Button>
        
        <Button onClick={handleSend} disabled={isLoading || (!input.trim() && selectedImages.length === 0)}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
