export type User = {
  [x: string]: any;
  data?: any;
  Inputs?: any;
  _id?: number | string;
  fullname?: string;
  email?: string;
  password?: string;
  img?: string;
  phone?: string;
  role?: number;
  status: "active" | "block"
};
