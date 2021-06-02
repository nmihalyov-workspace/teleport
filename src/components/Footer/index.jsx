import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
    <div id="kt_footer" className="footer bg-white py-4 d-flex flex-lg-column">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted font-weight-bold mr-2">2021©</span>
          <Link to="#" className="text-dark-75 text-hover-primary" target="_blank">Ваш банковский гарант</Link>
        </div>
        <div className="nav nav-dark d-flex flex-column flex-sm-row">
          <Link to="#" className="nav-link pb-2 pb-sm-3 pl-md-0" target="_blank">Пользовательское соглашение</Link>
          <Link to="#" className="nav-link pt-2 pt-sm-3" target="_blank">Политика конфиденциальности</Link>
        </div>
      </div>
    </div>
	);
};

export default Footer;