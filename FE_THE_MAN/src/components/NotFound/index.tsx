import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const NotFound = (props: Props) => {
  return (
      <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className='text-center'>
      <div className="icon">
      <img src='https://i.postimg.cc/YSXbj3Lp/404-Error-rafiki.png' className="mx-auto w-[500px] relative -top-10" alt='404'/>
      </div>
      <div className="content text-center relative -top-10">
        <h2 className="text-5xl font-bold leading-normal">Không tìm thấy trang</h2>
        <p className="py-3">Rất tiếc, không thể tìm thấy trang bạn yêu cầu. Vui lòng quay lại trang chủ !</p>
        <button className="bg-blue-500 border text-white mt-5 py-2 px-10 rounded-3xl font-semibold hover:bg-blue-300 ease-in-out transition-all">
        <Link to="/" >Trở về trang chủ</Link>
        </button>
      </div>
    </div>
    </div>
  )
}

export default NotFound