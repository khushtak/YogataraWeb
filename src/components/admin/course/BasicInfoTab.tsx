
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hash, Plus, X } from 'lucide-react';

interface BasicInfoTabProps {
  courseDetails: {
    title: string;
    shortDescription: string;
    longDescription: string;
    category: string;
    level: string;
    language: string;
    tags: string[];
  };
  handleCourseDetailChange: (field: string, value: any) => void;
  newTag: string;
  setNewTag: (value: string) => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  courseDetails,
  handleCourseDetailChange,
  newTag,
  setNewTag,
  handleAddTag,
  handleRemoveTag
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Course Title <span className="text-destructive">*</span></Label>
            <Input 
              id="title"
              value={courseDetails.title}
              onChange={(e) => handleCourseDetailChange('title', e.target.value)}
              placeholder="e.g., Vedic Astrology: Complete Chart Analysis & Predictions"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="shortDescription">Short Description <span className="text-destructive">*</span></Label>
            <Textarea 
              id="shortDescription"
              value={courseDetails.shortDescription}
              onChange={(e) => handleCourseDetailChange('shortDescription', e.target.value)}
              placeholder="Brief description for course cards and previews (150 characters max)"
              maxLength={150}
              rows={2}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="longDescription">Full Description <span className="text-destructive">*</span></Label>
            <Textarea 
              id="longDescription"
              value={courseDetails.longDescription}
              onChange={(e) => handleCourseDetailChange('longDescription', e.target.value)}
              placeholder="Comprehensive course description with full details"
              rows={6}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
              <Select
                value={courseDetails.category}
                onValueChange={(value) => handleCourseDetailChange('category', value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vedic-astrology">Vedic Astrology</SelectItem>
                  <SelectItem value="numerology">Numerology</SelectItem>
                  <SelectItem value="tarot">Tarot Reading</SelectItem>
                  <SelectItem value="palmistry">Palmistry</SelectItem>
                  <SelectItem value="vaastu">Vaastu Shastra</SelectItem>
                  <SelectItem value="yoga">Yoga & Meditation</SelectItem>
                  <SelectItem value="ayurveda">Ayurveda</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="level">Difficulty Level <span className="text-destructive">*</span></Label>
              <Select
                value={courseDetails.level}
                onValueChange={(value) => handleCourseDetailChange('level', value)}
              >
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="all-levels">All Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="language">Language <span className="text-destructive">*</span></Label>
              <Select
                value={courseDetails.language}
                onValueChange={(value) => handleCourseDetailChange('language', value)}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="sanskrit">Sanskrit</SelectItem>
                  <SelectItem value="tamil">Tamil</SelectItem>
                  <SelectItem value="telugu">Telugu</SelectItem>
                  <SelectItem value="marathi">Marathi</SelectItem>
                  <SelectItem value="bengali">Bengali</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input 
                  value={newTag} 
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag" 
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {courseDetails.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    <Hash className="h-3 w-3" />
                    {tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {courseDetails.tags.length === 0 && (
                  <span className="text-sm text-muted-foreground">No tags added yet</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoTab;
