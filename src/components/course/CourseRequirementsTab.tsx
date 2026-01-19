
import React from 'react';
import { ArrowRight, BookText, GraduationCap, Brain } from 'lucide-react';

interface CourseRequirementsTabProps {
  course: any;
}

const CourseRequirementsTab = ({ course }: CourseRequirementsTabProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Requirements</h2>
        <ul className="space-y-3">
          {course.requirements?.map((item: string, index: number) => (
            <li key={index} className="flex items-start">
              <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-8 p-5 bg-muted/50 rounded-lg border border-border">
        <h3 className="font-medium mb-2 flex items-center">
          <BookText className="h-5 w-5 mr-2 text-primary" />
          Recommended Prior Knowledge
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          While this course is designed for all levels, students will benefit from having:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Basic understanding of astronomy concepts (helpful but not required)</li>
          <li>Interest in spiritual and philosophical traditions</li>
          <li>Open mind towards alternative knowledge systems</li>
        </ul>
      </div>
      
      <div className="p-5 bg-muted/50 rounded-lg border border-border">
        <h3 className="font-medium mb-2 flex items-center">
          <GraduationCap className="h-5 w-5 mr-2 text-primary" />
          Target Audience
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          This course is perfect for:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          {course.targetAudience?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          )) || (
            <>
              <li>Anyone interested in learning the ancient science of Vedic astrology</li>
              <li>Western astrologers looking to expand their knowledge into Vedic systems</li>
              <li>Spiritual seekers wanting to understand karmic patterns</li>
            </>
          )}
        </ul>
      </div>
      
      <div className="p-5 bg-muted/50 rounded-lg border border-border">
        <h3 className="font-medium mb-2 flex items-center">
          <Brain className="h-5 w-5 mr-2 text-primary" />
          Learning Path Recommendation
        </h3>
        <p className="text-muted-foreground text-sm">
          For optimal learning experience, we recommend:
        </p>
        <ol className="list-decimal pl-5 mt-3 space-y-2 text-sm text-muted-foreground">
          <li>Complete all video lectures in order</li>
          <li>Attempt practice exercises after each section</li>
          <li>Participate in the community discussions</li>
          <li>Review the supplementary readings</li>
          <li>Apply the concepts to your own chart</li>
        </ol>
      </div>
    </div>
  );
};

export default CourseRequirementsTab;
