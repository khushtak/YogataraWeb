
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCourse } from '@/hooks/useCourse';
import CourseDetailLayout from '@/components/course/CourseDetailLayout';
import LoadingState from '@/components/course/LoadingState';
import NotFoundState from '@/components/course/NotFoundState';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    course,
    isLoading,
    isEnrolled,
    currentVideo,
    showBookmarks,
    bookmarkedIds,
    bookmarkedData,
    handleEnroll,
    handleShare,
    playVideo,
    handleReviewHelpful,
    toggleBookmark,
    findAndPlayBookmarkedVideo,
    toggleBookmarksPanel,
    handleDownloadResources
  } = useCourse(id);
  // console.log('currentVideo',currentVideo);
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (!course) {
    return <NotFoundState />;
  }

  return (
    <CourseDetailLayout
      course={course}
      isEnrolled={isEnrolled}
      currentVideo={currentVideo}
      showBookmarks={showBookmarks}
      bookmarkedIds={bookmarkedIds}
      bookmarkedData={bookmarkedData}
      handleEnroll={handleEnroll}
      handleShare={handleShare}
      playVideo={playVideo}
      handleReviewHelpful={handleReviewHelpful}
      toggleBookmark={toggleBookmark}
      findAndPlayBookmarkedVideo={findAndPlayBookmarkedVideo}
      toggleBookmarksPanel={toggleBookmarksPanel}
      handleDownloadResources={handleDownloadResources}
    />
  );
};

export default CourseDetail;
