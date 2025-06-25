import type { Tenant } from './tenant.types';
import api from '../axios';

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

export const createTenant = async (tenantData: Partial<Tenant>) => {
  try {
    const { name, description, active } = tenantData;
    const response = await api.post<Tenant>(`/tenants`, {
      name,
      description,
      active,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create tenant', error);
    throw error;
  }
};
