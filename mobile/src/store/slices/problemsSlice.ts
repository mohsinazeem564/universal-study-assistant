import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Problem {
  id: string;
  text: string;
  subject: string;
  topic?: string;
  difficulty: string;
  createdAt: string;
}

interface Solution {
  id: string;
  problemId: string;
  solution: string;
  explanation?: string;
  steps: string[];
  diagram?: any;
  keywords: string[];
}

interface ProblemsState {
  history: Problem[];
  currentProblem: Problem | null;
  currentSolution: Solution | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProblemsState = {
  history: [],
  currentProblem: null,
  currentSolution: null,
  loading: false,
  error: null,
};

const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentProblem: (state, action: PayloadAction<Problem | null>) => {
      state.currentProblem = action.payload;
    },
    setCurrentSolution: (state, action: PayloadAction<Solution | null>) => {
      state.currentSolution = action.payload;
    },
    addToHistory: (state, action: PayloadAction<Problem>) => {
      state.history.unshift(action.payload);
    },
    setHistory: (state, action: PayloadAction<Problem[]>) => {
      state.history = action.payload;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setCurrentProblem,
  setCurrentSolution,
  addToHistory,
  setHistory,
  clearHistory,
} = problemsSlice.actions;

export default problemsSlice.reducer;
