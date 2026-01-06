import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getVouchers } from '../../redux/slices/voucherSlice';
import { RootState } from '../../redux/store';
import styles from './Voucher.module.css'
type Props = {}

const Voucher = (props: Props) => {
  const Vouchers = useSelector((state:RootState)=>state?.voucher?.vouchers)
  const dispatch = useDispatch<any>();
  useEffect(() => {
    (async () => {
      await dispatch(getVouchers());
    })();
  }, []);
    const settings = {
        arrows: false,
        infinite: true,
        speed: 5000,
        autoplay: true,
        autoplaySpeed: 7000,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "linear"
  };
  return (
    <section className={styles.container}>
    <Slider {...settings}>
     
      <p className={styles.text}>The Man xin kính chào quý khách!</p>
      {
        Vouchers.map((item:any,index:any)=>{
          return (
<p key={item.id} className={styles.text}>Mua hàng ngay để được áp dụng voucher giảm giá <span className={styles.text_big}>{item.percent}%</span>  diễn ra từ ngày {item.startday} đến ngày {item.endtime}   Mã giảm giá: <span className={styles.text_big}>{item.code}</span></p>
          )
        })
      }
       
    </Slider>
</section>
  )
}

export default Voucher