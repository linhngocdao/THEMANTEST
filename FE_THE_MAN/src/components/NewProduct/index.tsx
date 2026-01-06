import React, { useEffect } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getProducts } from '../../redux/slices/productSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import styles from './NewProduct.module.css';

type Props = {}
function SampleNextArrow(props: { onClick: () => void; }) {
  const { onClick } = props;
  return (
    <div className={`${styles.next} ${styles.slickArrow}`} onClick={onClick}><HiOutlineChevronRight /></div>
  );
}
function SamplePrevArrow(props: { onClick: () => void; }) {
  const { onClick } = props;
  return (
    <div className={`${styles.prev} ${styles.slickArrow}`} onClick={onClick}><HiOutlineChevronLeft /></div>
  );
}
const NewProduct = (props: Props) => {
  const product = useSelector((state: RootState) => state?.product);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getProducts({
        page: 1,
        limit: 8,
      })
    );
  }, [dispatch, 1]);
  const settings = {
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow onClick={() => { }} />,
    prevArrow: <SamplePrevArrow onClick={() => { }} />,
    cssEase: "linear"
  };
  return (
    <section className={styles.product}>
      <div className={styles.product__box}>
        <div className={styles.product__title}>
          <h2>Sản phẩm mới</h2>
        </div>
        <Slider className={styles.slider} {...settings}>
          {product?.products?.Product?.map((item: any, index: any) => {
            return (
              <div key={index} className={styles.product__item}>
                <div className={styles.item__box}>
                  <Link to={`/detail/${item._id}`}>
                    <img src={item.image} alt='000017' />
                  </Link>
                  <div className={styles.detail}>
                    <Link to={`/detail/${item._id}`}>
                      <h3>{item.name}</h3>
                    </Link>

                    <span> <NumberFormat
                    value={item?.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                  />{" "}
                   VNĐ</span>
                  </div>
                </div>

              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  )
}

export default NewProduct