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
import styles from "./ProductManager.module.css";
import { getAll } from "../../../../api-cilent/Post";
import { Pagination } from "antd";
import {
  filter_user,
  getUser,
  getUsers,
  setPage,
} from "../../../../redux/slices/userSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../../../models/User";

type Props = {};
type Inputs = {
  fullname: String;
  email: String;
};

const UserManager = (props: Props) => {
  const user = useSelector((state: any) => state?.user);
  const statusObj = {
    active: "bg-green-500",
    block: "bg-red-600",
  };

  const pages = useSelector((state: RootState) => state?.user.page);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getUsers({
        page: pages,
        limit: 10,
      })
    );
  }, [dispatch, pages]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    dispatch(
      filter_user({
        fullname: values?.fullname || "",
        email: values?.email || "",
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
              placeholder="Tên người dùng"
              type="text"
              {...register("fullname")}
              id=""
            />
          </div>{" "}
          <div className="pr-4">
            <input
              className="pl-4 border-2 border-gray-300 border-solid min-w-[250px] py-[6px] rounded-md outline-0"
              placeholder="Tên người dùng"
              type="text"
              {...register("email")}
              id=""
            />
          </div>
          <button className=" inline-flex items-center px-6 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#2A303B] bg-[#4D535E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E] outline-0">
            Tìm kiếm
          </button>
        </form>
        <Link to="add" className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#2A303B] bg-[#4D535E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E]"
          >
            <TiPlus className="text-[20px] mr-2" />
            Thêm người dùng
          </button>
        </Link>
      </header>
      <main className="flex flex-col justify-between ">
        <table>
          <thead>
            <tr>
              <td>STT</td>
              <td>Họ Tên</td>
              {/* <td>Hình ảnh</td> */}
              <td>Email</td>
              <td className="text-center">Trạng Thái</td>
              <td>Sửa</td>
            </tr>
          </thead>
          <tbody>
            {user?.Users?.users?.map((e: User, index: any) => {
              return (
                <tr key={index}>
                  <td>{(pages - 1) * 10 + ++index}</td>

                  <td>{e.fullname}</td>
                  {/* <td>
                    <img
                      className={styles.image}
                      src={e.img}
                      alt=""
                      width="100px"
                    />
                  </td> */}
                  <td className="w-16 ">{e.email}</td>
                  <td className="flex justify-center">
                  <div
                      className={`${
                        statusObj[e.status]
                      } text-xs text-white rounded-full inline-block py-1 px-2.5 leading-none whitespace-nowrap align-baseline font-bold  text-center`}
                    >
                      {e.status}
                    </div>
                  </td>
                  <td className={styles.action}>
                    <Link
                      className="flex justify-center"
                      to={`/admin/users/${e._id}/edit`}
                    >
                      <AiOutlineEdit className={styles.edit} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          defaultCurrent={1}
          total={user?.Users.count}
          pageSize={10}
          onChange={(pages) => {
            dispatch(setPage(pages));
          }}
        />
      </main>
    </div>
  );
};

export default UserManager;
