import Slider from 'react-slick';
import styles from './SubBanner.module.css';
type Props = {}

const SubBanner = (props: Props) => {
    const settings = {
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "linear"
  };
  return (
    <section className={styles.subBanner}>
        <Slider {...settings}>
            <img src='https://res.cloudinary.com/daivlozlm/image/upload/v1767679710/slide_1_img_nbao8r.jpg'/>
        </Slider>
    </section>
  )
}

export default SubBanner
