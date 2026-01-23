import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonCustom } from "@/components/ui/button-custom";
import { CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";

const ProfileDetailsForm = ({
  userData,
  isEditing,
  handleInputChange,
  handleSaveProfile,
  setIsEditing,
}: any) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        
        {/* Full Name */}
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            name="full_name"
            value={userData.full_name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            name="email"
            value={userData.email}
            disabled
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            name="location"
            value={userData.location}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Save / Cancel Buttons */}
      {isEditing && (
        <CardFooter className="flex justify-end gap-2 pt-4">
          <ButtonCustom
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </ButtonCustom>

          <ButtonCustom onClick={handleSaveProfile}>
            <Check className="h-4 w-4 mr-2" />
            Save Changes
          </ButtonCustom>
        </CardFooter>
      )}
    </div>
  );
};

export default ProfileDetailsForm;
