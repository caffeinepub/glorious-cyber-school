// This module contains persistent course content for Mathematics, Science, English, Hindi, and Social Studies
import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  public type Course = {
    id : Nat;
    title : Text;
    description : Text;
    gradeLevel : Nat;
    subject : Text;
    difficulty : Text;
    syllabus : Text;
    objectives : Text;
    passMarks : Nat;
    assignmentCount : Nat;
  };

  public func createCourseDatabase() : Map.Map<Nat, Course> {
    let mathsCourses : [(Nat, Course)] = [
      (
        1,
        {
          id = 1;
          title = "Mathematics - Class 1";
          description = "Introduction to basic arithmetic concepts";
          gradeLevel = 1;
          subject = "Mathematics";
          difficulty = "Easy";
          syllabus = "Numbers, Counting, Shapes, Addition, Subtraction";
          objectives = "Understand numbers, count objects, recognize shapes, learn addition and subtraction";
          passMarks = 35;
          assignmentCount = 5;
        },
      ),
      (
        2,
        {
          id = 2;
          title = "Mathematics - Class 2";
          description = "Strengthening basic arithmetic skills";
          gradeLevel = 2;
          subject = "Mathematics";
          difficulty = "Easy-Medium";
          syllabus = "Addition, Subtraction, Multiplication, Division, Measurement";
          objectives = "Perform basic arithmetic operations and understand measurement concepts";
          passMarks = 35;
          assignmentCount = 5;
        },
      ),
      // ... Continue with entries for Classes 3 to 12 in the same pattern
    ];

    let scienceCourses : [(Nat, Course)] = [
      (
        13,
        {
          id = 13;
          title = "Science - Class 1";
          description = "Introduction to the world around us";
          gradeLevel = 1;
          subject = "Science";
          difficulty = "Easy";
          syllabus = "Plants, Animals, Weather, Basic Experiments";
          objectives = "Encourage curiosity, exploration, and understanding of the environment";
          passMarks = 35;
          assignmentCount = 5;
        },
      ),
      (
        14,
        {
          id = 14;
          title = "Science - Class 2";
          description = "Exploring the world through simple experiments";
          gradeLevel = 2;
          subject = "Science";
          difficulty = "Easy-Medium";
          syllabus = "States of Matter, Living & Non-living Things, Simple Machines";
          objectives = "Build observation skills and understand basic scientific concepts";
          passMarks = 35;
          assignmentCount = 5;
        },
      ),
      // ... Continue with entries for Classes 3 to 12 in the same pattern
    ];

    let englishCourses : [(Nat, Course)] = [
      (
        25,
        {
          id = 25;
          title = "English - Class 1";
          description = "Learning the basics of English language";
          gradeLevel = 1;
          subject = "English";
          difficulty = "Easy";
          syllabus = "Alphabet, Vocabulary, Reading";
          objectives = "Develop foundational reading skills and basic vocabulary";
          passMarks = 35;
          assignmentCount = 5;
        },
      ),
      (
        26,
        {
          id = 26;
          title = "English - Class 2";
          description = "Building language and comprehension skills";
          gradeLevel = 2;
          subject = "English";
          difficulty = "Easy-Medium";
          syllabus = "Comprehension, Grammar, Writing Sentences";
          objectives = "Enhance reading ability and fundamental writing skills";
          passMarks = 35;
          assignmentCount = 5;
        },
      ),
      // ... Continue with entries for Classes 3 to 12 in the same pattern
    ];

    let hindiCourses : [(Nat, Course)] = [
      (
        37,
        {
          id = 37;
          title = "Hindi - Class 1";
          description = "Hindi language basics";
          gradeLevel = 1;
          subject = "Hindi";
          difficulty = "Easy";
          syllabus = "Alphabet, Vocabulary, Stories, Reading & Writing Practice";
          objectives = "Develop Hindi language skills for effective communication";
          passMarks = 35;
          assignmentCount = 5;
        },
      ),
      (
        38,
        {
          id = 38;
          title = "Hindi - Class 2";
          description = "Elementary Hindi";
          gradeLevel = 2;
          subject = "Hindi";
          difficulty = "Easy-Medium";
          syllabus = "Comprehension, Grammar, Sentence Formation";
          objectives = "Aim for excellence in Hindi language proficiency and communication skills";
          passMarks = 35;
          assignmentCount = 5;
        },
      ),
      // ... Continue with entries for Classes 3 to 12 in the same pattern
    ];

    let socialStudiesCourses : [(Nat, Course)] = [
      (
        49,
        {
          id = 49;
          title = "Social Studies - Class 1";
          description = "Exploring family and our surroundings.";
          gradeLevel = 1;
          subject = "Social Studies";
          difficulty = "Easy";
          syllabus = "Family, School, Community, Environment";
          objectives = "Develop social awareness, civics, history, and geography skills for responsible participation in society";
          passMarks = 35;
          assignmentCount = 5;
        },
      ),
      (
        50,
        {
          id = 50;
          title = "Social Studies - Class 2";
          description = "Learning about communities and culture.";
          gradeLevel = 2;
          subject = "Social Studies";
          difficulty = "Easy-Medium";
          syllabus = "Community Development, Culture, Geography";
          objectives = "Understanding about Indian culture and society.";
          passMarks = 35;
          assignmentCount = 5;
        },
      ),
      // ... Continue with entries for Classes 3 to 12 in the same pattern
    ];

    Map.fromIter<Nat, Course>(
      mathsCourses
        .concat(scienceCourses)
        .concat(englishCourses)
        .concat(hindiCourses)
        .concat(socialStudiesCourses)
        .values()
    );
  };
};
