
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Github, Twitter, Linkedin, Globe, Upload } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  location: string;
  timezone: string;
  education: string;
  social: {
    github: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  website: string;
}

interface ProfileOverviewCardProps {
  userData: ProfileData;
  isEditing: boolean;
}

const ProfileOverviewCard = ({ userData, isEditing }: ProfileOverviewCardProps) => {
  return (
    <div className="p-6 flex flex-col items-center text-center">
      <div className="relative mb-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={userData.name} />
          <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {isEditing && (
          <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer">
            <Upload className="h-4 w-4" />
          </div>
        )}
      </div>
      
      <h2 className="text-xl font-bold mt-2">{userData.name}</h2>
      <p className="text-muted-foreground">{userData.email}</p>
      
      <Separator className="my-4" />
      
      <div className="w-full text-left space-y-2">
        <div>
          <Label className="text-sm text-muted-foreground">Location</Label>
          <p className="font-medium">{userData.location}</p>
        </div>
        
        <div>
          <Label className="text-sm text-muted-foreground">Timezone</Label>
          <p className="font-medium">{userData.timezone}</p>
        </div>
        
        <div>
          <Label className="text-sm text-muted-foreground">Education</Label>
          <p className="font-medium">{userData.education}</p>
        </div>
        
        <div>
          <Label className="text-sm text-muted-foreground">Member Since</Label>
          <p className="font-medium">January 12, 2023</p>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-center space-x-3">
        {userData.social.github && (
          <a href={`https://github.com/${userData.social.github}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Github className="h-5 w-5" />
          </a>
        )}
        {userData.social.twitter && (
          <a href={`https://twitter.com/${userData.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Twitter className="h-5 w-5" />
          </a>
        )}
        {userData.social.linkedin && (
          <a href={`https://linkedin.com/in/${userData.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Linkedin className="h-5 w-5" />
          </a>
        )}
        {userData.website && (
          <a href={userData.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Globe className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileOverviewCard;
