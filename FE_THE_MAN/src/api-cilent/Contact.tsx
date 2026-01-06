import { Contact } from "../models/Contact";
import instance from "./Config";
export const getAll = async (): Promise<Contact[]> => {
  const response = await instance.get("/contacts");
  return response.data as Contact[]
};
export const remove = async (id: string): Promise<Contact> => {
  const response = await instance.delete(`/contact/${id}`);
  return response.data as Contact
};

export const add = (contact: Contact): Promise<Contact> => {
  return instance.post("/contact", contact);
};

export const read = async (id: string): Promise<Contact> => {
  const response = await instance.get(`/contact/${id}`);
  return response.data as Contact
};

export const update = (contact: Contact): Promise<Contact> => {
  return instance.put(`/contact/${contact._id}`, contact);
};
