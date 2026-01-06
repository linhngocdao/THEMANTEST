import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./assets/detailCateProduct.css";
import { Product } from "../../models/Product";
import { useDispatch, useSelector } from "react-redux";
import { readCatePro } from "../../redux/slices/cateProductSlice";
import productSlice from "../../redux/slices/productSlice";
import { ICatePro } from "../../models/CatePro";
type Props = {};

const DetailCateProduct = (props: Props) => {
  const [product, setProducts] = useState<Product[]>([]);
  const [category, setCategorys] = useState<ICatePro>();
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await dispatch(readCatePro(id)).unwrap();
      setProducts(data.Products)
      setCategorys(data.Cateproduct);
    };
    getCategory();
  }, [id]);
  return (
    <div className="w-10/12 m-auto py-5">
      <div className="">
        <nav>
          <ul className="flex font-semibold ">
            <li className="group block relative mx-1 mt-1 text-slate-200 hover:text-blue-400 transition duration-400 ease-in-out">
              <Link to={"/"}>Trang chủ</Link>
            </li>
            <li className=" block relative mx-1  text-base   text-black duration-400">
              |
            </li>
            <li className=" block relative mx-1 mt-1 text-black transition duration-400">
         {category?.name}
         
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <p className="text-[16px] pt-[40px] font-bold ml-[6px]">Tổng sản phẩm: {product.length}</p>
        <div className="grid sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 mt-3">
          {product.map((item:any,index) => {
            return (
              <div className="group" key={index+1}>
                <Link to={`/detail/${item._id}`}>
                  <img
                    className="w-full border-spacing-1 rounded-2xl group-hover:opacity-80"
                    src={item.image}
                    alt=""
                  />
                  <div className="mt-3 text-center">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="mt-1 text-red-600 text-base  font-semibold ">
                      {item.price}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className=" relative mt-20 ">
          <Pagination
            className="pagination"
            defaultCurrent={3}
            total={10}
            pageSize={10}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailCateProduct;
