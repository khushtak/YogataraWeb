
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, GraduationCap, LayoutDashboard, ScrollText, Tag, Upload, User } from 'lucide-react';

const TabsNavigation: React.FC = () => {
  return (
    <TabsList className="grid grid-cols-7 w-full max-w-4xl">
      <TabsTrigger value="basic" className="flex items-center">
        <LayoutDashboard className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Basic Info</span>
        <span className="sm:hidden">Info</span>
      </TabsTrigger>
      <TabsTrigger value="media" className="flex items-center">
        <Upload className="h-4 w-4 mr-2" />
        <span>Media</span>
      </TabsTrigger>
      <TabsTrigger value="instructor" className="flex items-center">
        <User className="h-4 w-4 mr-2" />
        <span>Instructor</span>
      </TabsTrigger>
      <TabsTrigger value="curriculum" className="flex items-center">
        <BookOpen className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Curriculum</span>
        <span className="sm:hidden">Content</span>
      </TabsTrigger>
      <TabsTrigger value="details" className="flex items-center">
        <ScrollText className="h-4 w-4 mr-2" />
        <span>Details</span>
      </TabsTrigger>
      <TabsTrigger value="pricing" className="flex items-center">
        <Tag className="h-4 w-4 mr-2" />
        <span>Pricing</span>
      </TabsTrigger>
      <TabsTrigger value="settings" className="flex items-center">
        <GraduationCap className="h-4 w-4 mr-2" />
        <span>Settings</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsNavigation;
