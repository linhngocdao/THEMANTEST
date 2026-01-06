import { User } from "../models/User";
import instance from "./Config";

export const getAll = async (page: any, limit: any): Promise<User[]> => {
   const response = await instance.post("users", { page, limit });
   return response.data as User[]
};
export const get = (id: string): Promise<User> => {
  return instance.get(`user/${id}`);
};

export const update = (User: User): Promise<User> => {
  return instance.put(`/user/${User._id}`, User);
};

export const getComment = (id: any): Promise<User> => {
  return instance.get(`/comment/getByProduct/${id}`);
};
export const removeComemnt = (id: any): Promise<any> => {
  return instance.delete(`/comment/${id}`);
};
export const udpateComment = (Comment: any): Promise<any> => {
  return instance.put(`/comment/${Comment?.id}`, Comment);
};

export const addComment = (Comment: any): Promise<any> => {
  return instance.post(`/comment`, Comment);
};
export const filter = (user: any): Promise<any> => {
  return instance.post("/user/filter", user);
};
export const getAllcomment = (page: any, limit: any): Promise<any> => {
  return instance.post(`/comments`, { page, limit });
};
export const filterCommnets = (
  content: any,
  page: any,
  limit: any
): Promise<any> => {
  return instance.post("/commnet/filter", { content, page, limit });
};
