export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string; // Could be 'admin', 'sales', 'support', etc.
}
