export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    deleted: boolean;
  };
}
