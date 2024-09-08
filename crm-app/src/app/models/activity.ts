export interface Activity {
  id: number;
  clientId: number;
  userId: number;
  date: string; // ISO format date string
  type: string;
  description: string;
}
