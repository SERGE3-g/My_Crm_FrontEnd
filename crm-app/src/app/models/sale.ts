export interface Sale {
  id: number;
  amount: number;
  date: string; // ISO format date string
  clientId: number;
  product: string;
  status: string;
}
