import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Course {
    id: bigint;
    title: string;
    subject: string;
    assignmentCount: bigint;
    passMarks: bigint;
    difficulty: string;
    description: string;
    gradeLevel: bigint;
    objectives: string;
    syllabus: string;
}
export type Time = bigint;
export interface PaymentRecord {
    id: bigint;
    status: PaymentStatus;
    paymentDate: Time;
    student: Principal;
    paymentType: PaymentType;
    amount: bigint;
}
export interface EnrollmentRecord {
    studentName: string;
    gradeLevel: bigint;
    student: Principal;
    enrollmentDate: Time;
    courseId: bigint;
}
export interface UserProfile {
    name: string;
}
export interface FeeStructure {
    annualFee: bigint;
    monthlyFee: bigint;
}
export enum PaymentStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed"
}
export enum PaymentType {
    annual = "annual",
    monthly = "monthly"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkPaymentStatus(student: Principal, paymentId: bigint): Promise<PaymentStatus | null>;
    getAllCourses(): Promise<Array<Course>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCourseById(courseId: bigint): Promise<Course | null>;
    getCoursesByDifficulty(difficulty: string): Promise<Array<Course>>;
    getCoursesByGrade(grade: bigint): Promise<Array<Course>>;
    getCoursesByGradeAndDifficulty(grade: bigint, difficulty: string): Promise<Array<Course>>;
    getCoursesBySubject(subject: string): Promise<Array<Course>>;
    getCoursesBySubjectAndDifficulty(subject: string, difficulty: string): Promise<Array<Course>>;
    getCoursesBySubjectAndGrade(subject: string, grade: bigint): Promise<Array<Course>>;
    getCoursesBySubjectGradeAndDifficulty(subject: string, grade: bigint, difficulty: string): Promise<Array<Course>>;
    getEnrollmentStatus(student: Principal): Promise<Array<EnrollmentRecord>>;
    getFeeStructure(): Promise<FeeStructure>;
    getPaymentHistory(student: Principal): Promise<Array<PaymentRecord>>;
    getSubjectList(): Promise<Array<string>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initiatePayment(paymentType: PaymentType): Promise<bigint>;
    isCallerAdmin(): Promise<boolean>;
    listCourseEnrollments(courseId: bigint): Promise<Array<EnrollmentRecord>>;
    recordPaymentCompletion(student: Principal, paymentId: bigint, success: boolean): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitEnrollment(courseId: bigint, gradeLevel: bigint): Promise<void>;
}
