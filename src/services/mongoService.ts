import { UserPrompt, User, PromptUsageLog } from '@/types/database';

// MongoDB Service Interface
export class MongoService {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  // User Prompts Operations
  async submitPrompt(prompt: Omit<UserPrompt, '_id' | 'submissionDate' | 'status' | 'usageCount' | 'isActive'>): Promise<UserPrompt> {
    const response = await fetch(`${this.baseUrl}/api/prompts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        ...prompt,
        submissionDate: new Date(),
        status: 'pending',
        usageCount: 0,
        isActive: true
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit prompt');
    }
    
    return response.json();
  }

  async getPrompts(filters?: {
    status?: string;
    category?: string;
    domain?: string;
    submittedBy?: string;
  }): Promise<UserPrompt[]> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    const response = await fetch(`${this.baseUrl}/api/prompts?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch prompts');
    }
    
    return response.json();
  }

  async approvePrompt(promptId: string, reviewData: {
    reviewedBy: UserPrompt['reviewedBy'];
    reviewNotes?: string;
  }): Promise<UserPrompt> {
    const response = await fetch(`${this.baseUrl}/api/prompts/${promptId}/approve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        ...reviewData,
        status: 'approved',
        reviewDate: new Date()
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to approve prompt');
    }
    
    return response.json();
  }

  async rejectPrompt(promptId: string, reviewData: {
    reviewedBy: UserPrompt['reviewedBy'];
    reviewNotes: string;
  }): Promise<UserPrompt> {
    const response = await fetch(`${this.baseUrl}/api/prompts/${promptId}/reject`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        ...reviewData,
        status: 'rejected',
        reviewDate: new Date()
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to reject prompt');
    }
    
    return response.json();
  }

  async incrementUsage(promptId: string, userId: string): Promise<void> {
    await fetch(`${this.baseUrl}/api/prompts/${promptId}/usage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        userId,
        usageDate: new Date()
      })
    });
  }

  // User Operations
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/api/users`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    return response.json();
  }

  async updateUserRole(userId: string, role: User['role']): Promise<User> {
    const response = await fetch(`${this.baseUrl}/api/users/${userId}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ role })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update user role');
    }
    
    return response.json();
  }

  // Analytics
  async getPromptAnalytics(startDate: Date, endDate: Date): Promise<{
    totalSubmissions: number;
    totalApproved: number;
    totalRejected: number;
    totalUsage: number;
    topCategories: { category: string; count: number }[];
    topDomains: { domain: string; count: number }[];
  }> {
    const response = await fetch(`${this.baseUrl}/api/analytics/prompts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }
    
    return response.json();
  }
}

// Singleton instance
let mongoService: MongoService | null = null;

export const initializeMongoService = (baseUrl: string, apiKey: string) => {
  mongoService = new MongoService(baseUrl, apiKey);
  return mongoService;
};

export const getMongoService = (): MongoService => {
  if (!mongoService) {
    throw new Error('MongoDB service not initialized. Call initializeMongoService first.');
  }
  return mongoService;
};