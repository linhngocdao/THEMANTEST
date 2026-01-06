import axios from "axios";
import React,{useState} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addCatePost } from "../../../../redux/slices/catePostSlice";
// import { add_catePost } from "../../../../api-cilent/CatePost";
import { useAppDispatch } from "../../../../redux/store";

type Inputs = {
  name:string
};

const CatePostAdd = () => {
  const [preview,setPreview]=useState<string>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {register,handleSubmit,formState:{errors}}=useForm<Inputs>();
  const onSubmit:SubmitHandler<Inputs>=async(values:Inputs)=>{
    try {

      await dispatch(addCatePost({...values})).unwrap();
      toast.success("Thêm danh mục thành công !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin/category_post");
    } catch (error) {}
  }
  return (
    <div>
      <div>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Thêm danh mục</h1>
            <Link to="/admin/category_post" className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <HiOutlineX className="text-[20px] mr-2" />
                Quay
              </button>
            </Link>
          </div>
        </header>
        <div className="m-auto max-w-7xl pb-36 mt-5">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" id="form-add-product" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tên danh mục
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {
                      ...register("name",{required:"Vui lòng nhập tên danh mục"})
                        }
                        id="name-catepost"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Tên danh mục..."
                      />
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors.name?.message}
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

export default CatePostAdd;
