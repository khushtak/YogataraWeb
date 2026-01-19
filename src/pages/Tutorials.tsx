
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Search, Play, Clock, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tutorials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tutorialCategories = [
    "All Tutorials",
    "Platform Navigation",
    "Course Features",
    "Account Management",
    "Mobile App",
    "Study Tips"
  ];

  const tutorials = [
    {
      id: "1",
      title: "Getting Started with LearnSync",
      category: "Platform Navigation",
      thumbnail: "https://images.unsplash.com/photo-1661956602868-6ae368943878?w=800&auto=format&fit=crop&q=80",
      duration: "4:25",
      description: "Learn the basics of navigating the LearnSync platform and accessing your courses."
    },
    {
      id: "2",
      title: "How to Track Your Course Progress",
      category: "Course Features",
      thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=80",
      duration: "3:15",
      description: "Discover how to monitor your learning journey and stay on track with your goals."
    },
    {
      id: "3",
      title: "Using the Bookmarking Feature",
      category: "Course Features",
      thumbnail: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80",
      duration: "2:50",
      description: "Save important sections and revisit them later with our bookmarking tool."
    },
    {
      id: "4",
      title: "Setting Up Your Account Profile",
      category: "Account Management",
      thumbnail: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&auto=format&fit=crop&q=80",
      duration: "5:10",
      description: "Customize your profile and update your preferences for an optimal learning experience."
    },
    {
      id: "5",
      title: "Taking Notes While Learning",
      category: "Study Tips",
      thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=80",
      duration: "4:35",
      description: "Effective techniques for note-taking to retain information from your courses."
    },
    {
      id: "6",
      title: "Using LearnSync on Mobile Devices",
      category: "Mobile App",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
      duration: "3:45",
      description: "Access all your courses on-the-go with our mobile app for iOS and Android."
    },
    {
      id: "7",
      title: "Managing Your Course Library",
      category: "Account Management",
      thumbnail: "https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=800&auto=format&fit=crop&q=80",
      duration: "2:55",
      description: "Organize your courses and easily find what you're looking for in your library."
    },
    {
      id: "8",
      title: "Interactive Features in Courses",
      category: "Course Features",
      thumbnail: "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=800&auto=format&fit=crop&q=80",
      duration: "6:20",
      description: "Explore quizzes, assessments, and other interactive elements in our courses."
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
                Video Tutorials
              </h1>
              <p className="text-muted-foreground mb-8">
                Step-by-step guides to help you make the most of the LearnSync platform and your learning experience.
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Tutorials Content */}
        <section className="py-16">
          <div className="container-custom">
            {/* Filter Categories */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Browse Tutorials</h2>
                <button className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                  <Filter className="h-4 w-4 mr-1" /> Filter
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tutorialCategories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm ${
                      index === 0 
                        ? "bg-primary text-white" 
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tutorials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tutorials.map((tutorial) => (
                <div key={tutorial.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={tutorial.thumbnail} 
                      alt={tutorial.title} 
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="p-3 rounded-full bg-primary/80">
                        <Play className="h-6 w-6 text-white" fill="white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {tutorial.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {tutorial.category}
                      </span>
                    </div>
                    <h3 className="font-medium mb-2 line-clamp-1">{tutorial.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {tutorial.description}
                    </p>
                    <ButtonCustom variant="outline" size="sm" className="w-full">
                      Watch Tutorial
                    </ButtonCustom>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="mt-10 text-center">
              <ButtonCustom>
                Load More Tutorials
              </ButtonCustom>
            </div>
          </div>
        </section>
        
        {/* Request Tutorial */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">
                Need a Tutorial on Something Specific?
              </h2>
              <p className="text-muted-foreground mb-8">
                If you can't find a tutorial for what you're looking for, let us know and we'll create it.
              </p>
              <ButtonCustom>
                Request a Tutorial
              </ButtonCustom>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tutorials;
