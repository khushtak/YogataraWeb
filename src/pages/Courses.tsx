
import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CoursesHeader from '@/components/courses/CoursesHeader';
import FilterSidebar from '@/components/courses/FilterSidebar';
import CourseGrid from '@/components/courses/CourseGrid';
import ActiveFilters from '@/components/courses/ActiveFilters';
import CoursesSkeleton from '@/components/courses/CoursesSkeleton';
import EmptyState from '@/components/courses/EmptyState';
import baseUrl from '@/config/Config';

// Import the featured courses data from FeaturedCourses component
// This is temporary - in a real app, you would fetch this from an API
const allCourses = [
  {
    id: '1',
    title: 'Vedic Astrology: Complete Chart Analysis & Predictions',
    instructor: 'Mridul',
    thumbnail: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.9,
    students: 1486,
    duration: '18h 45m',
    price: 149.99,
    category: 'Vedic Astrology',
  },
  {
    id: '2',
    title: 'Numerology Masterclass: Discover Your Life Path & Destiny',
    instructor: 'Mridul',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.8,
    students: 975,
    duration: '12h 30m',
    price: 99.99,
    category: 'Numerology',
  },
  {
    id: '3',
    title: 'Tarot Reading: From Beginner to Professional',
    instructor: 'Mridul',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.7,
    students: 1240,
    duration: '15h 15m',
    price: 129.99,
    category: 'Tarot',
  },
  {
    id: '4',
    title: 'Palmistry: The Complete Hand Reading Guide',
    instructor: 'Mridul',
    thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.6,
    students: 830,
    duration: '10h 45m',
    price: 89.99,
    category: 'Palmistry',
  },
  {
    id: '5',
    title: 'Vastu Shastra: Harmonizing Spaces with Ancient Wisdom',
    instructor: 'Mridul',
    thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.7,
    students: 650,
    duration: '14h 20m',
    price: 119.99,
    category: 'Vastu Shastra',
  },
  {
    id: '6',
    title: 'Vedic Numerology: Numbers & Life Purpose',
    instructor: 'Mridul',
    thumbnail: 'https://images.unsplash.com/photo-1639815188546-c43c240ff451?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.5,
    students: 720,
    duration: '10h 30m',
    price: 79.99,
    category: 'Numerology',
  },
  {
    id: '7',
    title: 'Astrological Remedies & Rituals',
    instructor: 'Mridul',
    thumbnail: 'https://images.unsplash.com/photo-1507561480393-4c3e4ecae8d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.8,
    students: 530,
    duration: '8h 45m',
    price: 69.99,
    category: 'Vedic Astrology',
  },
  {
    id: '8',
    title: 'Advanced Tarot: Intuitive Reading Techniques',
    instructor: 'Mridul',
    thumbnail: 'https://images.unsplash.com/photo-1632292220916-e9c34dd95db7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.9,
    students: 480,
    duration: '12h 20m',
    price: 99.99,
    category: 'Tarot',
  },
];

// Categories for filter
const categories = [
  'All Categories',
  'Vedic Astrology',
  'Numerology',
  'Tarot',
  'Palmistry',
  'Vastu Shastra'
];

