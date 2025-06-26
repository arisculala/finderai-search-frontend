import { getStoredUserId } from '@/Utils/getUser';
import type { CreateTenant, Tenant } from './tenant.types';
import api, { withHeaders } from '../axios';

export const createTenant = async (tenantData: Partial<CreateTenant>) => {
  try {
    const { name, active } = tenantData;
    const response = await api.post<CreateTenant>(
      `/tenants`,
      {
        name,
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

export const getTenant = async (tenantId: string): Promise<Tenant> => {
  try {
    const response = await api.get<Tenant>(`/tenants/${tenantId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tenant', error);
    throw error;
  }
};

export const updateTenant = async (tenantId: string, name: string) => {
  try {
    const response = await api.put(
      `/tenants/${tenantId}`,
      { name },
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
