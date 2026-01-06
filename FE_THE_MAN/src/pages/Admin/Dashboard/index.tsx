import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import Swal from "sweetalert2";
import styles from "../Products/ProductManager/ProductManager.module.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Pagination, Spin } from "antd";
import { setPage, thongkes } from "../../../redux/slices/productSlice";
import { formatCurrency, formatCurrencys } from "../../../ultis";
import { SubmitHandler, useForm } from "react-hook-form";
import "./dashboard.css";
import {
  canceledCount,
  confirmedCount,
  statistical_total,
  statisticarQuantity,
  unconfimredCount,
} from "../../../redux/slices/statisticalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaEllipsisV } from "react-icons/fa";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { BiUser } from "react-icons/bi";
import {
  BsCart3,
  BsFilePostFill,
  BsFillFileEarmarkPostFill,
} from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { AiOutlineAreaChart } from "react-icons/ai";

type Inputs = {
  date: String;
};

const Dashboard = () => {
  const { product } = useSelector((state: any) => state?.product);
  const staisticar = useSelector((state: any) => state?.statistical);

  const pages = useSelector((state: any) => state?.product.page);
  const { loading } = useSelector((state: any) => state?.product);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      thongkes({
        gt: startDate ? moment(startDate).format("YYYY-MM-DD") : "2022-5-1",
        lt: endDate ? moment(endDate).format("YYYY-MM-DD") : new Date(),
      })
    );
  }, [dispatch, pages]);
  useEffect(() => {
    dispatch(statisticarQuantity());
  }, []);
  useEffect(() => {
    dispatch(confirmedCount());
  }, []);
  useEffect(() => {
    dispatch(canceledCount());
  }, []);
  useEffect(() => {
    dispatch(unconfimredCount());
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  // const showDetailProduct = async (id: any) => {
  //   const detailProduct = await dispatch(getProduct(id));
  //   return ( <div>
  //     {detailProduct.payload}
  //   </div>)
  // }
  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    dispatch(
      thongkes({
        gt: startDate ? moment(startDate).format("YYYY-MM-DD") : "2022-5-1",
        lt: endDate ? moment(endDate).format("YYYY-MM-DD") : new Date(),
      })
    );

    // dispatch(
    //   filter_product({
    //     name: values?.name || "",
    //     prices: {
    //       gt: values?.start_price || 0,
    //       lt: values?.end_price || 100000000000,
    //     },
    //   })
    // );
  };
  console.log(staisticar?.confirmed);

  return (
    <div>
      <div className={styles.content}>
        <header>
          {/* <div className={styles.title}>Quản lí bài viết</div> */}
          <form
            action=""
            className="inline-flex"
            onSubmit={handleSubmit(onSubmit)}
          >
            <span className="mt-1 mr-2">Ngày bắt đầu : </span>
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <span className="mt-1 mr-2">Ngày kết thúc : </span>

            <DatePicker
              selected={endDate}
              onChange={(date: any) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
            <button className="w-100 inline-flex items-center px-6 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#2A303B] bg-[#4D535E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E] outline-0">
              Thống kê
            </button>
          </form>
        </header>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Spin className="" spinning={true}></Spin>
          </div>
        ) : (
          <div>
            {" "}
            <div>
              <main className="flex flex-col justify-between main">
                <table>
                  <div className=" overflow-hidden">
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">
                      <div className="flex overview">
                        <div className="bg-red-500 flex items-center px-3 text-white rounded-l-md">
                          TT
                        </div>
                        <div className="rounded-r-md flex shadow-sm items-center flex-1 justify-between px-3 py-2 leading-snug border-y border-r">
                          <div>
                            <span className="block font-semibold">
                              Tổng sản phẩm nhập
                            </span>
                            <span className="block text-gray-500">
                              {formatCurrencys(product?.total?.quantity)} Chiếc
                            </span>
                          </div>
                          {/* <div className="text-gray-500">
                       <FontAwesomeIcon icon={faEllipsisV} />
                     </div> */}
                        </div>
                      </div>
                      <div className="flex overview">
                        <div className="bg-red-500 flex items-center px-3 text-white rounded-l-md">
                          TT
                        </div>
                        <div className="rounded-r-md flex shadow-sm items-center flex-1 justify-between px-3 py-2 leading-snug border-y border-r">
                          <div>
                            <span className="block font-semibold">
                              Tổng sản phẩm bán ra
                            </span>
                            <span className="block text-gray-500">
                              {formatCurrencys(product?.total?.sold)} Chiếc
                            </span>
                          </div>
                          {/* <div className="text-gray-500">
                       <FontAwesomeIcon icon={faEllipsisV} />
                     </div> */}
                        </div>
                      </div>
                      <div className="flex overview">
                        <div className="bg-yellow-500 flex items-center px-3 text-white rounded-l-md">
                          SL
                        </div>
                        <div className="rounded-r-md flex shadow-sm items-center flex-1 justify-between px-3 py-2 leading-snug border-y border-r">
                          <div>
                            <span className="block font-semibold">
                              Tổng tiền nhập vào
                            </span>
                            <span className="block text-gray-500">
                              {formatCurrencys(
                                product?.total?.total_import_price
                              )}{" "}
                              VND
                            </span>
                          </div>
                          {/* <div className="text-gray-500">
                       <FontAwesomeIcon icon={faEllipsisV} />
                     </div> */}
                        </div>
                      </div>
                      <div className="flex overview">
                        <div className="bg-green-500 flex items-center px-3 text-white rounded-l-md">
                          DT
                        </div>
                        <div className="rounded-r-md flex shadow-sm items-center flex-1 justify-between px-3 py-2 leading-snug border-y border-r">
                          <div>
                            <span className="block font-semibold">
                              Doanh thu
                            </span>
                            {formatCurrencys(
                              product?.total?.total_export_price
                            )}{" "}
                            VND
                          </div>
                          {/* <div className="text-gray-500">
                     <FontAwesomeIcon icon={faEllipsisV} />
                   </div> */}
                        </div>
                      </div>
                    </section>
                  </div>
                </table>
              </main>
            </div>
            {/* <div className="pt-10 font-semibold text-lg">Sản phẩm bán chạy</div> */}
            <div>
              <main className="flex flex-col justify-between statis main">
                {product?.list?.length != 0 ? (
                  <table className="mb-2">
                    <thead>
                      <tr className="thead">
                        <td>STT</td>
                        <td>Tên</td>
                        <td>Giá nhập</td>
                        <td>Giá bán</td>
                        <td>SL nhập vào</td>
                        <td>SL bán ra</td>
                        <td>SL tồn</td>
                        <td>TT nhập vào</td>
                        <td>Doanh thu</td>
                      </tr>
                    </thead>
                    <tbody>
                      {product?.list?.map((e: any, index: any) => {
                        return (
                          <tr key={index++}>
                            <td>{(pages - 1) * 10 + ++index}</td>
                            <td className="">{e?.product?.name}</td>
                            <td className="">
                              {formatCurrencys(
                                e?.product?.listed_price
                                  ? e?.product?.listed_price
                                  : 0
                              )}{" "}
                              <sup className="">đ</sup>
                            </td>

                            <td className="">
                              {formatCurrencys(
                                e?.product?.price ? e?.product?.price : 0
                              )}{" "}
                              <sup className="">đ</sup>
                            </td>
                            <td className="">
                              {e?.product?.quantity ? e?.product?.quantity : 0}
                            </td>
                            <td className="">{e?.sold ? e?.sold : 0}</td>
                            <td className="">
                              {e?.product?.stock ? e?.product?.stock : 0}
                            </td>
                            <td className="">
                              {formatCurrencys(
                                e?.product?.total_import_price
                                  ? e?.product?.total_import_price
                                  : 0
                              )}{" "}
                              <sup className="">đ</sup>
                            </td>
                            <td className="">
                              {formatCurrencys(e?.tiendaban ? e?.tiendaban : 0)}{" "}
                              <sup className="">đ</sup>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center font-semibold">
                    Không có sản phẩm nào
                  </div>
                )}
              </main>
            </div>
            {/* <div className="pt-10 font-semibold text-lg">Sản phẩm bán chạy</div> */}

            <main className=" statis">
              <div className="py-5 font-semibold text-sm text-center">
                Số lượng mục và trạng thái đơn hàng
              </div>
              <div className="statiscar_quantity">
                <span className="flex ">
                  {" "}
                  <span className="BiUser_item">
                    <BiUser className="BiUser" />
                  </span>
                  <span className="pl-2">
                    <p className="text-center font-bold text-lg mt-2">
                      {staisticar?.data?.users}
                    </p>
                    <span>Khách hàng</span>
                  </span>
                </span>
                <span className="flex ">
                  {" "}
                  <span className="BiUser_post">
                    <BsFillFileEarmarkPostFill className="Post" />
                  </span>
                  <span className="pl-2">
                    <p className="text-center font-bold text-lg mt-2">
                      {staisticar?.data?.posts}
                    </p>
                    <span>Bài viết</span>
                  </span>
                </span>
                <span className="flex ">
                  {" "}
                  <span className="BiUser_product">
                    <AiOutlineAreaChart className="product" />
                  </span>
                  <span className="pl-2">
                    <p className="text-center font-bold text-lg mt-2">
                      {staisticar?.data?.products}
                    </p>
                    <span>Sản Phẩm</span>
                  </span>
                </span>
                <span className="flex ">
                  {" "}
                  <span className="BiUser_order">
                    <BsCart3 className="order" />
                  </span>
                  <span className="pl-2">
                    <p className="text-center font-bold text-lg mt-2">
                      {staisticar?.data?.orders}
                    </p>
                    <span>Hóa đơn</span>
                  </span>
                </span>
              </div>
              <hr className="mt-7" />
              <table className="mb-2">
                <thead>
                  <tr>
                    <td className="text-center">Đã xác nhận</td>
                    <td>Đã hủy</td>
                    <td>Chưa xác nhận</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">{staisticar?.confirmed}</td>
                    <td>{staisticar?.canceled}</td>
                    <td>{staisticar?.unconfimred}</td>
                  </tr>
                </tbody>
              </table>
            </main>
            {/* <main className="statiscar_quantity statis">
              
            </main> */}
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
