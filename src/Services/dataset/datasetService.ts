import { getStoredUserId } from '@/Utils/getUser';
import type { CreateDataset, Dataset } from './dataset.types';
import api, { withHeaders } from '../axios';

export const createDataset = async (datasetData: Partial<CreateDataset>) => {
  try {
    const { name, ownerTenantId, sharedWithTenants } = datasetData;
    const response = await api.post<CreateDataset>(
      `/datasets`,
      {
        name,
        ownerTenantId,
        sharedWithTenants,
      },
      {
        headers: {
          'x-user-id': getStoredUserId(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create dataset', error);
    throw error;
  }
};

export const getDatasets = async (): Promise<Dataset[]> => {
  try {
    const response = await api.get<Dataset[]>(`/datasets`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch datasets', error);
    throw error;
  }
};

export const getDataset = async (datasetId: string): Promise<Dataset> => {
  try {
    const response = await api.get<Dataset>(`/datasets/${datasetId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dataset', error);
    throw error;
  }
};

export const updateDataset = async (datasetId: string, name: string) => {
  try {
    const response = await api.put(
      `/datasets/${datasetId}`,
      { name },
      withHeaders({ 'x-user-id': getStoredUserId() })
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update dataset', error);
    throw error;
  }
};
