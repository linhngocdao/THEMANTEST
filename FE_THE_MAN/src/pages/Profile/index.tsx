import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getDistrict,
  getFee,
  getProvince,
  getWards,
} from "../../redux/slices/provinceSlice";
import { readUserLocal } from "../../redux/slices/userSlice";

import styles from "./Contact.module.css";

type Props = {};
type Inputs = {
  fullname: string;
  phone: string;
  address: string;
  email: string;
  image: string;
  //   content: string;
};

const Profile = (props: Props) => {
  const dispatch = useDispatch<any>();
  const [preview, setPreview] = useState<string>();
  const onProvince = async (e: any) => {
    await dispatch(getDistrict(parseInt(e.target.value)));
    setReceiver((old) => ({
      ...old,
      to_province_name: e.target.options[e.target.selectedIndex].text,
    }));
  };

  const [provicei, setProvicei] = useState({
    to_district_id: 0,
    to_ward_code: 0,
  });
  const [Receiver, setReceiver] = useState({
    to_ward_name: "",
    to_district_name: "",
    to_province_name: "",
  });
  const onWard = async (e: any) => {
    setProvicei((old) => ({ ...old, to_ward_code: parseInt(e.target.value) }));
    setReceiver((old) => ({
      ...old,
      to_ward_name: e.target.options[e.target.selectedIndex].text,
    }));
  };
  const province = useSelector((state: any) => state.province);
  useEffect(() => {
    dispatch(getProvince());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onDistrict = async (e: any) => {
    await dispatch(getWards(parseInt(e.target.value)));
    setProvicei((old) => ({
      ...old,
      to_district_id: parseInt(e.target.value),
    }));
    setReceiver((old) => ({
      ...old,
      to_district_name: e.target.options[e.target.selectedIndex].text,
    }));
  };

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    console.log(values);

    // try {
    // //   await dispatch(addContact(values));
    //   reset();
    //   toast.success("Gửi phản hồi thành công !", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // } catch (error: any) {
    //   const message = error?.response.data.message;
    //   toast.error(message, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
  };
  return (
    <div>
      <div className={styles.form_container}>
        <h2 className={styles.title}>Thông tin người dùng</h2>
        <form className={styles.form_contact} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label htmlFor="" className={styles.text_label}>
                Tên người dùng
              </label>
              <input
                className={`${errors.fullname && styles.input_error}`}
                {...register("fullname", {
                  required: "Vui lòng nhập họ và tên",
                  minLength: {
                    value: 10,
                    message: "Vui lòng nhập đầy đủ họ tên",
                  },
                })}
                type="text"
                placeholder="Tên của bạn"
              />
              <p className={styles.error}>{errors.fullname?.message}</p>
            </div>
            {/* <div className={styles.form_group}>
              <input
                className={`${errors.address && styles.input_error}`}
                {...register("address", {
                  required: "Vui lòng nhập địa chỉ",
                  minLength: {
                    value: 15,
                    message: "Vui lòng nhập địa chỉ cụ thể",
                  },
                })}
                type="text"
                placeholder="Địa chỉ của bạn"
              />
              <p className={styles.error}>{errors.address?.message}</p>
            </div> */}
            <div>
              <label htmlFor="" className={styles.text_label}>
                Địa chỉ
              </label>
              <table className="table-auto w-full flex">
                <select
                  onChange={(e) => onProvince(e)}
                  className={styles.addpress}
                  name=""
                  id=""
                >
                  <option value="">Tỉnh</option>
                  {province.province?.map((item: any, index: number) => {
                    return (
                      <option key={index++} value={item.ProvinceID}>
                        {item.ProvinceName}
                      </option>
                    );
                  })}
                </select>
                <select
                  onChange={(e) => onDistrict(e)}
                  className={`${styles.addpress} mx-5`}
                  name=""
                  id=""
                >
                  <option value="">Huyện </option>
                  {province?.district?.map((item: any, index: number) => {
                    return (
                      <option key={index++} value={item.DistrictID}>
                        {item.DistrictName}{" "}
                      </option>
                    );
                  })}
                </select>
                <select
                  onChange={(e) => onWard(e)}
                  className={styles.addpress}
                  name=""
                  id=""
                >
                  <option value="">Xã</option>
                  {province?.ward?.map((item: any, index: number) => {
                    return (
                      <option key={index++} value={item.WardCode}>
                        {item.WardName}{" "}
                      </option>
                    );
                  })}
                </select>
              </table>
            </div>
          </div>
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label htmlFor="" className={styles.text_label}>
                Email
              </label>
              <input
                className={`${errors.email && styles.input_error}`}
                {...register("email", {
                  required: "Vui lòng nhập email",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Vui lòng nhập đúng định dạng email",
                  },
                })}
                type="text"
                placeholder="Email của bạn"
              />
              <p className={styles.error}>{errors.email?.message}</p>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="" className={styles.text_label}>
                Số điện thoại
              </label>
              <input
                className={`${errors.phone && styles.input_error}`}
                {...register("phone", {
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                    message: "Vui lòng nhập đúng định dạng số điện thoại",
                  },
                })}
                type="text"
                placeholder="Số điện thoại của bạn"
              />
              <p className={styles.error}>{errors.phone?.message}</p>
            </div>
          </div>
          {/* <div className={styles.form_group}>
            <textarea
              className={`${styles.area} ${
                errors.content && styles.input_error
              }`}
              defaultValue={""}
              placeholder="Nội dung"
              {...register("content", {
                required: "Vui lòng nhập nội dung",
              })}
            />
            <p className={styles.error}>{errors.content?.message}</p>
          </div> */}
          <div className={styles.form_row}>
            <div>
              <label htmlFor="" className={styles.text_label}>
                Hình ảnh
              </label>

              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <input
                      {...register("image", {
                        required: "Vui lòng chọn ảnh",
                      })}
                      onChange={(e: any) => {
                        setPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                      id="file-upload"
                      type="file"
                    />
                    <div className="text-sm mt-0.5 text-red-500">
                      {errors.image?.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <label htmlFor="" className={styles.text_label}>
                Ảnh xem trước
              </label>

              <div className="mt-1 w-40 h-40 relative">
                <img
                  src={
                    preview ||
                    "https://res.cloudinary.com/assignmentjs/image/upload/c_thumb,w_200,g_face/v1648723660/img/noimage_mzjwxl.png"
                  }
                  alt="Preview Image"
                  className="h-40 w-40 rounded-sm object-cover"
                />
              </div>
            </div>
            {/* End image review */}

            {/* Add image */}
          </div>

          <button className={styles.btn}>Cập nhật</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
