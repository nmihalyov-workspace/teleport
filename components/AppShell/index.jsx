import React, { useEffect } from 'react';
import Head from 'next/head';
import MainFooter from '../MainFooter';
import MainHeader from '../MainHeader';
import MainPopups from '../MainPopups';

class AppShell extends React.PureComponent {
  componentDidMount() {
    document.querySelector('head style') && document.querySelector('head style').remove();
    document.body.setAttribute('class', 'body-main');
    document.body.setAttribute('id', 'kt_body');
  }

  componentDidUpdate() {
    document.querySelector('head style') && document.querySelector('head style').remove();
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
        <link rel="stylesheet" href="/assets/main.css" />
      </Head>
  
      <div className="page">
        <div className="page__header">
          <MainHeader />
        </div>
        <div className="page__main">
          {this.props.children}
          <MainPopups />
        </div>
        <div className="page__footer">
          <MainFooter />
        </div>
        <a className="page__to-top">
          <svg className="page__icon svg">
            <use xlinkHref="/img/svgSprite.svg#icon__arrow_down"></use>
          </svg>
        </a>
      </div>
    </>);
  }
};

export default AppShell;