const priceRanges = ['All Prices', 'Free', 'Paid', 'Under $50', '$50 - $100', 'Over $100'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [allCourse, setAllCourse] = useState([]);

  const getAllCourses = async () => {
    setIsLoading(true);  // Start loading
    try {
      const response = await fetch(`${baseUrl}/get-courses`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      // console.log(data);
  
      const formattedCourses = data.map((course) => ({
        id: course.courseId || course._id,
        title: course.courseName,
        instructor: course.courseInStructure?.[0]?.name || "Unknown Instructor",
        thumbnail: course.courseImage || "https://via.placeholder.com/300",
        rating: course.courseRating || 4.5,
        students: Math.floor(Math.random() * 1000),
        duration: course.courseDuration || "Unknown Duration",
        price: parseFloat(course.coursePrice) || 0,
        category: course.courseCategory || "Uncategorized",
        status: "Published",
        lastUpdated: "2024",
      }));
  
      setAllCourse(formattedCourses);
    } catch (error) {
      console.error("Error retrieving courses:", error);
    } finally {
      setIsLoading(false);  // Stop loading
    }
  };
  

  useEffect(() => {
    getAllCourses();

  }, [])

  // Initialize state from URL parameters or defaults
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const category = searchParams.get('category');
    return category ? `category-${categories.findIndex(c => c === category)}` : 'category-0';
  });
  
  const [selectedPrice, setSelectedPrice] = useState(() => {
    const price = searchParams.get('price');
    return price ? `price-${priceRanges.findIndex(p => p === price)}` : 'price-0';
  });
  
  const [selectedLevel, setSelectedLevel] = useState(() => {
    const level = searchParams.get('level');
    return level ? `level-${levels.findIndex(l => l === level)}` : 'level-0';
  });
  
  const [sortOption, setSortOption] = useState(() => searchParams.get('sort') || 'featured');
  // const [filteredCourses, setFilteredCourses] = useState([]);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [debouncedSearchTerm, selectedCategory, selectedPrice, selectedLevel]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearchTerm) params.set('search', debouncedSearchTerm);
    
    const categoryIndex = parseInt(selectedCategory.split('-')[1]);
    if (categoryIndex > 0) params.set('category', categories[categoryIndex]);
    
    const priceIndex = parseInt(selectedPrice.split('-')[1]);
    if (priceIndex > 0) params.set('price', priceRanges[priceIndex]);
    
    const levelIndex = parseInt(selectedLevel.split('-')[1]);
    if (levelIndex > 0) params.set('level', levels[levelIndex]);
    
    if (sortOption !== 'featured') params.set('sort', sortOption);
    
    setSearchParams(params);
  }, [debouncedSearchTerm, selectedCategory, selectedPrice, selectedLevel, sortOption, setSearchParams]);

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    // We don't need to do anything here since the useEffect will handle updating the URL
    // and the useMemo below will handle filtering
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('category-0');
    setSelectedPrice('price-0');
    setSelectedLevel('level-0');
    setSortOption('featured');
    setSearchParams(new URLSearchParams());
  };

  // Remove a specific filter
  const handleRemoveFilter = (filterType: string, value: string) => {
    switch (filterType) {
      case 'search':
        setSearchTerm('');
        break;
      case 'category':
        setSelectedCategory('category-0');
        break;
      case 'price':
        setSelectedPrice('price-0');
        break;
      case 'level':
        setSelectedLevel('level-0');
        break;
      case 'sort':
        setSortOption('featured');
        break;
      default:
        break;
    }
  };

  // Memoized filter function
  // const filteredAndSortedCourses = useMemo(() => {
  //   let filtered = [...allCourses];

  //   // Apply search filter
  //   if (debouncedSearchTerm) {
  //     filtered = filtered.filter(course => 
  //       course.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
  //       course.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
  //       course.instructor.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  //     );
  //   }

  //   // Apply category filter
  //   const categoryIndex = parseInt(selectedCategory.split('-')[1]);
  //   if (categoryIndex > 0) {
  //     const category = categories[categoryIndex];
  //     filtered = filtered.filter(course => course.category === category);
  //   }

  //   // Apply price filter
  //   const priceIndex = parseInt(selectedPrice.split('-')[1]);
  //   if (priceIndex > 0) {
  //     const priceRange = priceRanges[priceIndex];
      
  //     if (priceRange === 'Free') {
  //       filtered = filtered.filter(course => course.price === 0);
  //     } else if (priceRange === 'Paid') {
  //       filtered = filtered.filter(course => course.price > 0);
  //     } else if (priceRange === 'Under $50') {
  //       filtered = filtered.filter(course => course.price < 50);
  //     } else if (priceRange === '$50 - $100') {
  //       filtered = filtered.filter(course => course.price >= 50 && course.price <= 100);
  //     } else if (priceRange === 'Over $100') {
  //       filtered = filtered.filter(course => course.price > 100);
  //     }
  //   }

  //   // Apply sorting
  //   if (sortOption === 'newest') {
  //     // This is a placeholder - we would need proper date info to sort by newest
  //     filtered = [...filtered].reverse();
  //   } else if (sortOption === 'price-low') {
  //     filtered = [...filtered].sort((a, b) => a.price - b.price);
  //   } else if (sortOption === 'price-high') {
  //     filtered = [...filtered].sort((a, b) => b.price - a.price);
  //   } else if (sortOption === 'rating') {
  //     filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  //   }

  //   return filtered;
  // }, [debouncedSearchTerm, selectedCategory, selectedPrice, selectedLevel, sortOption]);

  // // Update the filtered courses state when the memoized value changes
  // useEffect(() => {
  //   setFilteredCourses(filteredAndSortedCourses);
  // }, [filteredAndSortedCourses]);

  // Get active filter values for display
  // const activeFilters = useMemo(() => {
  //   const filters = [];
    
  //   if (debouncedSearchTerm) {
  //     filters.push({ type: 'search', label: `Search: ${debouncedSearchTerm}` });
  //   }
    
  //   const categoryIndex = parseInt(selectedCategory.split('-')[1]);
  //   if (categoryIndex > 0) {
  //     filters.push({ type: 'category', label: `Category: ${categories[categoryIndex]}` });
  //   }
    
  //   const priceIndex = parseInt(selectedPrice.split('-')[1]);
  //   if (priceIndex > 0) {
  //     filters.push({ type: 'price', label: `Price: ${priceRanges[priceIndex]}` });
  //   }
    
  //   const levelIndex = parseInt(selectedLevel.split('-')[1]);
  //   if (levelIndex > 0) {
  //     filters.push({ type: 'level', label: `Level: ${levels[levelIndex]}` });
  //   }
    
  //   if (sortOption !== 'featured') {
  //     let sortLabel = sortOption.charAt(0).toUpperCase() + sortOption.slice(1);
  //     if (sortOption === 'price-low') sortLabel = 'Price: Low to High';
  //     if (sortOption === 'price-high') sortLabel = 'Price: High to Low';
  //     filters.push({ type: 'sort', label: `Sort: ${sortLabel}` });
  //   }
    
  //   return filters;
  // }, [debouncedSearchTerm, selectedCategory, selectedPrice, selectedLevel, sortOption]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Header Section with Search */}
        <CoursesHeader 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          isSearching={debouncedSearchTerm !== searchTerm}
        />
        
        {/* Filters and Course Listing */}
        <section className="py-12">
          <div className="container-custom">
            {/* Active Filters */}
            {/* {activeFilters.length > 0 && (
              <ActiveFilters 
                filters={activeFilters} 
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleResetFilters}
              />
            )} */}
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters Sidebar */}
              <FilterSidebar 
                categories={categories}
                priceRanges={priceRanges}
                levels={levels}
                selectedCategory={selectedCategory}
                selectedPrice={selectedPrice}
                selectedLevel={selectedLevel}
                onCategoryChange={setSelectedCategory}
                onPriceChange={setSelectedPrice}
                onLevelChange={setSelectedLevel}
                onResetFilters={handleResetFilters}
              />
              
              {/* Course Grid or Loading State */}
              {isLoading ? (
                <CoursesSkeleton />
              ) : allCourse.length > 0 ? (
                <CourseGrid 
                  courses={allCourse}
                  sortOption={sortOption}
                  onSortChange={setSortOption}
                />
              ) : (
                <EmptyState onReset={handleResetFilters} />
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;