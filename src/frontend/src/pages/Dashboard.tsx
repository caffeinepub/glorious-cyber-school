import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useGetEnrollmentStatus } from '../hooks/useQueries';
import { Navigate } from '@tanstack/react-router';
import { Loader2, User, BookOpen, Award } from 'lucide-react';
import PaymentHistory from '../components/PaymentHistory';

export default function Dashboard() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: enrollments, isLoading: enrollmentLoading } = useGetEnrollmentStatus();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (profileLoading || enrollmentLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-2">
            Welcome back, {userProfile?.name || 'Student'}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your learning progress and manage your courses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg">Your Profile</h3>
                <p className="text-sm text-muted-foreground">Student Account</p>
              </div>
            </div>
            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{userProfile?.name || 'Not set'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Principal ID:</span>
                <span className="font-mono text-xs truncate max-w-[150px]">
                  {identity?.getPrincipal().toString().slice(0, 10)}...
                </span>
              </div>
            </div>
          </div>

          {/* Enrolled Courses Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg">Enrolled Courses</h3>
                <p className="text-sm text-muted-foreground">Your active courses</p>
              </div>
            </div>
            {enrollments && enrollments.length > 0 ? (
              <div className="space-y-2">
                {enrollments.map((enrollment, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm">Course ID: {enrollment.courseId.toString()}</p>
                    <p className="text-xs text-muted-foreground">Grade: Class {enrollment.gradeLevel.toString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">
                  You haven't enrolled in any courses yet. Browse our course catalog to get started!
                </p>
              </div>
            )}
          </div>

          {/* Achievements Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg">Achievements</h3>
                <p className="text-sm text-muted-foreground">Your progress</p>
              </div>
            </div>
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">
                Complete courses to earn achievements and track your learning journey!
              </p>
            </div>
          </div>
        </div>

        {/* Payment History Section */}
        <PaymentHistory />

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 text-center space-y-4">
          <h2 className="font-display font-bold text-2xl">Ready to Learn?</h2>
          <p className="text-muted-foreground">
            Explore our comprehensive K12 CBSE courses and start your learning journey today
          </p>
          <a
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-warm"
          >
            <BookOpen className="h-5 w-5" />
            Browse Courses
          </a>
        </div>
      </div>
    </div>
  );
}
