
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Search, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = React.useState("General");
  const [openQuestions, setOpenQuestions] = React.useState<{ [key: string]: boolean }>({});

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    "General",
    "Courses",
    "Enrollment",
    "Payment",
    "Certificates",
    "Technical"
  ];

  const faqItems = {
    "General": [
      {
        id: "gen1",
        question: "What is LearnSync?",
        answer: "LearnSync is an online education platform specializing in Vedic sciences, mystical arts, and spiritual practices. We offer comprehensive courses taught by expert instructors with decades of experience in these ancient traditions."
      },
      {
        id: "gen2",
        question: "Who are the instructors?",
        answer: "Our primary instructor is Mridul, a Jyotish Acharya with over 20 years of experience. We also feature guest teachers who are specialists in their respective fields, including Vedic scholars, Tarot masters, and meditation guides."
      },
      {
        id: "gen3",
        question: "Do I need any prior knowledge to take your courses?",
        answer: "Most of our introductory courses are designed for complete beginners and require no prior knowledge. For advanced courses, we recommend checking the course description for prerequisites. We have a learning path that guides you from foundational to advanced levels."
      },
      {
        id: "gen4",
        question: "What makes LearnSync different from other platforms?",
        answer: "LearnSync specializes exclusively in authentic Vedic and mystical knowledge. Our courses are structured for both theoretical understanding and practical application, with personalized feedback from instructors and a supportive community of like-minded learners."
      }
    ],
    "Courses": [
      {
        id: "course1",
        question: "How long do I have access to a course after purchasing?",
        answer: "All of our courses come with lifetime access. Once you enroll, you can learn at your own pace and revisit the material whenever you need to refresh your knowledge."
      },
      {
        id: "course2",
        question: "What is included in a typical course?",
        answer: "Our courses typically include video lectures, downloadable resources, practice exercises, quizzes, and access to a community forum. Some courses also offer personalized feedback on assignments and live Q&A sessions with the instructor."
      },
      {
        id: "course3",
        question: "Are the courses self-paced or do they have fixed schedules?",
        answer: "Most of our courses are self-paced, allowing you to learn according to your own schedule. Some advanced courses may include live components at specific times, but recordings are always provided for those who cannot attend."
      },
      {
        id: "course4",
        question: "Can I download course materials for offline viewing?",
        answer: "Yes, all PDFs, worksheets, and reference materials are available for download. Video lectures can be downloaded through our mobile app if you have a premium subscription."
      }
    ],
    "Enrollment": [
      {
        id: "enroll1",
        question: "How do I enroll in a course?",
        answer: "To enroll in a course, simply navigate to the course page, click on the 'Enroll Now' or 'Buy Now' button, and follow the checkout process. Once payment is confirmed, you'll have immediate access to the course content."
      },
      {
        id: "enroll2",
        question: "Can I switch between courses after enrolling?",
        answer: "Yes, you can be enrolled in multiple courses simultaneously and switch between them freely. Your progress in each course is saved automatically."
      },
      {
        id: "enroll3",
        question: "Do you offer course bundles or packages?",
        answer: "Yes, we offer curated learning paths that bundle related courses at a discounted price. These are excellent for students who want to develop comprehensive knowledge in a particular area."
      }
    ],
    "Payment": [
      {
        id: "pay1",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and in select regions, bank transfers and digital wallets like Apple Pay and Google Pay."
      },
      {
        id: "pay2",
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 30-day money-back guarantee for all our courses. If you're not satisfied with your purchase, you can request a refund within 30 days of enrollment."
      },
      {
        id: "pay3",
        question: "Are there any hidden fees?",
        answer: "No, the price you see is the price you pay. There are no hidden fees or additional charges after enrollment. Some courses may offer optional add-ons or one-on-one sessions at additional cost, but these are clearly marked and entirely optional."
      },
      {
        id: "pay4",
        question: "Do you offer payment plans?",
        answer: "Yes, for our more extensive courses and certification programs, we offer payment plans that allow you to split the cost into manageable monthly installments."
      }
    ],
    "Certificates": [
      {
        id: "cert1",
        question: "Do your courses provide certificates upon completion?",
        answer: "Yes, all our courses offer a certificate of completion once you've finished all required modules and passed any assessments. These certificates can be downloaded directly from your account."
      },
      {
        id: "cert2",
        question: "Are your certificates accredited?",
        answer: "Our certificates demonstrate your completion of our curriculum and are recognized within the community of Vedic arts practitioners. While we are not a degree-granting institution, many professional associations and employers recognize our specialized training."
      },
      {
        id: "cert3",
        question: "How can I share my certificate with others?",
        answer: "Your certificate includes a unique verification link that you can share with potential clients or employers. You can also download a PDF version or share it directly to your LinkedIn profile or other social media platforms."
      }
    ],
    "Technical": [
      {
        id: "tech1",
        question: "What technical requirements do I need to access the courses?",
        answer: "Our platform works on any modern web browser (Chrome, Firefox, Safari, Edge). For the best experience, we recommend a stable internet connection and a device with audio capabilities. Mobile users can access courses through our responsive website or dedicated mobile app."
      },
      {
        id: "tech2",
        question: "Is there a mobile app available?",
        answer: "Yes, we offer a mobile app for both iOS and Android devices, allowing you to learn on-the-go, download content for offline viewing, and receive notifications about course updates."
      },
      {
        id: "tech3",
        question: "What should I do if I encounter technical issues?",
        answer: "If you experience any technical difficulties, please visit our Help Center for troubleshooting guides. If your issue persists, contact our support team through the 'Help' section in your account or email support@learnsync.com."
      },
      {
        id: "tech4",
        question: "Can I access the courses from multiple devices?",
        answer: "Yes, you can access your courses from any device by logging into your account. Your progress is synchronized across devices, allowing you to start on your computer and continue on your phone seamlessly."
      }
    ]
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="bg-muted/30 py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-semibold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-muted-foreground mb-8">
                Find answers to common questions about our courses, payment options, and learning experience.
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
        
        {/* FAQ Content */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-10 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      activeCategory === category 
                        ? "bg-primary text-white" 
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* FAQ Items */}
              <div className="space-y-4">
                {faqItems[activeCategory as keyof typeof faqItems]?.map((item) => (
                  <div 
                    key={item.id} 
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full flex items-center justify-between p-6 text-left bg-card hover:bg-card/80 transition-colors"
                    >
                      <h3 className="font-medium">{item.question}</h3>
                      {openQuestions[item.id] ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    
                    {openQuestions[item.id] && (
                      <div className="p-6 bg-muted/30 border-t border-border">
                        <p className="text-muted-foreground">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Still Have Questions */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold mb-4">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-8">
                If you couldn't find the answer you were looking for, feel free to reach out to our support team.
              </p>
              <Link to="/contact">
                <ButtonCustom className="inline-flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
