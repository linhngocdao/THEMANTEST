import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgetPassword } from "../../api-cilent/Auth";
import Swal from "sweetalert2";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";

type Props = {};
type Inputs = {
  email: string;
};

const ForgetPassword = (props: Props) => {
  const [modal, setModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    try {
      await forgetPassword(values.email);
      // console.log(values);

      toast.success("Thành công !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setModal(true);
      //   dispatch(signinAction(user));
      //   setTimeout(() => {
      //     navigate("/");
      //   }, 1000);
    } catch (error: any) {
      console.log(error);

      const isVerify = error?.response.data.verified;
      if (isVerify === false && isVerify !== undefined) {
        Swal.fire({
          icon: "error",
          title: "Lỗi...",
          text: "Vui lòng kiểm tra email để xác thực tài khoản!",
        });
      }
      const message = error?.response.data.message;
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="pt-1">
      <div className="xl:w-[1200px] xl:mx-auto mt-5 mb-10 shadow-inner rounded-lg mx-3">
        <div className="content grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 shadow-lg">
          <img
            className="hidden xl:block lg:block bg-[#e7f6fb] rounded-l-lg"
            src="https://res.cloudinary.com/assignment22/image/upload/v1668812529/Ass-reactjs/20221114_LvgOAj9N9Fklx76G5UyG9SHD_pncdqr.jpg"
          />
          <section>
            <div className="min-h-full flex items-center justify-center p-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 uppercase">
                    Quên mật khẩu
                  </h2>
                </div>
                <form
                  className="mt-8 space-y-6"
                  id="form-signin"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div className="mb-4">
                      <label htmlFor="input-email" className="py-2">
                        Email
                      </label>
                      <input
                        id="input-email"
                        type="email"
                        // required
                        {...register("email", {
                          required: "Vui lòng nhập email",
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Vui lòng nhập đúng định dạng email",
                          },
                        })}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md ease-in-out duration-300 hover:border-blue-500 focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                        placeholder="Email"
                      />
                      <p className="text-red-400 text-xs">
                        {errors.email?.message}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group w-full relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Quên mật khẩu
                    </button>
                  </div>
                  <p className="mt-3 text-center flex justify-between text-sm text-gray-600 mr-2">
                    <Link to="/signin">
                      <span className="ml-2 cursor-pointer font-medium ease-in-out duration-300 text-blue-500 hover:text-blue-700">
                        Đăng nhập
                      </span>
                    </Link>
                    <Link to="/signup">
                      <span className="ml-2 cursor-pointer font-medium ease-in-out duration-300 text-blue-500 hover:text-blue-700">
                        Đăng ký
                      </span>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
      {modal ? (
        <div
          className="modal fixed z-[999] inset-0 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="flex min-h-screen text-center  md:block md:px-2 lg:px-4"
            style={{ fontSize: 0 }}
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block"
              aria-hidden="true"
              onClick={() => setModal(false)}
            />
            <div className="text-base flex justify-center items-center absolute top-1/4 right-[34%] text-left transform transition md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
              <div className="rounded relative bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <div
                  className="modal-close absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  onClick={() => setModal(false)}
                >
                  <AiOutlineClose />
                </div>
                <div
                  className="modal-container items-start"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mt-3 text-center sm:mt-0">
                    <div className="mail flex justify-center pt-5">
                      <AiOutlineMail className="text-8xl text-white bg-blue-500 p-5 rounded-full" />
                    </div>
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900 pt-5"
                      id="modal-title"
                    >
                      Thành công !
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Cảm ơn bạn vui lòng kiểm tra email để đổi mật khẩu !
                      </p>
                    </div>
                    <Link to="/signin">
                      <button className="mt-8 rounded-3xl bg-blue-500 py-3 px-8 text-white font-semibold hover:bg-blue-400 ease-in-out transition-all ">
                        Trở về đăng nhập
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ForgetPassword;
