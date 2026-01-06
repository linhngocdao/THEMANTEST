/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { HiOutlineX, HiOutlineCheck } from "react-icons/hi";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { RootState, useAppDispatch } from "../../../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addSlider } from "../../../../redux/slices/Slider";
type Inputs = {
  title: string;

  url: string;
  image: string;
};

const SliderAdd = () => {
  const [preview, setPreview] = useState<string>();
  const dispatch = useAppDispatch();
  // const categoryPost = useSelector((state:RootState) =>state.)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    try {
      const apiUrl = "https://api.cloudinary.com/v1_1/dmlv9tzte/image/upload";
      const images = values.image[0];
      const formdata = new FormData();
      formdata.append("file", images);
      formdata.append("upload_preset", "duanTn");
      const { data } = await axios.post(apiUrl, formdata, {
        headers: {
          "Content-type": "application/form-data",
        },
      });
      await dispatch(addSlider({ ...values, image: data.url })).unwrap();
      toast.success("Thêm banner thành công !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin/slider");
    } catch (error) {}
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
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tiêu đề
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register("title", {
                          required: "Vui lòng nhập tiêu đề",
                        })}
                        id="name-add-product"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Title..."
                      />
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors.title?.message}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="url"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Đường dẫn
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register("url", {
                          required: "Vui lòng nhập đường dẫn",
                        })}
                        id="size-add-product"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Url..."
                      />
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors.url?.message}
                      </div>
                    </div>
                  </div>

                  {/* <div>
                    <label
                      htmlFor="DescShort"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mô tả ngắn
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register("descShort", {
                          required: "Vui lòng nhập mô tả ngắn",
                        })}
                        id="DescShort"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="DescShort..."
                      />
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors.descShort?.message}
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <select
                      {...register("categoryId", {
                        required: "Vui lòng nhập chi tiết",
                      })}
                      id="category"
                      name="category"
                      autoComplete="category-name"
                      className="mt-1 block w-full py-2 px-3 appearance-none border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="0">Select Category</option>
                      {cateProducts &&
                        cateProducts.map((category: any) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      <option>Quần</option>
                    </select>
                    <div className="text-sm mt-0.5 text-red-500">
                      {errors.categoryId?.message}
                    </div>
                  </div> */}
                  {/* 
                  <div>
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nội dung
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register("content", {
                          required: "Vui lòng nhập nội dung bài viết",
                        })}
                        id="content-add-product"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="content..."
                      />
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors.content?.message}
                      </div>
                    </div>
                  </div> */}
                  {/* 
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Image preview
                    </label>
                    <div className="mt-1 w-40 h-40 relative">
                      <img
                        src={
                          preview ||
                          "https://res.cloudinary.com/assignmentjs/image/upload/c_thumb,w_200,g_face/v1648723660/img/noimage_mzjwxl.png"
                        }
                        alt="Preview Image"
                        className="h-40 w-40 rounded-sm object-cover"
                        // layout="fill"
                      />
                    </div>
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Hình ảnh
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <input
                            {...register("image", {
                              required: "Vui lòng chọn ảnh",
                            })}
                            onChange={(e: any) => {
                              setPreview(
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                            id="file-upload"
                            type="file"
                          />
                          <div className="text-sm mt-0.5 text-red-500">
                            {errors.image?.message}
                          </div>
                        </div>
                      </div>
                    </div>
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
export default SliderAdd;
