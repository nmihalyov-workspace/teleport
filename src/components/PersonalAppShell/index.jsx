import React from 'react';

import HeaderMobile from '../HeaderMobile';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';

class PersonalAppShell extends React.PureComponent {
  componentDidMount() {
    window.$('link[href*="main.css"]').remove();
    document.body.setAttribute('class', 'body-personal quick-panel-right demo-panel-right offcanvas-right header-fixed header-mobile-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading');
  }

  render() {
    return (<>
      <HeaderMobile />
      <div className="d-flex flex-column flex-root">
        <div className="d-flex flex-row flex-column-fluid page">
          <Sidebar />
          <div id="kt_wrapper" className="d-flex flex-column flex-row-fluid wrapper">
            <Header />
            <div id="kt_content" className="content d-flex flex-column flex-column-fluid">
              {this.props.children}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>);
  }
}

export default PersonalAppShell;