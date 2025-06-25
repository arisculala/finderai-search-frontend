import { STORAGE_KEYS } from '@/App/Consts';
import type { LoginResponse } from '@/Services/auth/auth.types';

export const getStoredUser = (): LoginResponse['user'] | null => {
  const user = localStorage.getItem(STORAGE_KEYS.user);
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    console.error('Failed to parse stored user');
    return null;
  }
};

export const getStoredUserId = (): string => {
  return getStoredUser()?.id || '';
};

export const getStoredUsername = (): string | null => {
  return getStoredUser()?.username || null;
};

export const getStoredEmail = (): string | null => {
  return getStoredUser()?.email || null;
};

export const getStoredFullName = (): string | null => {
  const user = getStoredUser();
  if (!user) return null;

  const firstName = user.firstName || '';
  const lastName = user.lastName || '';

  const fullName = `${firstName} ${lastName}`.trim();

  return fullName || null;
};
