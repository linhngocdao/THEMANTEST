import instance from "./Config";
import { ICatePost } from "../models/CatePost";

export const getAlls = async (): Promise<ICatePost[]> => {
  const url = "/catepost";
  const response = await instance.get(url);
  return response.data as ICatePost[];
};

export const read = async (id: string): Promise<ICatePost> => {
  const url = `/catepost/${id}`;
  const response = await instance.get(url);
  return response.data as ICatePost
};

export const createCatePost = (catepost: ICatePost): Promise<ICatePost> => {
  const url = `/catepost`;
  return instance.post(url, catepost);
};

export const update = (catepost: ICatePost): Promise<ICatePost> => {
  const url = `/catepost/${catepost._id}`;
  return instance.put(url, catepost);
};

export const remove = (id: string): Promise<ICatePost> => {
  const url = `/catepost/${id}`;
  return instance.delete(url);
};
