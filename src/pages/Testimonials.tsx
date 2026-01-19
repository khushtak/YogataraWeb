
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredTestimonials = [
    {
      id: "1",
      name: "Aisha Patel",
      location: "Toronto, Canada",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      testimonial: "The Vedic Astrology course completely changed my perspective on life. Mridul has a gift for explaining complex concepts in an accessible way. After completing the course, I was able to read my own birth chart and understand the planetary influences affecting my path. Truly transformative!",
      course: "Advanced Vedic Astrology"
    },
    {
      id: "2",
      name: "Michael Chen",
      location: "Sydney, Australia",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      testimonial: "As a skeptic, I approached the Tarot Masterclass with reservation. However, Mridul's scientific approach to the intuitive arts made it approachable and practical. Six months later, I use tarot regularly as a tool for self-reflection and gaining perspective on difficult decisions.",
      course: "Tarot Masterclass"
    }
  ];

  const testimonials = [
    {
      id: "3",
      name: "Priya Sharma",
      location: "Mumbai, India",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
      testimonial: "The numerology course helped me discover patterns in my life I had never noticed before. The practical exercises reinforced my learning, and I now use numerology in both personal and professional contexts.",
      course: "Numerology Foundations"
    },
    {
      id: "4",
      name: "David Wilson",
      location: "London, UK",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4,
      testimonial: "I appreciated the comprehensive approach to Vedic astrology, covering both traditional techniques and modern applications. The course materials were excellently organized.",
      course: "Vedic Astrology for Beginners"
    },
    {
      id: "5",
      name: "Sarah Williams",
      location: "Chicago, USA",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      rating: 5,
      testimonial: "As a professional tarot reader, I still gained so much from the advanced course. The historical context and spiritual connections added new depth to my readings.",
      course: "Advanced Tarot Interpretation"
    },
    {
      id: "6",
      name: "Rajiv Mehta",
      location: "Delhi, India",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      testimonial: "The palmistry course exceeded my expectations. The instructor's attention to detail and the high-quality video close-ups made learning this intricate art possible in an online format.",
      course: "Practical Palmistry"
    },
    {
      id: "7",
      name: "Emma Thompson",
      location: "Melbourne, Australia",
      avatar: "https://randomuser.me/api/portraits/women/89.jpg",
      rating: 4,
      testimonial: "I enrolled in the meditation course to complement my astrology studies, and it's been transformative. The guided practices have helped me develop greater intuition for my readings.",
      course: "Meditation for Intuitive Arts"
    },
    {
      id: "8",
      name: "Carlos Rodriguez",
      location: "Barcelona, Spain",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      rating: 5,
      testimonial: "The crystal healing course was beautifully structured, moving from basic principles to advanced techniques. The instructor's passion was evident in every lesson.",
      course: "Crystal Healing Certification"
    },
    {
      id: "9",
      name: "Ji-Eun Kim",
      location: "Seoul, South Korea",
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
      rating: 5,
      testimonial: "Learning about Vedic astrology has given me insights into my core traits and life patterns. I particularly valued the personalized feedback on our chart interpretations.",
      course: "Intermediate Vedic Astrology"
    },
    {
      id: "10",
      name: "Ahmed Hassan",
      location: "Dubai, UAE",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      rating: 5,
      testimonial: "The Chakra Balancing course offered practical techniques I could immediately apply. Months later, I still use these methods in my daily wellness routine.",
      course: "Chakra Balancing & Healing"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full border border-border bg-background/60 backdrop-blur-sm">
                <span className="text-xs font-medium text-muted-foreground">Success Stories</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-6">
                Transformative Learning Experiences
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover how our courses have helped students from around the world embrace ancient wisdom and transform their lives.
              </p>
            </div>
          </div>
        </section>
        
        {/* Featured Testimonials */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-2xl font-semibold mb-8 text-center">Featured Student Stories</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-card border border-border rounded-2xl p-8 relative"
                >
                  <div className="absolute -top-3 -left-3">
                    <Quote className="h-8 w-8 text-primary opacity-20" />
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <Avatar className="h-14 w-14 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.testimonial}"</p>
                  
                  <div className="pt-4 border-t border-border">
                    <span className="text-sm font-medium">Course: </span>
                    <span className="text-sm text-primary">{testimonial.course}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Video Testimonial */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-8 text-center">Hear From Our Students</h2>
              
              <div className="aspect-video bg-black/90 rounded-2xl overflow-hidden relative flex items-center justify-center border border-border">
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop"
                  alt="Video thumbnail" 
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="p-5 rounded-full bg-primary/90 hover:bg-primary transition-colors">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-xl font-semibold">Transformational Journey with Vedic Astrology</p>
                  <p className="text-sm opacity-80">Lisa's story of personal transformation through ancient wisdom</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* More Testimonials Grid */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-2xl font-semibold mb-8 text-center">More Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 italic">"{testimonial.testimonial}"</p>
                  
                  <div className="pt-3 border-t border-border text-sm">
                    <span className="font-medium">Course: </span>
                    <span className="text-primary">{testimonial.course}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="mt-10 text-center">
              <ButtonCustom>
                Load More Testimonials
              </ButtonCustom>
            </div>
          </div>
        </section>
        
        {/* Share Your Story CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl font-semibold mb-4">
                Share Your Success Story
              </h2>
              <p className="text-muted-foreground mb-8">
                Has one of our courses made a difference in your life? We'd love to hear about your experience and share it with our community.
              </p>
              <ButtonCustom>
                Submit Your Testimonial
              </ButtonCustom>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Testimonials;
