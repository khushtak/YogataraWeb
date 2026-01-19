
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { ArrowRight, Award, CheckCircle, Users, BookOpen, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const About = () => {
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
                <span className="text-xs font-medium text-muted-foreground">Our Story</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-6">
                Bringing Ancient Wisdom to the Modern World
              </h1>
              <p className="text-muted-foreground">
                Vedic Astro was founded with a mission to preserve and share the profound knowledge of Vedic astrology, numerology, and ancient divinatory arts with seekers around the world.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  In a world increasingly disconnected from ancient wisdom, Vedic Astro aims to bridge the gap between traditional knowledge systems and modern seekers. We believe that the insights from Vedic astrology, numerology, tarot, and other divinatory arts remain profoundly relevant for navigating life's challenges and understanding our deeper purpose.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our carefully crafted courses preserve the authenticity of these traditions while making them accessible and practical for contemporary application. We strive to maintain the highest standards of educational excellence while fostering a community of respectful and dedicated learners.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: 'Authentic Knowledge' },
                    { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: 'Modern Application' },
                    { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: 'Community Support' },
                    { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: 'Continuous Learning' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      {item.icon}
                      <span className="ml-2 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/5 rounded-full -z-10"></div>
                <img 
                  src="/wheel.jpg" 
                  alt="Our mission" 
                  className="rounded-xl w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full -z-10"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Meet Our Team */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-semibold mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground">
                Our team of expert instructors brings decades of experience in Vedic astrology and related disciplines.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Mridul",
                  role: "Lead Instructor & Vedic Scholar",
                  bio: "With over 20 years of experience in Vedic astrology, Mridul has helped thousands navigate life's challenges through ancient wisdom.",
                  avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Priya Sharma",
                  role: "Numerology Specialist",
                  bio: "Priya combines traditional numerology techniques with modern psychological insights to provide practical guidance for personal growth.",
                  avatar: "https://randomuser.me/api/portraits/women/45.jpg"
                },
                {
                  name: "Raj Kumar",
                  role: "Tarot & Palmistry Expert",
                  bio: "A third-generation tarot reader, Raj has developed innovative teaching methods that make divination accessible to beginners.",
                  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
                }
              ].map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-semibold mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground">
                These core principles guide everything we do at Vedic Astro.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Award className="h-8 w-8 text-primary" />,
                  title: "Authenticity",
                  description: "We preserve the integrity of ancient wisdom while making it accessible for modern learners."
                },
                {
                  icon: <Users className="h-8 w-8 text-primary" />,
                  title: "Community",
                  description: "We foster a supportive environment where students can learn and grow together."
                },
                {
                  icon: <BookOpen className="h-8 w-8 text-primary" />,
                  title: "Excellence",
                  description: "We maintain the highest standards in our course content and teaching methodologies."
                },
                {
                  icon: <User className="h-8 w-8 text-primary" />,
                  title: "Empowerment",
                  description: "We equip students with knowledge that enhances self-awareness and decision-making."
                }
              ].map((value, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border h-full">
                  <div className="mb-4 p-3 rounded-full bg-primary/10">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10 p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-4">
                  Ready to Begin Your Journey?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Explore our courses and join a community of seekers dedicated to understanding the ancient arts of divination and self-knowledge.
                </p>
                <Link to="/courses">
                <ButtonCustom size="lg">
                  Explore Our Courses <ArrowRight className="ml-2 h-4 w-4" />
                </ButtonCustom></Link>
                
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
