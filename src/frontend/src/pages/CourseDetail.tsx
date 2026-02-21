import { useParams, Link } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { ArrowLeft, BookOpen, GraduationCap, TrendingUp, Target, Loader2 } from 'lucide-react';
import { useGetCourseById } from '../hooks/useQueries';

const subjectIcons: Record<string, string> = {
  Mathematics: '/assets/generated/math-icon.dim_128x128.png',
  Science: '/assets/generated/science-icon.dim_128x128.png',
  English: '/assets/generated/english-icon.dim_128x128.png',
  Hindi: '/assets/generated/hindi-icon.dim_128x128.png',
  'Social Studies': '/assets/generated/social-studies-icon.dim_128x128.png',
};

export default function CourseDetail() {
  const { courseId } = useParams({ from: '/courses/$courseId' });
  const { identity } = useInternetIdentity();
  const { data: course, isLoading } = useGetCourseById(courseId);

  const isAuthenticated = !!identity;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin" />
          <p className="text-muted-foreground">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="font-display font-bold text-2xl">Course Not Found</h2>
          <p className="text-muted-foreground">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const iconSrc = subjectIcons[course.subject] || '/assets/generated/math-icon.dim_128x128.png';

  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>

        {/* Course Header */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex flex-col md:flex-row items-center gap-6">
            <img
              src={iconSrc}
              alt={`${course.subject} icon`}
              className="h-32 w-32 object-contain"
            />
            <div className="flex-1 text-center md:text-left space-y-3">
              <h1 className="font-display font-bold text-3xl md:text-4xl">{course.title}</h1>
              <p className="text-muted-foreground text-lg">{course.description}</p>
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-accent/50 text-accent-foreground">
                  <GraduationCap className="h-4 w-4" />
                  Class {course.gradeLevel.toString()}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-primary/20 text-primary-foreground border border-primary/30">
                  <TrendingUp className="h-4 w-4" />
                  {course.difficulty}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground border border-secondary/30">
                  <BookOpen className="h-4 w-4" />
                  {course.subject}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Syllabus */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="font-display font-bold text-2xl mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Course Syllabus
              </h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {course.syllabus}
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="font-display font-bold text-2xl mb-4 flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Learning Objectives
              </h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {course.objectives}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-lg">Course Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pass Marks:</span>
                  <span className="font-medium">{course.passMarks.toString()}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Assignments:</span>
                  <span className="font-medium">{course.assignmentCount.toString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subject:</span>
                  <span className="font-medium">{course.subject}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Grade Level:</span>
                  <span className="font-medium">Class {course.gradeLevel.toString()}</span>
                </div>
              </div>
            </div>

            {/* Enrollment CTA */}
            {isAuthenticated ? (
              <Link
                to="/enrollment"
                className="block w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-center hover:bg-primary/90 transition-colors shadow-warm"
              >
                <div className="flex items-center justify-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Enroll in This Course
                </div>
              </Link>
            ) : (
              <div className="bg-muted/50 border border-border rounded-xl p-6 text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Please log in to enroll in this course
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
