import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import Slider from "react-slick";
import './Banner.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { getSliders } from '../../redux/slices/Slider';
type Props = {}

function SampleNextArrow(props: { onClick: () => void; }) {
  const { onClick } = props;
  return (
    <div className='next slick-arrow' onClick={onClick}><HiOutlineChevronRight /></div>
  );
}

function SamplePrevArrow(props: { onClick: () => void; }) {
  const { onClick } = props;
  return (
    <div className='prev slick-arrow' onClick={onClick}><HiOutlineChevronLeft /></div>
  );
}
const Banner = (props: Props) => {
  const picture = useSelector((state : RootState) => state?.slider)
  const pages = useSelector((state: RootState) => state?.slider.page);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(
      getSliders(
        {
          page: pages,
          limit: 10,
        }
      )
    )
  },[dispatch])
    const settings = {
          dots: true,
          arrows: true,
          infinite: true,
          speed: 500,
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow:  <SampleNextArrow onClick={() => {}} />,
          prevArrow:  <SamplePrevArrow onClick={() => {}} />,
          cssEase: "linear"
    };
        return (
          <section className="banner">
            <Slider {...settings}>
              {picture?.Sliders.Slider?.map((item:any,index:any)=>{
                return (
                  <img className="slide_img" key={index} src={item.image} alt='Banner1-1'/>
                )
              })}
            
          
            </Slider>
          </section>
        );
}

export default Banner