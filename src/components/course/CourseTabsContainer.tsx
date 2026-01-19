
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseContentTab from '@/components/course/CourseContentTab';
import CourseOverviewTab from '@/components/course/CourseOverviewTab';
import CourseReviewsTab from '@/components/course/CourseReviewsTab';
import CourseRequirementsTab from '@/components/course/CourseRequirementsTab';
import CourseInstructorTab from '@/components/course/CourseInstructorTab';

interface CourseTabsContainerProps {
  course: any;
  isEnrolled: boolean;
  playVideo: (item: any, sectionTitle: string) => void;
  bookmarkedIds: string[];
  toggleBookmark: (itemId: string, title: string) => void;
  handleReviewHelpful: (reviewId: number, helpful: boolean) => void;
}

const CourseTabsContainer = ({
  course,
  isEnrolled,
  playVideo,
  bookmarkedIds,
  toggleBookmark,
  handleReviewHelpful
}: CourseTabsContainerProps) => {
  return (
    <Tabs defaultValue="overview" className="mb-10">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="content">Course Content</TabsTrigger>
        <TabsTrigger value="instructor">Instructor</TabsTrigger>
        <TabsTrigger value="requirements">Requirements</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      
      {/* Overview Tab (Now the default tab) */}
      <TabsContent value="overview">
        <CourseOverviewTab course={course} />
      </TabsContent>
      
      {/* Course Content Tab */}
      <TabsContent value="content">
        <CourseContentTab 
          course={course}
          isEnrolled={isEnrolled}
          playVideo={playVideo}
          bookmarkedItems={bookmarkedIds}
          toggleBookmark={toggleBookmark}
        />
      </TabsContent>
      
      {/* Instructor Tab */}
      <TabsContent value="instructor">
        <CourseInstructorTab course={course} />
      </TabsContent>

      {/* Requirements Tab */}
      <TabsContent value="requirements">
        <CourseRequirementsTab course={course} />
      </TabsContent>
      
      {/* Reviews Tab */}
      <TabsContent value="reviews">
        <CourseReviewsTab 
          course={course}
          isEnrolled={isEnrolled}
          handleReviewHelpful={handleReviewHelpful}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabsContainer;
