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

  // 🔥 VIEW PROFILE API SE DATA LANA
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProfile = async () => {
      try {
        const token = getToken();
        const storedUser = getUser();

        if (!storedUser?.email) return;

        const res = await fetch(
          `${baseUrl}/view-profile/${storedUser.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        const {profile}=data
        if (!res.ok) throw new Error(data.message);

        // backend se aaya hua fresh data set karo
        setUserData({
          fullName: profile.fullName || "",
          email: profile.email || "",
          phoneNumber: profile.phoneNumber || "",
          location: profile.location || "",
        });

        // session bhi update kar do taaki har jagah same data rahe
        saveUser({
          ...storedUser,
          fullName: profile.fullName,
          phoneNumber: profile.phoneNumber,
          location: profile.location,
        });

      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load profile",
          variant: "destructive",
        });
      }
    };

    fetchProfile();
  }, []);

  // ✏️ input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🚀 EDIT PROFILE (ID BASED)
  const handleSaveProfile = async () => {
    try {
      const token = getToken();
      const user = getUser();

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
      if (!response.ok) throw new Error(data.message || "Update failed");

      // session update
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
