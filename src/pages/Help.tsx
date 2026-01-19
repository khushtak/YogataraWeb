
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Search, BookOpen, Video, MessageCircle, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Help = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const helpTopics = [
    { title: "Getting Started", icon: <BookOpen className="h-5 w-5" />, articles: 12 },
    { title: "Account & Settings", icon: <BookOpen className="h-5 w-5" />, articles: 8 },
    { title: "Courses & Enrollment", icon: <BookOpen className="h-5 w-5" />, articles: 15 },
    { title: "Payment & Billing", icon: <BookOpen className="h-5 w-5" />, articles: 10 },
    { title: "Technical Issues", icon: <BookOpen className="h-5 w-5" />, articles: 9 },
    { title: "Mobile App", icon: <BookOpen className="h-5 w-5" />, articles: 6 }
  ];

  const commonQuestions = [
    { 
      question: "How do I reset my password?", 
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password." 
    },
    { 
      question: "Can I download course materials for offline viewing?", 
      answer: "Yes, most course materials including PDFs and worksheets are available for download. Videos can be downloaded through our mobile app for premium subscribers." 
    },
    { 
      question: "How do I get a certificate after completing a course?", 
      answer: "Certificates are automatically generated once you complete all required modules and pass any assessments. You can download your certificate from your course dashboard." 
    },
    { 
      question: "What payment methods do you accept?", 
      answer: "We accept all major credit cards, PayPal, and in select regions, bank transfers and digital wallets like Apple Pay and Google Pay." 
    },
    { 
      question: "How can I request a refund?", 
      answer: "Refund requests can be submitted within 30 days of purchase through your account dashboard or by contacting our support team. Please review our refund policy for eligibility criteria." 
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="bg-muted/30 py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-semibold mb-6">
                How Can We Help You?
              </h1>
              <p className="text-muted-foreground mb-8">
                Find answers to your questions and learn how to get the most out of LearnSync.
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Help Topics */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-2xl font-semibold mb-8 text-center">Browse Help Topics</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpTopics.map((topic, index) => (
                <Link 
                  key={index} 
                  to="#" 
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-primary/10 mr-4">
                      {topic.icon}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground">{topic.articles} articles</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Resources Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <h2 className="text-2xl font-semibold mb-8 text-center">Learning Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Video Tutorials",
                  description: "Watch step-by-step guides on how to navigate our platform and get the most from your courses.",
                  icon: <Video className="h-8 w-8 text-primary" />,
                  action: "Watch Videos"
                },
                {
                  title: "Knowledge Base",
                  description: "Access our comprehensive documentation with detailed answers to common questions.",
                  icon: <BookOpen className="h-8 w-8 text-primary" />,
                  action: "Browse Articles"
                },
                {
                  title: "Community Forum",
                  description: "Connect with other students and instructors to share experiences and get advice.",
                  icon: <MessageCircle className="h-8 w-8 text-primary" />,
                  action: "Join Discussion"
                }
              ].map((resource, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 flex flex-col h-full">
                  <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                    {resource.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">{resource.description}</p>
                  <ButtonCustom variant="outline">
                    {resource.action}
                  </ButtonCustom>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {commonQuestions.map((faq, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <ButtonCustom>
                  View All FAQs
                </ButtonCustom>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Support */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
              <p className="text-muted-foreground mb-8">
                Our support team is here to assist you with any questions or issues you might have.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Email Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Send us a message and we'll get back to you within 24 hours.
                  </p>
                  <ButtonCustom variant="outline">
                    Email Us
                  </ButtonCustom>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Phone Support</h3>
                  <p className="text-muted-foreground mb-4">
                    For urgent issues, call us directly during business hours.
                  </p>
                  <ButtonCustom variant="outline">
                    Call Support
                  </ButtonCustom>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
