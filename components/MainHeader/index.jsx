import React from 'react';
import Link from 'next/link';

const MainHeader = () => {
  return (
    <div className="header">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__col">
            <div className="header__top">
              <Link href="/">
                <svg className="header__logo svg">
                  <use xlinkHref="/img/svgSprite.svg#logo"></use>
                </svg>
              </Link>
              <a className="header__phone header__phone_mobile header-phone" href="tel:88002000000">
                <div className="header-phone__descr">Горячая линия</div>
                <div className="header-phone__number">8 800 200-00-00</div>
              </a><a className="header__phone header-phone" href="tel:88002000000">
                <div className="header-phone__descr">Телефон горячей линии</div>
                <div className="header-phone__number">8 800 200-00-00</div>
              </a>
              <div className="header__buttons"><a className="header__button button" data-hystmodal="#registration">Регистрация</a><a className="header__button button button_black" data-hystmodal="#login">Вход</a></div>
            </div>
            <div className="header__bottom">
              <div className="header__nav-scroll">
                <div className="header__nav header-nav">
                  <div className="header-nav__item"><Link className="header-nav__text" href="/#about">О нас</Link></div>
                  <div className="header-nav__item"><Link className="header-nav__text" href="/#production">Продукты</Link><a href="javascript:void(0)" className="header-nav__trigger"><svg className="header-nav__icon svg">
                        <use xlinkHref="/img/svgSprite.svg#icon__arrow_down"></use>
                      </svg></a>
                    <div className="header-nav__drop"><a className="header-nav__text" data-hystmodal="#bg">Банковская гарантия</a><a className="header-nav__text" data-hystmodal="#credit">Кредит на исполнение контракта</a><a className="header-nav__text" data-hystmodal="#account">Расчетный счёт</a></div>
                  </div>
                  <div className="header-nav__item"><Link className="header-nav__text" href="/#agent">Агентам</Link></div>
                  <div className="header-nav__item"><Link className="header-nav__text" href="/#partners">Партнёры</Link></div>
                  <div className="header-nav__item"><Link className="header-nav__text" href="/calculator">Калькулятор</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;