
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: '1',
      title: 'Understanding the Basics of Vedic Astrology',
      excerpt: 'A comprehensive introduction to the fundamental principles of Jyotish and how it differs from Western astrology.',
      image: 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?q=80&w=800&auto=format&fit=crop',
      author: { name: 'Mridul', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200' },
      date: 'Oct 15, 2023',
      readTime: '8 min read',
      category: 'Vedic Astrology'
    },
    {
      id: '2',
      title: 'The Mystical Practice of Tarot Reading',
      excerpt: 'Explore the ancient art of Tarot and how it can be used as a tool for spiritual guidance and self-discovery.',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop',
      author: { name: 'Priya Sharma', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
      date: 'Sep 28, 2023',
      readTime: '6 min read',
      category: 'Tarot'
    },
    {
      id: '3',
      title: 'Numerology: The Divine Science of Numbers',
      excerpt: 'Learn how numbers hold spiritual significance and how they can influence various aspects of your life.',
      image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=800&auto=format&fit=crop',
      author: { name: 'Rajiv Mehta', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      date: 'Aug 12, 2023',
      readTime: '10 min read',
      category: 'Numerology'
    },
    {
      id: '4',
      title: 'Planetary Transits and Their Impact on Your Life',
      excerpt: 'Discover how the movement of planets through different zodiac signs can affect your personal and professional life.',
      image: 'https://images.unsplash.com/photo-1614314169000-4c4331780c61?q=80&w=800&auto=format&fit=crop',
      author: { name: 'Mridul', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200' },
      date: 'Jul 22, 2023',
      readTime: '7 min read',
      category: 'Vedic Astrology'
    },
    {
      id: '5',
      title: 'The Connection Between Meditation and Spiritual Awareness',
      excerpt: 'Explore how regular meditation practices can enhance your spiritual journey and astrological studies.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
      author: { name: 'Sarah Williams', avatar: 'https://randomuser.me/api/portraits/women/67.jpg' },
      date: 'Jun 18, 2023',
      readTime: '5 min read',
      category: 'Spirituality'
    },
    {
      id: '6',
      title: 'Ancient Wisdom in Modern Times: Why Vedic Knowledge Matters Today',
      excerpt: 'How the timeless teachings of Vedic knowledge remain relevant and valuable in our contemporary world.',
      image: 'https://images.unsplash.com/photo-1626168468760-5b486c572a52?q=80&w=800&auto=format&fit=crop',
      author: { name: 'Mridul', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200' },
      date: 'May 5, 2023',
      readTime: '9 min read',
      category: 'Vedic Philosophy'
    }
  ];

  const categories = [
    { name: 'Vedic Astrology', count: 12 },
    { name: 'Tarot', count: 8 },
    { name: 'Numerology', count: 10 },
    { name: 'Spirituality', count: 15 },
    { name: 'Vedic Philosophy', count: 7 },
    { name: 'Practical Guidance', count: 9 }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="bg-muted/30 py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full border border-border bg-background/60 backdrop-blur-sm">
                <span className="text-xs font-medium text-muted-foreground">Our Blog</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-6">
                Insights & Wisdom
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Explore our collection of articles on Vedic astrology, tarot, numerology, and spiritual practices.
              </p>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Post */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-card border border-border rounded-2xl overflow-hidden">
              <div className="h-64 lg:h-full">
                <img 
                  src="https://images.unsplash.com/photo-1515705576963-95cad62945b6?q=80&w=2070&auto=format&fit=crop"
                  alt="Featured post" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Featured
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  How to Read Your Birth Chart: A Beginner's Guide
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your birth chart is a map of the sky at the moment you were born. Learn how to interpret this powerful tool for self-knowledge and discover insights about your personality, potential, and purpose.
                </p>
                <div className="flex items-center mb-6">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200" alt="Mridul" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">Mridul</span>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span className="mr-3">Nov 5, 2023</span>
                      <Clock className="mr-1 h-3 w-3" />
                      <span>12 min read</span>
                    </div>
                  </div>
                </div>
                <ButtonCustom>
                  Read Full Article
                </ButtonCustom>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Posts */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-8">Latest Articles</h2>
                
                <div className="grid grid-cols-1 gap-8">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="flex flex-col sm:flex-row gap-6 bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="sm:w-1/3 h-48">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 sm:w-2/3 flex flex-col">
                        <div className="mb-2">
                          <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <span className="font-medium">{post.author.name}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span className="mr-3">{post.date}</span>
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-center">
                  <ButtonCustom variant="outline">
                    Load More Articles
                  </ButtonCustom>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link 
                          to="#" 
                          className="flex items-center justify-between py-2 hover:text-primary transition-colors"
                        >
                          <span>{category.name}</span>
                          <span className="text-sm text-muted-foreground">{category.count}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Popular Posts</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex gap-3">
                        <div className="w-16 h-16 flex-shrink-0">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">{post.title}</h4>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Get the latest articles, courses, and updates delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background mb-4"
                  />
                  <ButtonCustom className="w-full">
                    Subscribe
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

export default Blog;
