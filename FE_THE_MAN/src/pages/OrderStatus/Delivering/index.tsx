import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import CartLoad from '../../../components/CartLoad'
import { getOrders, infoOrder } from '../../../redux/slices/orderSlice'
import { readUserLocal } from '../../../redux/slices/userSlice'
import "../Cancel/index.css"

const Deliver = () => {
  const dispatch = useDispatch<any>()
  const [Loading, setLoading] = useState(false)
  const [Orders,setOrders] = useState([])
  useEffect(() => {
    (async () => {
      const user = await dispatch(readUserLocal())
      const or = await dispatch(getOrders()) 
      let ord = []
      const orafter = or?.payload?.filter((item:any) => item.userID  == user?.payload?.users?.id && item.order_code != null)
      for (let i = 0; i < orafter.length; i++) {  
          let orderId:any = {
            order_code: orafter[i].order_code
          }
          const order =  await dispatch(infoOrder(orderId || '')) 
          console.log("order?.payload?.data?.log",order?.payload?.data?.log);
          
          let getstatus = ""
          for (let j = 0; j < order?.payload?.data?.log?.length; j++) {
            getstatus = order?.payload?.data?.log[j]?.status
          }
          if(getstatus == "picked" || getstatus == "storing" || getstatus == "delivering") {
            ord.push(...Orders, orafter[i])
          }

      }
      setOrders(ord as [])
      setLoading(true)
      

  }) ()
}, [])
  return (
    <div className="scoll h-[350px] w-[1280px] overflow-auto">
 {Loading == false ? <CartLoad /> : ""}
    <div className="m-auto max-w-full pb-36 mt-5">
      <div className="mt-5 md:mt-0 md:col-span-2">
      <table className="table-auto w-full ">
        <thead className="pb-10 ">
          <tr className="text-left ">
            <th className=" font-semibold pb-5">STT</th>
            <th className=" font-semibold pb-5 text-center">Sản phẩm</th>
            <th className="font-semibold pb-5">Tổng tiền</th>
            <th className="font-semibold pb-5">Thông tin thanh toán </th>
            <th className="font-semibold pb-5">Chi tiết đơn hàng </th>
          </tr>
        </thead>
        <tbody className="w-full">
        {Orders?.map((item : any, index: number) => {
           return <tr key={index ++} className="border-t-2">
           <td className=" py-10  gap-8">1</td>  
           <td className="prod py-10 gap-8 inline-flex ml-[40px]">
              <div className="img-item w-[190px] h-[190px] overflow-hidden pt-4">
                <img src="https://res.cloudinary.com/assignment22/image/upload/v1666929320/Ass-reactjs/%C3%A1o_hqugdy.jpg" alt="Áo thun" />
              </div>
            <div className="pt-3">
              
               <div className="text-[15px] text-gray-500 pt-[7px]">Số lượng : {item?.product?.length}</div>  
               <div className="sales  w-[110px] pt-[8px]"> <p className="text-[#ee4d2d] text-[11px]">7 ngày đổi trả hàng</p> </div>            
             </div> 
           </td>  
           <td className=" py-10  gap-8"> { <NumberFormat
                  value={item?.totalprice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={""}
                />} VND</td>
                 <td className=" text-red-500 font-bold py-10  gap-8">
                    {item?.payment_status == 0
                      ? "Chưa thanh toán"
                      : "Đã thanh toán"}
                  </td> 
          <td className=" py-10  gap-8 "> <Link to={`/detailOrder/${item._id}`}><button className="btn" >Chi tiết đơn hàng</button></Link> </td> 
         </tr>
        })}
        
        </tbody>
       
      </table>
      </div>
    </div>
  </div>
  )
}

export default Deliver