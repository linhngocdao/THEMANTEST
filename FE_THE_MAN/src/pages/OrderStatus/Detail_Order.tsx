import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineCheck, HiOutlineX, HiRefresh } from "react-icons/hi";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { infoOrder, readOrder } from "../../redux/slices/orderSlice";
import { formatDateGHN } from "../../ultis";

const CartUpdate = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const order = useSelector((state: any) => state.orders);
  let sum = 0;
  let currentstatus = "";
  if (order?.orderinfo?.data?.status == "ready_to_pick") {
    currentstatus = "Mới tạo đơn hàng";
  } else if (order?.orderinfo?.data?.status == "picking") {
    currentstatus = "Nhân viên đang lấy hàng";
  } else if (order?.orderinfo?.data?.status == "cancel") {
    currentstatus = "Hủy đơn hàng";
  } else if (order?.orderinfo?.data?.status == "money_collect_picking") {
    currentstatus = "Đang thu tiền người gửi";
  } else if (order?.orderinfo?.data?.status == "picked") {
    currentstatus = "Nhân viên đã lấy hàng";
  } else if (order?.orderinfo?.data?.status == "storing") {
    currentstatus = "Hàng đang nằm ở kho";
  } else if (order?.orderinfo?.data?.status == "transporting") {
    currentstatus = "Đang luân chuyển hàng";
  } else if (order?.orderinfo?.data?.status == "delivering") {
    currentstatus = "Nhân viên đang giao cho người nhận";
  } else if (order?.orderinfo?.data?.status == "money_collect_delivering") {
    currentstatus = "Nhân viên đang thu tiền người nhận";
  } else if (order?.orderinfo?.data?.status == "delivered") {
    currentstatus = "Nhân viên đã giao hàng thành công";
  } else if (order?.orderinfo?.data?.status == "delivery_fail") {
    currentstatus = "Nhân viên giao hàng thất bại";
  } else if (order?.orderinfo?.data?.status == "waiting_to_return") {
    currentstatus = "Đang đợi trả hàng về cho người gửi";
  } else if (order?.orderinfo?.data?.status == "return") {
    currentstatus = "Trả hàng";
  } else if (order?.orderinfo?.data?.status == "return_transporting") {
    currentstatus = "Đang luân chuyển hàng trả";
  } else if (order?.orderinfo?.data?.status == "return_sorting") {
    currentstatus = "Đang phân loại hàng trả";
  } else if (order?.orderinfo?.data?.status == "returning") {
    currentstatus = "Nhân viên đang đi trả hàng";
  } else if (order?.orderinfo?.data?.status == "return_fail") {
    currentstatus = "Nhân viên trả hàng thất bại";
  } else if (order?.orderinfo?.data?.status == "returned") {
    currentstatus = "Nhân viên trả hàng thành công";
  } else if (order?.orderinfo?.data?.status == "exception") {
    currentstatus = "Đơn hàng ngoại lệ không nằm trong quy trình";
  } else if (order?.orderinfo?.data?.status == "damage") {
    currentstatus = "Hàng bị hư hỏng";
  } else if (order?.orderinfo?.data?.status == "lost") {
    currentstatus = "Hàng bị mất";
  } else {
    currentstatus = order?.orderinfo?.data?.status;
  }
  useEffect(() => {
    (async () => {
      const carts = await dispatch(readOrder(id!));
      reset(carts?.payload);
      let orderId: any = {
        order_code: carts?.payload?.order_code,
      };
      dispatch(infoOrder(orderId || ""));
    })();
  }, [id, dispatch]);

  // console.log("order before", order);

  // useEffect(() => {
  //   (async() => {
  //     // console.log("order after", order);
  //     let id:any = {
  //       order_code: order?.order?.order_code
  //     }
  //   const res = await dispatch(infoOrder(id))
  //   })()
  // },[order.order.order_code])

  return (
    <div>
      <div className="ml-[40px] mx-8">
        <header className="bg-white ">
          <div className="max-w-7xl mx-auto py-6   flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Chi tiết đơn hàng
            </h1>
            <Link to="/order" className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <HiRefresh className="text-[20px] mr-2" />
                Quay lại
              </button>
            </Link>
          </div>
        </header>
        <div className="m-auto max-w-7xl pb-36 mt-5">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <table className="table-auto w-full ">
              <thead className="pb-10 ">
                <tr className="text-left ">
                  <th className=" font-semibold pb-10">Thông tin người nhận</th>
                  <th className=" font-semibold pb-10">Thông tin vận chuyển</th>
                  <th className="font-semibold pb-10">Thời gian đặt hàng</th>
                  <th className="font-semibold pb-10">Phí giao hàng</th>
                  <th className="font-semibold pb-10">Tiền hàng</th>
                  <th className="font-semibold pb-10">Tổng tiền</th>
                  <th className="font-semibold pb-10">Trạng thái thanh toán</th>
                  
                </tr>
              </thead>
              <tbody className="w-full">
                <tr className="border-t-2">
                  <td className=" py-10  gap-8 text-[15px]">
                    <div>
                      <b>Họ tên: </b> {order?.order?.infomation?.fullname}
                    </div>
                    <div>
                      <b>Email:</b> {order?.order?.infomation?.email}
                    </div>
                    <div>
                      <b>Địa chỉ: </b> {order?.order?.infomation?.address}
                    </div>
                    <div>
                      <b>Số điện thoại: </b>{" "}
                      {order?.order?.infomation?.phonenumber}
                    </div>
                  </td>
                  <td className=" py-10  gap-8">
                    {order?.orderinfo?.data?.log
                      ? order?.orderinfo?.data?.log?.map(
                          (item: any, index: number) => {
                            let status = "";
                            if (item.status == "ready_to_pick") {
                              status = "Mới tạo đơn hàng";
                            } else if (item.status == "picking") {
                              status = "Nhân viên đang lấy hàng";
                            } else if (item.status == "cancel") {
                              status = "Hủy đơn hàng";
                            } else if (item.status == "money_collect_picking") {
                              status = "Đang thu tiền người gửi";
                            } else if (item.status == "picked") {
                              status = "Nhân viên đã lấy hàng";
                            } else if (item.status == "storing") {
                              status = "Hàng đang nằm ở kho";
                            } else if (item.status == "transporting") {
                              status = "Đang luân chuyển hàng";
                            } else if (item.status == "delivering") {
                              status = "Nhân viên đang giao cho người nhận";
                            } else if (
                              item.status == "money_collect_delivering"
                            ) {
                              status = "Nhân viên đang thu tiền người nhận";
                            } else if (item.status == "delivered") {
                              status = "Nhân viên đã giao hàng thành công";
                            } else if (item.status == "delivery_fail") {
                              status = "Nhân viên giao hàng thất bại";
                            } else if (item.status == "waiting_to_return") {
                              status = "Đang đợi trả hàng về cho người gửi";
                            } else if (item.status == "return") {
                              status = "Trả hàng";
                            } else if (item.status == "return_transporting") {
                              status = "Đang luân chuyển hàng trả";
                            } else if (item.status == "return_sorting") {
                              status = "Đang phân loại hàng trả";
                            } else if (item.status == "returning") {
                              status = "Nhân viên đang đi trả hàng";
                            } else if (item.status == "return_fail") {
                              status = "Nhân viên trả hàng thất bại";
                            } else if (item.status == "returned") {
                              status = "Nhân viên trả hàng thành công";
                            } else if (item.status == "exception") {
                              status =
                                "Đơn hàng ngoại lệ không nằm trong quy trình";
                            } else if (item.status == "damage") {
                              status = "Hàng bị hư hỏng";
                            } else if (item.status == "lost") {
                              status = "Hàng bị mất";
                            } else {
                              status = item.status;
                            }
                            return (
                              <div key={index++}>
                                <p className="text-[#d53b3bcc]">
                                  {moment(item?.updated_date).format(
                                    "DD [tháng] MM, YYYY[\r\n]HH Giờ mm [Phút]"
                                  )}
                                </p>
                                <p className="text-[#26aa99] border-solid">
                                  {status}
                                </p>
                              </div>
                            );
                          }
                        )
                      : currentstatus}
                  </td>
                  <td className="py-10  gap-8">
                    {" "}
                    <p>
                      {moment(order?.order?.createdAt).format(
                        "DD [tháng] MM, YYYY[\r\n]HH Giờ mm [Phút]"
                      )}
                    </p>
                  </td>

                  <td className=" py-10  gap-8">
                    {" "}
                    {
                      <NumberFormat
                        value={order?.order?.fee}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={""}
                      />
                    }
                    VNĐ
                  </td>
                  <td className=" py-10  gap-8">
                    {" "}
                    {
                      <NumberFormat
                        value={order?.order?.productmonney}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={""}
                      />
                    }
                    VNĐ
                  </td>
                  <td className=" py-10  gap-8">
                    {" "}
                    {
                      <NumberFormat
                        value={order?.order?.totalprice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={""}
                      />
                    }
                    VNĐ
                  </td>
                  <td className=" text-red-500 font-bold py-10  gap-8">
                    {order?.order?.payment_status == 0
                      ? "Chưa thanh toán"
                      : "Đã thanh toán"}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table-auto w-full ">
              <thead className="pb-10 ">
                <tr className="text-left ">
                  <th className=" font-semibold pb-10">STT</th>
                  <th className=" font-semibold pb-10">Sản phẩm</th>
                  <th className=" font-semibold pb-10">Màu sắc </th>
                  <th className="font-semibold pb-10">Số lượng</th>
                  <th className="font-semibold pb-10">Tổng tiền</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {order?.order?.product?.map((item: any, index: number) => {
                  {
                    sum += item.quantity * item.price;
                  }

                  return (
                    <tr key={index++} className="border-t-2">
                      <td className="w-40">
                        <span className="px-6">{index++}</span>
                      </td>
                      <td className="flex py-10  gap-8">
                        <img src={item.image} className="w-20"></img>
                        <div className="pt-4">
                          <p className="text-[16px]">{item.name}</p>
                          <p className=" text-gray-500">
                            Giá:{" "}
                            <NumberFormat
                              className="font-bold"
                              value={item?.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={""}
                            />{" "}
                            <span className="font-bold">VNĐ</span>{" "}
                          </p>
                          <p className=" text-gray-500">
                            Kích cỡ: <b>{item.size}</b>
                          </p>
                        </div>
                      </td>
                      <td className="w-40">
                        <div className="font-bold flex">
                          {" "}
                          <div
                            style={{ backgroundColor: `${item.color}` }}
                            className="h-[35px] w-[50px] rounded"
                          ></div>
                        </div>
                      </td>
                      <td className="w-40">
                        <span className="px-6">{item.quantity}</span>
                      </td>
                      <td className="font-bold">
                        {" "}
                        <NumberFormat
                          value={item?.price * item?.quantity}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={""}
                        />{" "}
                        VNĐ{" "}
                      </td>
                      <td>
                        <button className="bg-red-500 text-white rounded-md p-[5px] font-semibold" onClick={() => navigate(`/detail/`+item._id)}>
                           Mua lại
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartUpdate;
