import CourseCard from './CourseCard';
import { BookOpen, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useGetAllCourses } from '../hooks/useQueries';

export default function FeaturedCourses() {
  const { data: courses = [], isLoading } = useGetAllCourses();

  const featuredCourses = courses.slice(0, 6);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading courses...</p>
      </div>
    );
  }

  if (featuredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No courses available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCourses.map((course) => (
          <CourseCard key={course.id.toString()} course={course} />
        ))}
      </div>

      {courses.length > 0 && (
        <div className="text-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-warm"
          >
            View All Courses
            <BookOpen className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
