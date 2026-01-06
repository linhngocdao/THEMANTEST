import { AxiosResponse } from "axios";
import { Product } from "../models/Product";
import instance from "./Config";
export const getAll = async (page: any, limit: any): Promise<AxiosResponse<{
  count: number;
  products: Product[]
}>> => {
  const response = await instance.post("/products", { page, limit });
  return response as AxiosResponse<{
    count: number;
    products: Product[]
  }>
};
export const getAllproduct = async (page: any, limit: any): Promise<Product[]> => {
  const response = await instance.post("/productadmin", { page, limit });
  return response.data as Product[]
};
export const remove = (id: string): Promise<Product> => {
  return instance.delete(`/product/${id}`);
};

export const add = (product: Product): Promise<Product> => {
  return instance.post("/product", product);
};
export const filter = (product: any): Promise<any> => {
  return instance.post("/product/filter", product);
};

export const get = (id: string): Promise<Product> => {
  return instance.get(`/product/${id}`);
};

export const update = (product: Product): Promise<Product> => {
  return instance.put(`/product/${product._id}`, product);
};
export const thongke =  async (data: any): Promise<Product[]> => {
  const response = await instance.post("/thongke", data);
  return response.data as Product[]
};
export const searchs = async (data: any): Promise<Product[]> => {
   const response =  await instance.post("/products/search", data);
   return response.data as Product[]
};
