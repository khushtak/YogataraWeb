
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface GradeSummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
}

const GradeSummaryCard = ({ title, value, icon: Icon, iconColor }: GradeSummaryCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`${iconColor} p-3 rounded-full`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeSummaryCard;
