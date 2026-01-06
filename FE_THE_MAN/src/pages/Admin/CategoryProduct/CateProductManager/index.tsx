import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ICatePro } from "../../../../models/CatePro";
import {
  deleteCatePro,
  getCateadmin,
  getCatePro,
} from "../../../../redux/slices/cateProductSlice";
import { RootState, useAppDispatch } from "../../../../redux/store";
import styles from "./CateProductManager.module.css";

type Props = {};

const CategoryProductManager = (props: Props) => {
  const catePro = useSelector((state: RootState) => state.catePro);
  const statusObj = {
    ACTIVE: "bg-green-500",
    DEACTIVE: "bg-red-600",
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCateadmin());
  }, [dispatch]);
  const handremove = (id: any) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa không?",
      text: "Không thể hoàn tác sau khi xóa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteCatePro(id));
        Swal.fire("Thành công!", "Xóa thành công.", "success");
        dispatch(getCatePro());
      }
    });
  };

  return (
    <div className={styles.content}>
      <header>
        <div className={styles.title}>Danh mục sản phẩm</div>

        <Link to="add" className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <TiPlus className="text-[20px] mr-2" />
            Thêm danh mục
          </button>
        </Link>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <td>STT</td>
              <td>Tên danh mục</td>
              <td>Hình ảnh</td>
              <td className="text-center">Trạng thái</td>
              <td>Hoạt động</td>
            </tr>
          </thead>
          <tbody>
            {catePro?.cateproducts?.map((item: ICatePro, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      className={styles.image}
                      src={item.image}
                      alt=""
                      width="100px"
                    />
                  </td>
                  <td className="text-center">
                    <div
                      className={`${
                        statusObj[item.status]
                      } text-xs text-white rounded-full inline-block py-1 px-2.5 leading-none whitespace-nowrap align-baseline font-bold  text-center`}
                    >
                      {item.status == "ACTIVE"
                        ? "Đang hoạt động"
                        : "Ngừng hoạt động"}
                    </div>
                  </td>
                  <td className={styles.action}>
                    <Link to={`/admin/category_product/${item._id}/edit`}>
                      <AiOutlineEdit className={styles.edit} />
                    </Link>
                    {/* <AiOutlineDelete
                      onClick={() => handremove(item._id)}
                      className={styles.delete}
                    /> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default CategoryProductManager;
