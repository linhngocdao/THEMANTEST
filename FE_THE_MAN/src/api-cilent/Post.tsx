import { AxiosResponse } from "axios";
import { Posts } from "../models/post";
import instance from "./Config";
export const getAll = async (page: any, limit: any): Promise<Posts[]> => {
  const response = await instance.post("/posts", { page, limit });
  return response.data as Posts[]
};
export const remove = (id: string): Promise<Posts> => {
  return instance.delete(`/post/${id}`);
};

export const add = (post: Posts): Promise<Posts> => {
  return instance.post("/post", post);
};

export const get = async (id: string): Promise<AxiosResponse<Posts>> => {
  const response = await instance.get(`/post/${id}`);
  return response as AxiosResponse<Posts>
};

export const update = (post: Posts): Promise<Posts> => {
  return instance.put(`/post/${post._id}`, post);
};
export const filter = (user: any): Promise<any> => {
  return instance.post("/post/filter", user);
};
