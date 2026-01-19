
import React from 'react';
import { PlayCircle, Share2, Award, Download } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Badge } from '@/components/ui/badge';

interface CoursePurchaseCardProps {
  course: any;
  isEnrolled: boolean;
  handleEnroll: () => void;
  handleShare: () => void;
}

const CoursePurchaseCard = ({ course, isEnrolled, handleEnroll, handleShare }: CoursePurchaseCardProps) => (
  <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm">
    <div className="relative aspect-video rounded-t-lg overflow-hidden">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
          <PlayCircle className="h-10 w-10 text-white" />
        </div>
      </div>
      {course.bestseller && (
        <div className="absolute top-3 left-3">
          <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">Bestseller</Badge>
        </div>
      )}
    </div>
    
    <div className="p-6">
      <div className="mb-4">
        <p className="text-2xl font-bold mb-2">
          ${course.price.toFixed(2)}
        </p>
        {course.originalPrice && (
          <div className="flex items-center">
            <span className="text-muted-foreground line-through mr-2">${course.originalPrice.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">
              {Math.round((1 - course.price / course.originalPrice) * 100)}% off
            </span>
          </div>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          <span className="font-medium text-destructive">4 days</span> left at this price!
        </p>
      </div>
      
      {!isEnrolled ? (
        <>
          <ButtonCustom 
            className="w-full mb-3" 
            size="lg"
            onClick={handleEnroll}
          >
            Enroll Now
          </ButtonCustom>
          <ButtonCustom 
            className="w-full mb-3" 
            size="lg"
            variant="outline"
          >
            Try For Free
          </ButtonCustom>
        </>
      ) : (
        <ButtonCustom 
          className="w-full mb-3" 
          size="lg"
          variant="secondary"
        >
          Continue Learning
        </ButtonCustom>
      )}
      
      <button 
        className="w-full py-2.5 px-4 border border-border rounded-md flex items-center justify-center text-sm font-medium hover:bg-accent/50 transition-colors"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share this course
      </button>
      
      {/* <div className="mt-6 space-y-3">
        <button className="flex items-center text-sm text-primary font-medium">
          <Award className="h-4 w-4 mr-2" />
          Apply Coupon
        </button>
        <button className="flex items-center text-sm text-primary font-medium">
          <Download className="h-4 w-4 mr-2" />
          Gift This Course
        </button>
      </div> */}
      
      {/* <div className="mt-6">
        <p className="text-sm text-center text-muted-foreground">
          Last updated: {course.lastUpdated}
        </p>
      </div> */}
    </div>
  </div>
);

export default CoursePurchaseCard;
