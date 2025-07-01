import type { User } from '../user/user.types';

export interface Tenant {
  _id: number;
  name: string;
  description: string;
  createdDate: string;
  createdBy: User;
  updatedDate: string;
  updatedBy: User;
  active: boolean;
}

export interface CreateTenant {
  name: string;
  description: string;
  active: boolean;
}

export interface UpdateTenant {
  name: string;
  description: string;
  active: boolean;
}
