import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full border border-border bg-background/60 backdrop-blur-sm">
                <span className="text-xs font-medium text-muted-foreground">
                  Get In Touch
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-6">
                We'd Love to Hear From You
              </h1>
              <p className="text-muted-foreground">
                Have questions about our courses or need guidance on which path
                to take? Our team is here to help you on your journey.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 rounded-lg border border-border bg-card"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 rounded-lg border border-border bg-card"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-card"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-card resize-none"
                      required
                    ></textarea>
                  </div>

                  <ButtonCustom type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </ButtonCustom>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Feel free to reach out to us using any of the contact methods
                  below. We strive to respond to all inquiries within 24 hours
                  during business days.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="h-5 w-5 text-primary" />,
                      title: "Email Us",
                      content: "info@Vedic Astro.com",
                      description: "For general inquiries",
                    },
                    {
                      icon: <Phone className="h-5 w-5 text-primary" />,
                      title: "Call Us",
                      content: "+1 (555) 123-4567",
                      description: "Monday to Friday, 9am to 5pm",
                    },
                    {
                      icon: <MapPin className="h-5 w-5 text-primary" />,
                      title: "Visit Us",
                      content: "123 Wisdom Avenue, Suite 101",
                      description: "San Francisco, CA 94107",
                    },
                    {
                      icon: <Clock className="h-5 w-5 text-primary" />,
                      title: "Business Hours",
                      content: "Monday - Friday: 9am - 5pm",
                      description: "Weekend: Closed",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex">
                      <div className="mt-2 mr-4 p-1 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                        <p className="text-foreground mb-1">{item.content}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Find answers to commonly asked questions about our courses and
                learning process.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    question: "How do I access my courses after purchase?",
                    answer:
                      "After enrolling in a course, you can access it immediately through your student dashboard. Simply log in to your account and navigate to 'My Courses' to start learning.",
                  },
                  {
                    question: "Do courses come with lifetime access?",
                    answer:
                      "Yes, all our courses come with lifetime access. Once you enroll, you can learn at your own pace and revisit the material whenever you need to refresh your knowledge.",
                  },
                  {
                    question:
                      "Are there any prerequisites for taking your courses?",
                    answer:
                      "Most of our introductory courses are designed for beginners and require no prior knowledge. For advanced courses, we recommend checking the course description for any prerequisites.",
                  },
                  {
                    question: "Do you offer any refunds if I'm not satisfied?",
                    answer:
                      "Yes, we offer a 30-day money-back guarantee for all our courses. If you're not satisfied with your purchase, you can request a refund within 30 days of enrollment.",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
