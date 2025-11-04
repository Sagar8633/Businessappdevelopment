
export enum TractorStatus {
  Available = 'Available',
  Sold = 'Sold',
}

export interface Tractor {
  id: string;
  name: string;
  model: string;
  year: number;
  purchasePrice: number;
  listingPrice: number;
  status: TractorStatus;
  imageUrl: string;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface Transaction {
  id: string;
  tractor: Tractor;
  customer: Customer;
  salePrice: number;
  date: string;
}
