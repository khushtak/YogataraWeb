"use client";

import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProfileTab from "./tabs/ProfileTab";
import AccountTab from "./tabs/AccountTab";
import NotificationsTab from "./tabs/NotificationsTab";
import PrivacyTab from "./tabs/PrivacyTab";

/* ================= TYPES ================= */

interface ProfileTabsProps {
  userData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    location: string;
  };
  isEditing: boolean;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSaveProfile: () => void;
  setIsEditing: (value: boolean) => void;

  // 🔥 IMAGE PROPS
  previewImage: string;
  onImageSelect: (file: File) => void;
}

/* ================= COMPONENT ================= */

const ProfileTabs = ({
  userData,
  isEditing,
  handleInputChange,
  handleSaveProfile,
  setIsEditing,
  previewImage,
  onImageSelect,
}: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="profile" className="space-y-6">
      {/* ================= PROFILE TAB ================= */}
      <TabsContent value="profile">
        <ProfileTab
          userData={userData}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
          handleSaveProfile={handleSaveProfile}
          setIsEditing={setIsEditing}
          previewImage={previewImage}
          onImageSelect={onImageSelect}
        />
      </TabsContent>

      {/* ================= ACCOUNT TAB ================= */}
      <TabsContent value="account">
        <AccountTab userData={userData} />
      </TabsContent>

      {/* ================= NOTIFICATIONS TAB ================= */}
      <TabsContent value="notifications">
        <NotificationsTab />
      </TabsContent>

      {/* ================= PRIVACY TAB ================= */}
      <TabsContent value="privacy">
        <PrivacyTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
