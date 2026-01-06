import Banner from '../../components/Banner'
import Categories from '../../components/Categories'
import FeaturedNews from '../../components/FeaturedNews'
import NewProduct from '../../components/NewProduct'
import SubBanner from '../../components/SubBanner'
import Voucher from '../../components/Voucher'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <>
    <Banner />
    <Categories />
    <SubBanner />
    <NewProduct />
    <FeaturedNews />
    </>
  )
}

export default HomePage
