
import React from 'react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Check, Edit2 } from 'lucide-react';

interface ProfileHeaderProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  onSaveProfile: () => void;
}

const ProfileHeader = ({ isEditing, setIsEditing, onSaveProfile }: ProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>
      
      {!isEditing ? (
        <ButtonCustom 
          onClick={() => setIsEditing(true)}
          className="flex items-center"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit Profile
        </ButtonCustom>
      ) : (
        // <div className="flex gap-2">
        //   <ButtonCustom 
        //     variant="outline" 
        //     onClick={() => setIsEditing(false)}
        //   >
        //     Cancel
        //   </ButtonCustom>
        //   <ButtonCustom 
        //     onClick={onSaveProfile}
        //     className="flex items-center"
        //   >
        //     <Check className="h-4 w-4 mr-2" />
        //     Save Changes
        //   </ButtonCustom>
        // </div>
        null
      )}
    </div>
  );
};


export default ProfileHeader;
