import { Slider } from "../models/Slider";
import instance from "./Config";
export const getAll = async (page: any, limit: any): Promise<Slider[]> => {
  const response = await instance.post("/sliders", { page, limit });
  return response.data as Slider[]
};
export const getAllPost = (): Promise<Slider[]> => {
  return instance.get("/slider");
};
export const remove = (id: string): Promise<Slider> => {
  return instance.delete(`/slider/${id}`);
};

export const add = (slider: Slider): Promise<Slider> => {
  return instance.post("/slider", slider);
};

export const get = async (id: string): Promise<Slider> => {
  const response = await instance.get(`/slider/${id}`);
  return response.data as Slider
};

export const update = (slider: Slider): Promise<Slider> => {
  return instance.put(`/slider/${slider._id}`, slider);
};
