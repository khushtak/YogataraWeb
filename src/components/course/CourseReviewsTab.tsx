import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ButtonCustom } from '@/components/ui/button-custom';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import baseUrl from '@/config/Config'; // Import baseUrl

interface CourseReviewsTabProps {
  course: any;
  isEnrolled: boolean;
  handleReviewHelpful: (reviewId: number, helpful: boolean) => void;
}

const CourseReviewsTab = ({ course, isEnrolled, handleReviewHelpful }: CourseReviewsTabProps) => {
  const [reviewText, setReviewText] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [sortReviewsBy, setSortReviewsBy] = useState('newest');

  const updateCourseReviews = async (courseId: number, updatedReviews: any[]) => {
    try {
      const response = await fetch(`${baseUrl}/update-course/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviews: updatedReviews }),
      });

      if (!response.ok) {
        throw new Error('Failed to update course reviews');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating course reviews:', error);
      throw error;
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userRating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a star rating for your review",
        variant: "destructive",
      });
      return;
    }

    if (reviewText.trim().length < 10) {
      toast({
        title: "Review too short",
        description: "Please provide a more detailed review",
        variant: "destructive",
      });
      return;
    }

    const newReview = {
      id: course.reviews.length + 1, // Generate a unique ID for the new review
      name: "Current User", // Replace with actual user name
      date: new Date().toISOString().split('T')[0], // Current date
      rating: userRating,
      comment: reviewText,
      helpful: 0,
      unhelpful: 0,
    };

    const updatedReviews = [...course.reviews, newReview];

    try {
      await updateCourseReviews(course.id, updatedReviews);
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });

      // Clear form
      setReviewText('');
      setUserRating(0);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">Student Reviews</h2>
          <div className="flex items-center mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-5 w-5 mr-1",
                    star <= Math.round(course.rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="ml-2 font-medium">{course.rating?.toFixed(1)}</span>
            <span className="text-muted-foreground ml-1">({course.reviews?.length} reviews)</span>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-sm mr-2">Sort by:</span>
          <select
            className="text-sm bg-muted border border-border rounded-md p-1"
            value={sortReviewsBy}
            onChange={(e) => setSortReviewsBy(e.target.value)}
          >
            <option value="newest">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </div>

      {/* Write a review (only for enrolled users) */}
      {isEnrolled && (
        <div className="mb-8 p-6 border border-border rounded-xl">
          <h3 className="text-lg font-medium mb-4">Write a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="mr-1"
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        star <= userRating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <textarea
                className="w-full p-3 border border-border rounded-md"
                rows={4}
                placeholder="Tell others what you think about this course..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>

            <ButtonCustom type="submit">Submit Review</ButtonCustom>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {course.reviews?.map((review: any) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-0">
            <div className="flex items-start">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={review.avatar} alt={review.name} />
                <AvatarFallback>{review.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <h4 className="font-medium">{review.name}</h4>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>

                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-4 w-4 mr-1",
                        star <= review.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-3">{review.comment}</p>

                <div className="flex items-center text-sm">
                  <span className="mr-4">Was this review helpful?</span>
                  <button
                    className="flex items-center mr-3 text-muted-foreground hover:text-foreground"
                    onClick={() => handleReviewHelpful(review.id, true)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{review.helpful}</span>
                  </button>
                  <button
                    className="flex items-center text-muted-foreground hover:text-foreground"
                    onClick={() => handleReviewHelpful(review.id, false)}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>{review.unhelpful}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseReviewsTab;