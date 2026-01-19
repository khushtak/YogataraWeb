
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DollarSign, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface PricingTabProps {
  courseDetails: {
    price: string;
    salePrice: string;
    duration: string;
    lectures: string;
    publishDate: Date | null;
  };
  handleCourseDetailChange: (field: string, value: any) => void;
}

const PricingTab: React.FC<PricingTabProps> = ({
  courseDetails,
  handleCourseDetailChange
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="regularPrice">Regular Price (USD) <span className="text-destructive">*</span></Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="regularPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={courseDetails.price}
                  onChange={(e) => handleCourseDetailChange('price', e.target.value)}
                  placeholder="99.99"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="salePrice">Sale Price (USD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="salePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={courseDetails.salePrice}
                  onChange={(e) => handleCourseDetailChange('salePrice', e.target.value)}
                  placeholder="79.99"
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Leave empty if not on sale
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-medium mb-4">Course Details</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Total Duration</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="duration"
                      value={courseDetails.duration}
                      onChange={(e) => handleCourseDetailChange('duration', e.target.value)}
                      placeholder="e.g., 18h 45m"
                    />
                    <span className="text-sm text-muted-foreground">Format: 8h 30m</span>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="lectures">Total Lectures</Label>
                  <Input 
                    id="lectures"
                    type="number"
                    min="0"
                    value={courseDetails.lectures}
                    onChange={(e) => handleCourseDetailChange('lectures', e.target.value)}
                    placeholder="e.g., 42"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-4">Publication</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Publish Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !courseDetails.publishDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {courseDetails.publishDate ? format(courseDetails.publishDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={courseDetails.publishDate}
                        onSelect={(date) => handleCourseDetailChange('publishDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-muted-foreground">
                    Leave empty to publish immediately upon approval
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingTab;
