
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import FeaturedCourses from '@/components/FeaturedCourses';
import CourseCategories from '@/components/CourseCategories';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { CheckCircle, Clock, Award, GraduationCap, BookOpen, Users, ShieldCheck, Star, Moon, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Courses', value: '45+' },
                { label: 'Students', value: '5K+' },
                { label: 'Reviews', value: '4.8/5' },
                { label: 'Countries', value: '90+' },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Instructor Profile Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/5 rounded-full -z-10"></div>
                <div className="relative rounded-2xl overflow-hidden border border-border aspect-square max-w-md mx-auto">
                  <img 
                    src="/instructor.png" 
                    alt="Mridul - Jyotish Expert" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full -z-10"></div>
              </div>
              
              <div>
                <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full border border-border bg-background/60 backdrop-blur-sm">
                  <span className="text-xs font-medium text-muted-foreground">Meet Your Instructor</span>
                </div>
                
                <h2 className="text-3xl font-semibold mb-6">Mridul</h2>
                <h3 className="text-xl text-primary mb-6">Jyotish Acharya & Vedic Scholar</h3>
                
                <p className="text-muted-foreground mb-8">
                  With over 20 years of experience in Vedic astrology and related occult sciences, Mridul has helped thousands of people navigate life challenges through ancient wisdom. Trained in traditional Vedic techniques in Varanasi, he combines classical knowledge with practical modern applications.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: <Star className="h-5 w-5 text-primary" />, text: 'Expert in Vedic Astrology' },
                    { icon: <Moon className="h-5 w-5 text-primary" />, text: 'Certified Tarot Reader' },
                    { icon: <Hash className="h-5 w-5 text-primary" />, text: 'Numerology Specialist' },
                    { icon: <Award className="h-5 w-5 text-primary" />, text: 'Published Author' },
                  ].map((credential, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-3">
                        {credential.icon}
                      </div>
                      <span className="text-sm">{credential.text}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/courses">
                    <ButtonCustom>
                      View All Courses
                    </ButtonCustom>
                  </Link>
                  <Link to="/about">
                    <ButtonCustom variant="outline">
                      Learn More About Mridul
                    </ButtonCustom>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedCourses />
        
        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-semibold mb-4">
                Why Learn With Us
              </h2>
              <p className="text-muted-foreground">
                We've designed our courses to provide you with authentic Vedic knowledge presented in a clear, accessible format for modern learners.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Award className="h-8 w-8 text-primary" />,
                  title: 'Authentic Knowledge',
                  description: 'Learn traditional Vedic wisdom from a scholar trained in the ancient lineages of Jyotisha and related arts.'
                },
                {
                  icon: <Clock className="h-8 w-8 text-primary" />,
                  title: 'Practical Application',
                  description: 'All courses focus on real-world applications of mystical arts to help navigate life challenges effectively.'
                },
                {
                  icon: <CheckCircle className="h-8 w-8 text-primary" />,
                  title: 'Structured Learning',
                  description: 'Progress from fundamentals to advanced concepts with carefully structured curricula for each discipline.'
                },
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-md"
                >
                  <div className="mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <CourseCategories />
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-semibold mb-4">
                What Our Students Say
              </h2>
              <p className="text-muted-foreground">
                Hear from students who have transformed their understanding of astrology and divination through our courses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Priya Sharma",
                  location: "Mumbai, India",
                  avatar: "https://randomuser.me/api/portraits/women/45.jpg",
                  testimonial: "Mridul's Vedic Astrology course completely changed my understanding of birth charts. The concepts are explained so clearly, even complex yogas became easy to identify and interpret."
                },
                {
                  name: "David Chen",
                  location: "Singapore",
                  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                  testimonial: "The Numerology Masterclass helped me discover patterns in my life I had never noticed before. Mridul's teaching style is engaging and the practical exercises reinforced my learning."
                },
                {
                  name: "Sarah Williams",
                  location: "London, UK",
                  avatar: "https://randomuser.me/api/portraits/women/67.jpg",
                  testimonial: "As a professional tarot reader, I still gained so much from the Tarot course. The historical context and spiritual connections to Vedic traditions added new depth to my readings."
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col p-6 rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.testimonial}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container-custom">
            <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10 p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-semibold mb-4">
                    Ready to Begin Your Mystical Journey?
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Join our growing community of astrology and divination enthusiasts. Start learning the ancient arts that have guided civilizations for millennia.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/courses">
                      <ButtonCustom size="lg">
                        Explore Courses
                      </ButtonCustom>
                    </Link>
                    <Link to="/about">
                      <ButtonCustom variant="outline" size="lg">
                        Learn More
                      </ButtonCustom>
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <BookOpen className="h-6 w-6 text-primary" />, text: 'Ancient Vedic Knowledge' },
                    { icon: <Users className="h-6 w-6 text-primary" />, text: 'Supportive Community' },
                    { icon: <GraduationCap className="h-6 w-6 text-primary" />, text: 'Completion Certificates' },
                    { icon: <ShieldCheck className="h-6 w-6 text-primary" />, text: 'Lifetime Access' },
                  ].map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-4 rounded-lg bg-background border border-border"
                    >
                      <div className="mr-3">
                        {feature.icon}
                      </div>
                      <p className="text-sm font-medium">
                        {feature.text}
                      </p>
                    </div>
                  ))}
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

export default Index;
