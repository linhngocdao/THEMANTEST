import React from 'react';
import "./index.css";
import { Link } from 'react-router-dom';

const ThankkiuPage = () => {
  return (
    <div>
      <div className='container-thank'>
        <header className='site-header' id='header'>
          <h1 className='site-header__title' data-lead-id='site-header-title'>
            THANK YOU!
          </h1>
        </header>
        <div className='main-content'>
          <i className='fa fa-check main-content__checkmark' id='checkmark' />
        </div>

        <div className='btn-thankkiu'>
                <Link to="/">
                <button>Quay về trang chủ</button>
              </Link> 
        </div>
      </div>
    </div>
  );
};

export default ThankkiuPage;
