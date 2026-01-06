import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signin as signinAction } from "../../redux/slices/authSlice";
import { signin } from "../../api-cilent/Auth";
import Swal from "sweetalert2";

type Props = {};
type Inputs = {
  email: string;
  password: string;
};

const Signin = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values: any) => {
    try {
      const user = await signin(values);

      toast.success("Đăng nhập thành công !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(signinAction(user));

      const role = user.data.users.role;
       const link = JSON.parse(localStorage.getItem("link") as string);
        if (link) {
          navigate(link);
         return localStorage.removeItem("link");
        }
      if (role == 1) {
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
       
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: any) {
      const isVerify = error?.response?.data?.verified;
      if (isVerify === false && isVerify !== undefined) {
        Swal.fire({
          icon: "error",
          title: "Lỗi...",
          text: "Vui lòng kiểm tra email để xác thực tài khoản!",
        });
      }
      const message = error?.response?.data?.message;
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
                    Đăng nhập
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
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                    <div className="mb-4">
                      <label htmlFor="input-password" className="py-2">
                        Mật khẩu
                      </label>
                      <input
                        id="input-password"
                        type="password"
                        {...register("password", {
                          required: "Vui lòng nhập mật khẩu",
                          minLength: {
                            value: 8,
                            message: "Vui lòng nhập nhập khẩu trên 8 ký tự",
                          },
                          // pattern: {
                          //   value:
                          //     /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{8,30}$/,
                          //   message:
                          //     "Vui lòng nhập nhập khẩu trên 8 ký tự bao gồm 'Chữ hoa, chữ thường, số và ký tự đặc biệt'",
                          // },
                        })}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md ease-in-out duration-300 hover:border-blue-700 focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                        placeholder="Mật khẩu"
                        autoComplete="on"
                      />
                      <p className="text-red-400 text-xs">
                        {errors.password?.message}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group w-full relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Đăng nhập
                    </button>
                  </div>
                  <p className="mt-3 text-center text-sm text-gray-600 mr-2">
                    Bạn chưa có tài khoản?
                    <Link to="/signup">
                      <span className="ml-2 cursor-pointer font-medium ease-in-out duration-300 text-blue-500 hover:text-blue-700">
                        Đăng ký
                      </span>
                    </Link>
                  </p>
                  <div className="flex items-center justify-center">
                    {/* <div className='flex items-center'>
                      <input
                        id='remember-me'
                        name='remember-me'
                        type='checkbox'
                        className='h-4 w-4 text-blue-500 ease-in-out duration-300 focus:ring-blue-500 border-gray-300 rounded'
                      />
                      <label
                        htmlFor='remember-me'
                        className='ml-2 block text-sm text-gray-900'
                      >
                    
                        Nhớ mật khẩu
                      </label>
                    </div> */}
                    <div className="text-sm">
                      <Link to="/users/forget-password">
                        <span className="ml-2 cursor-pointer font-medium ease-in-out duration-300 text-blue-500 hover:text-blue-700">
                          Quên mật khẩu
                        </span>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Signin;
