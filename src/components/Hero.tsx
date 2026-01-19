
import React from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { ButtonCustom } from './ui/button-custom';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full"></div>
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-primary/5 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-primary/5 rounded-full"></div>
      </div>
      
      <div className="container-custom mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full border border-border bg-background/60 backdrop-blur-sm">
            <span className="text-xs font-medium text-muted-foreground">Unlock the ancient wisdom of Jyotisha</span>
          </div>
          
          <h1 className="text-balance font-semibold leading-tight mb-6 animate-fade-in">
            Master <span className="text-primary">Vedic Astrology & Divination</span> with Expert Guidance
          </h1>
          
          <p className="text-balance text-lg text-muted-foreground mb-10 max-w-3xl md:text-xl animate-fade-in" style={{ animationDelay: "100ms" }}>
            Discover the secrets of Vedic astrology, numerology, and ancient divination techniques through comprehensive courses designed to elevate your spiritual knowledge.
          </p>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-12 w-full max-w-md mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search for Jyotisha courses..."
                className="input-field pl-10 w-full rounded-lg border-border focus:border-primary shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
       <Link to={"/courses"}>
       <ButtonCustom type="submit" className="sm:w-auto">
              Explore Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonCustom></Link>
           
          </form>
          
          <div className="flex items-center justify-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex -space-x-2 mr-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                  <img
                    src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p>Trusted by <span className="font-medium text-foreground">5,000+</span> astrology enthusiasts worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
