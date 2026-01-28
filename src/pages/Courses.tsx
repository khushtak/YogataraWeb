import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursesHeader from "@/components/courses/CoursesHeader";
import FilterSidebar from "@/components/courses/FilterSidebar";
import CourseGrid from "@/components/courses/CourseGrid";
import ActiveFilters from "@/components/courses/ActiveFilters";
import CoursesSkeleton from "@/components/courses/CoursesSkeleton";
import EmptyState from "@/components/courses/EmptyState";
import baseUrl from "@/config/Config";

/* ---------------- STATIC FILTER DATA (UNCHANGED) ---------------- */

const categories = [
  "All Categories",
  "Vedic Astrology",
  "Numerology",
  "Tarot",
  "Palmistry",
  "Vastu Shastra",
];

const priceRanges = [
  "All Prices",
  "Free",
  "Paid",
  "Under $50",
  "$50 - $100",
  "Over $100",
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [allCourse, setAllCourse] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

  /* ---------------- FETCH COURSES ---------------- */

  const getAllCourses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/get-courses`);
      if (!response.ok) throw new Error("Failed to fetch courses");

      const data = await response.json();

      const formattedCourses = data.map((course: any) => ({
        id: course.courseId || course._id,
        title: course.courseName,
        instructor:
          course.courseInStructure?.[0]?.name || "Unknown Instructor",
        thumbnail: course.courseImage || "https://via.placeholder.com/300",
        rating: course.courseRating || 4.5,
        students: Math.floor(Math.random() * 1000),
        duration: course.courseDuration || "Unknown Duration",
        price: Number(course.coursePrice) || 0,
        category: course.courseCategory || "Uncategorized",
        status: "Published",
        lastUpdated: "2024",
      }));

      setAllCourse(formattedCourses);
      setFilteredCourses(formattedCourses);
    } catch (error) {
      console.error("Error retrieving courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  /* ---------------- FILTER STATE ---------------- */

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("search") || ""
  );
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const category = searchParams.get("category");
    return category
      ? `category-${categories.findIndex((c) => c === category)}`
      : "category-0";
  });

  const [selectedPrice, setSelectedPrice] = useState(() => {
    const price = searchParams.get("price");
    return price
      ? `price-${priceRanges.findIndex((p) => p === price)}`
      : "price-0";
  });

  const [selectedLevel, setSelectedLevel] = useState(() => {
    const level = searchParams.get("level");
    return level
      ? `level-${levels.findIndex((l) => l === level)}`
      : "level-0";
  });

  const [sortOption, setSortOption] = useState(
    () => searchParams.get("sort") || "featured"
  );

  /* ---------------- UPDATE URL ---------------- */

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearchTerm) params.set("search", debouncedSearchTerm);

    const catIndex = parseInt(selectedCategory.split("-")[1]);
    if (catIndex > 0) params.set("category", categories[catIndex]);

    const priceIndex = parseInt(selectedPrice.split("-")[1]);
    if (priceIndex > 0) params.set("price", priceRanges[priceIndex]);

    const levelIndex = parseInt(selectedLevel.split("-")[1]);
    if (levelIndex > 0) params.set("level", levels[levelIndex]);

    if (sortOption !== "featured") params.set("sort", sortOption);

    setSearchParams(params);
  }, [
    debouncedSearchTerm,
    selectedCategory,
    selectedPrice,
    selectedLevel,
    sortOption,
    setSearchParams,
  ]);

  /* ---------------- FILTER + SORT LOGIC (FIXED) ---------------- */

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = [...allCourse];

    // SEARCH
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          course.category
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          course.instructor
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // CATEGORY
    const catIndex = parseInt(selectedCategory.split("-")[1]);
    if (catIndex > 0) {
      filtered = filtered.filter(
        (course) => course.category === categories[catIndex]
      );
    }

    // PRICE
    const priceIndex = parseInt(selectedPrice.split("-")[1]);
    if (priceIndex > 0) {
      const range = priceRanges[priceIndex];
      if (range === "Free") filtered = filtered.filter((c) => c.price === 0);
      if (range === "Paid") filtered = filtered.filter((c) => c.price > 0);
      if (range === "Under $50")
        filtered = filtered.filter((c) => c.price < 50);
      if (range === "$50 - $100")
        filtered = filtered.filter(
          (c) => c.price >= 50 && c.price <= 100
        );
      if (range === "Over $100")
        filtered = filtered.filter((c) => c.price > 100);
    }

    // SORT
    if (sortOption === "price-low")
      filtered.sort((a, b) => a.price - b.price);
    if (sortOption === "price-high")
      filtered.sort((a, b) => b.price - a.price);
    if (sortOption === "rating")
      filtered.sort((a, b) => b.rating - a.rating);
    if (sortOption === "newest") filtered.reverse();

    return filtered;
  }, [
    allCourse,
    debouncedSearchTerm,
    selectedCategory,
    selectedPrice,
    selectedLevel,
    sortOption,
  ]);

  useEffect(() => {
    setFilteredCourses(filteredAndSortedCourses);
  }, [filteredAndSortedCourses]);

  /* ---------------- ACTIVE FILTER TAGS ---------------- */

  const activeFilters = useMemo(() => {
    const filters: any[] = [];

    if (debouncedSearchTerm)
      filters.push({ type: "search", label: `Search: ${debouncedSearchTerm}` });

    const c = parseInt(selectedCategory.split("-")[1]);
    if (c > 0)
      filters.push({
        type: "category",
        label: `Category: ${categories[c]}`,
      });

    const p = parseInt(selectedPrice.split("-")[1]);
    if (p > 0)
      filters.push({ type: "price", label: `Price: ${priceRanges[p]}` });

    if (sortOption !== "featured")
      filters.push({ type: "sort", label: `Sort: ${sortOption}` });

    return filters;
  }, [
    debouncedSearchTerm,
    selectedCategory,
    selectedPrice,
    selectedLevel,
    sortOption,
  ]);

  /* ---------------- RENDER ---------------- */

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        <CoursesHeader
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onSearchSubmit={() => {}}
          isSearching={debouncedSearchTerm !== searchTerm}
        />

        <section className="py-12">
          <div className="container-custom">
            {activeFilters.length > 0 && (
              <ActiveFilters
                filters={activeFilters}
                onRemoveFilter={() => {}}
                onClearAll={() => {}}
              />
            )}

            <div className="flex flex-col md:flex-row gap-8">
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
                onResetFilters={() => {}}
              />

              {isLoading ? (
                <CoursesSkeleton />
              ) : filteredCourses.length > 0 ? (
                <CourseGrid
                  courses={filteredCourses}
                  sortOption={sortOption}
                  onSortChange={setSortOption}
                />
              ) : (
                <EmptyState onReset={() => {}} />
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
