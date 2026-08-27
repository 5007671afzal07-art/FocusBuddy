export const handleSupabaseError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateUsername = (username: string): boolean => {
  return username.length >= 3 && username.length <= 30 && /^[a-zA-Z0-9_-]+$/.test(username);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validatePositiveNumber = (value: number): boolean => {
  return value > 0 && Number.isInteger(value);
};
