"use client";

import React, { useEffect, useState } from "react";
import StudentLayout from "@/components/student/StudentLayout";
import ProfileHeader from "@/components/student/profile/ProfileHeader";
import ProfileTabs from "@/components/student/profile/ProfileTabs";
import { getUser, saveUser } from "@/utils/auth";

const StudentProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // 🔥 LOAD USER FROM SESSION STORAGE
    const storedUser = getUser();
    console.log("Loaded user from session:", storedUser);
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  // ✅ DEFAULT STRUCTURE (IMPORTANT)
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",

  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // ✅ Handle nested fields (social.twitter)
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setUserData((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setUserData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveProfile = () => {
    saveUser(userData); // 🔥 SAVE TO SESSION STORAGE
    setIsEditing(false);
    alert("Profile saved successfully!");
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
