import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addContact } from "../../redux/slices/contactSlice";
import styles from "./Contact.module.css";
type Props = {};
type Inputs = {
  fullName: string;
  phoneNumber: string;
  address: string;
  email: string;
  content: string;
};
const ContactPage = (props: Props) => {
  const dispatch = useDispatch<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    try {
      await dispatch(addContact(values));
      reset();
      toast.success("Gửi phản hồi thành công !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error: any) {
      const message = error?.response.data.message;
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contact}>
          <h2 className={styles.title}>Liên Hệ</h2>
          <div className={styles.contact_item}>
            <span>Địa chỉ chúng tôi</span>
            <p>
              Tòa nhà FPT Polytechnic, P. Trịnh Văn Bô, Xuân Phương, Nam Từ
              Liêm, Hà Nội, Việt Nam
            </p>
          </div>
          <div className={styles.contact_item}>
            <span>Email chúng tôi</span>
            <p>cskh@theman.vn</p>
          </div>
          <div className={styles.contact_item}>
            <span>Điện thoại</span>
            <p>0123456789</p>
          </div>
          <div className={styles.contact_item}>
            <span>Thời gian làm việc</span>
            <p>Thứ 2 đến Thứ 7 từ 8h30 đến 17h30</p>
          </div>
        </div>
        <div className={styles.form_container}>
          <h2 className={styles.title}>Gửi thắc mắc cho chúng tôi</h2>
          <form
            className={styles.form_contact}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.form_row}>
              <div className={styles.form_group}>
                <input
                  className={`${errors.fullName && styles.input_error}`}
                  {...register("fullName", {
                    required: "Vui lòng nhập họ và tên",
                    minLength: {
                      value: 10,
                      message: "Vui lòng nhập đầy đủ họ tên",
                    },
                  })}
                  type="text"
                  placeholder="Tên của bạn"
                />
                <p className={styles.error}>{errors.fullName?.message}</p>
              </div>
              <div className={styles.form_group}>
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
              </div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.form_group}>
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
                <input
                  className={`${errors.phoneNumber && styles.input_error}`}
                  {...register("phoneNumber", {
                    required: "Vui lòng nhập số điện thoại",
                    pattern: {
                      value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                      message: "Vui lòng nhập đúng định dạng số điện thoại",
                    },
                  })}
                  type="text"
                  placeholder="Số điện thoại của bạn"
                />
                <p className={styles.error}>{errors.phoneNumber?.message}</p>
              </div>
            </div>
            <div className={styles.form_group}>
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
            </div>

            <button className={styles.btn}>Gửi cho chúng tôi</button>
          </form>
        </div>
      </div>

      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1131159426513!2d105.80084557525264!3d21.02815948779926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab424a50fff9%3A0xbe3a7f3670c0a45f!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaQ!5e0!3m2!1svi!2s!4v1767680038871!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default ContactPage;
