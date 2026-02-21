import { Mail, Phone, MapPin, Heart, BookOpen, Users, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-display font-bold text-4xl md:text-5xl">About Glorious Cyber School</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Empowering the next generation through quality K12 CBSE education
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display font-bold text-2xl">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To provide accessible, high-quality K12 CBSE education that empowers students to achieve academic excellence 
              and develop critical thinking skills. We are committed to creating a supportive learning environment where 
              every student can reach their full potential.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-secondary" />
            </div>
            <h2 className="font-display font-bold text-2xl">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To be a leading online education platform that transforms K12 learning through innovative teaching methods, 
              comprehensive curriculum coverage, and personalized student support. We envision a future where quality 
              education is accessible to all students, regardless of their location.
            </p>
          </div>
        </div>

        {/* CBSE Approach */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 md:p-12 mb-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-3 justify-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <h2 className="font-display font-bold text-3xl">Our CBSE Approach</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-center">
              Our curriculum is meticulously designed to align with CBSE standards, ensuring students receive education 
              that meets national benchmarks. We cover all core subjects across Classes 1-12, with courses structured to 
              build foundational knowledge progressively.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="text-center space-y-2">
                <div className="font-display font-bold text-3xl text-primary">12</div>
                <p className="text-sm text-muted-foreground">Grade Levels</p>
              </div>
              <div className="text-center space-y-2">
                <div className="font-display font-bold text-3xl text-secondary">5</div>
                <p className="text-sm text-muted-foreground">Core Subjects</p>
              </div>
              <div className="text-center space-y-2">
                <div className="font-display font-bold text-3xl text-primary">100%</div>
                <p className="text-sm text-muted-foreground">CBSE Aligned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <h2 className="font-display font-bold text-3xl text-center mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl">Comprehensive Curriculum</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Complete coverage of CBSE syllabus with structured learning paths for all grade levels
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="font-display font-semibold text-xl">Expert Educators</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Learn from experienced teachers who are passionate about student success
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl">Personalized Learning</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Track your progress and learn at your own pace with our flexible platform
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-sm">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="font-display font-bold text-3xl">Get in Touch</h2>
            <p className="text-muted-foreground leading-relaxed">
              Have questions about our courses or admissions? We're here to help! Reach out to us through any of the 
              following channels, and our team will get back to you as soon as possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium">Address</span>
                <span className="text-sm text-muted-foreground text-center">Glorious Cyber School Lauwadih</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-secondary" />
                </div>
                <span className="text-sm font-medium">Phone</span>
                <a href="tel:8922056968" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  8922056968
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium">Email</span>
                <span className="text-sm text-muted-foreground">info@gloriouscyberschool.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
