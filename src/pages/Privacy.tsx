
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
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
                Privacy Policy
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
                At LearnSync, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mt-6 mb-4">1. Collection of Your Information</h2>
              
              <p>
                We may collect information about you in a variety of ways. The information we may collect via the Site includes:
              </p>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Personal Data</h3>
              
              <p>
                Personally identifiable information, such as your name, email address, telephone number, and demographic information that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site.
              </p>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Derivative Data</h3>
              
              <p>
                Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
              </p>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Financial Data</h3>
              
              <p>
                Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor and you are encouraged to review their privacy policy and contact them directly for responses to your questions.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">2. Use of Your Information</h2>
              
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
              </p>
              
              <ul>
                <li>Create and manage your account.</li>
                <li>Process payments and refunds.</li>
                <li>Email you regarding your account or order.</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
                <li>Respond to your comments, questions, and requests.</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our Site.</li>
                <li>Improve the Site, products or services, marketing, or customer relationships and experiences.</li>
                <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                <li>Resolve disputes and troubleshoot problems.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">3. Disclosure of Your Information</h2>
              
              <p>
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </p>
              
              <h3 className="text-lg font-medium mt-4 mb-2">By Law or to Protect Rights</h3>
              
              <p>
                If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
              </p>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Third-Party Service Providers</h3>
              
              <p>
                We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
              </p>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Marketing Communications</h3>
              
              <p>
                With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">4. Security of Your Information</h2>
              
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">5. Policy for Children</h2>
              
              <p>
                We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us immediately.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">6. Your Rights Regarding Your Data</h2>
              
              <p>
                You have certain rights regarding your personal data, subject to local law. These include:
              </p>
              
              <ul>
                <li>The right to access, update or to delete the information we have on you.</li>
                <li>The right of rectification - You have the right to have your information rectified if that information is inaccurate or incomplete.</li>
                <li>The right to object - You have the right to object to our processing of your Personal Data.</li>
                <li>The right of restriction - You have the right to request that we restrict the processing of your personal information.</li>
                <li>The right to data portability - You have the right to be provided with a copy of your Personal Data in a structured, machine-readable and commonly used format.</li>
                <li>The right to withdraw consent - You also have the right to withdraw your consent at any time.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">7. Contact Us</h2>
              
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              
              <p>
                LearnSync Inc.<br />
                123 Wisdom Avenue, Suite 101<br />
                San Francisco, CA 94107<br />
                Email: privacy@learnsync.com
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
