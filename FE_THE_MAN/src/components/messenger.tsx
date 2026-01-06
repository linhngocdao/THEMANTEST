import React from 'react'
import { BsMessenger } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { User } from '../models/User';

const messenger = () => {
  let currentUser = useSelector((state: any) => state.auth.currentUser) as User;
  return (
    <div>
      {currentUser?.users?.role == 0 ? (  <p style={{
           position: 'fixed',
          fontSize: '34px',
          bottom: '80px',
          right: '30px',
          cursor: 'pointer',
          textAlign: 'center',
          color: 'rgb(10, 124, 255)',
          border: 'none',
        }}><BsMessenger/></p>
        ) : true}
        {/* <p>test</p> */}
    </div>
  )
}

export default messenger