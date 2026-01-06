import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineCheck, HiOutlineX, HiRefresh } from "react-icons/hi";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  cancelOrder,
  infoOrder,
  orderConfirm,
  readOrder,
  updateOrder,
} from "../../../../redux/slices/orderSlice";
import {
  checkVoucher,
  GETVoucherX,
} from "../../../../redux/slices/voucherSlice";
import { formatCurrency, formatDateGHN } from "../../../../ultis";

const CartUpdate = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const order = useSelector((state: any) => state.orders);
  const voucher = useSelector((state: any) => state.voucher);
  let sum = 0;
  const onUpdate = async (data: any) => {
    data.payment_status = parseInt(data.payment_status);
    data.status = parseInt(data.status);
    let product = [];

    if (order.order.status == 1 && data.status == 1) {
      return toast.error("Đơn hàng đã được xác nhận");
    }
    if (data.status == 1 && order.order.status == 2) {
      return toast.error("Đơn hàng đã huỷ...");
    }
    if (data.status == 2 && order.order.status == 2) {
      return toast.error("Đơn hàng này đã huỷ");
    } else if (
      data.status == 2 &&
      order?.orderinfo?.data?.status != "ready_to_pick"
    ) {
      return toast.error("Đơn hàng này đã giao hoặc đang được giao");
    }
    let payment_type_id = 2;
    if (data?.payment_status == 1) {
      payment_type_id = 1;
    } else {
      payment_type_id = 2;
    }
    product = data.product;
    const infocart = {
      payment_type_id: payment_type_id,
      note: "The Man",
      from_name: "The Man",
      from_phone: "0373052002",
      from_address:
        "Chung Cư Ct6, Ngõ 89 Đường Lê Đức Thọ Phường Mỹ Đình 2, Quận Nam Từ Liêm, Hà Nội",
      from_ward_name: "Phường Mỹ Đình 2",
      from_district_name: "Quận Nam Từ Liêm",
      from_province_name: "Hà Nội",
      required_note: "CHOTHUHANG",
      return_name: "The Man",
      return_phone: "0373052002",
      return_address:
        "Chung Cư Ct6, Ngõ 89 Đường Lê Đức Thọ Phường Mỹ Đình 2, Quận Nam Từ Liêm, Hà Nội",
      return_ward_name: "Phường Mỹ Đình 2",
      return_district_name: "Quận Nam Từ Liêm",
      return_province_name: "Hà Nội",
      client_order_code: "",
      to_name: data?.infomation?.fullname,
      to_phone: data?.infomation?.phonenumber,
      to_address: data?.infomation?.address,
      to_ward_name: data?.infomation?.to_ward_name,
      to_district_name: data?.infomation?.to_district_name,
      to_province_name: data?.infomation?.to_province_name,
      cod_amount: data?.totalprice,
      content: data?.infomation?.note,
      weight: data?.weight,
      length: data?.length,
      width: data?.width,
      height: data?.height,
      pick_station_id: null,
      deliver_station_id: null,
      insurance_value: data?.productmonney,
      service_type_id: 2,
      service_id:null,
      coupon: null,
      pick_shift: null,
      pickup_time: null,
      items: product,
    };

    if (data.status === 2 && data.order_code) {
      await dispatch(updateOrder(data));
      let raw = {
        order_codes: [],
      };
      raw.order_codes.push(data.order_code as never);
      const res = await dispatch(cancelOrder(raw));
      if (res.payload.code == 200) {
        return toast.info("Huỷ đơn hàng thành công !");
      }
    }
    if (data.status == 1 && data.order_code) {
      return toast.info("Đơn hàng này đã được xác nhận.");
    }
    if (data.status === 1) {
      try {
        const res = await dispatch(orderConfirm(infocart));
        if (res?.payload?.code == 200) {
          data.order_code = res?.payload?.data?.order_code;
          navigate("/admin/carts");
        } else {
          toast.info(res?.error?.message);
        }
        if (data.order_code) {
          const update = await dispatch(updateOrder(data));
          toast.info("Thành công");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };
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
      const raw = {
        view: true,
        update: false,
        _id: carts?.payload?.voucher,
        iduser: carts?.payload?.userID,
      };
      const vouc = await dispatch(GETVoucherX(raw));
      reset(carts?.payload);
      let orderId: any = {
        order_code: carts?.payload?.order_code,
      };
      dispatch(infoOrder(orderId || ""));
    })();
  }, [id, dispatch, order?.order?.voucher]);
  const onPrint = () => {
    setHidden(true);
  };

  useEffect(() => {
    if (hidden === true) {
      window.print();
      setHidden(false);
    }
  }, [hidden]);

  return (
    <div>
      <div className="ml-[40px] mx-8">
        <header className="bg-white ">
          <div className="max-w-7xl mx-auto py-6   flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Chi tiết đơn hàng
            </h1>
            <Link to="/admin/carts" className="sm:ml-3">
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
                  {hidden ? (
                    ""
                  ) : (
                    <th className="font-semibold pb-10">Hành động</th>
                  )}
                </tr>
              </thead>
              <tbody className="w-full">
                <tr className="border-t-2">
                  <td className=" py-10  gap-8 text-[15px] w-[10%]">
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
                                  {/* {formatDateGHN(item?.updated_date).dateg +
                                      "-" +
                                      formatDateGHN(item?.updated_date).hours} */}
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
                    <p className="whitespace-pre">
                      {moment(order?.order?.createdAt).format(
                        "DD [tháng] MM, YYYY[\r\n]HH Giờ mm [Phút]"
                      )}
                    </p>
                    {/* <p>{formatDateGHN(order?.order?.createdAt).dateg}</p>{" "} */}
                    {/* <p>{formatDateGHN(order?.order?.createdAt).hours}</p> */}
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
                    {voucher?.voucher?.code ? (
                      <p className="font-bold text-[10px]">Giảm giá voucher:</p>
                    ) : (
                      ""
                    )}
                    {voucher?.voucher?.code ? (
                      <p className="font-bold text-[10px]">
                        {voucher?.voucher?.percent > 0
                          ? `- ` + voucher?.voucher?.percent + `%`
                          : "-" + formatCurrency(voucher?.voucher?.amount)}
                      </p>
                    ) : (
                      ""
                    )}
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
                  <td className=" py-10  gap-8">
                    {order?.order?.payment_status == 0
                      ? "Chưa thanh toán"
                      : "Đã thanh toán"}
                  </td>
                  {hidden ? (
                    ""
                  ) : (
                    <td className="py-10  gap-8 outline-none">
                      <h2 className="my-[10px]">Xác nhận đơn hàng: </h2>
                      <form
                        onSubmit={handleSubmit(onUpdate)}
                        className="flex flex-col"
                      >
                        <select
                          {...register("status")}
                          className="max-w-[150px] my-[5px] py-[10px] border-[1px] border-[#333] rounded outline-none"
                        >
                          <option value={0}>Đang xử lý</option>
                          <option value={1}>Xác nhận</option>
                          <option value={2}>Huỷ đơn hàng</option>
                        </select>
                        {order?.order?.payment_status == 0 ?  <>
                          <h2 className="my-[10px]">Trạng thái thanh toán: </h2>
                        <select
                          {...register("payment_status")}
                          className="max-w-[150px] my-[5px] py-[10px] border-[1px] border-[#333] rounded outline-none"
                        >
                          <option value={0}>Chưa thanh toán</option>
                          <option value={1}>Đã thanh toán</option>
                        </select></> : ""}
                        <button
                          className="max-w-[150px] bg-blue-300 py-[5px] !ml-0"
                          type="submit"
                        >
                          Gửi
                        </button>
                      </form>
                    </td>
                  )}
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
                        <button>
                          <i className="fa-sharp fa-solid fa-circle-xmark text-slate-300 bg-black rounded-full shadow-md shadow-black text-3xl"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              type="submit"
              className="max-w-[150px] bg-yellow-500 p-[5px] my-[5px]"
              onClick={() => onPrint()}
            >
              In đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartUpdate;
