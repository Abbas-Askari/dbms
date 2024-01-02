export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  store_id: number;
  onshelf?: boolean;
  data?: string
};

export type Store = {
  id: number;
  name: string;
  description: string;
  image: string;
}

export type User = {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
  phone: string;
  id?: number
  store_id?: number;
};

export type Address = {
  id: number;
  address: string;
  city: string;
  province: string;
  zip_code: number;
};

export type Order = {
  id: number;
  date: Date;
  customer_id: string;
  address: Address;
  product_id: string;
  quantity: number;
};

export type Image = {
  id: number;
  data: string;
  name: string;
};

export type Review = {
  id: number;
  product_id: number;
  customer_id: number;
  date: Date;
  title: string;
  content: string;
  rating: number;
};
