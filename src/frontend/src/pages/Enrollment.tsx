import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSubmitEnrollment } from '../hooks/useQueries';
import { Navigate } from '@tanstack/react-router';
import { Loader2, GraduationCap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function Enrollment() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const submitEnrollment = useSubmitEnrollment();

  const [gradeLevel, setGradeLevel] = useState<string>('');
  const [courseId, setCourseId] = useState<string>('');

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gradeLevel || !courseId) {
      return;
    }

    try {
      await submitEnrollment.mutateAsync({
        courseId: BigInt(courseId),
        gradeLevel: BigInt(gradeLevel),
      });
      
      // Reset form
      setGradeLevel('');
      setCourseId('');
    } catch (error) {
      console.error('Enrollment error:', error);
    }
  };

  const gradeLevels = Array.from({ length: 12 }, (_, i) => i + 1);
  const courses = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'English' },
    { id: 4, name: 'Hindi' },
    { id: 5, name: 'Social Studies' },
  ];

  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <img 
              src="/assets/generated/enrollment-hero.dim_800x400.png" 
              alt="Student Enrollment" 
              className="rounded-xl shadow-warm max-w-full h-auto"
            />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Student Enrollment
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enroll in courses and start your learning journey with Glorious Cyber School
          </p>
        </div>

        {/* Enrollment Form */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-2xl">Enrollment Form</h2>
              <p className="text-sm text-muted-foreground">Fill in the details to enroll</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Name */}
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                type="text"
                value={userProfile?.name || ''}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Name from your profile
              </p>
            </div>

            {/* Grade Level */}
            <div className="space-y-2">
              <Label htmlFor="gradeLevel">Grade Level *</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger id="gradeLevel">
                  <SelectValue placeholder="Select your grade level" />
                </SelectTrigger>
                <SelectContent>
                  {gradeLevels.map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      Class {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Course Selection */}
            <div className="space-y-2">
              <Label htmlFor="course">Course *</Label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={!gradeLevel || !courseId || submitEnrollment.isPending}
              >
                {submitEnrollment.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enrolling...
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Submit Enrollment
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>Your enrollment will be processed immediately</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>You can view your enrolled courses in the Dashboard</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>Proceed to Fee Payment to complete your registration</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
