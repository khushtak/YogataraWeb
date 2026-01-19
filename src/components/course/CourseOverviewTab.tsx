import React from 'react';
import { CheckCircle, Target, BarChart, Award } from 'lucide-react';

interface CourseOverviewTabProps {
  course: any;
}

const CourseOverviewTab = ({ course }: CourseOverviewTabProps) => {

  // useEffect(() => {
  //   console.log(course);
  // }, [])


  return (
    <div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">About This Course</h2>
        <p className="text-muted-foreground mb-6">{course.longDescription}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 rounded-lg border border-border bg-accent/30">
            <div className="flex items-center mb-2">
              <BarChart className="h-5 w-5 text-primary mr-2" />
              <p className="font-medium">Skill Level</p>
            </div>
            <p className="text-sm text-muted-foreground">{course.level}</p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-accent/30">
            <div className="flex items-center mb-2">
              <Award className="h-5 w-5 text-primary mr-2" />
              <p className="font-medium">Certification</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {course.certification
                ? "Certificate of completion included"
                : "No certificate provided"}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {course.whatYouWillLearn?.map((item: string, index: number) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Who This Course Is For</h2>
        <div className="space-y-3">
          {course.targetAudience ? (
            course.targetAudience.map((item: string, index: number) => (
              <div key={index} className="flex items-start">
                <Target className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">This course is designed for all students interested in the subject matter.</p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Course Content</h2>
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold">{course.sections.length}</p>
              <p className="text-sm text-muted-foreground">Sections</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{course.sections.length}</p>
              <p className="text-sm text-muted-foreground">Lectures</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{course.duration}</p>
              <p className="text-sm text-muted-foreground">Total Duration</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{course.level}</p>
              <p className="text-sm text-muted-foreground">Level</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {course.sections.map((section: any, index: number) => {
            const videoCount = section.items.filter((item: any) => item.type === 'video').length;
            const quizCount = section.items.filter((item: any) => item.type === 'quiz').length;
            
            return (
              <div key={index} className="p-3 border border-border rounded-md">
                <p className="font-medium">{section.title}</p>
                <p className="text-sm text-muted-foreground">
                  {videoCount} videos
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseOverviewTab;
