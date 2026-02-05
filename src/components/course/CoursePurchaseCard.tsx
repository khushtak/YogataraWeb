import React, { useEffect, useState } from 'react';
import { PlayCircle, Share2, X } from 'lucide-react';
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
    const storedUser = getUser();
    if (storedUser) setUser(storedUser);
  }, []);

  /* ================= PRICE + GST CALC ================= */
  const basePrice = Number(course.price) || 0;
  const gstAmount = basePrice * 0.18;
  const totalPrice = basePrice + gstAmount;

  /* ================= LOGIN CHECK ================= */
  const checkLogin = (callback: () => void) => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    callback();
  };

  return (
    <>
      <div
        className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 
                   bg-white dark:bg-gray-900 
                   shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* IMAGE / PREVIEW */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-md hover:scale-110 transition">
              <PlayCircle className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* bestseller badge */}
          {course.bestseller && (
            <div className="absolute top-3 left-3 
                            bg-yellow-400 text-black text-xs font-semibold 
                            px-3 py-1 rounded-full shadow">
              Bestseller
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          {/* ===== PRICE BOX ===== */}
          {!isEnrolled && (
            <div
              className="rounded-xl p-4 
                         bg-gradient-to-r from-indigo-50 to-purple-50
                         dark:from-indigo-900/40 dark:to-purple-900/40
                         border border-indigo-100 dark:border-indigo-800
                         shadow-sm"
            >
              <div className="flex items-baseline gap-3">
                {/* fixed balanced amount size */}
                <span className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  ₹{totalPrice.toFixed(2)}
                </span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  incl. GST
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Base ₹{basePrice.toFixed(2)} + 18% GST
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {" "} (₹{gstAmount.toFixed(2)})
                </span>
              </p>
            </div>
          )}

          {/* ===== MAIN ACTION BUTTON ===== */}
          {!isEnrolled ? (
            <button
              onClick={() => checkLogin(handleEnroll)}
              className="w-full py-3 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-indigo-500 to-purple-600
                         hover:from-indigo-600 hover:to-purple-700
                         shadow-md hover:shadow-lg transition-all duration-200"
            >
              Enroll Now
            </button>
          ) : (
            <button
              onClick={() =>
                checkLogin(() => navigate(`/my-courses/${course.id}`))
              }
              className="w-full py-3 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-emerald-500 to-teal-600
                         hover:from-emerald-600 hover:to-teal-700
                         shadow-md hover:shadow-lg transition-all duration-200"
            >
              Continue Learning
            </button>
          )}

          {/* ===== SHARE BUTTON ===== */}
          <button
            onClick={() => checkLogin(handleShare)}
            className="w-full py-3 rounded-xl font-medium
                       border border-gray-200 dark:border-gray-700
                       bg-white dark:bg-gray-800
                       text-gray-800 dark:text-gray-200
                       hover:bg-gray-50 dark:hover:bg-gray-700
                       transition flex items-center justify-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share this course
          </button>
        </div>
      </div>

      {/* ================= LOGIN POPUP ================= */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center 
                        bg-black/60 backdrop-blur-sm">
          <div
            className="bg-white dark:bg-gray-900 
                       rounded-2xl w-[92%] max-w-md p-6 relative 
                       shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">
              Login Required
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Please login to continue
            </p>

            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-indigo-500 to-purple-600
                         hover:from-indigo-600 hover:to-purple-700
                         shadow-md hover:shadow-lg transition-all duration-200"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursePurchaseCard;
