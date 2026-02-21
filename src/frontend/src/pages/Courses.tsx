import { useState } from 'react';
import CourseCard from '../components/CourseCard';
import { BookOpen, Filter, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAllCourses, useGetCoursesByGrade } from '../hooks/useQueries';

export default function Courses() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  
  const { data: allCourses = [], isLoading: isLoadingAll } = useGetAllCourses();
  const { data: filteredCourses = [], isLoading: isLoadingFiltered } = useGetCoursesByGrade(selectedGrade);
  
  const courses = selectedGrade !== null ? filteredCourses : allCourses;
  const isLoading = selectedGrade !== null ? isLoadingFiltered : isLoadingAll;

  const handleGradeChange = (value: string) => {
    if (value === 'all') {
      setSelectedGrade(null);
    } else {
      setSelectedGrade(parseInt(value));
    }
  };

  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <h1 className="font-display font-bold text-4xl md:text-5xl">Our Courses</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Explore our comprehensive collection of K12 CBSE courses designed to help students excel in their studies
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span>Filter by Grade Level:</span>
          </div>
          <Select value={selectedGrade?.toString() || 'all'} onValueChange={handleGradeChange}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                <SelectItem key={grade} value={grade.toString()}>
                  Class {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-20 space-y-4">
            <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin" />
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id.toString()} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="font-display font-semibold text-xl">No courses found</h3>
            <p className="text-muted-foreground">
              {selectedGrade !== null
                ? `No courses available for Class ${selectedGrade}. Try selecting a different grade.`
                : 'No courses available yet. Check back soon!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
