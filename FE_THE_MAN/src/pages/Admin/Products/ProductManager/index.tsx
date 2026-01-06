import React, { useEffect } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import styles from "./ProductManager.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
  getProduct,
  setPage,
  filter_product,
  getProductadmins,
  filter_product_admin,
} from "../../../../redux/slices/productSlice";
import { useAppDispatch } from "../../../../redux/store";
import { RootState } from "../../../../redux/store";
import ReactPaginate from "react-paginate";
import "../../../../styleAntd/panigation.css";
import Swal from "sweetalert2";
import { getAll } from "../../../../api-cilent/Product";
import { Pagination } from "antd";
import "../../Dashboard/dashboard.css";
import "../../../OrderStatus/Cancel/index.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Product } from "../../../../models/Product";
type Props = {};
type Inputs = {
  name: String;
  start_price: Number;
  end_price: Number;
};

const ProductManager = (props: Props) => {
  const product = useSelector((state: RootState) => state?.product);
  console.log("product", product);

  const pages = useSelector((state: RootState) => state?.product.page);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getProductadmins({
        page: pages,
        limit: 10,
      })
    );
  }, [dispatch, pages]);
  const statusObj = {
    ACTIVE:
      "text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full",
    DEACTIVE:
      "text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded-full",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    dispatch(
      filter_product_admin({
        page: pages,
        limit: 10,
        name: values?.name || "",
        prices: {
          gt: values?.start_price || 0,
          lt: values?.end_price || 100000000000,
        },
        size: "",
      })
    );
  };

  return (
    <div className={styles.content}>
      <header>
        {/* <div className={styles.title}>Danh sách sản phẩm</div> */}
        <form
          action=""
          className="inline-flex"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="pr-4">
            <input
              className="pl-4 border-2 border-gray-300 border-solid min-w-[250px] py-[6px] rounded-md outline-0"
              placeholder="Tên sản phẩm"
              type="text"
              {...register("name")}
              id=""
            />
          </div>
          <div className="pr-4">
            <input
              type="number"
              {...register("start_price")}
              id="price-add-product"
              className="pl-4 border-2 border-gray-300 border-solid min-w-[250px] py-[6px] rounded-md outline-0"
              placeholder="Từ giá"
            />
          </div>
          <div className="pr-4">
            <input
              type="number"
              {...register("end_price")}
              id="price-add-product"
              className="pl-4 border-2 border-gray-300 border-solid min-w-[250px] py-[6px] rounded-md  outline-0"
              placeholder="Đến giá"
            />
          </div>
          <button className="search-add inline-flex items-center px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#2A303B] bg-[#4D535E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E] outline-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Tìm kiếm
          </button>
        </form>
        <Link to="add" className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#2A303B] bg-[#4D535E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E]"
          >
            <TiPlus className="text-[20px] mr-2" />
            Thêm sản phẩm
          </button>
        </Link>
      </header>

      <main>
        {product?.products?.products?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <td>STT</td>
                <td>Tên sản phẩm</td>
                <td>Ảnh sản phẩm</td>
                <td>Giá sản phẩm</td>
                <td>Chi tiết sản phẩm</td>
                <td className="text-center">Trạng Thái</td>

                <td>Hành động</td>
              </tr>
            </thead>
            <tbody>
              {product?.products?.products?.map((item:Product, index: any) => {
                return (
                  <tr key={item._id}>
                    <td>{(pages - 1) * 10 + ++index}</td>

                    <td>{item.name}</td>
                    <td>
                      <img
                        className={styles.image}
                        src={item.image}
                        alt=""
                        width="100px"
                      />
                    </td>
                    <td>{item.price}đ</td>
                    <td>
                      <div className="h-[150px] w-[250px] overflow-x-auto scoll">
                        {item?.desc?.length > 90
                          ? `${item?.desc?.slice(0, 90)}...`
                          : item?.desc}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className={`${statusObj[item.status]} text-center`}>
                        {item.status == "ACTIVE"
                          ? "Đang hoạt động"
                          : "Ngừng hoạt động"}
                      </div>
                    </td>
                    <td className={styles.action}>
                      {/* <AiOutlineInfoCircle className={styles.info} onClick={() => showDetailProduct(item._id)}/> */}
                      <Link to={`/admin/products/${item._id}/edit`}>
                        <AiOutlineEdit className={styles.edit} />
                      </Link>

                      {/* <AiOutlineDelete
                        onClick={() => handleRemove(item._id)}
                        className={styles.delete}
                      /> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-md font-semibold">
            Không tìm thấy sản phẩm
          </div>
        )}
        <Pagination
          defaultCurrent={1}
          total={product?.products.count}
          pageSize={10}
          onChange={(pages) => {
            dispatch(setPage(pages));
          }}
        />
      </main>
    </div>
  );
};

export default ProductManager;
