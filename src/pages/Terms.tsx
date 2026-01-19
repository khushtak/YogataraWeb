
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="bg-muted/30 py-12">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-semibold mb-4">
                Terms of Service
              </h1>
              <p className="text-muted-foreground">
                Last updated: June 1, 2023
              </p>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
              <p>
                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the LearnSync website and services operated by LearnSync Inc.
              </p>
              
              <p>
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
              
              <p>
                <strong>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.</strong>
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mt-6 mb-4">1. Accounts</h2>
              
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
              </p>
              
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">2. Intellectual Property</h2>
              
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of LearnSync Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of LearnSync Inc.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">3. Course Content and Materials</h2>
              
              <p>
                All course content and materials available through our Service, including but not limited to videos, texts, graphics, images, and other materials, are the property of LearnSync Inc. or its content providers and are protected by intellectual property laws.
              </p>
              
              <p>
                You may access content for your personal, non-commercial use only. You may not download, copy, reproduce, distribute, transmit, broadcast, display, sell, license, or otherwise exploit any content for any other purposes without the prior written consent of LearnSync Inc. or the respective content providers.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">4. Payments and Refunds</h2>
              
              <p>
                You agree to pay all fees or charges to your account based on the pricing and billing terms presented to you at the time of purchase.
              </p>
              
              <p>
                We offer a 30-day satisfaction guarantee for our courses. If you are not satisfied with a course, you can request a refund within 30 days of purchase by contacting our support team.
              </p>
              
              <p>
                Certain refund requests may be considered on a case-by-case basis and granted at the sole discretion of LearnSync Inc.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">5. Restrictions on Use</h2>
              
              <p>
                You may not:
              </p>
              
              <ul>
                <li>Use the Service for any illegal purpose or in violation of any local, state, national, or international law</li>
                <li>Harass, abuse, or harm another person, or in order to contact, advertise to, solicit, or sell to any user without their prior explicit consent</li>
                <li>Interfere with, disrupt, or create an undue burden on the Service or the networks or services connected to the Service</li>
                <li>Attempt to bypass any security features of the Service</li>
                <li>Use the Service to distribute unsolicited promotional or commercial content or other unwanted or mass solicitations</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">6. Limitation of Liability</h2>
              
              <p>
                In no event shall LearnSync Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              
              <ol>
                <li>Your access to or use of or inability to access or use the Service;</li>
                <li>Any conduct or content of any third party on the Service;</li>
                <li>Any content obtained from the Service; and</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.</li>
              </ol>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">7. Changes to Terms</h2>
              
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">8. Contact Us</h2>
              
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              
              <p>
                LearnSync Inc.<br />
                123 Wisdom Avenue, Suite 101<br />
                San Francisco, CA 94107<br />
                Email: legal@learnsync.com
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
