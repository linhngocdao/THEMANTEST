import instance from "./Config";

export const addcart = (cart: any) => {
  const url = `/carts`;
  return instance.post(url, cart);
};
export const readcart = (id: string) => {
  const url = `/carts/${id}`;
  return instance.get(url);
};
export const updateCart = (cart: any) => {
  const url = `/carts/${cart._id}`;
  return instance.put(url, cart);
};
export const removeCart = (id: string) => {
  const url = `/carts/${id}`;
  return instance.delete(url);
};
