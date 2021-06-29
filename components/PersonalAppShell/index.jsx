import React from 'react';
import Head from 'next/head';
import HeaderMobile from '../HeaderMobile';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import PersonalPopups from '../PersonalPopups';

class PersonalAppShell extends React.PureComponent {
  componentDidMount() {
    document.body.setAttribute('class', 'body-personal quick-panel-right demo-panel-right offcanvas-right header-fixed header-mobile-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading');
  }

  render() {
    return (<>
      <Head>
        <title>{this.props.title}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="viewport" content="width=device-width user-scalable=yes initial-scale=1.0 maximum-scale=3.0 minimum-scale=0.1 shrink-to-fit=no" />
        <meta name="google" content="notranslate" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="robots" content="index follow" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/assets/media/logos/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
        {/* <script src="/assets/plugins/global/plugins.bundle.js"></script>
        <script src="/assets/js/scripts.bundle.js"></script> */}
      </Head>

      <HeaderMobile />
      <div className="d-flex flex-column flex-root">
        <div className="d-flex flex-row flex-column-fluid page">
          <Sidebar />
          <div id="kt_wrapper" className="d-flex flex-column flex-row-fluid wrapper">
            <Header />
            <div id="kt_content" className="content d-flex flex-column flex-column-fluid">
              {this.props.children}
              <PersonalPopups />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>);
  }
}

export default PersonalAppShell;