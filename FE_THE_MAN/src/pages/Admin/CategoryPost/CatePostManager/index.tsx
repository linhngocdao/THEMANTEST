import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteCatePost,
  getAllCatePosts,
} from "../../../../redux/slices/catePostSlice";
import styles from "./CatePostManager.module.css";

type Props = {};

const CategoryPostManager = () => {
  const cateposts = useSelector((state: any) => state.catepost);

  // console.log(cateposts);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getAllCatePosts());
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
        await dispatch(deleteCatePost(id));
        Swal.fire("Thành công!", "Xóa thành công.", "success");
        dispatch(getAllCatePosts());
      }
    });
  };

  return (
    <div className={styles.content}>
      <header>
        <div className={styles.title}>Danh mục bài viết</div>

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
              <td>Hoạt động</td>
            </tr>
          </thead>
          <tbody>
            {cateposts?.cateposts?.map((item: any, index: any) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td className={styles.action}>
                    <Link to={`/admin/category_post/${item._id}/edit`}>
                      <AiOutlineEdit className={styles.edit} />
                    </Link>

                    <AiOutlineDelete
                      onClick={() => handremove(item._id)}
                      className={styles.delete}
                    />
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

export default CategoryPostManager;
