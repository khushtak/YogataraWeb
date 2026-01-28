"use client";

import React, { useEffect, useState } from "react";
import StudentLayout from "@/components/student/StudentLayout";
import ProfileHeader from "@/components/student/profile/ProfileHeader";
import ProfileTabs from "@/components/student/profile/ProfileTabs";
import { getUser, saveUser, getToken } from "@/utils/auth";
import { toast } from "@/components/ui/use-toast";
import baseUrl from "@/config/Config";


const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
  });

  // 🔥 Load user from session
  useEffect(() => {
    window.scrollTo(0, 0);

    const storedUser = getUser();
    if (storedUser) {
      setUserData({
        fullName: storedUser.fullName || "",
        email: storedUser.email || "",
        phoneNumber: storedUser.phoneNumber || "",
        location: storedUser.location || "",
      });
    }
  }, []);

  // ✏️ Input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🚀 EDIT PROFILE (USERID BASED)
  const handleSaveProfile = async () => {
    try {
      const token = getToken();
      const user = getUser();
console.log("USER DATA TO SAVE 👉", user);
      if (!user || !user.id) throw new Error("User not logged in");

      const response = await fetch(`${baseUrl}/edit-profile/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: userData.fullName,
          phoneNumber: userData.phoneNumber,
          location: userData.location,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      // 🔥 Update session storage
      saveUser({
        ...getUser(),
        fullName: data.user.fullName,
        phoneNumber: data.user.phoneNumber,
        location: data.user.location,
      });

      toast({
        title: "Success",
        description: data.message,
      });

      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-8">
        <ProfileHeader
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onSaveProfile={handleSaveProfile}
        />

        <ProfileTabs
          userData={userData}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
          handleSaveProfile={handleSaveProfile}
          setIsEditing={setIsEditing}
        />
      </div>
    </StudentLayout>
  );
};

export default StudentProfile;
