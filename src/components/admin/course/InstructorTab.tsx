
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, User } from 'lucide-react';

interface InstructorTabProps {
  instructorDetails: {
    name: string;
    title: string;
    bio: string;
    image: string | null;
  };
  handleInstructorDetailChange: (field: string, value: any) => void;
  handleInstructorImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InstructorTab: React.FC<InstructorTabProps> = ({
  instructorDetails,
  handleInstructorDetailChange,
  handleInstructorImageChange
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="instructorName">Instructor Name <span className="text-destructive">*</span></Label>
                  <Input 
                    id="instructorName"
                    value={instructorDetails.name}
                    onChange={(e) => handleInstructorDetailChange('name', e.target.value)}
                    placeholder="Full name of the instructor"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="instructorTitle">Title/Position <span className="text-destructive">*</span></Label>
                  <Input 
                    id="instructorTitle"
                    value={instructorDetails.title}
                    onChange={(e) => handleInstructorDetailChange('title', e.target.value)}
                    placeholder="e.g., Jyotish Acharya & Vedic Scholar"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="instructorBio">Instructor Bio <span className="text-destructive">*</span></Label>
                  <Textarea 
                    id="instructorBio"
                    value={instructorDetails.bio}
                    onChange={(e) => handleInstructorDetailChange('bio', e.target.value)}
                    placeholder="Professional background, experience, and credentials"
                    rows={5}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label className="block mb-2">Instructor Image</Label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 bg-muted/50">
                {instructorDetails.image ? (
                  <div className="relative">
                    <img 
                      src={instructorDetails.image} 
                      alt="Instructor" 
                      className="object-cover rounded-lg w-full h-64"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleInstructorDetailChange('image', null)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <User className="h-16 w-16 text-muted-foreground mb-4" />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleInstructorImageChange}
                      className="w-full"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorTab;
