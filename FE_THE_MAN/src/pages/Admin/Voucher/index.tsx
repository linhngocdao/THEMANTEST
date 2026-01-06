import moment from "moment";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getVouchers,
  removeVoucherData,
} from "../../../redux/slices/voucherSlice";
import styles from "./CatePostManager.module.css";

type Props = {};

const VoucherManager = () => {
  const vouchers = useSelector((state: any) => state.voucher);
  // console.log("vc", vouchers);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    (async () => {
      await dispatch(getVouchers());
    })();
  }, []);
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
        const res = await dispatch(removeVoucherData(id));
        if (res?.payload?.result == 200) {
          Swal.fire("Thành công!", "Xóa thành công.", "success");
        } else {
          Swal.fire("Lỗi!", "Lỗi gì đó.", "error");
        }
      }
    });
  };

  return (
    <div className={styles.content}>
      <header>
        <div className={styles.title}>Danh sách voucher</div>

        <Link to="add" className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <TiPlus className="text-[20px] mr-2" />
            Thêm voucher
          </button>
        </Link>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <td>STT</td>

              <td>Mã</td>
              <td>Giảm</td>
              <td>Giới hạn lần sử dụng</td>
              <td>Đã sử dụng </td>
              <td>Bắt đầu</td>
              <td>Kết thúc</td>
              <td>Giới hạn tài khoản</td>
              <td>Tài khoản</td>
              <td className="text-center">Trạng thái</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {vouchers?.vouchers?.map((item: any, index: any) => {
              return (
                <tr key={item?._id}>
                  <td>{index + 1}</td>

                  <td>{item?.code}</td>
                  <td>
                    {item?.amount > 0 ? (
                      <NumberFormat
                        value={item?.amount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={""}
                      />
                    ) : (
                      <NumberFormat
                        value={item?.percent}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={""}
                      />
                    )}{" "}
                    {item?.amount > 0 ? "VNĐ" : "%"}
                  </td>
                  <td>{item?.numberofuses} lần</td>
                  <td>{item?.numberoftimesused} lần</td>
                  <td>{item?.startday}</td>
                  <td>{item?.endtime}</td>
                  <td>{item?.limiteduse} lần</td>
                  <td>{item?.timeuser} ngày</td>
                  <td className="text-center">
                    {item?.numberofuses <= item?.numberoftimesused ||
                    moment(item?.endtime).unix() <= moment().unix() ? (
                      <p className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full">
                        Ngừng hoạt động
                      </p>
                    ) : (
                      <p className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded-full">
                        Đang hoạt động
                      </p>
                    )}
                  </td>
                  <td className={styles.action}>
                    <Link to={`/admin/vouchers/${item?._id}/edit`}>
                      <AiOutlineEdit className={styles.edit} />
                    </Link>

                    <AiOutlineDelete
                      onClick={() => handremove(item?._id)}
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

export default VoucherManager;
