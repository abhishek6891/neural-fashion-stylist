
export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  images?: string[];
  uploadedImages?: string[];
}
