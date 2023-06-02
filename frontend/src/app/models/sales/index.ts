import { Client } from "../clients";
import { Product } from "../products";

export interface Sale {
  client?: Client | null;
  items?: Array<SaleItem>;
  paymentType?: string;
  amount: number;
}

export interface SaleItem {
  product: Product;
  quantity: number;
}
