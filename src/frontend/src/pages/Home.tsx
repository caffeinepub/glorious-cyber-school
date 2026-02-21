import { Link } from '@tanstack/react-router';
import { BookOpen, Users, Award, ArrowRight } from 'lucide-react';
import FeaturedCourses from '../components/FeaturedCourses';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 bg-[url('/assets/generated/hero-banner.dim_1920x600.png')] bg-cover bg-center opacity-20" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white drop-shadow-lg">
              Welcome to Glorious Cyber School
            </h1>
            <p className="text-lg md:text-xl text-white/95 leading-relaxed drop-shadow">
              Empowering K12 students with comprehensive CBSE education. 
              Learn, grow, and excel with our expert-designed courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary rounded-full font-semibold hover:bg-white/95 transition-all shadow-lg hover:shadow-xl"
              >
                Explore Courses
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold hover:bg-white/20 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3 p-6 bg-card rounded-xl border border-border shadow-sm">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="font-display font-semibold text-xl">CBSE Curriculum</h3>
              <p className="text-muted-foreground leading-relaxed">
                Comprehensive courses aligned with CBSE standards for Classes 1-12
              </p>
            </div>

            <div className="text-center space-y-3 p-6 bg-card rounded-xl border border-border shadow-sm">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 text-secondary">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="font-display font-semibold text-xl">Expert Teachers</h3>
              <p className="text-muted-foreground leading-relaxed">
                Learn from experienced educators dedicated to student success
              </p>
            </div>

            <div className="text-center space-y-3 p-6 bg-card rounded-xl border border-border shadow-sm">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="font-display font-semibold text-xl">Quality Education</h3>
              <p className="text-muted-foreground leading-relaxed">
                Structured learning paths designed for academic excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-3">
            <h2 className="font-display font-bold text-3xl md:text-4xl">Featured Courses</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our carefully curated courses designed to help students excel in their academic journey
            </p>
          </div>
          <FeaturedCourses />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="font-display font-bold text-3xl md:text-4xl">Ready to Start Learning?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join Glorious Cyber School today and unlock your potential with our comprehensive K12 CBSE education platform
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-warm"
          >
            Browse All Courses
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

