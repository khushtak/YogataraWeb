
import React from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/course/VideoPlayer';
import CourseDetailHeader from '@/components/course/CourseDetailHeader';
import BookmarksPanel from '@/components/course/BookmarksPanel';
import CourseTabsContainer from '@/components/course/CourseTabsContainer';
import CourseSidebarContainer from '@/components/course/CourseSidebarContainer';
import CourseRelated from '@/components/course/CourseRelated';

interface CourseDetailLayoutProps {
  course: any;
  isEnrolled: boolean;
  currentVideo: any;
  showBookmarks: boolean;
  bookmarkedIds: string[];
  bookmarkedData: Array<{ id: string, title: string }>;
  handleEnroll: () => void;
  handleShare: () => void;
  playVideo: (item: any, sectionTitle: string) => void;
  handleReviewHelpful: (reviewId: number, helpful: boolean) => void;
  toggleBookmark: (itemId: string, title: string) => void;
  findAndPlayBookmarkedVideo: (itemId: string) => void;
  toggleBookmarksPanel: () => void;
  handleDownloadResources: () => void
}

const CourseDetailLayout: React.FC<CourseDetailLayoutProps> = ({
  course,
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
}) => {
  // Don't show the video player on the initial course detail page
  const isViewingMode = !!currentVideo;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Video Player Section (only when explicitly watching a video) */}
      {isViewingMode && (
        <VideoPlayer
          course={course}
          currentVideo={currentVideo}
          isEnrolled={isEnrolled}
          handleShare={handleShare}
          bookmarkedItems={bookmarkedData}
          onBookmarkItemClick={findAndPlayBookmarkedVideo}
          onRemoveBookmark={(id) => toggleBookmark(id, '')}
          isBookmarked={bookmarkedIds.includes(currentVideo.id)}
          onBookmarkToggle={() => toggleBookmark(currentVideo.id, currentVideo.title)}
          handleDownloadResources={handleDownloadResources}
        />
      )}

      <main className="flex-1 bg-background">
        {/* Course Header - Always shown on the detail page, hidden when viewing a video */}
        {!isViewingMode && (
          <CourseDetailHeader
            course={course}
            isEnrolled={isEnrolled}
            showBookmarks={showBookmarks}
            bookmarkedIds={bookmarkedIds}
            handleEnroll={handleEnroll}
            handleShare={handleShare}
            toggleBookmarksPanel={toggleBookmarksPanel}
          />
        )}

        {/* Course Content */}
        <section className={cn("py-10", isViewingMode ? "pt-4" : "")}>
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Bookmarked Items Panel - Only shown when toggled */}
                {isEnrolled && (
                  <BookmarksPanel
                    showBookmarks={showBookmarks}
                    bookmarkedData={bookmarkedData}
                    findAndPlayBookmarkedVideo={findAndPlayBookmarkedVideo}
                    toggleBookmark={toggleBookmark}
                  />
                )}

                {/* Course Tabs */}
                <CourseTabsContainer
                  course={course}
                  isEnrolled={isEnrolled}
                  playVideo={playVideo}
                  bookmarkedIds={bookmarkedIds}
                  toggleBookmark={toggleBookmark}
                  handleReviewHelpful={handleReviewHelpful}
                />
              </div>

              <div className="hidden lg:block">
                <CourseSidebarContainer
                  course={course}
                  isEnrolled={isEnrolled}
                  handleEnroll={handleEnroll}
                  handleShare={handleShare}
                />
              </div>
            </div>

            {/* Related Courses Section */}
            <CourseRelated courseId={course.id} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailLayout;
