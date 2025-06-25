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
  createDate?: string;
  updatedDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface Role {
  id: number;
  name: 'user' | 'admin' | 'tenantAdmin' | string;
  description?: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string; // e.g., "user:create", "chat:view", "admin:manage"
  description?: string;
  module?: string; // optional grouping (e.g., "user", "chat", "tenant")
}
