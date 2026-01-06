import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts
} from "../../../../redux/slices/postSlice";
import { useAppDispatch } from "../../../../redux/store";
import { RootState } from "../../../../redux/store";
import "../../../../styleAntd/panigation.css";
import Swal from "sweetalert2";
import styles from "../../Products/ProductManager/ProductManager.module.css";
import { Pagination } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  filterCommnets,
  getAllcomment,
  removeComemnt,
} from "../../../../api-cilent/User";
import moment from "moment";

type Props = {};
type Inputs = {
  title: String;
};
const CommetManager = (props: Props) => {
  const post = useSelector((state: RootState) => state?.post);
  const [data, setData] = useState<any>();
  const [pages, setPage] = useState(1);
  const [search, setSearch] = useState();
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      if (!search) {
        await getData();
      } else {
        await onSubmit();
      }
    })();
  }, [pages]);
  const getData = async () => {
    const { data } = await getAllcomment(pages, 10);
    setData(data);
    
  };
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
        await removeComemnt(id);
        await getData();
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

  const onSubmit = async () => {
    (async () => {
      const { data } = await filterCommnets(search, pages, 10);
      setData(data);
    })();
  };

  return (
    <div className={styles.content}>
      <header>
        {/* <div className={styles.title}>Quản lí bài viết</div> */}
        <form onSubmit={(e) => e.preventDefault()} className="inline-flex">
          <div className="pr-4">
            <input
              className="pl-4 border-2 border-gray-400 border-solid min-w-[250px] py-[6px] rounded-xl"
              placeholder="Nhập nội dung"
              type="text"
              value={search}
              onChange={(e: any) => {
                setSearch(e?.target?.value);
              }}
              id=""
            />
          </div>

          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex items-center px-6 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A303B] hover:bg-[#4D535E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E]"
          >
            Tìm kiếm
          </button>
        </form>
      </header>
      <main className="flex flex-col justify-between ">
        <table>
          <thead>
            <tr>
              <td>STT</td>
              <td>Tài Khoản</td>
              <td>Sản phẩm</td>
              <td>Nội dung</td>
              <td>Thời gian bình luận</td>
              <td>Hành động</td>
            </tr>
          </thead>
          <tbody>
            {data?.Comments?.map((e: any, index: any) => {
              const date = moment(e.createdAt).format("DD-MM-YYYY hh:mm:ss");
              return (
                <tr key={index}>
                  <td>{(pages - 1) * 10 + ++index}</td>
                  <td>{e.user?.email}</td>
                  <td>{e.product?.name}</td>
                  <td>{e.content}</td>
                  <td>{date}</td>
                  <td className={styles.action}>
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
          total={data?.count}
          pageSize={10}
          onChange={(pages) => {
            setPage(pages);
          }}
        />
      </main>
    </div>
  );
};

export default CommetManager;
