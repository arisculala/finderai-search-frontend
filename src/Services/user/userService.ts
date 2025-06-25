import type { User } from './user.types';
import api from '../axios';
import { getStoredUserId } from '@/Utils/getUser';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>('/users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users', error);
    throw error;
  }
};

export const getUser = async (userId: string): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user', error);
    throw error;
  }
};

export const createUser = async (userData: Partial<User>) => {
  try {
    const { username, email, firstName, lastName, phoneNumber, role, active } =
      userData;
    const response = await api.post<User>('/users', {
      userId: getStoredUserId(),
      username,
      email,
      firstName,
      lastName,
      phoneNumber,
      role,
      active,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create user', error);
    throw error;
  }
};

export const updateUserPassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await api.put(`/users/${userId}/update-password`, {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update password', error);
    throw error;
  }
};
