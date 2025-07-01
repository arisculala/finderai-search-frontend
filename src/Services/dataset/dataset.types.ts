import type { User } from '../user/user.types';

export interface Dataset {
  _id: number;
  name: string;
  description: string;
  ownerTenantId: Dataset;
  sharedWithTenants: Dataset[];
  createdDate: string;
  createdBy: User;
  updatedDate: string;
  updatedBy: User;
}

export interface CreateDataset {
  name: string;
  description: string;
  ownerTenantId: string;
  sharedWithTenants: string[];
}

export interface UpdateDataset {
  name: string;
  description: string;
  ownerTenantId: string;
  sharedWithTenants: string[];
}
