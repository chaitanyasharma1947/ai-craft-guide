import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMongoService } from '@/services/mongoService';
import { UserPrompt } from '@/types/database';
import { toast } from 'sonner';

export function useMongoPrompts(filters?: {
  status?: string;
  category?: string;
  domain?: string;
  submittedBy?: string;
}) {
  const mongoService = getMongoService();
  
  return useQuery({
    queryKey: ['mongo-prompts', filters],
    queryFn: () => mongoService.getPrompts(filters),
    enabled: !!mongoService,
  });
}

export function useSubmitPrompt() {
  const queryClient = useQueryClient();
  const mongoService = getMongoService();

  return useMutation({
    mutationFn: (prompt: Omit<UserPrompt, '_id' | 'submissionDate' | 'status' | 'usageCount' | 'isActive'>) =>
      mongoService.submitPrompt(prompt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mongo-prompts'] });
      toast.success('Prompt submitted for review');
    },
    onError: (error) => {
      toast.error('Failed to submit prompt: ' + error.message);
    },
  });
}

export function useApprovePrompt() {
  const queryClient = useQueryClient();
  const mongoService = getMongoService();

  return useMutation({
    mutationFn: ({ promptId, reviewData }: {
      promptId: string;
      reviewData: {
        reviewedBy: UserPrompt['reviewedBy'];
        reviewNotes?: string;
      };
    }) => mongoService.approvePrompt(promptId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mongo-prompts'] });
      toast.success('Prompt approved successfully');
    },
    onError: (error) => {
      toast.error('Failed to approve prompt: ' + error.message);
    },
  });
}

export function useRejectPrompt() {
  const queryClient = useQueryClient();
  const mongoService = getMongoService();

  return useMutation({
    mutationFn: ({ promptId, reviewData }: {
      promptId: string;
      reviewData: {
        reviewedBy: UserPrompt['reviewedBy'];
        reviewNotes: string;
      };
    }) => mongoService.rejectPrompt(promptId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mongo-prompts'] });
      toast.success('Prompt rejected');
    },
    onError: (error) => {
      toast.error('Failed to reject prompt: ' + error.message);
    },
  });
}

export function useIncrementUsage() {
  const mongoService = getMongoService();

  return useMutation({
    mutationFn: ({ promptId, userId }: { promptId: string; userId: string }) =>
      mongoService.incrementUsage(promptId, userId),
    onError: (error) => {
      console.error('Failed to track usage:', error);
    },
  });
}