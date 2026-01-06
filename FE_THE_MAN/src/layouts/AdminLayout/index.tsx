import styles from "./AdminLayout.module.css";
import React, { useEffect, useRef, useState } from "react";
import { IoHomeOutline, IoLogoOctocat, IoMenuOutline } from "react-icons/io5";
import { RiContactsLine, RiProductHuntLine } from "react-icons/ri";
import { TbSlideshow } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegComment, FaRegUser } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BsNewspaper } from "react-icons/bs";
import { TiGift, TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../models/User";
import { RootState } from "../../redux/store";
import { signout } from "../../redux/slices/authSlice";
import { readUserLocal } from "../../redux/slices/userSlice";

const AdminLayout = () => {
  const boxUser = useRef<HTMLDivElement>(null);
  const navigationElement = useRef<HTMLDivElement>(null);
  const mainElement = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const [showModelUser, setShowModelUser] = useState<Boolean>(false);
  let currentUser = useSelector((state: any) => state.auth.currentUser) as User;
  const users = useSelector((state: any) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const handleSignout = async () => {
    await dispatch(signout());
    navigate("/signin");
  };

  useEffect(() => {
    const navigationE = navigationElement.current!;
    const mainE = mainElement.current!;
    if (toggle) {
      navigationE.classList.toggle(styles.active);
      mainE.classList.toggle(styles.active);
    } else {
      navigationE.classList.remove(styles.active);
      mainE.classList.remove(styles.active);
    }
  }, [toggle]);

  useEffect(() => {
    const boxUserElement = boxUser.current!;
    if (showModelUser) {
      boxUserElement.style.display = "block";
    } else {
      boxUserElement.style.display = "none";
    }
  }, [showModelUser]);

  useEffect(() => {
    (async () => {
      await dispatch(readUserLocal());
    })();
  }, []);

  return (
    <>
      {/* =============== Navigation ================ */}
      <div className={styles.container}>
        <div ref={navigationElement} className={styles.navigation}>
          <ul>
            <li>
              <Link to="/">
                <span className={styles.icon}>
                  {/*<IoLogoOctocat className={styles.io} />*/}
                  <img
                    src="https://res.cloudinary.com/assignment22/image/upload/v1666604740/Ass-reactjs/logo.png21323_p2dpr8.png"
                    className={styles.io}
                    alt=""
                    width="100px"
                  />
                </span>
                <span className="text-[25px] font-[600] ml-[10px] italic hover:text-red-600 ">
                  The Man
                </span>
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard">
                <span className={styles.icon}>
                  <IoHomeOutline className={styles.io} />
                </span>
                <span className={styles.title}>Thống kê</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/carts">
                <span className={styles.icon}>
                  <TiShoppingCart className={styles.io} />
                </span>
                <span className={styles.title}>Danh sách đơn hàng</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/vouchers">
                <span className={styles.icon}>
                  <TiGift className={styles.io} />
                </span>
                <span className={styles.title}>Danh sách voucher</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/contact">
                <span className={styles.icon}>
                  <RiContactsLine className={styles.io} />
                </span>
                <span className={styles.title}>Thông tin phản hồi</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/products">
                <span className={styles.icon}>
                  <RiProductHuntLine className={styles.io} />
                </span>
                <span className={styles.title}>Tất cả sản phẩm</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/category_product">
                <span className={styles.icon}>
                  <BiCategoryAlt className={styles.io} />
                </span>
                <span className={styles.title}>Danh mục sản phẩm</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/post">
                <span className={styles.icon}>
                  <BsNewspaper className={styles.io} />
                </span>
                <span className={styles.title}>Bài viết</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/category_post">
                <span className={styles.icon}>
                  <MdOutlineCategory className={styles.io} />
                </span>
                <span className={styles.title}>Danh mục bài viết</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/slider">
                <span className={styles.icon}>
                  <TbSlideshow className={styles.io} />
                </span>
                <span className={styles.title}>Slide</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users">
                <span className={styles.icon}>
                  <FaRegUser className={styles.io} />
                </span>
                <span className={styles.title}>Danh sách tài khoản</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/comment">
                <span className={styles.icon}>
                  <FaRegComment className={styles.io} />
                </span>
                <span className={styles.title}>Quản lý bình luận</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* ========================= Main ==================== */}
        <div ref={mainElement} className={styles.main}>
          <div className={styles.topbar}>
            <div onClick={() => setToggle(!toggle)} className={styles.toggle}>
              <IoMenuOutline className={styles.io} />
            </div>
            {/* <div className={styles.search}>
              <label>
                <input type="text" placeholder="Search here" />
                <IoSearchOutline className={styles.io} />
              </label>
            </div> */}
            <div
              className={styles.user}
              onClick={() => setShowModelUser(!showModelUser)}
            >
              <img
                src={
                  users?.usera?.img
                    ? users?.usera?.img
                    : "https://res.cloudinary.com/assignmentjs/image/upload/v1664199286/nextjsuser/dw1r1yybpmahpl8qwmkb.png"
                }
                alt=""
              />

              {/*<img src={`${users?.User?.img}`} alt=""/>*/}
              {/* ---------------------- */}
              <div ref={boxUser} className={styles.box}>
                <ul>
                  <li>
                    <span className="block italic">Xin chào!</span>
                    <span className="font-bold">
                      {currentUser?.users?.fullname}
                    </span>
                  </li>
                  <li>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>
                    <div onClick={() => handleSignout()}>Đăng xuất</div>
                  </li>
                </ul>
              </div>

              {/* --------------------- */}
            </div>
          </div>

          <div className={styles.content}>
            <Outlet />
            {/* <Dashboard/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
