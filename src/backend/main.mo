import Array "mo:core/Array";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import CourseContent "courses/course-content";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ===== Persistent Course Content =====
  let courses = CourseContent.createCourseDatabase();

  // ===== User Profile =====
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ===== Student Enrollment Data Model =====
  public type EnrollmentRecord = {
    student : Principal;
    studentName : Text;
    gradeLevel : Nat;
    courseId : Nat;
    enrollmentDate : Time.Time;
  };

  // Map: student -> list of enrollments
  let studentEnrollments = Map.empty<Principal, [EnrollmentRecord]>();

  // Map: courseId -> list of enrollments
  let courseEnrollments = Map.empty<Nat, [EnrollmentRecord]>();

  // ===== Fee Structure Data Model =====
  public type FeeStructure = {
    monthlyFee : Nat; // ₹500
    annualFee : Nat; // ₹4800
  };

  let feeStructure : FeeStructure = {
    monthlyFee = 500;
    annualFee = 4800;
  };

  public type PaymentType = {
    #monthly;
    #annual;
  };

  public type PaymentStatus = {
    #pending;
    #completed;
    #failed;
  };

  public type PaymentRecord = {
    id : Nat;
    student : Principal;
    amount : Nat;
    paymentDate : Time.Time;
    paymentType : PaymentType;
    status : PaymentStatus;
  };

  var nextPaymentId : Nat = 0;

  // Map: student -> list of payment records
  let studentPayments = Map.empty<Principal, [PaymentRecord]>();

  // ===== Course Query and Filtering Operations =====

  public query ({ caller }) func getAllCourses() : async [CourseContent.Course] {
    courses.values().toArray();
  };

  public query ({ caller }) func getCourseById(courseId : Nat) : async ?CourseContent.Course {
    courses.get(courseId);
  };

  public query ({ caller }) func getSubjectList() : async [Text] {
    let subjects = courses.values().toArray().map(
      func(course) { course.subject }
    );
    let uniqueSubjects = subjects.foldLeft([""], func(acc, subject) {
      if (acc.find(func(s) { s == subject }) == null) {
        acc.concat([subject]);
      } else {
        acc;
      };
    });
    if (uniqueSubjects.size() == 0) {
      [];
    } else { uniqueSubjects.sliceToArray(1, uniqueSubjects.size()) };
  };

  public query ({ caller }) func getCoursesBySubject(subject : Text) : async [CourseContent.Course] {
    courses.values().toArray().filter(
      func(course) { course.subject == subject }
    );
  };

  public query ({ caller }) func getCoursesByGrade(grade : Nat) : async [CourseContent.Course] {
    courses.values().toArray().filter(
      func(course) { course.gradeLevel == grade }
    );
  };

  public query ({ caller }) func getCoursesBySubjectAndGrade(subject : Text, grade : Nat) : async [CourseContent.Course] {
    courses.values().toArray().filter(
      func(course) {
        course.subject == subject and course.gradeLevel == grade
      }
    );
  };

  public query ({ caller }) func getCoursesByDifficulty(difficulty : Text) : async [CourseContent.Course] {
    let coursesArray = courses.values().toArray();
    let filteredCourses = coursesArray.filter(
      func(course) { course.difficulty == difficulty }
    );
    filteredCourses;
  };

  public query ({ caller }) func getCoursesBySubjectAndDifficulty(
    subject : Text,
    difficulty : Text,
  ) : async [CourseContent.Course] {
    let coursesArray = courses.values().toArray();
    let filteredCourses = coursesArray.filter(
      func(course) {
        course.subject == subject and course.difficulty == difficulty
      }
    );
    filteredCourses;
  };

  public query ({ caller }) func getCoursesByGradeAndDifficulty(
    grade : Nat,
    difficulty : Text,
  ) : async [CourseContent.Course] {
    let coursesArray = courses.values().toArray();
    let filteredCourses = coursesArray.filter(
      func(course) {
        course.gradeLevel == grade and course.difficulty == difficulty
      }
    );
    filteredCourses;
  };

  public query ({ caller }) func getCoursesBySubjectGradeAndDifficulty(
    subject : Text,
    grade : Nat,
    difficulty : Text,
  ) : async [CourseContent.Course] {
    let coursesArray = courses.values().toArray();
    let filteredCourses = coursesArray.filter(
      func(course) {
        course.subject == subject and course.gradeLevel == grade and course.difficulty == difficulty
      }
    );
    filteredCourses;
  };

  // ===== Enrollment Operations =====

  public shared ({ caller }) func submitEnrollment(
    courseId : Nat,
    gradeLevel : Nat,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can enroll in courses");
    };

    // Validate courseId
    switch (courses.get(courseId)) {
      case (?_) { () };
      case (null) { Runtime.trap("Course does not exist") };
    };

    let studentName = switch (userProfiles.get(caller)) {
      case (?profile) { profile.name };
      case (null) { "Unknown" };
    };

    let enrollment : EnrollmentRecord = {
      student = caller;
      studentName = studentName;
      gradeLevel = gradeLevel;
      courseId = courseId;
      enrollmentDate = Time.now();
    };

    let currentEnrollments = switch (studentEnrollments.get(caller)) {
      case (?enrollments) { enrollments };
      case (null) { [] };
    };
    studentEnrollments.add(caller, currentEnrollments.concat([enrollment]));

    let currentCourseEnrollments = switch (courseEnrollments.get(courseId)) {
      case (?enrollments) { enrollments };
      case (null) { [] };
    };
    courseEnrollments.add(courseId, currentCourseEnrollments.concat([enrollment]));
  };

  public query ({ caller }) func getEnrollmentStatus(student : Principal) : async [EnrollmentRecord] {
    if (caller != student and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own enrollment status");
    };

    switch (studentEnrollments.get(student)) {
      case (?enrollments) { enrollments };
      case (null) { [] };
    };
  };

  public query ({ caller }) func listCourseEnrollments(courseId : Nat) : async [EnrollmentRecord] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view course enrollments");
    };

    switch (courseEnrollments.get(courseId)) {
      case (?enrollments) { enrollments };
      case (null) { [] };
    };
  };

  // ===== Fee Payment Operations =====

  public query func getFeeStructure() : async FeeStructure {
    feeStructure;
  };

  public shared ({ caller }) func initiatePayment(paymentType : PaymentType) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can initiate payments");
    };

    let amount = switch (paymentType) {
      case (#monthly) { feeStructure.monthlyFee };
      case (#annual) { feeStructure.annualFee };
    };

    let paymentId = nextPaymentId;
    nextPaymentId += 1;

    let payment : PaymentRecord = {
      id = paymentId;
      student = caller;
      amount = amount;
      paymentDate = Time.now();
      paymentType = paymentType;
      status = #pending;
    };

    let currentPayments = switch (studentPayments.get(caller)) {
      case (?payments) { payments };
      case (null) { [] };
    };
    studentPayments.add(caller, currentPayments.concat([payment]));

    paymentId;
  };

  public shared ({ caller }) func recordPaymentCompletion(
    student : Principal,
    paymentId : Nat,
    success : Bool,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can record payment completion");
    };

    let paymentsOpt = studentPayments.get(student);
    switch (paymentsOpt) {
      case (?payments) {
        let updatedPayments = payments.map(
          func(p : PaymentRecord) : PaymentRecord {
            if (p.id == paymentId) {
              {
                p with status = if (success) { #completed } else { #failed }
              };
            } else {
              p;
            };
          }
        );
        studentPayments.add(student, updatedPayments);
      };
      case (null) {
        Runtime.trap("No payments found for student");
      };
    };
  };

  public query ({ caller }) func getPaymentHistory(student : Principal) : async [PaymentRecord] {
    if (caller != student and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own payment history");
    };

    switch (studentPayments.get(student)) {
      case (?payments) { payments };
      case (null) { [] };
    };
  };

  public query ({ caller }) func checkPaymentStatus(
    student : Principal,
    paymentId : Nat,
  ) : async ?PaymentStatus {
    if (caller != student and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only check your own payment status");
    };

    let paymentsOpt = studentPayments.get(student);
    switch (paymentsOpt) {
      case (?payments) {
        let paymentOpt = payments.find(
          func(p : PaymentRecord) : Bool { p.id == paymentId }
        );
        switch (paymentOpt) {
          case (?payment) { ?payment.status };
          case (null) { null };
        };
      };
      case (null) { null };
    };
  };
};
