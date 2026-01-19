
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileOverviewCard from '../ProfileOverviewCard';
import ProfileDetailsForm from '../ProfileDetailsForm';

interface UserData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  interests: string[];
  website: string;
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
  };
  skills: string[];
  timezone: string;
  education: string;
}

interface ProfileTabProps {
  userData: UserData;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSaveProfile: () => void;
  setIsEditing: (value: boolean) => void;
}

const ProfileTab = ({ 
  userData, 
  isEditing, 
  handleInputChange, 
  handleSaveProfile,
  setIsEditing
}: ProfileTabProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Profile Overview Card */}
      <Card className="md:col-span-1">
        <CardContent className="p-0">
          <ProfileOverviewCard userData={userData} isEditing={isEditing} />
        </CardContent>
      </Card>

      {/* Profile Details Card */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile details and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileDetailsForm 
            userData={userData} 
            isEditing={isEditing} 
            handleInputChange={handleInputChange} 
            handleSaveProfile={handleSaveProfile}
            setIsEditing={setIsEditing}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
