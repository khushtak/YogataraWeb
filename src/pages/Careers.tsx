
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Briefcase, Clock, MapPin, GraduationCap, Heart } from 'lucide-react';

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full border border-border bg-background/60 backdrop-blur-sm">
                <span className="text-xs font-medium text-muted-foreground">Join Our Team</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-6">
                Build Your Career with LearnSync
              </h1>
              <p className="text-muted-foreground">
                Join our passionate team of educators and technologists dedicated to making mystical and spiritual knowledge accessible to everyone.
              </p>
            </div>
          </div>
        </section>
        
        {/* Why Join Us Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Why Work With Us
              </h2>
              <p className="text-muted-foreground">
                At LearnSync, we're more than just an educational platform. We're a community committed to personal and professional growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Heart className="h-8 w-8 text-primary" />,
                  title: "Meaningful Work",
                  description: "Make a real difference in people's lives by helping them access transformative knowledge."
                },
                {
                  icon: <GraduationCap className="h-8 w-8 text-primary" />,
                  title: "Continuous Learning",
                  description: "Access to all our courses and regular opportunities for professional development."
                },
                {
                  icon: <Clock className="h-8 w-8 text-primary" />,
                  title: "Work-Life Balance",
                  description: "Flexible schedules and remote work options to support your personal wellbeing."
                },
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-card border border-border rounded-lg p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Open Positions Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Open Positions
              </h2>
              <p className="text-muted-foreground">
                Explore our current job openings and find your place in our growing team.
              </p>
            </div>
            
            <div className="grid gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Senior Content Developer",
                  department: "Education",
                  location: "Remote",
                  type: "Full-time"
                },
                {
                  title: "UI/UX Designer",
                  department: "Design",
                  location: "San Francisco, CA",
                  type: "Full-time"
                },
                {
                  title: "Vedic Astrology Subject Matter Expert",
                  department: "Education",
                  location: "Remote",
                  type: "Part-time"
                },
                {
                  title: "Frontend Developer",
                  department: "Engineering",
                  location: "Remote",
                  type: "Full-time"
                },
              ].map((job, index) => (
                <div 
                  key={index} 
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-medium mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Briefcase className="mr-1 h-4 w-4" />
                          {job.department}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                    <ButtonCustom variant="outline" className="md:self-end">
                      View Details
                    </ButtonCustom>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Application Process */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Our Application Process
              </h2>
              <p className="text-muted-foreground">
                Here's what to expect when applying to join the LearnSync team.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {[
                  {
                    step: "1",
                    title: "Application Review",
                    description: "Submit your application and our team will review your qualifications and experience."
                  },
                  {
                    step: "2",
                    title: "Initial Interview",
                    description: "Meet with a member of our team to discuss your background and interest in the role."
                  },
                  {
                    step: "3",
                    title: "Skills Assessment",
                    description: "Depending on the role, you may be asked to complete a skills assessment or technical challenge."
                  },
                  {
                    step: "4",
                    title: "Team Interview",
                    description: "Meet with potential teammates and stakeholders to ensure a good mutual fit."
                  },
                  {
                    step: "5",
                    title: "Offer and Onboarding",
                    description: "Receive your offer and begin the onboarding process to join our team!"
                  }
                ].map((step, index) => (
                  <div key={index} className="relative flex pb-12 last:pb-0">
                    <div className="absolute inset-0 flex items-center justify-center w-6 mt-1 ml-3">
                      {index < 4 && <div className="h-full w-px bg-border"></div>}
                    </div>
                    <div className="relative flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white">
                      {step.step}
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-medium mb-1">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                Don't See a Perfect Fit?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute to our mission.
              </p>
              <ButtonCustom size="lg">
                Send General Application
              </ButtonCustom>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
