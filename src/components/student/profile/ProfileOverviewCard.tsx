"use client";

import React, { useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { getUser } from "@/utils/auth";
import { SERVER_BASE_URL } from "@/config/server";

interface ProfileData {
  fullName: string;
  email: string;
}

interface ProfileOverviewCardProps {
  userData: ProfileData;
  isEditing: boolean;
  previewImage: string;
  onImageSelect: (file: File) => void;
}

const getInitials = (name: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .map(w => w[0].toUpperCase())
    .join("");
};

const ProfileOverviewCard = ({
  userData,
  isEditing,
  previewImage,
  onImageSelect,
}: ProfileOverviewCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = getUser();

  const handleAvatarClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  // 🔥 FINAL IMAGE PRIORITY
const imageSrc = previewImage
  ? previewImage.startsWith("blob:")
    ? previewImage
    : `${SERVER_BASE_URL}${previewImage}`
  : user?.profileImage
  ? `${SERVER_BASE_URL}${user.profileImage}`
  : "";

// console.log('dad',imageSrc);

  return (
    <div className="p-6 flex flex-col items-center text-center">
      <div
        className={`relative mb-4 ${isEditing ? "cursor-pointer" : ""}`}
        onClick={handleAvatarClick}
      >
        <Avatar className="h-24 w-24 border overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <AvatarFallback className="text-2xl font-semibold">
              {getInitials(userData.fullName)}
            </AvatarFallback>
          )}
        </Avatar>

        {isEditing && (
          <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1">
            <Upload className="h-4 w-4" />
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <h2 className="text-xl font-bold">{userData.fullName}</h2>
      <p className="text-muted-foreground">{userData.email}</p>
    </div>
  );
};

export default ProfileOverviewCard;
