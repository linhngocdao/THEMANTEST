import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

type PrivateRouterProps = {
  children: JSX.Element;
};

const PrivateRouter = (props: PrivateRouterProps) => {
  const { users } = JSON.parse(localStorage.getItem("user") ?? "{}");
  if (users?.role != 1) {
    toast.success("Yêu cầu đăng nhập bằng tài khoản Admin !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return users?.role == 1 ? props.children : <Navigate to={"/signin"} />;
};
export default PrivateRouter;
