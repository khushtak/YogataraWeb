import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import FeaturedCourses from '@/components/FeaturedCourses';
import CourseCategories from '@/components/CourseCategories';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import {
  CheckCircle,
  Clock,
  Award,
  GraduationCap,
  BookOpen,
  Users,
  ShieldCheck,
  Star,
  Moon,
  Hash
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* STATS */}
        <section className="py-10 md:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Courses', value: '45+' },
                { label: 'Students', value: '5K+' },
                { label: 'Reviews', value: '4.8/5' },
                { label: 'Countries', value: '90+' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INSTRUCTOR */}
        <section className="py-12 md:py-24 bg-muted/30">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <div className="aspect-square max-w-[260px] md:max-w-md rounded-2xl overflow-hidden border">
                <img
                  src="/instructor.png"
                  alt="Mridul"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <span className="inline-block mb-3 text-xs px-3 py-1 rounded-full border">
                Meet Your Instructor
              </span>

              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                Mridul
              </h2>
              <p className="text-primary mb-4">
                Jyotish Acharya & Vedic Scholar
              </p>

              <p className="text-sm md:text-base text-muted-foreground mb-6">
                With over 20 years of experience in Vedic astrology and occult
                sciences, Mridul blends ancient wisdom with modern clarity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  { icon: Star, text: 'Vedic Astrology Expert' },
                  { icon: Moon, text: 'Certified Tarot Reader' },
                  { icon: Hash, text: 'Numerology Specialist' },
                  { icon: Award, text: 'Published Author' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/courses">
                  <ButtonCustom className="w-full sm:w-auto">
                    View Courses
                  </ButtonCustom>
                </Link>
                <Link to="/about">
                  <ButtonCustom variant="outline" className="w-full sm:w-auto">
                    About Mridul
                  </ButtonCustom>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FeaturedCourses />

        {/* BENEFITS */}
        <section className="py-12 md:py-24">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
              Why Learn With Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Award,
                  title: 'Authentic Knowledge',
                  desc: 'Traditional Vedic wisdom taught clearly.'
                },
                {
                  icon: Clock,
                  title: 'Practical Learning',
                  desc: 'Real-life application focused.'
                },
                {
                  icon: CheckCircle,
                  title: 'Structured Courses',
                  desc: 'Beginner to advanced flow.'
                }
              ].map((b, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border bg-card transition active:scale-[0.98]"
                >
                  <b.icon className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CourseCategories />

        {/* TESTIMONIALS */}
        <section className="py-12 md:py-24">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
              Student Reviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Priya Sharma',
                  avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
                  text:
                    'Concepts explained very clearly. Highly recommended.'
                },
                {
                  name: 'David Chen',
                  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                  text:
                    'Practical and insightful learning experience.'
                },
                {
                  name: 'Sarah Williams',
                  avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
                  text:
                    'Added depth to my tarot practice.'
                }
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border bg-card active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={t.avatar} />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-sm">{t.name}</p>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "{t.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-24 bg-muted/40">
          <div className="container-custom">
            <div className="p-6 md:p-10 rounded-2xl border bg-background">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Ready to Start?
              </h2>
              <p className="text-muted-foreground mb-6">
                Learn ancient sciences in a modern way.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/courses">
                  <ButtonCustom size="lg" className="w-full sm:w-auto">
                    Explore Courses
                  </ButtonCustom>
                </Link>
                <Link to="/about">
                  <ButtonCustom
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Learn More
                  </ButtonCustom>
                </Link>
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
