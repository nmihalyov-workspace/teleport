import React, { useEffect } from 'react';
import MainFooter from '../MainFooter';
import MainHeader from '../MainHeader';
import MainPopups from '../MainPopups';

const AppShell = props => {
  useEffect(() => {
    document.querySelector('head style') && document.querySelector('head style').remove();
    document.body.setAttribute('class', 'body-main');
  }, []);

  return (<>
    <div className="page">
			<div className="page__header">
        <MainHeader />
			</div>
			<div className="page__main">
        {props.children}
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
};

export default AppShell;