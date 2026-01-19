
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface SettingsTabProps {
  courseDetails: {
    isFeatured: boolean;
    isBestseller: boolean;
    hasCertification: boolean;
    dripContent: boolean;
    commentsEnabled: boolean;
  };
  handleCourseDetailChange: (field: string, value: any) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  courseDetails,
  handleCourseDetailChange
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="featured" className="text-base">Featured Course</Label>
              <p className="text-sm text-muted-foreground">
                Featured courses appear prominently on the homepage
              </p>
            </div>
            <Switch 
              id="featured"
              checked={courseDetails.isFeatured}
              onCheckedChange={(checked) => handleCourseDetailChange('isFeatured', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="bestseller" className="text-base">Bestseller Badge</Label>
              <p className="text-sm text-muted-foreground">
                Mark this course as a bestseller
              </p>
            </div>
            <Switch 
              id="bestseller"
              checked={courseDetails.isBestseller}
              onCheckedChange={(checked) => handleCourseDetailChange('isBestseller', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="certification" className="text-base">Certificate of Completion</Label>
              <p className="text-sm text-muted-foreground">
                Allow students to receive a certificate upon completion
              </p>
            </div>
            <Switch 
              id="certification"
              checked={courseDetails.hasCertification}
              onCheckedChange={(checked) => handleCourseDetailChange('hasCertification', checked)}
            />
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-base">Course Preview Options</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="preview-selected" 
                  name="preview-option"
                  checked={true}
                  className="text-primary"
                />
                <Label htmlFor="preview-selected">
                  Allow preview for selected lectures only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="preview-all" 
                  name="preview-option"
                  className="text-primary"
                />
                <Label htmlFor="preview-all">
                  Allow preview for the entire first section
                </Label>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="drip-content" className="text-base">Drip Content</Label>
              <p className="text-sm text-muted-foreground">
                Release course content on a schedule
              </p>
            </div>
            <Switch 
              id="drip-content"
              checked={courseDetails.dripContent}
              onCheckedChange={(checked) => handleCourseDetailChange('dripContent', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="comments" className="text-base">Enable Comments</Label>
              <p className="text-sm text-muted-foreground">
                Allow students to comment on lectures
              </p>
            </div>
            <Switch 
              id="comments"
              checked={courseDetails.commentsEnabled}
              onCheckedChange={(checked) => handleCourseDetailChange('commentsEnabled', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
