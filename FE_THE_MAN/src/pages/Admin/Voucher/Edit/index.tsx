
import moment from "moment";
import React,{useState,useEffect} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addVoucher, getVoucher, updateVoucher } from "../../../../redux/slices/voucherSlice";
import { useAppDispatch } from "../../../../redux/store";
type Inputs = {
  title:string
  startday: string,
  endtime: string,
  code: string,
  numberofuses: number,
  limiteduse: number,
  timeuser: number,
  amount: number,
  percent: Number
};

const VoucherEdit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [hidden,setHidden] = useState(false)
 
  const {register,handleSubmit,formState:{errors}, reset}=useForm<Inputs>();
  useEffect(() => {
    (async() => {
      const res = await dispatch(getVoucher(id))
      reset(res?.payload)
    }) ()
    
}, [])
  const onSubmit:SubmitHandler<Inputs>=async(values:Inputs)=>{ 
        if(values?.amount == 0 && values?.percent == 0) {
                return toast.error("Vui lòng nhập số tiền hoặc nhập % lớn hơn 0")
        }else if(values?.amount > 0 && values?.percent > 0) {
                return toast.error("Chỉ được nhập 1 số tiền hoặc %")
        }
    try {
        const res = await dispatch(updateVoucher(values))
        if(res?.payload?.code == 200) {
            toast.success("Sửa voucher thành công !", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
               navigate("/admin/vouchers");
        }else {
            toast.error(res?.payload?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
      
     
    } catch (error) {
        toast.error("Lỗi không xác định", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
  }
  return (
    <div>
      <div>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Sửa voucher</h1>
            <Link to="/admin/vouchers" className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <HiOutlineX className="text-[20px] mr-2" />
                Quay lại
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
                      Tên voucher
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {
                      ...register("title",{required:"Vui lòng nhập mã voucher"})
                        }
                        id="name-catepost"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Tên voucher..."
                      />
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors.title?.message}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mã voucher
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {
                      ...register("code",{required:"Vui lòng nhập mã voucher"})
                        }
                        id="name-catepost"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Mã voucher..."
                      />
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors.code?.message}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                        Ngày bắt đầu - Ngày kết thúc 
                    </label>  
                    <div className="mt-1 flex items-center">
                      <input
                        type="date"
                        {
                      ...register("startday",{required:"Vui lòng nhập ngày bắt đầu"})
                        }
                        id="name-catepost"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-50% sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Tên danh mục..."
                      />
                      <span className="mx-[10px]">To</span>
                      <input
                        type="date"
                        {
                      ...register("endtime",{required:"Vui lòng nhập ngày kết thúc"})
                        }
                        min={moment().format("YYYY-MM-DD")}
                        id="name-catepost"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-50% sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Tên danh mục..."
                      />
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors.endtime?.message}
                        {errors.startday?.message}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Giới hạn số lần sử dụng
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        {
                      ...register("numberofuses",{required:"Vui lòng không được để trống"})
                        }
                        id="name-catepost"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Giới hạn số lần sử dụng..."
                      />
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors.numberofuses?.message}
                      </div>
                    </div>
                  </div>

                  
                  
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Giới hạn số lần sử dụng của 1 user
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        {
                      ...register("limiteduse",{required:"Vui lòng không được để trống"})
                        }
                        id="name-catepost"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Giới hạn số lần sử dụng của 1 user..."
                      />
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors.limiteduse?.message}
                      </div>
                    </div>
                  </div>



                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tài khoản lập bao nhiêu ngày thì được sử dụng voucher
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        {
                      ...register("timeuser",{required:"Vui lòng không được để trống"})
                        }
                        id="name-catepost"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Thời gian lập tài khoản..."
                      />
                      <div className="text-sm mt-0.5 text-red-500">
                        {errors.timeuser?.message}
                      </div>
                    </div>
                  </div>




                  



                   <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nhập số tiền
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        {
                      ...register("amount")
                        }
                        id="name-catepost"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Nhập số tiền..."
                      />
                    </div>
                  </div>     <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nhập số %
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        {
                      ...register("percent")
                        }
                        id="name-catepost"
                        className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Nhập số %..." 
                      />
                    </div>
                  </div>
                        <h1 className="font-bold">Lưu ý: Chỉ được nhập số tiền hoặc % không nhập cả 2</h1>

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

export default VoucherEdit;
