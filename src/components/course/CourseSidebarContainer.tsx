
import React from 'react';
import { Calendar, Clock, Globe, Info } from 'lucide-react';
import CoursePurchaseCard from '@/components/course/CoursePurchaseCard';

interface CourseSidebarContainerProps {
  course: any;
  isEnrolled: boolean;
  handleEnroll: () => void;
  handleShare: () => void;
}

const CourseSidebarContainer = ({
  course,
  isEnrolled,
  handleEnroll,
  handleShare
}: CourseSidebarContainerProps) => {
  return (
    <div className="sticky top-24">
      <CoursePurchaseCard 
        course={course}
        isEnrolled={isEnrolled}
        handleEnroll={handleEnroll}
        handleShare={handleShare}
      />
      
      <div className="mt-8 border border-border rounded-xl p-5">
        <h3 className="font-semibold text-lg mb-3">Course includes:</h3>
        <ul className="space-y-3">
          <li className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-3 text-muted-foreground" />
            <span>{course.duration} of on-demand video</span>
          </li>
          <li className="flex items-center text-sm">
            <Globe className="h-4 w-4 mr-3 text-muted-foreground" />
            <span>Full lifetime access</span>
          </li>
          <li className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
            <span>Certificate of completion</span>
          </li>
          <li className="flex items-center text-sm">
            <Info className="h-4 w-4 mr-3 text-muted-foreground" />
            <span>30-day money-back guarantee</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CourseSidebarContainer;
