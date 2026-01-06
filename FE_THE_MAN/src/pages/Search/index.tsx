import { BiSearch } from "react-icons/bi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import styles from "./Search.module.css";
import React, { useEffect, useState } from "react";
import { search } from "../../redux/slices/productSlice";
import { formatCurrency } from "../../ultis";
import { Product } from "../../models/Product";
type Props = {};

const Search = (props: Props) => {
  const { products } = useSelector((state: RootState) => state?.product);
  console.log("log product", products?.Product);

  const { name } = useParams();
  console.log(name);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(search({ name }));
  }, [dispatch, name]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.title}>
        {/* <h1>NHẬP TỪ KHÓA ĐỂ TÌM KIẾM SẢN PHẨM</h1> */}
        <h1>CÓ {products?.Product?.length} KẾT QUẢ TÌM KIẾM PHÙ HỢP</h1>

        {/* Không có sản phẩm thì hiện thông báo này lên và input search */}
        {/* <h1>KHÔNG TÌM THẤY BẤT KỲ KẾT QUẢ NÀO VỚI TỪ KHÓA TRÊN.</h1> */}
        {/* <span>Vui lòng nhập từ khóa tìm kiếm khác</span> */}
      </div>

      {/* Có sản phẩm thì ẩn search */}
      {/* <div className={styles.searchInput}>
        <input type="text" placeholder="Bạn cần tìm gì hôm nay?" />
        <div className={styles.icSearch}>
          <BiSearch />
        </div>
      </div> */}

      <div className={styles.rowProduct}>
        {products?.Product?.map((e: any) => {
          return (
            <div key={e} className={styles.itemProduct}>
              <Link to={`/detail/${e._id}`}>
                <div className={styles.imgProduct}>
                  <img src={e?.image} alt="" className={styles.imgDf} />
                  <img
                    // src="https://bizweb.dktcdn.net/100/414/728/products/16.jpg?v=1669434388827"
                    className={styles.subImg}
                  />
                  {/* <div className={styles.color}>
                    <div
                      className={styles.item_color}
                      style={{
                        backgroundColor: `red`,
                      }}
                    ></div>

                    <div
                      className={styles.item_color}
                      style={{
                        backgroundColor: `green`,
                      }}
                    ></div>
                  </div> */}
                </div>
                <h3>{e?.name}</h3>
                <span>{formatCurrency(e.price)}</span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* <div className={styles.pagination}>
        <div className={styles.arrows}>
          <SlArrowLeft />
        </div>
        <span className={styles.active}>1</span>
        <span>2</span>
        <span>3</span>
        <div className={styles.arrows}>
          <SlArrowRight />
        </div>
      </div> */}
    </div>
  );
};

export default Search;
