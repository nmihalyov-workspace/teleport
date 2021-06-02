import React from 'react';
import { Link } from 'react-router-dom';

const MainFooter = () => {
  return (
    <div className="footer">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__col">
            <div className="footer__top"><svg className="footer__logo svg">
                <use xlinkHref="/img/svgSprite.svg#logo"></use>
              </svg></div>
            <div className="footer__bottom">
              <div className="footer__col">
                <div className="footer-info">
                  <div className="footer-info__item">
                    <div className="footer-info__title">Техническая поддержка</div><a className="footer-info__link" href="tel:88003000600">8 800 3000 600</a>
                  </div>
                  <div className="footer-info__item">
                    <div className="footer-info__title">Для коммерческих вопросов</div><a className="footer-info__link" href="tel:84951234567">8 495 123 45 67</a>
                  </div>
                  <div className="footer-info__item">
                    <div className="footer-info__title">Электронная почта</div><a className="footer-info__link" href="mailto:mail@teleport.ru">mail@teleport.ru</a>
                  </div>
                  <div className="footer-info__item">
                    <div className="footer-info__title">Почтовый адрес</div>
                    <div className="footer-info__text">115200, г. Москва, ул. Пушкина, 10</div>
                  </div>
                </div>
                <div className="footer__copy">2021 © <span>Телепорт</span></div>
              </div>
              <div className="footer__col">
                <div className="footer-list">
                  <div className="footer-list__title">Продукты</div><Link className="footer-list__link" to="#">Банковская гарантия</Link><Link className="footer-list__link" to="#">Кредит на исполнение контракта</Link><Link className="footer-list__link" to="#">Тендерные займы</Link><Link className="footer-list__link" to="#">Открытие р/с</Link><Link className="footer-list__link" to="#">Выпуск ЭЦП</Link>
                </div>
              </div>
              <div className="footer__col">
                <div className="footer-list">
                  <div className="footer-list__title">Документация</div><Link className="footer-list__link" to="#">Инструкции</Link><Link className="footer-list__link" to="#">Полезные ссылки</Link>
                </div>
              </div>
              <div className="footer__col">
                <div className="footer__hash">#ВремяДеньги</div>
                <div className="footer__socials footer-socials"><Link className="footer-socials__item" to="#"><svg className="footer-socials__icon svg">
                      <use xlinkHref="/img/svgSprite.svg#icon__vk"></use>
                    </svg></Link><Link className="footer-socials__item" to="#"><svg className="footer-socials__icon svg">
                      <use xlinkHref="/img/svgSprite.svg#icon__fb"></use>
                    </svg></Link><Link className="footer-socials__item" to="#"><svg className="footer-socials__icon svg">
                      <use xlinkHref="/img/svgSprite.svg#icon__tg"></use>
                    </svg></Link></div><Link className="footer__button" to="#">Свяжитесь со мной</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;