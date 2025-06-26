export interface User {
  _id: number;
  username: string;
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  emailsent?: boolean;
  textsent?: boolean;
  phoneNumber: number;
  roles: Role[];
  active: boolean;
  createdDate?: string;
  updatedDate?: string;
  createdBy?: User;
  updatedBy?: User;
}

export interface CreateUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: number;
  active: boolean;
}

export interface Role {
  id: number;
  name: 'user' | 'admin' | 'tenantAdmin' | string;
  description?: string;
}
