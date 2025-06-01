
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProfileFormFields from "./ProfileFormFields";
import { useProfileForm } from "@/hooks/useProfileForm";

interface ProfileFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userType: "customer" | "designer" | null;
  onComplete?: () => void;
}

const ProfileForm = ({ isOpen, onOpenChange, userId, userType, onComplete }: ProfileFormProps) => {
  const { onSubmit, isLoading } = useProfileForm(userId, userType, onOpenChange, onComplete);

  const title = userType === "designer" 
    ? "Complete Your Designer Profile" 
    : "Complete Your Customer Profile";
    
  const description = userType === "designer"
    ? "Please provide your professional details to help customers find and connect with you."
    : "Please enter your body measurements to help designers create perfectly fitting clothes for you.";

  console.log("ProfileForm rendered with:", { isOpen, userId, userType });

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        
        <ProfileFormFields onSubmit={onSubmit} isLoading={isLoading} userType={userType} />
      </SheetContent>
    </Sheet>
  );
};

export default ProfileForm;
