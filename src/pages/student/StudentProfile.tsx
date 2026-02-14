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

  // 🖼️ IMAGE STATES
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  /* ================= VIEW PROFILE ================= */
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
        // console.log('dsadadadadada',data);
        
        if (!res.ok) throw new Error(data.message);

        const { profile } = data;

        setUserData({
          fullName: profile.fullName || "",
          email: profile.email || "",
          phoneNumber: profile.phoneNumber || "",
          location: profile.location || "",
        });

        setPreviewImage(profile.profileImage || "");

        saveUser({
          ...storedUser,
          fullName: profile.fullName,
          phoneNumber: profile.phoneNumber,
          location: profile.location,
          profileImage: profile.profileImage,
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

  /* ================= INPUT CHANGE ================= */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= IMAGE SELECT ================= */
  const handleImageSelect = (file: File) => {
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  /* ================= SAVE PROFILE ================= */
  const handleSaveProfile = async () => {
    try {
      const token = getToken();
      const user = getUser();
// console.log('dsad',user);

      const formData = new FormData();
      formData.append("fullName", userData.fullName);
      formData.append("phoneNumber", userData.phoneNumber);
      formData.append("location", userData.location);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const res = await fetch(
        `${baseUrl}/edit-profile/${user.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      saveUser({
        ...getUser(),
        fullName: data.user.fullName,
        phoneNumber: data.user.phoneNumber,
        location: data.user.location,
        profileImage: data.user.profileImage,
      });

      toast({
        title: "Success",
        description: data.message,
      });

      setIsEditing(false);
      setProfileImage(null);
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
          previewImage={previewImage}
          onImageSelect={handleImageSelect}
        />
      </div>
    </StudentLayout>
  );
};

export default StudentProfile;
