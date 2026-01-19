
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';

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
}

interface ProfileDetailsFormProps {
  userData: UserData;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSaveProfile: () => void;
  setIsEditing: (value: boolean) => void;
}

const ProfileDetailsForm = ({ 
  userData, 
  isEditing, 
  handleInputChange, 
  handleSaveProfile,
  setIsEditing
}: ProfileDetailsFormProps) => {
  return (
    <>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name"
              value={userData.name} 
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              value={userData.email} 
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              name="phone"
              type="tel" 
              value={userData.phone} 
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              name="location"
              value={userData.location} 
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            name="bio"
            value={userData.bio} 
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={4}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input 
            id="website" 
            name="website"
            value={userData.website} 
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Skills & Interests</Label>
          <div className="flex flex-wrap gap-2">
            {userData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
                {isEditing && (
                  <button className="ml-1 text-muted-foreground hover:text-foreground">
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
            {isEditing && (
              <ButtonCustom variant="outline" size="sm">
                Add Skill
              </ButtonCustom>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <Label>Social Profiles</Label>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Github className="h-5 w-5 text-muted-foreground" />
              <Input 
                name="social.github"
                placeholder="GitHub username" 
                value={userData.social.github} 
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Twitter className="h-5 w-5 text-muted-foreground" />
              <Input 
                name="social.twitter"
                placeholder="Twitter username" 
                value={userData.social.twitter} 
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Linkedin className="h-5 w-5 text-muted-foreground" />
              <Input 
                name="social.linkedin"
                placeholder="LinkedIn username" 
                value={userData.social.linkedin} 
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Instagram className="h-5 w-5 text-muted-foreground" />
              <Input 
                name="social.instagram"
                placeholder="Instagram username" 
                value={userData.social.instagram} 
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
      
      {isEditing && (
        <CardFooter className="flex justify-end space-x-2">
          <ButtonCustom 
            variant="outline" 
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </ButtonCustom>
          <ButtonCustom 
            onClick={handleSaveProfile}
            className="flex items-center"
          >
            <Check className="h-4 w-4 mr-2" />
            Save Changes
          </ButtonCustom>
        </CardFooter>
      )}
    </>
  );
};

export default ProfileDetailsForm;
