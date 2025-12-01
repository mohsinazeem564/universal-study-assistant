import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    secondary: '#FF9800',
    tertiary: '#4CAF50',
    error: '#F44336',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    onSurface: '#000000',
    onBackground: '#000000',
  },
  roundness: 12,
};

export const colors = {
  primary: '#2196F3',
  secondary: '#FF9800',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  info: '#2196F3',
  
  // Subject category colors
  stem: '#2196F3',
  engineering: '#FF9800',
  languages: '#4CAF50',
  socialSciences: '#9C27B0',
  professional: '#F44336',
  arts: '#E91E63',
  applied: '#8BC34A',
  
  // Difficulty colors
  easy: '#4CAF50',
  medium: '#FF9800',
  hard: '#F44336',
  
  // UI colors
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  border: '#E0E0E0',
  disabled: '#BDBDBD',
};
