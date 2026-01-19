
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { List, ListChecks, Plus, Target, Trash2 } from 'lucide-react';

interface DetailsTabProps {
  whatYouWillLearn: string[];
  requirements: string[];
  targetAudience: string[];
  handleListItemChange: (listType: string, index: number, value: string) => void;
  handleAddListItem: (listType: string) => void;
  handleRemoveListItem: (listType: string, index: number) => void;
}

const DetailsTab: React.FC<DetailsTabProps> = ({
  whatYouWillLearn,
  requirements,
  targetAudience,
  handleListItemChange,
  handleAddListItem,
  handleRemoveListItem
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <ListChecks className="h-5 w-5 mr-2" />
                What You Will Learn
              </h3>
            </div>
            
            <div className="space-y-3">
              {whatYouWillLearn.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input 
                    value={item}
                    onChange={(e) => handleListItemChange('whatYouWillLearn', index, e.target.value)}
                    placeholder="e.g., Create and interpret Vedic birth charts with confidence"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveListItem('whatYouWillLearn', index)}
                    disabled={whatYouWillLearn.length === 1 && !whatYouWillLearn[0]}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddListItem('whatYouWillLearn')}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Learning Point
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <List className="h-5 w-5 mr-2" />
                Requirements
              </h3>
            </div>
            
            <div className="space-y-3">
              {requirements.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input 
                    value={item}
                    onChange={(e) => handleListItemChange('requirements', index, e.target.value)}
                    placeholder="e.g., No prior knowledge of astrology is required"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveListItem('requirements', index)}
                    disabled={requirements.length === 1 && !requirements[0]}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddListItem('requirements')}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Target Audience
              </h3>
            </div>
            
            <div className="space-y-3">
              {targetAudience.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input 
                    value={item}
                    onChange={(e) => handleListItemChange('targetAudience', index, e.target.value)}
                    placeholder="e.g., Anyone interested in learning the ancient science of Vedic astrology"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveListItem('targetAudience', index)}
                    disabled={targetAudience.length === 1 && !targetAudience[0]}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddListItem('targetAudience')}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Target Audience
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsTab;
