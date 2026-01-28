import React, { useEffect, useState } from 'react';
import { PlayCircle, Share2, X } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/utils/auth';

interface CoursePurchaseCardProps {
  course: any;
  isEnrolled: boolean;
  handleEnroll: () => void;
  handleShare: () => void;
}

const CoursePurchaseCard = ({
  course,
  isEnrolled,
  handleEnroll,
  handleShare
}: CoursePurchaseCardProps) => {

  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  /* ================= GET USER ================= */
  useEffect(() => {
    const storedUser = getUser(); // ✅ already object
    if (storedUser) setUser(storedUser);
  }, []);

  /* ================= COMMON LOGIN CHECK ================= */
  const checkLogin = (callback: () => void) => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    callback();
  };

  return (
    <>
      {/* ================= CARD ================= */}
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
              <Badge className="bg-yellow-500">Bestseller</Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <p className="text-2xl font-bold mb-4">
            ₹{course.price}
          </p>

          {!isEnrolled ? (
            <>
              {/* ENROLL */}
              <ButtonCustom
                className="w-full mb-3"
                size="lg"
                onClick={() => checkLogin(handleEnroll)}
              >
                Enroll Now
              </ButtonCustom>

              {/* TRY FREE */}
              <ButtonCustom
                className="w-full mb-3"
                size="lg"
                variant="outline"
                onClick={() =>
                  checkLogin(() => console.log("Try free"))
                }
              >
                Try For Free
              </ButtonCustom>
            </>
          ) : (
            <ButtonCustom
              className="w-full mb-3"
              size="lg"
              variant="secondary"
              onClick={() =>
                checkLogin(() => navigate(`/my-courses/${course.id}`))
              }
            >
              Continue Learning
            </ButtonCustom>
          )}

          {/* SHARE */}
          <button
            className="w-full py-2.5 px-4 border border-border rounded-md flex items-center justify-center text-sm font-medium hover:bg-accent/50"
            onClick={() => checkLogin(handleShare)}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share this course
          </button>
        </div>
      </div>

      {/* ================= LOGIN POPUP ================= */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl w-[90%] max-w-md p-6 relative">

            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold text-center mb-3">
              Login Required
            </h2>

            <p className="text-center text-gray-600 mb-6">
              Please login to continue
            </p>

            <ButtonCustom
              className="w-full"
              size="lg"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </ButtonCustom>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursePurchaseCard;
