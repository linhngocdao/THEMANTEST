import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useAppDispatch } from "../../../../redux/store";
import { RootState } from "../../../../redux/store";
import ReactPaginate from "react-paginate";
import "../../../../styleAntd/panigation.css";
import Swal from "sweetalert2";
import styles from "../../Products/ProductManager/ProductManager.module.css";
import { getAll } from "../../../../api-cilent/Post";
import { Pagination } from "antd";
import {
  deleteSlider,
  getSliders,
  setPage,
} from "../../../../redux/slices/Slider";

type Props = {};

const SliderManager = (props: Props) => {
  const post = useSelector((state: RootState) => state?.slider);

  const pages = useSelector((state: RootState) => state?.slider.page);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getSliders({
        page: pages,
        limit: 10,
      })
    );
  }, [dispatch, pages]);

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
        await dispatch(deleteSlider(id));
        Swal.fire("Thành công!", "Xóa thành công.", "success");
        dispatch(
          getSliders({
            page: pages,
            limit: 10,
          })
        );
      }
    });
  };

  return (
    <div className={styles.content}>
      <header>
        <div className={styles.title}>Quản lí slider</div>

        <Link to="/admin/slider/add" className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <TiPlus className="text-[20px] mr-2" />
            Thêm slider
          </button>
        </Link>
      </header>
      <main className="flex flex-col justify-between ">
        <table>
          <thead>
            <tr>
              <td>STT</td>
              <td>Tiêu đề</td>
              <td>Hình ảnh</td>
              <td>Đường dẫn</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {post?.Sliders.Slider?.map((e: any, index: any) => {
              return (
                <tr key={index}>
                  <td>{(pages - 1) * 10 + ++index}</td>

                  <td>{e.title}</td>
                  <td>
                    <img
                      className={styles.image}
                      src={e.image}
                      alt=""
                      width="100px"
                    />
                  </td>
                  <td>{e.url}</td>
                  <td className={styles.action}>
                    <Link to={`/admin/slider/${e._id}/edit`}>
                      <AiOutlineEdit className={styles.edit} />
                    </Link>

                    <AiOutlineDelete
                      onClick={() => handremove(e._id)}
                      className={styles.delete}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          defaultCurrent={1}
          total={post?.Sliders.count}
          pageSize={10}
          onChange={(pages) => {
            dispatch(setPage(pages));
          }}
        />
      </main>
    </div>
  );
};

export default SliderManager;
