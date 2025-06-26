import type { User } from '../user/user.types';

export interface Dataset {
  _id: number;
  name: string;
  ownerTenantId: Dataset;
  sharedWithTenants: Dataset[];
  createdDate: string;
  createdBy: User;
  updatedDate: string;
  updatedBy: User;
}

export interface CreateDataset {
  name: string;
  ownerTenantId: string;
  sharedWithTenants: string[];
}
