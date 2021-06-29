import React, { useContext } from 'react';
import Link from 'next/link';
import withUserData from '../_hoc/withUserData';

const Header = ({ user }) => {
  const logout = () => {
    localStorage.setItem('userLoggedIn', JSON.stringify(false));
    localStorage.setItem('user', JSON.stringify({}));
    window.location.replace('/');
  }

	return (
    <div id="kt_header" className="header header-fixed">
      <div className="container-fluid d-flex align-items-stretch justify-content-between">
        <div id="kt_header_menu_wrapper" className="header-menu-wrapper header-menu-wrapper-left">
          <div id="kt_header_menu" className="header-menu header-menu-mobile header-menu-layout-default">
            <ul className="menu-nav m-5">
              <li className="menu-item">
                <Link href="/personal/requests/edit"><a className="btn btn-light-primary">Новая заявка</a></Link>
              </li>
              <li className="menu-item mt-4 mt-md-0">
                <Link href="#"><a className="btn btn-light-warning">Калькулятор</a></Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="topbar">
          <div className="dropdown mr-1">
            <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
              <div className="btn btn-light font-weight-bold btn-dropdown">Куратор</div>
            </div>
            <div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
              <div className="d-flex flex-column px-8 py-4">
                <div className="font-weight-bold font-size-h5 text-dark-75">Пушкина Елизавета Петровна</div>
                <div className="text-muted">Куратор</div>
                <div className="navi mt-3">
                  <Link className="navi-item" href="#">
                    <span className="navi-link p-0 pb-2">
                      <span className="navi-icon mr-1">
                        <span className="svg-icon svg-icon-lg svg-icon-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <rect x="0" y="0" width="24" height="24"></rect>
                              <path d="M11.914857,14.1427403 L14.1188827,11.9387145 C14.7276032,11.329994 14.8785122,10.4000511 14.4935235,9.63007378 L14.3686433,9.38031323 C13.9836546,8.61033591 14.1345636,7.680393 14.7432841,7.07167248 L17.4760882,4.33886839 C17.6713503,4.14360624 17.9879328,4.14360624 18.183195,4.33886839 C18.2211956,4.37686904 18.2528214,4.42074752 18.2768552,4.46881498 L19.3808309,6.67676638 C20.2253855,8.3658756 19.8943345,10.4059034 18.5589765,11.7412615 L12.560151,17.740087 C11.1066115,19.1936265 8.95659008,19.7011777 7.00646221,19.0511351 L4.5919826,18.2463085 C4.33001094,18.1589846 4.18843095,17.8758246 4.27575484,17.613853 C4.30030124,17.5402138 4.34165566,17.4733009 4.39654309,17.4184135 L7.04781491,14.7671417 C7.65653544,14.1584211 8.58647835,14.0075122 9.35645567,14.3925008 L9.60621621,14.5173811 C10.3761935,14.9023698 11.3061364,14.7514608 11.914857,14.1427403 Z" fill="#000000"></path>
                            </g>
                          </svg>
                        </span>
                      </span>
                      <span className="navi-text text-muted text-hover-primary">8 (950) 123-45-67</span>
                    </span>
                  </Link>
                  <Link className="navi-item" href="#">
                    <span className="navi-link p-0 pb-2">
                      <span className="navi-icon mr-1">
                        <span className="svg-icon svg-icon-lg svg-icon-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <rect x="0" y="0" width="24" height="24"></rect>
                              <path d="M21,12.0829584 C20.6747915,12.0283988 20.3407122,12 20,12 C16.6862915,12 14,14.6862915 14,18 C14,18.3407122 14.0283988,18.6747915 14.0829584,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,12.0829584 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z" fill="#000000"></path>
                              <circle fill="#000000" opacity="0.3" cx="19.5" cy="17.5" r="2.5"></circle>
                            </g>
                          </svg>
                        </span>
                      </span>
                      <span className="navi-text text-muted text-hover-primary">email@email.com</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown ml-4">
            <div className="topbar-item">
              <div className="d-flex flex-column px-4 py-2">
                <div className="text-dark-50 font-weight-bold font-size-xs">Код агента</div>
                <div className="text-dark-75 font-weight-bolder font-size-sm">123a-16b</div>
              </div>
            </div>
          </div>
          <div className="dropdown ml-4">
            <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
              <div className="btn btn-icon btn-primary h-40px w-40px p-0">
                <i className="la la-user icon-xl"></i>
              </div>
            </div>
            <div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
              <div className="d-flex flex-column px-8 py-4">
                <div className="font-weight-bold font-size-h5 text-dark-75">{user.full_name}</div>
                <div className="navi mt-3 navi-spacer-x-0 p-0">
                  <span className="navi-item">
                    <span className="navi-link p-0">
                      <a className="btn btn-sm btn-light-primary font-weight-bolder py-3 px-6" href="javascript:void(0)" onClick={logout}>Выход</a>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	);
};

export default withUserData(Header);