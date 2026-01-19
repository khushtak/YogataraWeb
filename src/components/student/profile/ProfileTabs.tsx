
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileTab from './tabs/ProfileTab';
import AccountTab from './tabs/AccountTab';
import NotificationsTab from './tabs/NotificationsTab';
import PrivacyTab from './tabs/PrivacyTab';

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

interface ProfileTabsProps {
  userData: UserData;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSaveProfile: () => void;
  setIsEditing: (value: boolean) => void;
}

const ProfileTabs = ({ 
  userData, 
  isEditing, 
  handleInputChange, 
  handleSaveProfile,
  setIsEditing
}: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <ProfileTab 
          userData={userData} 
          isEditing={isEditing} 
          handleInputChange={handleInputChange} 
          handleSaveProfile={handleSaveProfile}
          setIsEditing={setIsEditing}
        />
      </TabsContent>
      
      <TabsContent value="account">
        <AccountTab userData={userData} />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationsTab />
      </TabsContent>
      
      <TabsContent value="privacy">
        <PrivacyTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
