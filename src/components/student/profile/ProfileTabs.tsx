"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTab from "./tabs/ProfileTab";
import AccountTab from "./tabs/AccountTab";
import NotificationsTab from "./tabs/NotificationsTab";
import PrivacyTab from "./tabs/PrivacyTab";

const ProfileTabs = ({
  userData,
  isEditing,
  handleInputChange,
  handleSaveProfile,
  setIsEditing,
}: any) => {
  return (
    <Tabs defaultValue="profile" className="space-y-6">
    

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

    

      <TabsContent value="privacy">
        <PrivacyTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
