import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlineMessage,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  deleteContact,
  getAllContact,
  readContact,
} from "../../../../redux/slices/contactSlice";
import { RootState } from "../../../../redux/store";

import styles from "./Contact.module.css";

type Props = {};

const ContactManager = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const contactList = useSelector((state: RootState) => state.contact.contacts);
  const contact = useSelector((state: any) => state.contact?.contact);
  // console.log(contact);

  const dispatch = useDispatch<any>();

  const handleRemove = (id: any) => {
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
        await dispatch(deleteContact(id)).unwrap();
        Swal.fire("Thành công!", "Xóa thành công.", "success");
      }
    });
  };
  useEffect(() => {
    dispatch(getAllContact());
  }, [dispatch]);

  const showDetailContact = async (id: string) => {
    await dispatch(readContact(id));
    setIsShowModal(true);
  };
  return (
    <div className={styles.content}>
      <header>
        {/* <div className={styles.title}>Danh sách liên hệ</div> */}
        <form action="" className="inline-flex">
          <div className="pr-4">
              <input className="pl-4 border-2 border-gray-400 border-solid min-w-[250px] py-[6px] rounded-xl"  placeholder="Tìm kiếm" type="text" name="" id="" />
          </div>
          <div className="pr-4">
              <input className="pl-4 border-2 border-gray-400 border-solid min-w-[250px] py-[6px] rounded-xl"  placeholder="Tìm kiếm" type="text" name="" id="" />
          </div>
          <div className="pr-4">
              <input className="pl-4 border-2 border-gray-400 border-solid min-w-[250px] py-[6px] rounded-xl"  placeholder="Tìm kiếm" type="text" name="" id="" />
          </div>
        <button className="inline-flex items-center px-6 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A303B] hover:bg-[#4D535E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E]">Tìm kiếm</button>
        </form>
      </header>
      <main>
        {contactList?.length === 0 ? (
          <div className={styles.emptyData}>Không có dữ liệu</div>
        ) : (
          <table>
            <thead>
              <tr>
                <td>STT</td>
                <td>Họ Và Tên</td>
                <td>Email</td>
                <td>Số Điện Thoại</td>
                <td>Hành động</td>
              </tr>
            </thead>
            <tbody>
              {contactList?.map((item: any, index: any) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>

                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td className={styles.action}>
                      <AiOutlineInfoCircle
                        className={styles.info}
                        onClick={() => showDetailContact(item._id)}
                      />
                      <AiOutlineDelete
                        onClick={() => handleRemove(item._id)}
                        className={styles.delete}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
      {isShowModal ? (
        <div
          className="modal fixed z-[999] inset-0 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="flex min-h-screen text-center  md:block md:px-2 lg:px-4"
            style={{ fontSize: 0 }}
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block"
              aria-hidden="true"
              onClick={() => setIsShowModal(false)}
            />
            <div className="text-base flex justify-center items-center absolute top-[15%] right-[28%] text-left transform transition md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
              <div className="rounded relative bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <div
                  className="modal-close absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  onClick={() => setIsShowModal(false)}
                >
                  <AiOutlineClose />
                </div>
                <div
                  className="modal-container items-start"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mt-3 text-left sm:mt-0 sm:ml-4 w-[500px]">
                    <h1 className="font-bold text-xl uppercase">
                      Chi tiết phản hồi
                    </h1>
                    <div className="group mt-5 flex items-center gap-3">
                      <AiOutlineUser className="text-xl" />
                      <span>{contact?.fullName}</span>
                    </div>
                    <div className="group mt-5 flex items-center gap-3">
                      <AiOutlineMail className="text-xl" />
                      <span>{contact?.email}</span>
                    </div>
                    <div className="group mt-5 flex items-center gap-3">
                      <AiOutlinePhone className="rotate-90 text-xl" />
                      <span>{contact?.phoneNumber}</span>
                    </div>
                    <div className="group mt-5 flex items-center gap-3">
                      <AiOutlineHome className="text-xl" />
                      <span>{contact?.address}</span>
                    </div>
                    <div className="group mt-5 flex flex-col gap-3">
                      <AiOutlineMessage className="text-xl" />
                      <p className="break-all">{contact.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ContactManager;
