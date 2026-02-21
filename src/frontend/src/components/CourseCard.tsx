import { Link } from '@tanstack/react-router';
import { BookOpen, GraduationCap, TrendingUp } from 'lucide-react';
import type { Course } from '../backend';

interface CourseCardProps {
  course: Course;
}

const subjectIcons: Record<string, string> = {
  Mathematics: '/assets/generated/math-icon.dim_128x128.png',
  Science: '/assets/generated/science-icon.dim_128x128.png',
  English: '/assets/generated/english-icon.dim_128x128.png',
  Hindi: '/assets/generated/hindi-icon.dim_128x128.png',
  'Social Studies': '/assets/generated/social-studies-icon.dim_128x128.png',
};

const difficultyColors: Record<string, string> = {
  Easy: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
  'Easy-Medium': 'bg-secondary/20 text-secondary-foreground border-secondary/30',
  Medium: 'bg-primary/20 text-primary-foreground border-primary/30',
  'Medium-Hard': 'bg-primary/20 text-primary-foreground border-primary/30',
  Hard: 'bg-destructive/20 text-destructive-foreground border-destructive/30',
  Advanced: 'bg-destructive/20 text-destructive-foreground border-destructive/30',
};

export default function CourseCard({ course }: CourseCardProps) {
  const iconSrc = subjectIcons[course.subject] || '/assets/generated/math-icon.dim_128x128.png';
  const difficultyClass = difficultyColors[course.difficulty] || difficultyColors.Easy;

  return (
    <Link
      to="/courses/$courseId"
      params={{ courseId: course.id.toString() }}
      className="block group"
    >
      <div className="h-full bg-card border border-border rounded-xl overflow-hidden shadow-sm card-hover">
        {/* Icon Header */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 flex items-center justify-center">
          <img
            src={iconSrc}
            alt={`${course.subject} icon`}
            className="h-20 w-20 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {course.title}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-accent/50 text-accent-foreground">
              <GraduationCap className="h-3 w-3" />
              Class {course.gradeLevel.toString()}
            </span>
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${difficultyClass}`}>
              <TrendingUp className="h-3 w-3" />
              {course.difficulty}
            </span>
          </div>

          <div className="pt-2">
            <span className="text-sm font-medium text-primary group-hover:underline inline-flex items-center gap-1">
              View Details
              <BookOpen className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
