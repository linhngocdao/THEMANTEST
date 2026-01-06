import { User } from "../models/User";
import instance from "./Config";

export const signin = (user: User): Promise<User> => {
  const url = `/signin`;
  return instance.post(url, user);
};

export const signup = (user: User): Promise<User> => {
  const url = `/signup`;
  return instance.post(url, user);
};

export const forgetPassword = (email: string): Promise<User> => {
  const url = `/forget-password`;
  return instance.post(url, { email });
};
export const resetPassword = (passwordInfo: Object) => {
  const url = `/reset-password`;
  return instance.post(url, passwordInfo);
};
export const verifyPasswordResetToken = async (
  token: string | null,
  userId: string | null
) => {
  try {
    const { data } = await instance.post("/verify-pass-reset-token", {
      token,
      userId,
    });
    return data;
  } catch (error: any) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
