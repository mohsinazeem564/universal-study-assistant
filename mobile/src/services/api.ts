import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 seconds for AI processing
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface SolveProblemRequest {
  problem: string;
  subject: string;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  imageUrl?: string | null;
  userId?: string;
}

export interface Solution {
  problemId: string;
  solutionId: string;
  solution: string;
  explanation?: string;
  steps: string[];
  diagram?: {
    url: string;
    type: string;
    code?: string;
  };
  keywords: string[];
}

// Solve a problem
export const solveProblem = async (data: SolveProblemRequest): Promise<Solution> => {
  const userId = await AsyncStorage.getItem('userId');
  const response = await api.post('/problems/solve', {
    ...data,
    userId,
  });
  return response.data;
};

// Get problem history
export const getProblemHistory = async (page = 1, limit = 20) => {
  const userId = await AsyncStorage.getItem('userId');
  const response = await api.get(`/problems/history/${userId}`, {
    params: { page, limit },
  });
  return response.data;
};

// Get specific problem
export const getProblem = async (problemId: string) => {
  const response = await api.get(`/problems/${problemId}`);
  return response.data;
};

// Generate practice problems
export const generatePracticeProblems = async (
  subject: string,
  topic: string,
  count = 3
) => {
  const response = await api.post('/problems/practice', {
    subject,
    topic,
    count,
  });
  return response.data;
};

// Search problems
export const searchProblems = async (query: string, filters?: any) => {
  const response = await api.get('/problems/search', {
    params: { query, ...filters },
  });
  return response.data;
};

// Get all subjects
export const getSubjects = async () => {
  const response = await api.get('/subjects');
  return response.data;
};

// Get subjects by category
export const getSubjectsByCategory = async (category: string) => {
  const response = await api.get(`/subjects/category/${category}`);
  return response.data;
};

// Get topics for a subject
export const getTopics = async (category: string, subject: string) => {
  const response = await api.get(`/subjects/${category}/${subject}`);
  return response.data;
};

// Search subjects
export const searchSubjects = async (query: string) => {
  const response = await api.get('/subjects/search', {
    params: { query },
  });
  return response.data;
};

// Rate solution
export const rateSolution = async (solutionId: string, helpful: boolean) => {
  const response = await api.post(`/solutions/${solutionId}/rate`, {
    helpful,
  });
  return response.data;
};

// Get popular solutions
export const getPopularSolutions = async (subject?: string, limit = 10) => {
  const response = await api.get('/solutions/popular', {
    params: { subject, limit },
  });
  return response.data;
};

// Generate diagram
export const generateDiagram = async (type: string, data: any, subject?: string) => {
  const response = await api.post('/diagrams/generate', {
    type,
    data,
    subject,
  });
  return response.data;
};

export default api;
