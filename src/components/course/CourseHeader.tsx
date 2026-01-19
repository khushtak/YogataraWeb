
import React from 'react';
import { Star, Clock, Book, Users, Award, Globe, PlayCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import CoursePurchaseCard from './CoursePurchaseCard';

interface CourseHeaderProps {
  course: any;
  isEnrolled: boolean;
  handleEnroll: () => void;
  handleShare: () => void;
}

const CourseHeader = ({ course, isEnrolled, handleEnroll, handleShare }: CourseHeaderProps) => {
  return (
    <section className="bg-muted/30 pt-32 pb-8">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-background/60 backdrop-blur-sm">
                {course.category}
              </Badge>
              {course.bestseller && (
                <Badge className="bg-yellow-500 hover:bg-yellow-600">Bestseller</Badge>
              )}
              {course.featured && (
                <Badge variant="secondary">Featured</Badge>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
            
            <div className="flex flex-wrap items-center text-sm mb-6">
              <div className="flex items-center mr-4 mb-2">
                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                <span className="font-medium">{course.rating.toFixed(1)}</span>
                <span className="text-muted-foreground ml-1">({course.students} students)</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <Book className="h-4 w-4 text-muted-foreground mr-1" />
                <span>{course.lectures} lectures</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <Users className="h-4 w-4 text-muted-foreground mr-1" />
                <span>Level: {course.level}</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <Globe className="h-4 w-4 text-muted-foreground mr-1" />
                <span>{course.language}</span>
              </div>
              {course.certification && (
                <div className="flex items-center mb-2">
                  <Award className="h-4 w-4 text-muted-foreground mr-1" />
                  <span>Certificate of completion</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center mb-6">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={course.instructorImage} alt={course.instructor} />
                <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Instructor: {course.instructor}</p>
                <p className="text-xs text-muted-foreground">{course.instructorTitle}</p>
              </div>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-4 border border-border mb-6">
              <h3 className="font-medium mb-2">What you'll learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {course.whatYouWillLearn.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              {course.whatYouWillLearn.length > 4 && (
                <p className="text-sm mt-2 text-primary cursor-pointer hover:underline">
                  Show more
                </p>
              )}
            </div>
            
            <div className="md:hidden mb-8">
              <CoursePurchaseCard 
                course={course} 
                isEnrolled={isEnrolled} 
                handleEnroll={handleEnroll} 
                handleShare={handleShare} 
              />
            </div>
          </div>
          
          <div className="hidden md:block">
            <CoursePurchaseCard 
              course={course} 
              isEnrolled={isEnrolled} 
              handleEnroll={handleEnroll} 
              handleShare={handleShare} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHeader;
