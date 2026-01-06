import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePosts,
  filter_post,
  getAllCatePosts,
  getPosts,
  setPage,
} from "../../../../redux/slices/postSlice";
import { useAppDispatch } from "../../../../redux/store";
import { RootState } from "../../../../redux/store";
import ReactPaginate from "react-paginate";
import "../../../../styleAntd/panigation.css";
import Swal from "sweetalert2";
import styles from "../../Products/ProductManager/ProductManager.module.css";
import { getAll } from "../../../../api-cilent/Post";
import { Pagination } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {};
type Inputs = {
  title: String;
};
const PostManager = (props: Props) => {
  const post = useSelector((state: RootState) => state?.post);
  console.log(post);

  const pages = useSelector((state: RootState) => state?.post.page);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getPosts({
        page: pages,
        limit: 10,
      })
    );
  }, [dispatch, pages]);
  useEffect(() => {
    dispatch(getAllCatePosts());
  }, [dispatch, pages]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

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
        await dispatch(deletePosts(id));
        Swal.fire("Thành công!", "Xóa thành công.", "success");
        dispatch(
          getPosts({
            page: pages,
            limit: 10,
          })
        );
      }
    });
  };

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    dispatch(
      filter_post({
        title: values?.title || "",
      })
    );
  };
  console.log(post?.posts);

  return (
    <div className={styles.content}>
      <header>
        {/* <div className={styles.title}>Quản lí bài viết</div> */}
        <form
          action=""
          className="inline-flex"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="pr-4">
            <input
              className="pl-4 border-2 border-gray-400 border-solid min-w-[250px] py-[6px] rounded-xl"
              placeholder="Nhập tiêu đề"
              type="text"
              {...register("title")}
              id=""
            />
          </div>

          <button className="inline-flex items-center px-6 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A303B] hover:bg-[#4D535E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E]">
            Tìm kiếm
          </button>
        </form>
        <Link to="/admin/post/add" className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <TiPlus className="text-[20px] mr-2" />
            Thêm bài viết
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
              <td>Mô tả ngắn</td>
              <td>Mô tả</td>
              <td>Danh mục</td>
              <td>Nội dung</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {post?.posts?.Post?.map((e: any, index: any) => {
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
                  <td className="w-60">{e.descShort.slice(0, 90)}</td>
                  <td>{e.desc.slice(0, 90)}</td>
                  <td className="w-28">{e?.categoryId?.name}</td>
                  {/* <td>{e.categoryId.name}</td> */}
                  <td className="w-60">{e.content.slice(0, 90)}</td>
                  <td className={styles.action}>
                    <Link to={`/admin/post/${e._id}/edit`}>
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
          total={post?.posts.count}
          pageSize={10}
          onChange={(pages) => {
            dispatch(setPage(pages));
          }}
        />
      </main>
    </div>
  );
};

export default PostManager;
