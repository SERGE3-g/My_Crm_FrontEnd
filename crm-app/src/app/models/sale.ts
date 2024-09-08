export interface Sale {
  id: number;
  clientId: number;
  amount: number;
  date: string; // ISO format date string
  product: string;
  status: string; // Could be 'completed', 'pending', 'canceled', etc.
}
