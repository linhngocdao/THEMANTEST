import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AiOutlineClose
} from "react-icons/ai";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/slices/cartSlice";
import { getProduct } from "../../redux/slices/productSlice";
import "./assets/css/detail.css";
import Comment from "./comment";

type TypeColorSize = Map<
  string,
  {
    size: {
      title: string;
      quantity: number;
    }[];
  }
>;

const DetailProduct = () => {
  const [show, isShow] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const product = useSelector((state: any) => state.product.product);
  const [colorSize, setColorSize] = useState<TypeColorSize>(new Map());
  const { register, handleSubmit } = useForm();
  const [rproducts, setRproducts] = useState<Number>();
  const [colorSelected, setColorSelected] = useState<string>();
  const [sizeSelected, setSizeSelected] = useState<string>();
  const [, setQuantities] = useState(0);
  const [User, setUser] = useState<any>();
  const users = useSelector((state: any) => state.auth)
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") as any));
  }, []);
  const showTest = () => {
    isShow(true);
  };
  const onAddOrder: SubmitHandler<any> = async (data: any) => {
    if (users?.isLogged == false) {
      localStorage.setItem("link", JSON.stringify("/detail/" + id))
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
      return toast.info("Bạn cần phải đăng nhập mới có thể mua hàng", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (data.quantity > rproducts!) {
      return toast.error("Số lượng hàng còn lại không đủ");
    }
    if (data.quantity < 1) {
      return toast.info("Số lượng phải lớn hơn 1", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const {
      type,
      subimg,
      categoryId,
      createdAt,
      desc,
      updatedAt,
      __v,
      ...rest
    } = product;
    const iduser = User.users.id;
    const tmcode = "TheMan_" + Math.floor(Math.random() * 999999);
    const carts = {
      products: {
        ...rest,
        size: sizeSelected,
        color: colorSelected,
        quantity: parseInt(data?.quantity),
      },
      userID: iduser,
      tm_codeorder: tmcode,
    };
    if (!carts?.products?.size) {
      return toast.error("Vui lòng chọn size")
    }

    const res = await dispatch(addToCart(carts));
    if (res?.payload?.code == 409) {
      onAddOrder(carts);
    } else {
      toast.success("Thêm đơn hàng thành công !");
    }
  };
  const onSize = async (c: any) => {
    setSizeSelected(c.title);
    setRproducts(
      colorSize
        .get(colorSelected || "")
        ?.size.filter((s) => s.title === c.title)[0].quantity!
    );
    setQuantities(0);
  };

  const onColor = (c: any) => {
    setRproducts(undefined);
    setColorSelected(c);
    setSizeSelected(undefined);
    setQuantities(0);
    //   console.log("a", colorSize.get(colorSelected || "")?.size || 0);
  };
  useEffect(() => {
    if (product.type) {
      let colorSizeValue: TypeColorSize = new Map();
      product.type.forEach((p: any) => {
        colorSizeValue.set(p.color, {
          size: [
            ...(colorSizeValue.get(p.color)?.size || []),
            {
              title: p.size,
              quantity: parseInt(p.quantity),
            },
          ],
        });
      });
      console.log('colorSizeValue', colorSizeValue);

      setColorSize(colorSizeValue);
      setColorSelected(Array.from(colorSizeValue.keys())[0]);
    }
  }, [product]);

  // const size = types.map((item: any) => {
  //   if (item.color === "blue") {
  //     return item.size;
  //   }
  // });
  // console.log(size);

  useEffect(() => {
    (async () => {
      await dispatch(getProduct(id)).unwrap();
      // setTypes(product.type || []);
      const script = document.createElement("script");
      script.src = "https://hait2810.github.io/assets_datn/main.js";
      document.body.appendChild(script);
    })();
  }, [id, dispatch]);
  return (
    <>
      <div className="detail_page">
        {/* pagination */}
        <div className="containerx">
          {/* <div className="breadcrumb_list">
            <span className="breadcrumb_item_text">
              <a className="home_navigation" href="#">
                Trang chủ
              </a>
            </span>
            <span className="breadcrumb_item_text">
              <a className="name_product" href="#">
                {product?.name}
              </a>
            </span>
          </div> */}
          <div className="breadcrumb">
            <Link to="/" className="linkBreakcrumb">
              Trang chủ
            </Link>
            <span>{product?.name}</span>
          </div>
        </div>

        {/* Product */}
        <div className="containerx">
          <div className="detail_product dp-flex">

            <div className="avatar__wrapper">
              <img
                src={product?.image}
                className="img_main max-w-[550px] max-h-[500px] rounded-sm"
                alt=""
              />
              <div className="product-gallary__thumbs max-w-[550px] dp-flex flex-wrap">
                {product?.subimg?.map((item: any, index: number) => {
                  return (
                    <div key={index++} className="product-gallery__thumb mt-[10px]">
                      <img src={item} alt="" className="imglist !max-w-[60px] mr-[5px] rounded-sm" />
                    </div>
                  );
                })}

              </div>
            </div>
            <div className="info__product">
              <h1 className="name__product !font-bold !text-[26px]">
                {" "}
                {product?.name}
              </h1>
              <p className="price">
                {" "}
                <NumberFormat
                  value={product?.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={""}
                />{" "}
                ₫
              </p>
              <div className="color__wrapper">
                <h6 className="section-title">Màu sắc:</h6>
                <div className="select__color dp-flex">
                  {Array.from(colorSize).map((c, index) => {
                    return (
                      <label
                        key={index++}
                        onClick={() => onColor(c[0])}
                        className="btn_color"
                        htmlFor="black"
                      >
                        <div
                          className={`code_color ${colorSelected === c[0]
                            ? "!border-[3px] cursor-pointer !border-[#050c05]"
                            : "border-[1px] cursor-pointer border-[#050c05]"
                            } `}
                          style={{ backgroundColor: `${c[0]}` }}
                        ></div>
                      </label>
                    );
                  })}
                  {/* <label className="btn_color" htmlFor="white">
                    <input type="radio" name="color" id="color" />
                    <div className="code_color"></div>
                  </label> */}
                </div>
              </div>
              <form onSubmit={handleSubmit(onAddOrder)}>
                <div className="size__wrapper">
                  <h6 className="section-title">Kích cỡ:</h6>
                  <div className="select__size dp-flex">
                    {(colorSize.get(colorSelected || "")?.size || []).map(
                      (c, index) => (
                        <label
                          key={index++}
                          className={`btn_size ${sizeSelected === c.title
                            ? "!border-4 !border-black"
                            : ""
                            }`}
                          htmlFor="38"
                          onClick={() => onSize(c)}
                        >
                          <input
                            type="radio"
                            name="size"
                            id="size"
                            defaultValue={38}
                          />
                          {c.title}
                        </label>
                      )
                    )}
                  </div>
                  <h2 className="t_quantity text-[16px] font-bold my-[15px]">
                    Số lượng:
                  </h2>
                  {rproducts == 0 ? (
                    <div className="text-rose-600 text-sm font-semibold">
                      Hết hàng
                    </div>
                  ) : (
                    <>
                      <div className="text-rose-600 text-sm font-semibold my-[9px]">
                        {rproducts ? `Còn lại: ${rproducts}` : ""}
                      </div>
                      <div className="quantity flex items-center mb-[15px]">
                        <input
                          className="appearance-none block !w-[50%] bg-gray-100 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="number"
                          {...register("quantity")}
                          placeholder="Nhập số lượng cần mua"
                        />
                      </div>
                    </>
                  )}

                  <div className="size__guide dp-flex items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/93/93640.png"
                      alt=""
                      className="logo w-[20px] h-[20px] "
                    />
                    <a
                      href="#"
                      className="section-title"
                      onClick={() => showTest()}
                    >
                      Hướng dẫn chọn size
                    </a>
                  </div>
                </div>

                <div className="add_cart">
                  <button type="submit" className="btn_add">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </form>
              <div className="desc__wrapper">
                <h6 className="section-title font-bold">Mô tả</h6>
                <p className="desc min-w-[430px] text-[15px] h-[150px] w-[280px] overflow-auto">
                  {product?.desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* comment */}
        <div className="comments_wrapper">
          <Comment />
        </div>

        {/* Product like */}
        {/* <div className="product-related_wrapper">
          <div className="containerx">
            <div className="heading-title">
              <h2>Có thể bạn sẽ thích</h2>
            </div>
            <div className="list-products">
              <div className="item">
                <img
                  src="https://i.ibb.co/PmYhcf3/img2.png"
                  alt=""
                  className="logo"
                />
                <div className="product-info">
                  <a href="#">Anselm Loose Fit Jean Light Blue </a>
                  <span>690,000 đ</span>
                </div>
              </div>
              <div className="item">
                <img
                  src="https://i.ibb.co/PmYhcf3/img2.png"
                  alt=""
                  className="logo"
                />
                <div className="product-info">
                  <a href="#">Anselm Loose Fit Jean Light Blue </a>
                  <span>690,000 đ</span>
                </div>
              </div>
              <div className="item">
                <img
                  src="https://i.ibb.co/PmYhcf3/img2.png"
                  alt=""
                  className="logo"
                />
                <div className="product-info">
                  <a href="#">Anselm Loose Fit Jean Light Blue </a>
                  <span>690,000 đ</span>
                </div>
              </div>
              <div className="item">
                <img
                  src="https://i.ibb.co/PmYhcf3/img2.png"
                  alt=""
                  className="logo"
                />
                <div className="product-info">
                  <a href="#">Anselm Loose Fit Jean Light Blue </a>
                  <span>690,000 đ</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {show ? (
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
                onClick={() => isShow(false)}
              />
              <div className="text-base flex justify-center items-center absolute top-[15%] right-[28%] text-left transform transition md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                <div className="rounded relative bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 ">
                  <div
                    className="modal-close absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8 cursor-pointer"
                    onClick={() => isShow(false)}
                  >
                    <AiOutlineClose />
                  </div>
                  <div className="modal-container items-start">
                    <div className="mt-3 text-left sm:mt-0 sm:ml-4 w-[500px]">
                      <div className="text-hd">
                        <p>Hướng dẫn chọn size</p>
                        <img
                          src="https://res.cloudinary.com/assignment22/image/upload/v1669001659/Ass-reactjs/h%C6%B0%E1%BB%9Bng_d%E1%BA%ABn_ch%E1%BB%8Dn_size_d4qcnn.jpg"
                          alt=""
                        />
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
    </>
  );
};

export default DetailProduct;
