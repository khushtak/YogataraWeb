import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getCategories } from "@/utils/data";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  courses: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  color,
  courses,
}) => {
  return (
    <Link
      to={`/courses?category=${encodeURIComponent(title.toLowerCase())}`}
      className="
        group relative overflow-hidden rounded-2xl
        bg-white dark:bg-[#1c1c1c] border border-border dark:border-gray-700
        p-6 transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl
      "
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
      </div>

      {/* Icon */}
      <div
        className={cn(
          "relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md",
          color
        )}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-xl font-semibold mb-2 group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors text-foreground dark:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-sm leading-relaxed mb-6 text-muted-foreground dark:text-gray-400">
        {description}
      </p>

      {/* Footer */}
      <div className="relative z-10 mt-auto flex items-center justify-between">
        <span className="text-sm font-medium text-foreground dark:text-gray-200">
          {courses} courses
        </span>
        <span className="text-sm text-primary dark:text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition">
          Explore →
        </span>
      </div>
    </Link>
  );
};

interface CourseCategoriesProps {
  className?: string;
}

const CourseCategories: React.FC<CourseCategoriesProps> = ({ className }) => {
  const categories = getCategories();

  return (
    <section className={cn("py-16 md:py-24 bg-muted/30 dark:bg-[#111111]", className)}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-foreground dark:text-white">
            Explore Our Course Categories
          </h2>
          <p className="text-muted-foreground dark:text-gray-400">
            Discover our diverse range of mystical arts and ancient wisdom courses, designed to help you unlock your spiritual potential.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              {...category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;
