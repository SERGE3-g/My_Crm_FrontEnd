export interface Opportunity {
  id: number;
  clientId?: number;
  leadId?: number;
  description: string;
  value: number;
  status: string;
}
