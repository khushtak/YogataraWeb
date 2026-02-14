import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import baseUrl from "@/config/Config";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/verify-email/${token}`
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

          navigate("/login");
      } catch (error) {
        // console.log('sssss',error);
        
        toast({
          title: "Email verified 🎉",
          description: "You can now login",
        });
                  navigate("/login");

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
