import type { CreateUser, User } from './user.types';
import api, { withHeaders } from '../axios';
import { getStoredUserId } from '@/Utils/getUser';

export const createUser = async (userData: Partial<CreateUser>) => {
  try {
    const { username, email, firstName, lastName, phoneNumber, role, active } =
      userData;
    const response = await api.post<CreateUser>(
      '/users',
      {
        username,
        email,
        firstName,
        lastName,
        phoneNumber,
        role,
        active,
      },
      withHeaders({ 'x-user-id': getStoredUserId() })
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create user', error);
    throw error;
  }
};

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

export const updateUserPassword = async (
  id: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await api.put(
      `/users/${id}/update-password`,
      {
        currentPassword,
        newPassword,
      },
      withHeaders({ 'x-user-id': getStoredUserId() })
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update password', error);
    throw error;
  }
};

export const updateUserActive = async (id: number, active: boolean) => {
  try {
    const response = await api.put(
      `/users/${id}/active`,
      {
        active,
      },
      withHeaders({ 'x-user-id': getStoredUserId() })
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update user active status', error);
    throw error;
  }
};
