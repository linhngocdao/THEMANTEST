import React, { useEffect, useState }  from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getCatePro } from '../../redux/slices/cateProductSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import styles from './Categories.module.css';
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
const Categories = (props: Props) => {
  const catePro = useSelector((state : RootState) => state.catePro)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getCatePro()
    )
  }, [dispatch])
    const settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow:  <SampleNextArrow onClick={() => {}} />,
        prevArrow:  <SamplePrevArrow onClick={() => {}} />,
        cssEase: "linear"
  };
  return (
    <section className={styles.categories}>
        <div className={styles.categories__title}>
            <h2>Danh mục sản phẩm</h2>
        </div>
        <Slider className={styles.slider} {...settings}>
        {catePro?.cateproducts?.map((item : any,e)=>{
            return <div key={e} className={styles.categories__item}>
            <div className={styles.item__box}>
              <Link to={`/detail/cate/${item._id}/product`}>
              <img src={item.image} alt='000017'/>
              <div className={styles.overlay}>
                <span>{item.name}</span>
              </div>
              </Link>
            </div>
          </div>
          })}
        </Slider>
    </section>
  )
}

export default Categories