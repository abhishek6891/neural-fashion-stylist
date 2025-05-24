
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, MessageCircle, Calendar } from "lucide-react";
import ProfileView from "./ProfileView";
import BookingForm from "./BookingForm";
import ChatDialog from "./ChatDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface Designer {
  id: string;
  user_id: string;
  specialization?: string;
  experience?: string;
  location?: string;
  height?: string;
  weight?: string;
  age?: string;
}

interface DesignerCardProps {
  designer: Designer;
}

const DesignerCard = ({ designer }: DesignerCardProps) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleBookNow = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
      setShowBooking(true);
    }
  };

  const handleChat = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
      // For demo purposes, we'll use a placeholder booking ID
      // In a real app, you'd need to create or find an existing booking
      setBookingId("placeholder-booking-id");
      setShowChat(true);
    }
  };

  const handleBookingCreated = () => {
    setShowBooking(false);
    // You could open the chat here with the new booking ID
  };

  return (
    <>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
            {designer.specialization?.[0]?.toUpperCase() || 'D'}
          </div>
          <CardTitle className="text-lg">{designer.specialization || 'Designer'}</CardTitle>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>4.8</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {designer.experience && (
              <Badge variant="outline">{designer.experience} years exp.</Badge>
            )}
            
            {designer.location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{designer.location}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowProfile(true)}
            >
              {t('viewProfile')}
            </Button>
            <Button 
              size="sm"
              onClick={handleBookNow}
            >
              {t('bookNow')}
            </Button>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleChat}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {t('chat')}
          </Button>
        </CardContent>
      </Card>

      {/* Profile View Dialog */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Designer Profile</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowProfile(false)}>
                ×
              </Button>
            </div>
            <ProfileView 
              userId={designer.user_id} 
              userType="designer"
              onBookNow={() => {
                setShowProfile(false);
                handleBookNow();
              }}
              onChat={() => {
                setShowProfile(false);
                handleChat();
              }}
            />
          </div>
        </div>
      )}

      {/* Booking Form */}
      {showBooking && currentUserId && (
        <BookingForm
          isOpen={showBooking}
          onOpenChange={setShowBooking}
          designerId={designer.user_id}
          customerId={currentUserId}
          onBookingCreated={handleBookingCreated}
        />
      )}

      {/* Chat Dialog */}
      {showChat && currentUserId && bookingId && (
        <ChatDialog
          isOpen={showChat}
          onOpenChange={setShowChat}
          bookingId={bookingId}
          currentUserId={currentUserId}
        />
      )}
    </>
  );
};

export default DesignerCard;
