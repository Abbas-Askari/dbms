import { StringValidation } from "zod";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
};


export type User = {
  emial: string;
  password: string;
};

export type Customer = {
  email: string;
  last_name: string;
  first_name: string;
  password: string;
  phone: string;
  id: string;
}

export type Address = {
  id: string;
  address: string;
  city: string;
  province: string;
  zip_code: number;
}

export type Order = {
  id: string;
  date: Date;
  customer_id: string;
  address: Address;
  product_id: string;
  quantity: number;
}