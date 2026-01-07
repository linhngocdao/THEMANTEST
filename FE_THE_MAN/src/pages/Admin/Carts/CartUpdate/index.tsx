import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiRefresh } from "react-icons/hi";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  cancelOrder,
  infoOrder,
  orderConfirm,
  readOrder,
  SHOP_ID,
  updateOrder,
} from "../../../../redux/slices/orderSlice";
import { formatCurrency } from "../../../../ultis";

const CartUpdate = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  const order = useSelector((state: any) => state.orders);
  const voucher = useSelector((state: any) => state.voucher);
  let sum = 0;
  const onUpdate = async (data: any) => {
    data._id = id;
    data.payment_status = parseInt(data.payment_status);
    data.status = parseInt(data.status);

    const orderData = order.order;

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
    // payment_type_id: 1 = Shop trả phí ship, 2 = Người nhận trả phí ship (mặc định)
    const payment_type_id = 2;

    const products = orderData?.product || data?.product || [];
    const infomation = orderData?.infomation || data?.infomation || {};

    if (!infomation?.fullname || !infomation?.phonenumber) {
      return toast.error("Thiếu thông tin người nhận (tên hoặc số điện thoại)");
    }
    if (!infomation?.to_ward_code || !infomation?.to_district_id) {
      return toast.error("Thiếu thông tin địa chỉ giao hàng (quận/phường)");
    }

    // Tính tổng số lượng sản phẩm
    const totalQuantity = products?.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0) || 1;

    // Tính tổng giá trị bảo hiểm
    const totalInsurance = products?.reduce((sum: number, item: any) => sum + ((item.price || 0) * (item.quantity || 1)), 0) || 0;

    // Format items đơn giản theo GHN yêu cầu
    const formattedItems = products?.map((item: any) => ({
      name: item.name || "Sản phẩm",
      quantity: item.quantity || 1,
      price: item.price || 0,
    })) || [];

    // Payload đơn giản theo format GHN
    const infocart = {
      shop_id: SHOP_ID,
      payment_type_id: payment_type_id,
      to_name: infomation?.fullname,
      to_phone: infomation?.phonenumber,
      to_address: infomation?.address,
      to_ward_code: String(infomation?.to_ward_code || ""),
      to_district_id: Number(infomation?.to_district_id) || null,
      weight: orderData?.weight || data?.weight || 1000,
      length: 15,
      width: 15,
      height: 15,
      insurance_value: totalInsurance,
      service_id: 0,
      service_type_id: 2,
      pick_shift: [2],
      items: formattedItems,
      quantity: totalQuantity,
      required_note: infomation?.note || "KHONGCHOXEMHANG",
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
        console.log(" gửi đơn hàng lên GHN");
        console.log("order.order:", order.order);
        console.log("order.order.infomation:", order.order?.infomation);
        console.log("to_ward_code từ DB:", data?.infomation?.to_ward_code);
        console.log("to_district_id từ DB:", data?.infomation?.to_district_id);
        console.log("=================================");
        console.log("Payload gửi lên GHN:", JSON.stringify(infocart, null, 2));
        console.log("Chi tiết items:", infocart.items);
        console.log("Thông tin người nhận:", {
          to_name: infocart.to_name,
          to_phone: infocart.to_phone,
          to_address: infocart.to_address,
          to_ward_code: infocart.to_ward_code,
          to_district_id: infocart.to_district_id,
        });
        console.log("Insurance value:", infocart.insurance_value);
        const res = await dispatch(orderConfirm(infocart));
        if (res?.payload?.code == 200) {
          const newOrderCode = res?.payload?.data?.order_code;
          console.log("Đơn hàng GHN tạo thành công! Order code:", newOrderCode);

          // Lưu order_code vào database
          data.order_code = newOrderCode;
          data.status = 1; // Cập nhật trạng thái đã xác nhận
          await dispatch(updateOrder(data));

          toast.success("Tạo đơn hàng GHN thành công! Mã: " + newOrderCode);
          navigate("/admin/carts");
        } else {
          toast.error(res?.payload?.message || "Lỗi tạo đơn hàng GHN");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  let currentstatus = "";
  if (order?.orderinfo?.data?.status == "ready_to_pick") {
  } else if (order?.orderinfo?.data?.status == "picking") {
  } else if (order?.orderinfo?.data?.status == "cancel") {
  } else if (order?.orderinfo?.data?.status == "money_collect_picking") {
  } else if (order?.orderinfo?.data?.status == "picked") {
  } else if (order?.orderinfo?.data?.status == "storing") {
  } else if (order?.orderinfo?.data?.status == "transporting") {
  } else if (order?.orderinfo?.data?.status == "delivering") {
  } else if (order?.orderinfo?.data?.status == "money_collect_delivering") {
  } else if (order?.orderinfo?.data?.status == "delivered") {
  } else if (order?.orderinfo?.data?.status == "delivery_fail") {
  } else if (order?.orderinfo?.data?.status == "waiting_to_return") {
  } else if (order?.orderinfo?.data?.status == "return") {
  } else if (order?.orderinfo?.data?.status == "return_transporting") {
  } else if (order?.orderinfo?.data?.status == "return_sorting") {
  } else if (order?.orderinfo?.data?.status == "returning") {
  } else if (order?.orderinfo?.data?.status == "return_fail") {
  } else if (order?.orderinfo?.data?.status == "returned") {
  } else if (order?.orderinfo?.data?.status == "exception") {
  } else if (order?.orderinfo?.data?.status == "damage") {
  } else if (order?.orderinfo?.data?.status == "lost") {
  } else {
    ;
  }
  useEffect(() => {
    (async () => {
      const orderData = await dispatch(readOrder(id!));
      reset();
      const orderCode = orderData?.payload?.order_code || "";
      dispatch(infoOrder(orderCode));
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
                        {order?.order?.payment_status == 0 ? <>
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
