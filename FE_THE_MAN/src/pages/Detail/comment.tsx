import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  addComment,
  getComment,
  removeComemnt,
  udpateComment,
} from "../../api-cilent/User";
import avatablack from "./assets/img/avatar-blank.png";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { readUserLocal } from "../../redux/slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {
  getOrders,
  infoOrder,
  isBuy,
  readOrder,
} from "../../redux/slices/orderSlice";
type Props = {};
type Inputs = {
  content: string;
};

const Comment = (props: Props) => {
  const [dataComment, setDatacomment] = useState<any>([]);
  const { id } = useParams();
  // console.log(dataComment);
  const [checkId, setCheckid] = useState("");
  const user = useSelector((state: any) => state?.auth.currentUser);
  const code = user?.users?.id;
  const dispatch = useAppDispatch();

  // console.log(code);

  // console.log(user.users);

  const product = useSelector((state: any) => state.product.product);
  // console.log("sản phẩm",product.name);
  const order = useSelector((state: any) => state.orders);
  console.log("sản phẩm", order?.check);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    // dispatch(isBuy("63811daf55696ccfd45ac8f6"));
    for (let i = 0; i < order.orders.length; i++) {
      if (order?.orders[i].userID == code) {
        for (let a = 0; a < order?.orders[i].product.length; a++) {
          // console.log(order?.orders[i].product[a]._id);

          if (order?.orders[i].product[a]._id == id) {
            console.log("a", order?.orders[i]);
            console.log(order?.orders[i]._id);

            dispatch(isBuy(order?.orders[i]._id));
          }
        }
      }
    }
  }, [dispatch, order.orders.length]);

  useEffect(() => {
    dispatch(readUserLocal());

    // setUser(JSON.parse(localStorage.getItem("user") as any));
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await getComment(id);
        setDatacomment(data);
      })();
    }
  }, [dataComment.length, id]);

  const Sendcomment: SubmitHandler<Inputs> = async (datas: Inputs) => {
    reset();
    addComment({
      content: datas?.content,
      productId: id,
      userId: user?.users?.id,
    }).then((result: any) => {
      setDatacomment((prev: any) => {
        return [...prev, result];
      });
    });
  };
  const handleremove = (id: any) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa không?",
      text: "Không thể hoàn tác sau khi xóa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await removeComemnt(id);
        Swal.fire("Thành công!", "Xóa thành công.", "success");
        setDatacomment(dataComment.filter((item:any) => item._id != id));
      }
    });
  };

  const edit = async (value: any) => {
    udpateComment({
      content: value,
      id: checkId,
    }).then(async () => {
      setCheckid("");
      const { data } = await getComment(id);
      setDatacomment(data);
    });
  };

  const moveCaretAtEnd = (e: any) => {
    var temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  };
  console.log(user?.users);

  return (
    <div className="m-20">
      <div className="containerx">
        <h2 className="heading-title">Bình luận về : {product.name}</h2>
        {user?.users
          ? order?.check && (
              <form
                action=""
                className="form_comment"
                onSubmit={handleSubmit(Sendcomment)}
              >
                <textarea
                  id=""
                  {...register("content", {
                    required: "Vui lòng nhập nội dung",
                  })}
                  cols={30}
                  placeholder="Mời bạn để lại bình luận..."
                  rows={6}
                  defaultValue={""}
                />
                <div className="text-sm mt-0.5 text-red-500">
                  {errors.content?.message}
                </div>
                <button type="submit">GỬI</button>
              </form>
            )
          : ""}
        <div className="list-comments_wrapper">
          <div className="comments_wrapper">
            {dataComment?.map((e: any, index:number) => {
              var date1 = moment();
              var date2 = moment(e.createdAt);
              var diffYear = date1.diff(date2, "year");
              var diffMonth = date1.diff(date2, "month");
              var diffHour = date1.diff(date2, "hour");
              var diffDay = date1.diff(date2, "day");
              var difMinute = date1.diff(date2, "minute");
              var diffSecond = date1.diff(date2, "second");
              let text = "";
              if (diffYear) {
                text = diffYear + " Năm";
              } else if (diffMonth) {
                text = diffMonth + " Tháng";
              } else if (diffDay) {
                text = diffDay + " Ngày";
              } else if (diffHour) {
                text = diffHour + " Giờ";
              } else if (difMinute) {
                text = difMinute + " Phút";
              } else if (diffSecond) {
                text = diffSecond + " Giây";
              } else {
                text = 1 + " Giây";
              }

              //   moment(endTimes).format("HH:mm")
              return (
                <div className="item" key={index}>
                  <div className="user dp-flex">
                    <img
                      src={e?.user?.img || avatablack}
                      alt=""
                      className="avata"
                    />
                    <div className="info">
                      <h3 className="name text-lg font-semibold">
                        {e?.user?.fullname || "User"}
                      </h3>
                      <span className="time-comment text-sm">{text} trước</span>
                    </div>
                  </div>
                  {checkId != e?.id ? (
                    <span className="content  text-base not-italic">
                      {e?.content}{" "}
                    </span>
                  ) : (
                    <>
                      {" "}
                      <textarea
                        autoFocus={true}
                        id="w3review"
                        name="w3review"
                        className="area_content w-10/12"
                        onKeyPress={(element: any) => {
                          if (element.which === 13) {
                            if (element?.target?.value) {
                              edit(element?.target?.value);
                            } else {
                              handleremove(e?.id);
                            }
                          }
                        }}
                        onFocus={moveCaretAtEnd}
                      >
                        {e?.content}
                      </textarea>
                      <br />
                      <button className="exit" onClick={() => setCheckid("")}>
                        Hủy chỉnh sửa
                      </button>
                    </>
                  )}
                  {e?.userId == user?.users?.id && (
                    <div className="icon">
                      <button
                        className="hover:text-blue-400"
                        onClick={() => handleremove(e?.id)}
                      >
                        <FontAwesomeIcon
                          className="font_icon pr-2 "
                          icon={faTrash}
                        />
                        Xóa
                      </button>
                      <button
                        className="hover:text-blue-400"
                        onClick={() => {
                          setCheckid(e?.id);
                        }}
                      >
                        <FontAwesomeIcon
                          className="font_icon pr-2"
                          icon={faPen}
                        />
                        Sửa
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
