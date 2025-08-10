// MongoDB Document Interfaces
export interface UserPrompt {
  _id?: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  domain: string;
  useCase: string;
  tags: string[];
  submittedBy: {
    userId: string;
    email: string;
    name: string;
  };
  submissionDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: {
    userId: string;
    email: string;
    name: string;
  };
  reviewDate?: Date;
  reviewNotes?: string;
  usageCount: number;
  lastUsed?: Date;
  isActive: boolean;
}

export interface User {
  _id?: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'moderator';
  department?: string;
  joinDate: Date;
  isActive: boolean;
  permissions: {
    canSubmitPrompts: boolean;
    canReviewPrompts: boolean;
    canManageUsers: boolean;
  };
}

export interface PromptUsageLog {
  _id?: string;
  promptId: string;
  userId: string;
  usageDate: Date;
  context?: string;
}

export interface AdminSettings {
  _id?: string;
  autoApprovalEnabled: boolean;
  maxPromptsPerUser: number;
  requiredApprovals: number;
  moderatorEmails: string[];
}