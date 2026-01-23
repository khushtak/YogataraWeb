"use client";

import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

/* ================= TYPES ================= */

interface ProfileData {
  full_name: string;
  email: string;
  avatar?: string; // base64 image
}

interface ProfileOverviewCardProps {
  userData: ProfileData;
  isEditing: boolean;
  setUserData?: (data: ProfileData) => void;
}

/* ============ INITIALS FUNCTION ============ */
// Mridul soni -> MS
// Amit Kumar Sharma -> AKS

const getInitials = (full_name: string) => {
  if (!full_name) return "U";

  return full_name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(word => word[0].toUpperCase())
    .join("");
};

/* ============ COMPONENT ==================== */

const ProfileOverviewCard = ({
  userData,
  isEditing,
  setUserData,
}: ProfileOverviewCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Avatar click */
  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  /* Image upload */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedUser = {
        ...userData,
        avatar: reader.result as string,
      };

      setUserData?.(updatedUser);
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 flex flex-col items-center text-center">
      {/* ========= AVATAR ========= */}
      <div
        className="relative mb-4 cursor-pointer"
        onClick={handleAvatarClick}
      >
        <Avatar className="h-24 w-24">
          {/* Image (only when uploaded) */}
          <AvatarImage src={userData.avatar || ""} />

          {/* Initials fallback */}
          <AvatarFallback className="text-2xl font-semibold">
            {getInitials(userData.full_name)}
          </AvatarFallback>
        </Avatar>

        {/* Upload icon */}
        {isEditing && (
          <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1">
            <Upload className="h-4 w-4" />
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* ========= USER INFO ========= */}
      <h2 className="text-xl font-bold">{userData.full_name}</h2>
      <p className="text-muted-foreground">{userData.email}</p>
    </div>
  );
};

export default ProfileOverviewCard;
