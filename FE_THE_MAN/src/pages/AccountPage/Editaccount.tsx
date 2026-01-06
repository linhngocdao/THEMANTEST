import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineCheck } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User } from '../../models/User';
import { getUser, updateUser } from '../../redux/slices/userSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import styles from "./Contact.module.css";
type Props = {}
type Inputs = {
  fullname: string;
  phone: string;
  address: string;
  email: string;
  img: string;
  status: string
  };
const Editaccount = (props: Props) => {
    const dispatch = useAppDispatch();
    const [preview, setPreview] = useState<string>();
    const users = useSelector((state: RootState) => state.user);
    const [status, setStatus] = useState(users.User.status);
    const navigate = useNavigate();
    console.log(status);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<Inputs>();

      const { id } = useParams();
    let isLogged = useSelector((state: any) => state.auth.isLogged);
  let currentUser = useSelector((state: any) => state.auth.currentUser) as User;
  if (localStorage.getItem("user")) {
    (isLogged = true),
      (currentUser = JSON.parse(localStorage.getItem("user") || "{}"));
  }
  console.log(currentUser);

  useEffect(() => {
    setStatus(users.User.status);
  }, [users.User.status]);
  useEffect(() => {
    (async () => {
      const posts = await dispatch(getUser(id));
      reset(posts.payload);
    })();
  }, [id, dispatch, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    console.log(values.phone);

    try {
      const apiUrl = "https://api.cloudinary.com/v1_1/dmlv9tzte/image/upload";
      const images = values.img[0];
      const formdata = new FormData();
      formdata.append("file", images);
      formdata.append("upload_preset", "duanTn");
      const { data } = await axios.post(apiUrl, formdata, {
        headers: {
          "Content-type": "application/form-data",
        },
      });
      console.log(values.img);
      
      await dispatch(
        updateUser({
          fullname: values.fullname,
          phone : values.phone,
          status,
          _id: id,
          img: data.url,
        })
      ).unwrap();
      toast.success("Sửa người dùng thành công !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/account");
    } catch (error) {
      console.log("a");
    }
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
                    value: 5,
                    message: "Vui lòng nhập đầy đủ họ tên",
                  },
                })}
                type="text"
                placeholder="Tên của bạn"
              />
              <p className={styles.error}>{errors.fullname?.message}</p>
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
                })}
                type="text"
                placeholder="Email của bạn"
                disabled
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
                      {...register("img", {
                        required: "Vui lòng chọn ảnh",
                      })}
                      onChange={(e: any) => {
                        setPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                      id="file-upload"
                      type="file"
                    />
                    <div className="text-sm mt-0.5 text-red-500">
                      {errors.img?.message}
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
  )
}

export default Editaccount