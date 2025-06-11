
export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  images?: string[];
  uploadedImages?: string[];
}
