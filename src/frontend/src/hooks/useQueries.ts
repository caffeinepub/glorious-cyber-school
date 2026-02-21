import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserProfile, EnrollmentRecord, FeeStructure, PaymentRecord, PaymentType, Course } from '../backend';
import { toast } from 'sonner';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Profile saved successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save profile');
    },
  });
}

export function useSubmitEnrollment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, gradeLevel }: { courseId: bigint; gradeLevel: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitEnrollment(courseId, gradeLevel);
    },
    onSuccess: () => {
      toast.success('Successfully enrolled in course!');
      queryClient.invalidateQueries({ queryKey: ['enrollmentStatus'] });
      queryClient.invalidateQueries({ queryKey: ['paymentHistory'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to enroll in course');
    },
  });
}

export function useGetEnrollmentStatus() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<EnrollmentRecord[]>({
    queryKey: ['enrollmentStatus'],
    queryFn: async () => {
      if (!actor || !identity) return [];
      const principal = identity.getPrincipal();
      return actor.getEnrollmentStatus(principal);
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useGetFeeStructure() {
  const { actor, isFetching } = useActor();

  return useQuery<FeeStructure>({
    queryKey: ['feeStructure'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getFeeStructure();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInitiatePayment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentType: PaymentType) => {
      if (!actor) throw new Error('Actor not available');
      return actor.initiatePayment(paymentType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentHistory'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to initiate payment');
    },
  });
}

export function useGetPaymentHistory() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<PaymentRecord[]>({
    queryKey: ['paymentHistory'],
    queryFn: async () => {
      if (!actor || !identity) return [];
      const principal = identity.getPrincipal();
      return actor.getPaymentHistory(principal);
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

// ===== Course Query Hooks =====

export function useGetAllCourses() {
  const { actor, isFetching } = useActor();

  return useQuery<Course[]>({
    queryKey: ['courses', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCoursesByGrade(grade: number | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Course[]>({
    queryKey: ['courses', 'grade', grade],
    queryFn: async () => {
      if (!actor || grade === null) return [];
      return actor.getCoursesByGrade(BigInt(grade));
    },
    enabled: !!actor && !isFetching && grade !== null,
  });
}

export function useGetCourseById(courseId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Course | null>({
    queryKey: ['courses', 'detail', courseId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCourseById(BigInt(courseId));
    },
    enabled: !!actor && !isFetching && !!courseId,
  });
}
