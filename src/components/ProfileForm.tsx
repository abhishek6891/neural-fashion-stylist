
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
}

const ProfileForm = ({ isOpen, onOpenChange, userId }: ProfileFormProps) => {
  const { onSubmit, isLoading } = useProfileForm(userId, onOpenChange);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">Complete Your Profile</SheetTitle>
          <SheetDescription>
            Please enter your body measurements to help designers create perfectly fitting clothes for you.
          </SheetDescription>
        </SheetHeader>
        
        <ProfileFormFields onSubmit={onSubmit} isLoading={isLoading} />
      </SheetContent>
    </Sheet>
  );
};

export default ProfileForm;
