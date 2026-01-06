import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../../models/User';
import { getUser } from '../../redux/slices/userSlice';
import { RootState, useAppDispatch } from '../../redux/store';

type Props = {}

const AccountPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.user);
  let isLogged = useSelector((state: any) => state.auth.isLogged);
  let currentUser = useSelector((state: any) => state.auth.currentUser) as User;
  if (localStorage.getItem("user")) {
    (isLogged = true),
      (currentUser = JSON.parse(localStorage.getItem("user") || "{}"));
  }
  console.log(currentUser);
  const  id  = currentUser?.users?.id;
  useEffect(() => {
    (async () => {
      const posts = await dispatch(getUser(id));
    })();
  }, [id, dispatch]);

  console.log(users);
  
  return (
    <div className='p-40'>
        <section className="grid grid-cols-2 grid-flow-row-dense gap-2">
        <div className="logo flex gap-5 items-center">
            <img src={`${users?.User?.img}`} className="bg-left-top bg-no-repeat h-40 w-40" alt="" />
            <div>
                <h4 className="font-bold text-lg">{users?.User?.email}</h4>
                <Link to={`/editaccount/${users?.User?.id}`} className="sm:ml-3">
                <button>Sửa Thông Tin Tài Khoản</button>
        </Link>
            </div>
            
          </div>
          <div className='pl-20'>
            <h1 className='text-4xl'>Thông Tin Người Dùng</h1>

            <div className='m-2'>
                <div className='text-xl pb-2'>Email: </div>
                <div className='text-lg pb-2'>{users?.User?.email}</div>
                <div className='text-xl pb-2' >Họ Tên :</div>
                <div className='text-lg pb-2'>{users?.User?.fullname}</div>
                <div className='text-xl pb-2' >Số Điện Thoại :</div>
                <div className='text-lg pb-2'>{users?.User?.phone}</div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default AccountPage