
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LinkIcon, Trash2, Upload } from 'lucide-react';

interface MediaTabProps {
  courseDetails: {
    promoUrl: string;
  };
  handleCourseDetailChange: (field: string, value: any) => void;
  thumbnail: string | null;
  setThumbnail: (value: string | null) => void;
  handleThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MediaTab: React.FC<MediaTabProps> = ({
  courseDetails,
  handleCourseDetailChange,
  thumbnail,
  setThumbnail,
  handleThumbnailChange
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div>
            <Label className="block mb-2">Course Thumbnail <span className="text-destructive">*</span></Label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 bg-muted/50">
              {thumbnail ? (
                <div className="relative">
                  <img 
                    src={thumbnail} 
                    alt="Course thumbnail" 
                    className="object-cover rounded-lg w-full max-w-md h-64"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setThumbnail(null)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Upload Thumbnail Image</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Recommended size: 1280x720px (16:9 ratio)
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="max-w-xs"
                  />
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This image will be used as the course card thumbnail and header image.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <Label className="block mb-2">Promotional Video (Optional)</Label>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="videoUrl"
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="pl-10"
                      value={courseDetails.promoUrl}
                      onChange={(e) => handleCourseDetailChange('promoUrl', e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter YouTube, Vimeo, or other video platform URL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaTab;
