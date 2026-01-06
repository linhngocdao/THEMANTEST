import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addOrder, readCart } from "../../redux/slices/cartSlice";
import { createUrlPayment } from "../../redux/slices/paymentSlice";
import {
  getDistrict,
  getFee,
  getProvince,
  getSevicePackage,
  getWards,
} from "../../redux/slices/provinceSlice";
import { readUserLocal } from "../../redux/slices/userSlice";
import { checkVoucher, removeVoucher } from "../../redux/slices/voucherSlice";
import { formatCurrency } from "../../ultis";

const CheckoutPage = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const carts = useSelector((state: any) => state.carts);
  const [code, setCode] = useState<String>();
  const province = useSelector((state: any) => state.province);
  const voucher = useSelector((state: any) => state.voucher.voucher);
  const [total, setTotal] = useState(0);
  const [fee, setFee] = useState<number>(0);
  const [Payment, setPayment] = useState<Number>(0);

  const [Checked, setChecked] = useState(false);
  let sum = 0;
  let sumwidth = 0;
  let sumheight = 0;
  let sumweight = 0;
  let sumlength = 0;
  const [Receiver, setReceiver] = useState({
    to_ward_name: "",
    to_district_name: "",
    to_province_name: "",
  });
  const [provicei, setProvicei] = useState({
    to_district_id: 0,
    to_ward_code: "0",
  });
  const [serviceId, setServiceId] = useState<number | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     const data = {
  //       update: false,
  //       _id: carts?.carts?.voucher,
  //       iduser: carts?.carts?.userID,
  //     };
  //     if (carts?.carts?.voucher) {
  //       await dispatch(checkVoucher(data));
  //       console.log("s", voucher);
  //     }
  //   })();
  // }, [carts?.carts?.voucher]);

  useEffect(() => {
    if (voucher) {
      if (voucher?.amount > 0) {
        sum = sum - voucher.amount;
        if (sum < 0) {
          setTotal(0);
        } else {
          setTotal(sum);
        }
      } else {
        sum = sum - (sum * voucher.percent) / 100;
        if (sum < 0) {
          setTotal(0);
        } else {
          setTotal(sum);
        }
      }
    } else {
      setTotal(sum);
    }
  }, [voucher]);

  useEffect(() => {
    dispatch(getProvince());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const res = await dispatch(readUserLocal());
      const rescart = await dispatch(readCart(res?.payload?.users?.id));
      if (!rescart?.payload?.products) {
        navigate("/");
      }
    })();
  }, []);

  useEffect(() => {
    setTotal(sum);
  }, [carts?.carts?.products]);

  useEffect(() => {
    (async () => {
      // Build items array from cart products
      const items = carts?.carts?.products?.map((item: any) => ({
        name: item.name || "Product",
        quantity: item.quantity || 1,
        height: item.height || 10,
        weight: item.weight || 200,
        length: item.length || 10,
        width: item.width || 10,
      })) || [];

      const data = {
        from_district_id: 1454,
        from_ward_code: "21211",
        service_id: serviceId,
        service_type_id: null,
        to_district_id: provicei.to_district_id,
        to_ward_code: String(provicei.to_ward_code),
        height: sumheight || 10,
        length: sumlength || 10,
        weight: sumweight || 200,
        width: sumwidth || 10,
        insurance_value: total || 10000,
        cod_failed_amount: 2000,
        coupon: null,
        items: items,
      };

      if (provicei?.to_ward_code && provicei.to_ward_code !== "0" && serviceId) {
        const res = await dispatch(getFee(data));
        if (res?.payload?.total) {
          setFee(res?.payload?.total);
        } else {
          setFee(0);
        }
      }
    })();
  }, [provicei, carts?.carts?.products, serviceId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onAdd: SubmitHandler<any> = async (data: any) => {
    if (provicei.to_district_id == 0 && provicei?.to_ward_code == "0") {
      return toast.info("Vui lòng chọn địa chỉ giao hàng");
    }
    const info = {
      ...Receiver,
      ...data,
    };
    let product = [];
    product = carts?.carts?.products;
    if (!carts?.carts?.products) {
      return toast.info("Không có sản phẩm");
    }

    let _id = "";
    let idv = ""; //id voucher
    if (voucher?._id) {
      idv = voucher?._id;
    }
    _id = carts.carts._id;

    const payment = {
      amount: total + fee,
      orderDescription: "Thanh toán đơn hàng " + carts?.carts?.tm_codeorder,
      orderType: 200000,
      bankCode: "",
      language: "vn",
      orderid: carts?.carts?.tm_codeorder,
    };
    let linkpay = "";
    if (Payment == 1) {
      const res = await dispatch(createUrlPayment(payment));
      if (res?.payload?.code == 200) {
        linkpay = res?.payload?.vnpUrl;
        window.open(res?.payload?.vnpUrl, "_blank");
      } else {
        return toast.error("Lỗi, Vui lòng thử lại");
      }
    }

    let products = {};
    if (Payment == 1) {
      products = {
        _id,
        product,
        infomation: info,
        fee: fee,
        productmonney: total,
        userID: carts?.carts?.userID,
        tm_codeorder: carts?.carts?.tm_codeorder,
        linkpay,
        totalprice: total + fee,
        width: sumwidth,
        length: sumlength,
        height: sumheight,
        weight: sumweight,
        payment_methods: Payment,
        voucher: idv,
      };
    } else {
      products = {
        _id,
        product,
        infomation: info,
        fee: fee,
        productmonney: total,
        userID: carts?.carts?.userID,
        tm_codeorder: carts?.carts?.tm_codeorder,
        linkpay: carts?.carts?.linkpay,
        totalprice: total + fee,
        width: sumwidth,
        length: sumlength,
        height: sumheight,
        weight: sumweight,
        payment_methods: Payment,
        voucher: idv,
      };
    }

    const res = await dispatch(addOrder(products));
    if (res?.payload?.code == 200) {
      toast.success("Thêm đơn hàng thành công");
      // var text =
      //   "Bạn có đơn hàng mới. Mã đơn hàng: " + carts?.carts?.tm_codeorder;
      // axios.post(
      //   "http://api.vidieu.net/sendnoti.php?token=5468324197:AAH3wwUTX_BIMH_GoD7iLDzlfKGWhPdn9tg&text=" +
      //     encodeURIComponent(text) +
      //     "&id=@themanbot9999"
      // );
      navigate("/thankkiu");
    } else {
      navigate("/cart");
    }
  };

  const onVoucher = async () => {
    if (voucher?.amount > 0 || voucher?.percent > 0) {
      const confirm = window.confirm(
        "Chỉ được phép sử dụng 1 mã giảm giá, bạn có muốn sử dụng mã mới không?"
      );
      if (confirm) {
      } else {
        return;
      }
    }
    const data = {
      code,
      iduser: carts?.carts?.userID,
      update: false,
    };
    const res = await dispatch(checkVoucher(data));
    console.log("res", res?.payload);

    if (res?.payload?.code == 200) {
      if (res?.payload?.amount > 0) {
        toast.success(
          "Chúc mừng bạn đã được giảm giá " +
          formatCurrency(res?.payload?.amount)
        );
      } else {
        toast.success(
          "Chúc mừng bạn đã được giảm giá " + res?.payload?.percent + "%"
        );
      }
    }
  };

  const onRemoveVoucher = async () => {
    await dispatch(removeVoucher());
  };

  const onProvince = async (e: any) => {
    setProvicei({
      to_district_id: 0,
      to_ward_code: "0",
    });
    await dispatch(getDistrict(parseInt(e.target.value)));
    setReceiver((old) => ({
      ...old,
      to_province_name: e.target.options[e.target.selectedIndex].text,
    }));
  };

  const onDistrict = async (e: any) => {
    const districtId = parseInt(e.target.value);
    setProvicei((old) => ({
      ...old,
      to_district_id: districtId,
      to_ward_code: "0",
    }));
    setReceiver((old) => ({
      ...old,
      to_district_name: e.target.options[e.target.selectedIndex].text,
    }));
    await dispatch(getWards(districtId));

    // Lấy service_id phù hợp cho tuyến đường
    const serviceRes = await dispatch(getSevicePackage(districtId));
    if (serviceRes?.payload && serviceRes.payload.length > 0) {
      setServiceId(serviceRes.payload[0].service_id);
    }
  };

  const onWard = async (e: any) => {
    setProvicei((old) => ({ ...old, to_ward_code: e.target.value }));
    setReceiver((old) => ({
      ...old,
      to_ward_name: e.target.options[e.target.selectedIndex].text,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onAdd)}>
        <section className="flex gap-8 w-10/12 m-auto py-20">
          <section className="basis-4/6">
            <h4 className="text-2xl font-bold mb-10">THÔNG TIN GIAO HÀNG</h4>
            <table className="table-auto w-full ">
              <label htmlFor="" className="font-semibold">
                Họ và Tên <span className="text-red-700">*</span>
              </label>
              <br />
              <input
                className="border w-8/12 py-3 px-2  mt-5 mb-5"
                type="text"
                placeholder="Họ và Tên"
                {...register("fullname", { required: true })}
              />

              {errors?.fullname && (
                <span className="ml-[5px] font-bold text-red-500">
                  Không được để trống{" "}
                </span>
              )}
            </table>
            <table className="table-auto w-full ">
              <label htmlFor="" className="font-semibold">
                Địa chỉ <span className="text-red-700">*</span>
              </label>
              <br />
              <input
                className="border w-8/12 py-3 px-2  mt-5 mb-5"
                type="text"
                placeholder="Địa chỉ cụ thể"
                {...register("address", { required: true })}
              />
              {errors?.address && (
                <span className="ml-[5px] font-bold text-red-500">
                  Không được để trống{" "}
                </span>
              )}
            </table>
            <table className="table-auto w-full flex pb-[20px]">
              <select
                onChange={(e) => onProvince(e)}
                className="py-[12px] border-[1px]"
                name=""
                id=""
              >
                <option value="">Tỉnh</option>
                {province?.province?.map((item: any, index: number) => {
                  return (
                    <option key={index++} value={item.ProvinceID}>
                      {item.ProvinceName}
                    </option>
                  );
                })}
              </select>
              <select
                onChange={(e) => onDistrict(e)}
                className="py-[12px] mx-[10px] border-[1px]"
                name=""
                id=""
                value={provicei.to_district_id}
              >
                <option value="">Huyện </option>
                {province?.district?.map((item: any, index: number) => {
                  return (
                    <option key={index++} value={item.DistrictID}>
                      {item.DistrictName}{" "}
                    </option>
                  );
                })}
              </select>
              <select
                onChange={(e) => onWard(e)}
                className="py-[12px]  border-[1px]"
                name=""
                id=""
                value={provicei.to_ward_code}
              >
                <option value="">Xã</option>
                {province?.ward?.map((item: any, index: number) => {
                  return (
                    <option key={index++} value={item.WardCode}>
                      {item.WardName}{" "}
                    </option>
                  );
                })}
              </select>
            </table>

            <table className="table-auto w-full ">
              <label htmlFor="" className="font-semibold">
                Số Điện Thoại <span className="text-red-700">*</span>
              </label>
              <br />
              <input
                className="border w-8/12 py-3 px-2  mt-5 mb-5"
                type="text"
                placeholder="Số Điện Thoại"
                {...register("phonenumber", {
                  required: true,
                  pattern: /((09|03|07|08|05|\+84)+([0-9]{8,9})\b)/g,
                })}
              />
              {errors?.phonenumber && (
                <span className="ml-[5px] font-bold text-red-500">
                  Vui lòng nhập đúng định dạng sđt{" "}
                </span>
              )}
            </table>
            <table className="table-auto w-full ">
              <label htmlFor="" className="font-semibold">
                Email <span className="text-red-700">*</span>
              </label>
              <br />
              <input
                className="border w-8/12 py-3 px-2 mt-5 mb-5"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9?:\.?:\_]+@[a-zA-Z0-9-]+\.+([a-zA-Z]{2,5})$/,
                })}
              />
              {errors?.email && (
                <span className="ml-[5px] font-bold text-red-500">
                  Vui lòng viết đúng định dạng email
                </span>
              )}
            </table>
            <table className="table-auto w-full ">
              <label htmlFor="" className="font-semibold">
                Ghi chú
              </label>
              <br />
              <input
                className="border w-8/12 py-3 px-2  mt-5 mb-5"
                type="text"
                placeholder="Ghi chú"
                {...register("note")}
              />
            </table>
          </section>
          <section className="basis-2/6 w-full">
            <section className="bg-zinc-100 mt-12">
              <div className="p-10">
                <p className="text-2xl font-bold mb-[25px]">ĐƠN HÀNG CỦA BẠN</p>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Mã giảm giá
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      placeholder="Nhập mã giảm giá"
                      onChange={(e) => setCode(e.target.value)}
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onVoucher()}
                  className="bg-black m-0 text-white font-semibold p-3 w-30%"
                >
                  Áp dụng
                </button>

                <div className=" pt-5 flex ">
                  <span className="grow font-bold">Sản Phẩm</span>
                  <span className="text-right font-semibold">Giá</span>
                </div>
                {carts?.carts?.products?.map((item: any, index: number) => {
                  if (item.length > sumlength) {
                    sumlength = item.length;
                  }
                  sumheight += item.height;
                  sum += item.quantity * item.price;
                  sumweight += item.weight;
                  if (item.width > sumwidth) {
                    sumwidth = item.width;
                  }
                  return (
                    <div key={index++} className=" pt-5 flex mb-[20px]">
                      <span className="grow flex">
                        {(index = index + 1)}.{" "}
                        <span className="font-bold">{item.name}</span> -{" "}
                        <div
                          style={{ backgroundColor: `${item.color}` }}
                          className="w-[20px] h-[20px] rounded-[50%]"
                        ></div>{" "}
                        - {item.size}
                      </span>
                      <span className="text-right ">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  );
                })}

                <div className="flex justify-between border-dashed border-t-2 border-t-black pt-[20px]">
                  {voucher.amount > 0 ? (
                    <span className="font-bold">
                      Mã giảm giá: {formatCurrency(voucher?.amount)}{" "}
                    </span>
                  ) : (
                    ""
                  )}
                  {voucher.percent > 0 ? (
                    <span className="font-bold">
                      Mã giảm giá: {voucher.percent} %{" "}
                    </span>
                  ) : (
                    ""
                  )}
                  {voucher.amount > 0 || voucher.percent > 0 ? (
                    <button
                      onClick={() => onRemoveVoucher()}
                      type="button"
                      className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    >
                      Xoá
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className=" pt-5 flex ">
                  <span className="grow font-semibold">Tạm Tính </span>
                  <span className="text-right ">{formatCurrency(total)}</span>
                </div>
                <div className=" pt-5 flex justify-between">
                  <div className="flex">
                    <img
                      className="w-[50px] mr-[5px]"
                      src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-En.png"
                      alt=""
                    />{" "}
                    <span>Phí giao hàng:</span>
                  </div>
                  <span className="text-right">
                    {fee ? formatCurrency(fee) : 0}
                  </span>
                </div>
                <div className=" pt-5 flex">
                  <span className="grow font-semibold">Tổng tiền</span>
                  <span className="text-right ">
                    {fee ? formatCurrency(total + fee) : formatCurrency(total)}
                  </span>
                </div>

                <div className="flex flex-col  my-[10px]">
                  <div className="flex items-center mr-4">
                    <input
                      defaultChecked
                      id="inline-radio"
                      type="radio"
                      onClick={() => setPayment(0)}
                      name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="inline-radio"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Thanh toán khi nhận hàng
                    </label>
                  </div>
                  <div className="flex items-center mr-4">
                    <input
                      id="inline-2-radio"
                      type="radio"
                      onClick={() => setPayment(1)}
                      name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="inline-2-radio"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Thanh toán tự động qua VNPAY{" "}
                      <img
                        src="https://i0.wp.com/discvietnam.com/wp-content/uploads/2020/07/C%E1%BB%95ng-thanh-to%C3%A1n-VNPAY-Logo-Th%E1%BA%BB-ATM-T%C3%A0i-kho%E1%BA%A3n-ng%C3%A2n-h%C3%A0ng-Online-Banking-M%C3%A3-QR-QR-Pay-Qu%C3%A9t-QR-Transparent.png?fit=360%2C140&ssl=1"
                        className="w-[80px]"
                        alt=""
                      />
                    </label>
                  </div>
                </div>

                <button className="bg-black text-white font-semibold p-3 mt-10 w-full">
                  Hoàn tất Đơn hàng
                </button>
              </div>
            </section>
          </section>
        </section>
      </form>
    </div>
  );
};

export default CheckoutPage;
