export type TOrder = {
  user: string;
  customer: string;
  address: string;
  total: number;
  status?: number;
  paymentMethod: number;
  phone: number;
};
