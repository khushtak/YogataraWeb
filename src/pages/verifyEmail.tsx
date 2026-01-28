import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/verify-email/${token}`
        );

        const data = await res.json();

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Verification failed",
            description: data?.message || "Invalid or expired link",
            duration: 2500,
          });
          return;
        }

        toast({
          title: "Email verified 🎉",
          description: "You can now login",
          duration: 2500,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2500);

      } catch (error) {
        toast({
          variant: "destructive",
          title: "Server error",
          description: "Please try again later",
        });
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <h2 className="text-xl font-semibold">
        Verifying your email, please wait...
      </h2>
    </div>
  );
};

export default VerifyEmail;
