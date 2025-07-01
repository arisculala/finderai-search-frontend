import { getStoredUserId } from '@/Utils/getUser';
import type { CreateTenant, Tenant } from './tenant.types';
import api, { withHeaders } from '../axios';
import type { User } from '../user/user.types';

export const createTenant = async (tenantData: Partial<CreateTenant>) => {
  try {
    const { name, description, active } = tenantData;
    const response = await api.post<CreateTenant>(
      `/tenants`,
      {
        name,
        description,
        active,
      },
      {
        headers: {
          'x-user-id': getStoredUserId(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create tenant', error);
    throw error;
  }
};

export const getTenants = async (): Promise<Tenant[]> => {
  try {
    const response = await api.get<Tenant[]>(`/tenants`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tenants', error);
    throw error;
  }
};

export const getTenant = async (id: string): Promise<Tenant> => {
  try {
    const response = await api.get<Tenant>(`/tenants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tenant', error);
    throw error;
  }
};

export const updateTenant = async (
  id: string,
  tenantData: Partial<CreateTenant>
) => {
  try {
    const { name, description, active } = tenantData;
    const response = await api.put(
      `/tenants/${id}`,
      { name, description, active },
      withHeaders({ 'x-user-id': getStoredUserId() })
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update tenant', error);
    throw error;
  }
};

export const updateTenantActive = async (id: number, active: boolean) => {
  try {
    const response = await api.put(
      `/tenants/${id}/active`,
      {
        active,
      },
      withHeaders({ 'x-user-id': getStoredUserId() })
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update tenant active status', error);
    throw error;
  }
};

export const getTenantUsers = async (id: string): Promise<User[]> => {
  try {
    const response = await api.get<User[]>(`/tenants/${id}/users`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tenant users', error);
    throw error;
  }
};

export const getTenantExcludeUsers = async (id: string): Promise<User[]> => {
  try {
    const response = await api.get<User[]>(`/tenants/${id}/users/exclude`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tenant excluded users', error);
    throw error;
  }
};

export const addTenantToUsers = async (
  id: string,
  userIds: string[]
): Promise<User[]> => {
  try {
    const response = await api.post<User[]>(`/tenants/${id}/users/add`, {
      userIds,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add tenant users', error);
    throw error;
  }
};
