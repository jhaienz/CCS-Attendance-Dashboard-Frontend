export interface Auth {
  studentId: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: string;
  studentId: string;
  name: string;
  email: string;
  role: 'admin' | 'officer' | 'student';
  department?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export interface LogoutResponse {
  message: string;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: any;
}
