
import React from 'react';
import { Star, Award, Users, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ButtonCustom } from '@/components/ui/button-custom';

interface CourseInstructorTabProps {
  course: any;
}

const CourseInstructorTab = ({ course }: CourseInstructorTabProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Meet Your Instructor</h2>
      
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        <div className="flex-shrink-0">
          <Avatar className="h-24 w-24 border-2 border-primary/20">
            <AvatarImage src={course.instructorImage} alt={course.instructor} />
            <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium">{course.instructor}</h3>
          <p className="text-primary font-medium text-sm mb-2">{course.instructorTitle}</p>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm">4.8 Instructor Rating</span>
            </div>
            <div className="flex items-center">
              <Award className="h-4 w-4 text-primary mr-1" />
              <span className="text-sm">42 Courses</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-primary mr-1" />
              <span className="text-sm">16,354 Students</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="h-4 w-4 text-primary mr-1" />
              <span className="text-sm">2,542 Reviews</span>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4">{course.instructorBio}</p>
          
          <ButtonCustom variant="outline" size="sm">
            View Full Profile
          </ButtonCustom>
        </div>
      </div>
      
      <div className="border-t border-border pt-6">
        <h3 className="font-medium text-lg mb-4">More Courses by {course.instructor}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg hover:border-primary/20 transition-colors">
            <h4 className="font-medium text-lg mb-1 line-clamp-2">
              Numerology: The Complete Guide to Personal Numbers
            </h4>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
              <span>4.9</span>
              <span className="mx-2">•</span>
              <span>832 students</span>
            </div>
            <p className="text-sm text-primary font-medium">$89.99</p>
          </div>
          
          <div className="p-4 border border-border rounded-lg hover:border-primary/20 transition-colors">
            <h4 className="font-medium text-lg mb-1 line-clamp-2">
              Palmistry: Reading Life Path Through Your Hands
            </h4>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
              <span>4.7</span>
              <span className="mx-2">•</span>
              <span>1,254 students</span>
            </div>
            <p className="text-sm text-primary font-medium">$74.99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInstructorTab;
