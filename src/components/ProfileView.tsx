
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Calendar, Ruler, Scale, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import BookingForm from "./BookingForm";
import ChatDialog from "./ChatDialog";

interface ProfileData {
  height?: string;
  weight?: string;
  age?: string;
  chest?: string;
  waist?: string;
  hip?: string;
  specialization?: string;
  experience?: string;
  location?: string;
  user_type: string;
}

interface ProfileViewProps {
  userId: string;
  userType: "customer" | "designer";
  onBookNow?: () => void;
  onChat?: () => void;
}

const ProfileView = ({ userId, userType, onBookNow, onChat }: ProfileViewProps) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tableName = userType === "designer" ? 'designer_profiles' : 'profile_measurements';
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, userType]);

  const handleBookNow = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
      setShowBooking(true);
    } else {
      toast.error("Please log in to book a service");
    }
  };

  const handleChat = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
      // Use a demo booking ID for chat
      setBookingId("demo-booking-" + Date.now());
      setShowChat(true);
    } else {
      toast.error("Please log in to start a chat");
    }
  };

  const handleBookingCreated = () => {
    setShowBooking(false);
  };

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {userType === "designer" ? "Designer Profile" : "Customer Profile"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {profile.height && (
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                <span className="text-sm">{t('height')}: {profile.height}</span>
              </div>
            )}
            {profile.weight && (
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                <span className="text-sm">{t('weight')}: {profile.weight}</span>
              </div>
            )}
            {profile.age && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{t('age')}: {profile.age}</span>
              </div>
            )}
          </div>

          {userType === "customer" && (
            <div className="space-y-2">
              <h4 className="font-medium">Measurements</h4>
              <div className="grid grid-cols-2 gap-2">
                {profile.chest && <Badge variant="outline">{t('chest')}: {profile.chest}</Badge>}
                {profile.waist && <Badge variant="outline">{t('waist')}: {profile.waist}</Badge>}
                {profile.hip && <Badge variant="outline">{t('hip')}: {profile.hip}</Badge>}
              </div>
            </div>
          )}

          {userType === "designer" && (
            <div className="space-y-2">
              {profile.specialization && (
                <div>
                  <span className="font-medium">{t('specialization')}: </span>
                  <span>{profile.specialization}</span>
                </div>
              )}
              {profile.experience && (
                <div>
                  <span className="font-medium">{t('experience')}: </span>
                  <span>{profile.experience} years</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          )}

          {userType === "designer" && (
            <div className="flex gap-2 mt-4">
              <Button onClick={onBookNow || handleBookNow} className="flex-1">
                {t('bookNow') || 'Book Now'}
              </Button>
              <Button onClick={onChat || handleChat} variant="outline" className="flex-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                {t('chat') || 'Chat'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Form */}
      {showBooking && currentUserId && (
        <BookingForm
          isOpen={showBooking}
          onOpenChange={setShowBooking}
          designerId={userId}
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

export default ProfileView;
