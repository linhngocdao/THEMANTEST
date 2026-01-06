import React, { useEffect, useState } from "react";
import { HiOutlineX, HiOutlineCheck } from "react-icons/hi";
import { toast } from "react-toastify";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { addProduct } from "../../../../redux/slices/productSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCatePro } from "./../../../../redux/slices/cateProductSlice";
import AddType from "./AddType";

export interface IType {
  color: string;
  size: string;
  quantity: number;
}
interface Iimgs {
  targetfile: string;
  url: string;
}

export type Inputs = {
  name: string;
  image: string;
  price: String;
  desc: string;
  type: IType[];
  categoryId: String;
  width: Number;
  height: Number;
  length: Number;
  weight: Number;
  listed_price: Number;
  subimg: [];
};

const ProductAdd = () => {
  const categories = useSelector(
    (state: any) => state.catePro.cateproducts
  );
  console.log("Product0",categories);
  
  const [preview, setPreview] = useState<string>();
  const [previews, setPreviews] = useState<Iimgs[]>([]);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await dispatch(getCatePro())
    })()
  }, [])
  const methods = useForm<Inputs>({
    defaultValues: {
      type: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onDeleteImg = (data: any) => {
    const old = previews.filter((item: any) => item.url !== data);
    setPreviews(old);
  };

  const onSetPrivews = (e: any) => {
    for (let index = 0; index < e.target.files.length; index++) {
      setPreviews((old) => [
        ...old,
        {
          targetfile: e.target.files[index],
          url: URL.createObjectURL(e.target.files[index]),
        },
      ]);
    }
  };
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
      let imgs = [];
      for (let index = 0; index < previews.length; index++) {
        const formDataImageSlide = new FormData();
        formDataImageSlide.append("file", previews[index].targetfile);
        formDataImageSlide.append("upload_preset", "duanTn");
        const { data } = await axios.post(apiUrl, formDataImageSlide, {
          headers: {
            "Content-type": "application/form-data",
          },
        });

        imgs.push(data.url);
      }
      const product = {
        ...values,
        image: data.url,
        subimg: imgs,
      };
      // product.type = types;
      console.log(product);

      await dispatch(addProduct(product)).unwrap();
      toast.success("Thêm bài viết thành công !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin/products");
    } catch (error) { }
  };

  return (
    <div>
      <div>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Thêm sản phẩm</h1>
            <Link to="/admin/products" className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A303B]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E] hover:bg-[#4D535E]"
              >
                <HiOutlineX className="text-[20px] mr-2" />
                Trở về
              </button>
            </Link>
          </div>
        </header>
        <div className="m-auto max-w-7xl pb-36 mt-5">
          <FormProvider {...methods}>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form
                action=""
                id="form-add-product"
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên sản phẩm
                      </label>

                      <div className="mt-1">
                        <input
                          type="text"
                          {...register("name", {
                            required: "Vui lòng nhập tên sản phẩm",
                          })}
                          id="name-add-product"
                          className="shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                          placeholder="Name..."
                        />
                        <div className="text-sm mt-0.5 text-red-500">
                          {errors.name?.message}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Giá sản phẩm
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          {...register("price", {
                            required: "Vui lòng nhập giá",
                          })}
                          id="price-add-product"
                          className="shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                          placeholder="Price..."
                        />
                        <div className="text-sm mt-0.5 text-red-500">
                          {errors.price?.message}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="height"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Chiều cao
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          {...register("height", {
                            required: "Vui lòng nhập chiều  cao",
                          })}
                          id="price-add-product"
                          className="shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                          placeholder="Price..."
                        />
                        <div className="text-sm mt-0.5 text-red-500">
                          {errors.height?.message}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="width"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Chiều rộng
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          {...register("width", {
                            required: "Vui lòng nhập chiều  rộng",
                          })}
                          id="price-add-product"
                          className="shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                          placeholder="Width..."
                        />
                        <div className="text-sm mt-0.5 text-red-500">
                          {errors.width?.message}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="length"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Chiều dài
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          {...register("length", {
                            required: "Vui lòng nhập chiều  dài",
                          })}
                          id="price-add-product"
                          className="shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                          placeholder="Length..."
                        />
                        <div className="text-sm mt-0.5 text-red-500">
                          {errors.length?.message}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="weight"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cân nặng
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          {...register("weight", {
                            required: "Vui lòng nhập cân nặng",
                          })}
                          id="price-add-product"
                          className="shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                          placeholder="Weight..."
                        />
                        <div className="text-sm mt-0.5 text-red-500">
                          {errors.weight?.message}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="listed_price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Giá niêm yết
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          {...register("listed_price", {
                            required: "Vui lòng nhập giá niêm yết",
                          })}
                          id="price-add-product"
                          className="shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                          placeholder="Listed_price..."
                        />
                        <div className="text-sm mt-0.5 text-red-500">
                          {errors.listed_price?.message}
                        </div>
                      </div>
                    </div>

                    <AddType />

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lựa chọn danh mục
                      </label>
                      <select
                        {...register("categoryId", {
                          required: "Vui lòng nhập chi tiết",
                        })}
                        autoComplete="category-name"
                        className="mt-1 block w-full py-2 px-3 appearance-none border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] sm:text-sm"
                      >
                        {categories &&
                          categories.map((category: any, index: number) => (
                            <option key={index++} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors?.categoryId?.message}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Chi tiết sản phẩm
                      </label>
                      <div className="mt-1">
                        <textarea
                          {...register("desc", {
                            required: "Vui lòng nhập chi tiết",
                          })}
                          id="message"
                          className="scoll h-[200px] block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your thoughts here..."
                        ></textarea>
                        <div className="text-sm mt-0.5 text-red-500">
                          {errors.desc?.message}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Ảnh xem trước
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
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ảnh sản phẩm
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ảnh sản phẩm
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
                          <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Ảnh xem trước
                            </label>
                            <div className=" flex">
                              {previews ? (
                                previews.map((item, index: number) => {
                                  return (
                                    <div key={index}>
                                      <img
                                        src={
                                          item.url ||
                                          "https://res.cloudinary.com/assignmentjs/image/upload/c_thumb,w_200,g_face/v1648723660/img/noimage_mzjwxl.png"
                                        }
                                        alt="Preview Image"
                                        className="h-40 w-40 rounded-sm object-cover"
                                      // layout="fill"
                                      />
                                      <HiOutlineX
                                        className="text-[54px] mr-2 cursor-pointer"
                                        onClick={() => onDeleteImg(item.url)}
                                      />
                                    </div>
                                  );
                                })
                              ) : (
                                <img
                                  src={
                                    preview ||
                                    "https://res.cloudinary.com/assignmentjs/image/upload/c_thumb,w_200,g_face/v1648723660/img/noimage_mzjwxl.png"
                                  }
                                  alt="Preview Image"
                                  className="h-40 w-40 rounded-sm object-cover"
                                // layout="fill"
                                />
                              )}
                            </div>
                          </div>
                          <div className="flex text-sm text-gray-600">
                            <input
                              multiple
                              {...register("subimg", {
                                required: "Vui lòng chọn ảnh",
                              })}
                              onChange={(e) => onSetPrivews(e)}
                              id=""
                              type="file"
                              className="text-white"
                            />
                            <div className="text-sm mt-0.5 text-red-500">
                              {errors.subimg?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2A303B] hover:bg-[#4D535E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E]"
                    >
                      <HiOutlineCheck className="mr-2 text-[20px]" />
                      Lưu sản phẩm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
export default ProductAdd;