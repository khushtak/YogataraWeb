
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Badge } from '@/components/ui/badge';

interface CourseRelatedProps {
  courseId: string;
}

const CourseRelated = ({ courseId }: CourseRelatedProps) => {
  const navigate = useNavigate();

  // Mock related courses data
  const relatedCourses = [
    {
      id: '2',
      title: 'Numerology: The Complete Guide to Personal Numbers',
      instructor: 'Mridul',
      thumbnail: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
      rating: 4.8,
      students: 832,
      price: 89.99,
      bestseller: true
    },
    {
      id: '3',
      title: 'Palmistry: Reading Life Path Through Your Hands',
      instructor: 'Priya Sharma',
      thumbnail: 'https://images.unsplash.com/photo-1511376979163-f804dff7ad7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      rating: 4.7,
      students: 1254,
      price: 74.99,
      bestseller: false
    },
    {
      id: '4',
      title: 'Vastu Shastra: Harmonizing Space for Prosperity',
      instructor: 'Rajesh Kumar',
      thumbnail: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80',
      rating: 4.6,
      students: 976,
      price: 69.99,
      bestseller: false
    }
  ];

  const handleViewCourse = (id: string) => {
    navigate(`/course/${id}`);
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Students Also Bought</h2>
        <ButtonCustom variant="outline" size="sm">
          View All
        </ButtonCustom>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedCourses.map((course) => (
          <div 
            key={course.id}
            className="border border-border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 hover:-translate-y-1 cursor-pointer"
            onClick={() => handleViewCourse(course.id)}
          >
            <div className="relative aspect-video">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
              {course.bestseller && (
                <div className="absolute top-2 left-2">
                  <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">Bestseller</Badge>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">by {course.instructor}</p>
              
              <div className="flex items-center text-sm mb-2">
                <span className="font-medium mr-1">{course.rating.toFixed(1)}</span>
                <div className="flex mr-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${
                        star <= Math.round(course.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">({course.students})</span>
              </div>
              
              <p className="font-semibold">${course.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseRelated;
