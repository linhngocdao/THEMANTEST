/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { HiOutlineX, HiOutlineCheck } from "react-icons/hi";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { RootState, useAppDispatch } from "../../../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addSlider } from "../../../../redux/slices/Slider";
import {
  addUser,
  getUser,
  updateUser,
} from "../../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { update } from "../../../../api-cilent/User";
type Inputs = {
  fullname: string;
  email: string;
  status: string;
};

const UserEdit = () => {
  const [preview, setPreview] = useState<string>();
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.user);
  const [status, setStatus] = useState(users.User.status);
  const navigate = useNavigate();
  console.log(status);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const { id } = useParams();

  useEffect(() => {
    setStatus(users.User.status);
  }, [users.User.status]);

  useEffect(() => {
    (async () => {
      const posts = await dispatch(getUser(id));
      reset(posts.payload);
    })();
  }, [id, dispatch, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    console.log(values.status);

    try {
      dispatch(
        updateUser({
          fullname: values.fullname,
          status,
          _id: id,
        })
      );
      console.log(11);

      toast.success("Sửa người dùng thành công !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin/users");
    } catch (error) {
      console.log("a");
    }
  };
  return (
    <div>
      <div>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Thêm bài viết</h1>
            <Link to="/admin/post" className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <HiOutlineX className="text-[20px] mr-2" />
                Thoát
              </button>
            </Link>
          </div>
        </header>
        <div className="m-auto max-w-7xl pb-36 mt-5">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Họ Tên
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        placeholder="Họ tên*"
                        {...register("fullname", {
                          required: "Vui lòng nhập họ tên",
                        })}
                        id="name-add-product"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      />
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors.fullname?.message}
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <label htmlFor="input-email" className="py-2">
                      Email
                    </label>
                    <input
                      id="input-email"
                      placeholder="Email*"
                      {...register("email", {
                        required: "Vui lòng nhập email",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Vui lòng nhập đúng định dạng email",
                        },
                      })}
                      type="email"
                      className="appearance-none relative block w-full px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md ease-in-out duration-300 hover:border-blue-700 focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                    />
                    <p className="text-sm mt-0.5 text-red-500">
                      {errors.email?.message}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="status" className="py-2">
                      Status
                    </label>

                    <select
                      className="p-2"
                      id=""
                      value={status}
                      onChange={(e: any) => setStatus(e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="block">Block</option>
                    </select>
                    <p className="text-sm mt-0.5 text-red-500">
                      {errors.status?.message}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <HiOutlineCheck className="mr-2 text-[20px]" />
                    Lưu
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserEdit;
