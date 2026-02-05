import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hash, Plus, X } from 'lucide-react';
import axios from 'axios';
import baseUrl from '@/config/Config';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= GET CATEGORIES API ================= */
const getCategories = async () => {
  try {
    setLoading(true);
    const res = await axios.get(`${baseUrl}/categories`);

    console.log('ssss', res.data);

    // ✅ YAHI FIX HAI
    setCategories(res.data.categories || []);
  } catch (error) {
    console.error('Error fetching categories', error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6">

          {/* Course Title */}
          <div className="grid gap-2">
            <Label>Course Title *</Label>
            <Input
              value={courseDetails.title}
              onChange={(e) =>
                handleCourseDetailChange('title', e.target.value)
              }
              placeholder="Course title"
            />
          </div>

          {/* Short Description */}
          <div className="grid gap-2">
            <Label>Short Description *</Label>
            <Textarea
              value={courseDetails.shortDescription}
              onChange={(e) =>
                handleCourseDetailChange('shortDescription', e.target.value)
              }
              rows={2}
              maxLength={150}
            />
          </div>

          {/* Full Description */}
          <div className="grid gap-2">
            <Label>Full Description *</Label>
            <Textarea
              value={courseDetails.longDescription}
              onChange={(e) =>
                handleCourseDetailChange('longDescription', e.target.value)
              }
              rows={6}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Category (API BASED) */}
            <div className="grid gap-2">
              <Label>Category *</Label>
              <Select
                value={courseDetails.category}
                onValueChange={(value) =>
                  handleCourseDetailChange('category', value)
                }
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={loading ? 'Loading...' : 'Select category'}
                  />
                </SelectTrigger>

                <SelectContent className="z-50 bg-background border shadow-lg">
                  {categories.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Level */}
            <div className="grid gap-2">
              <Label>Difficulty Level *</Label>
              <Select
                value={courseDetails.level}
                onValueChange={(v) =>
                  handleCourseDetailChange('level', v)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>

                <SelectContent className="z-50 bg-background border shadow-lg">
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="all-levels">All Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language */}
            <div className="grid gap-2">
              <Label>Language *</Label>
              <Select
                value={courseDetails.language}
                onValueChange={(v) =>
                  handleCourseDetailChange('language', v)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>

                <SelectContent className="z-50 bg-background border shadow-lg">
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

            {/* Tags */}
            <div className="grid gap-2">
              <Label>Tags</Label>

              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
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
                {courseDetails.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary">
                    <Hash className="h-3 w-3 mr-1" />
                    {tag}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoTab;
