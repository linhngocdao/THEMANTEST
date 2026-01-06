import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import { resetPassword, verifyPasswordResetToken } from "../../api-cilent/Auth";

type Props = {};
type Inputs = {
  password: string;
  confirm_password: string;
};

const ConfirmPassword = (props: Props) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    isValidToken();
  }, []);
  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate("/user/reset-password", { replace: true });
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!valid) {
      setIsValid(false);
      navigate("/user/reset-password", { replace: true });
    }
    setIsValid(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const password = watch("password");
  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    try {
      await resetPassword({ newPassword: values.password, userId: id, token });
      toast.success("Đổi mật khẩu thành công !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/signin", { replace: true });
      }, 1000);
    } catch (error: any) {
      console.log(error);
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

  if (isVerifying)
    return (
      <div className="-z-10 bg-white flex justify-center items-center my-40">
        <div className={"max-w-screen-xl mx-auto"}>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold text-black">
              Vui lòng đợi, chúng tôi đang xác minh mã thông báo của bạn!
            </h1>
            <ImSpinner3 className="animate-spin text-4xl text-black" />
          </div>
        </div>
      </div>
    );

  if (!isValid)
    return (
      <div className="-z-10 bg-white flex justify-center items-center my-40">
        <div className={"max-w-screen-xl mx-auto"}>
          <h1 className="text-4xl font-semibold text-black">
            Xin lỗi, mã thông báo không hợp lệ!
          </h1>
        </div>
      </div>
    );
  return (
    <div className="pt-1">
      <div className="xl:w-[1200px] xl:mx-auto mt-5 mb-10 shadow-inner rounded-lg mx-3">
        <div className="content grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 shadow-lg">
          <img
            className="hidden xl:block lg:block bg-[#e7f6fb] rounded-l-lg"
            src="https://preview.colorlib.com/theme/bootstrap/login-form-14/images/xbg-1.jpg.pagespeed.ic.3OAd9jZTMD.webp"
          />
          <section>
            <div className="min-h-full flex items-center justify-center p-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 uppercase">
                    Đặt lại mật khẩu
                  </h2>
                </div>
                <form
                  className="mt-8 space-y-6"
                  id="form-signin"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div className="pb-4">
                      <label htmlFor="input-password" className="py-2">
                        Mật khẩu mới
                      </label>
                      <input
                        id="input-password"
                        {...register("password", {
                          required: "Vui lòng nhập mật khẩu",
                          minLength: {
                            value: 8,
                            message: "Vui lòng nhập nhập khẩu trên 8 ký tự",
                          },
                          // pattern: {
                          //   value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{8,30}$/,
                          //   message: "Vui lòng nhập nhập khẩu trên 8 ký tự bao gồm 'Chữ hoa, chữ thường, số và ký tự đặc biệt'"
                          // }
                        })}
                        type="password"
                        className={`appearance-none relative block w-full px-3 py-2 mt-1 border 
                        border-gray-300 placeholder-gray-500 text-gray-900 rounded-md ease-in-out duration-300 
                        hover:border-blue-700 focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm 
                        ${
                          errors.password &&
                          "focus:ring-red-700 focus:border-red-700 hover:border-red-700 border-red-300 placeholder-red-500 text-red-900"
                        }`}
                        placeholder="Mật khẩu*"
                      />
                      <p className="text-red-400 text-xs mt-1">
                        {errors.password?.message}
                      </p>
                    </div>

                    <div className="pb-4">
                      <label htmlFor="input-password" className="py-2">
                        Nhập lại mật khẩu
                      </label>
                      <input
                        id="input-password"
                        {...register("confirm_password", {
                          required: "Vui lòng nhập mật khẩu !",
                          // minLength: {
                          //   value: 8,
                          //   message: "Vui lòng nhập nhập khẩu trên 8 ký tự",
                          // },
                          validate: (value) =>
                            value === password || "Mật khẩu không trùng khớp !",
                          // pattern: {
                          //   value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{8,30}$/,
                          //   message: "Vui lòng nhập nhập khẩu trên 8 ký tự bao gồm 'Chữ hoa, chữ thường, số và ký tự đặc biệt'"
                          // }
                        })}
                        type="password"
                        className={`appearance-none relative block w-full px-3 py-2 mt-1 border 
                        border-gray-300 placeholder-gray-500 text-gray-900 rounded-md ease-in-out duration-300 
                        hover:border-blue-700 focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm 
                        ${
                          errors.confirm_password &&
                          "focus:ring-red-700 focus:border-red-700 hover:border-red-700 border-red-300 placeholder-red-500 text-red-900"
                        }`}
                        placeholder="Nhập lại mật khẩu*"
                      />
                      <p className="text-red-400 text-xs mt-1">
                        {errors.confirm_password?.message}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group w-full relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Đặt lại
                    </button>
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

export default ConfirmPassword;
