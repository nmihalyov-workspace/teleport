import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import Link from 'next/link';
import Hystmodal from '../Hystmodal';
import { useSelector } from 'react-redux';
import { api_query } from '../../api';

const MainPopups = () => {
  const [loginData, setLoginData] = useState({email: '', password: ''});
  const errorMessageData = useSelector(state => state.errorMessage.data);
  const [errorMessage, setErrorMessage] = useState(errorMessageData || '');

  const login = e => {
    e.preventDefault();

    if (loginData.email === '' || loginData.password === '') {
      window.hystModal.open('#signup-invalid');
    } else {
      api_query.post('/user/login', loginData)
      .then(res => {
        const { success, user } = res.data;
  
        if (success) {
          setLoginData({email: '', password: ''});
          localStorage.setItem('userLoggedIn', JSON.stringify(true));
          api_query.post('/user/info', {token_api: user.auth.token})
          .then(res => {
            const { success, user } = res.data;
            if (success) {
              localStorage.setItem('user', JSON.stringify(user));
              Router.push('/personal');
            } else {
              window.hystModal.open('#signup-failure');
            }
          });
        } else {
          window.hystModal.open('#signup-failure');
        }
      });
    }
  };

  useEffect(() => {
    setErrorMessage(errorMessageData || '');
  }, [errorMessageData]);

  useEffect(() => {
    Array.from(document.querySelectorAll('.hystmodal a.hystmodal__remove')).map(el => {
      el.addEventListener('click', e => {
        document.querySelector('.hystmodal__shadow--show').classList.remove('hystmodal__shadow--show');
        document.querySelector('.hystmodal--active').classList.remove('hystmodal--active');
        document.documentElement.classList.remove('hystmodal__opened');
      });
    });
  }, []);

  return (<>
    <Hystmodal
      id="error"
      title="Произошла ошибка">
      <div className="production-popup">
        <div className="production-popup__row">
          <div className="production-popup__col">
            <div className="production-popup__text">{errorMessage}</div>
          </div>
        </div>
      </div>
    </Hystmodal>
    <Hystmodal
      id="registration"
      title="Выберите способ регистрации"
      footer={
        <div className="popup__footer">
          <div className="popup__footer-line">Возникли проблемы с регистрацией или входом?</div>
          <div className="popup__footer-line">Свяжитесь с нами по телефону <a className="link" href="tel:89501234567">8 (950) 123-45-67</a></div>
          <div className="popup__footer-line">Служба технической поддержки: <a className="link" href="mailto:support@teleport.ru">support@teleport.ru</a></div>
        </div>
      }>
      <div className="modal-form">
        <div className="modal-form__tiles"><Link href="/signup/agent"><a className="modal-form__tile hystmodal__remove"><svg className="modal-form__tile-icon svg">
              <use xlinkHref="/img/svgSprite.svg#icon__agent"></use>
            </svg>
            <div className="modal-form__tile-title">Агент</div></a>
          </Link><Link className="modal-form__tile hystmodal__remove" href="/signup/client"><a className="modal-form__tile hystmodal__remove"><svg className="modal-form__tile-icon svg">
              <use xlinkHref="/img/svgSprite.svg#icon__client"></use>
            </svg>
            <div className="modal-form__tile-title">Клиент</div></a>
          </Link></div>
        <div className="modal-form__end">Уже зарегистрированы? <a className="link" data-hystmodal="#login">Войти</a></div>
      </div>
    </Hystmodal>

    <Hystmodal
      id="login"
      title="Вход в систему"
      footer={
        <div className="popup__footer">
          <div className="popup__footer-line">Возникли проблемы с регистрацией или входом?</div>
          <div className="popup__footer-line">Свяжитесь с нами по телефону <a className="link" href="tel:89501234567">8 (950) 123-45-67</a></div>
          <div className="popup__footer-line">Служба технической поддержки: <a className="link" href="mailto:support@teleport.ru">support@teleport.ru</a></div>
        </div>
      }>
      <div className="modal-form">
        <div className="tabs">
          <ul className="tabs__caption">
            <li className="tabs__item tabs__item_active">По логину и паролю</li>
            <li className="tabs__item">По сертификату ЭЦП</li>
          </ul>
          <div className="tabs__content">
            <div className="tabs__tab tabs__tab_active">
              <form className="form">
                <div className="form__row">
                  <div className="form__item">
                    <div className="field"><label className="field__inner">
                        <div className="field__label">Логин</div><input className="field__input input" type="text" required="required" value={loginData.login} onChange={e => setLoginData({...loginData, email: e.target.value})} />
                      </label>
                      <div className="field__info"></div>
                    </div>
                  </div>
                  <div className="form__item">
                    <div className="field"><label className="field__inner">
                        <div className="field__row">
                          <div className="field__label">Пароль</div><a className="field__forgot" data-hystmodal="#forgot-pass">Забыли пароль?</a>
                        </div><input className="field__input input" type="password" required="required" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} />
                      </label>
                      <div className="field__info"></div>
                    </div>
                  </div><button className="button button_blue form__end-button" onClick={login}>Войти</button>
                </div>
              </form>
            </div>
            <div className="tabs__tab">
              <div className="cripto">
                <div className="cripto__warning"><svg className="cripto__icon svg">
                    <use xlinkHref="/img/svgSprite.svg#icon__info"></use>
                  </svg>
                  <div className="cripto__message">У вас не установлен или не включён плагин КриптоПро ЭЦП Browser plug-in для работы с сервисом</div>
                </div>
                <div className="cripto__inner">
                  <div className="cripto__text">Для продолжения работы вам необходимо:</div>
                  <ol className="cripto__list">
                    <li className="cripto__li">Сохранить последнюю версию установщика</li>
                    <li className="cripto__li">Запустить установочны файл <a className="link" href="#" download>Teleport.Installer</a> и выполнить действия по установке</li>
                    <li className="cripto__li">Включить расширение <strong>CryproPro CAsES Browser Plugin</strong></li>
                    <li className="cripto__li">После установки и включения обновить страницу</li>
                  </ol>
                </div>
              </div><br/><br/><br/>
              <div className="cripto">
                <div className="cripto__enter">
                  <div className="cripto__title">У вас установлено и включено расширение <strong>CryproPro CAsES Browser Plugin</strong>, вы можете войти</div><button className="button">Войти</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-form__end">Ещё не зарегистрированы? <a className="link" data-hystmodal="#registration">Регистрация</a></div>
      </div>
    </Hystmodal>

    <Hystmodal
      id="forgot-pass"
      title="Восстановление пароля"
      footer={
        <div className="popup__footer">
          <div className="popup__footer-line">Возникли проблемы с регистрацией или входом?</div>
          <div className="popup__footer-line">Свяжитесь с нами по телефону <a className="link" href="tel:89501234567">8 (950) 123-45-67</a></div>
          <div className="popup__footer-line">Служба технической поддержки: <a className="link" href="mailto:support@teleport.ru">support@teleport.ru</a></div>
        </div>
      }>
      <div className="modal-form">
        <form className="form">
          <div className="form__row">
            <div className="form__item">
              <div className="field"><label className="field__inner">
                  <div className="field__label">Электронная почта</div><input className="field__input input" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" required="required" />
                </label>
                <div className="field__info"></div>
              </div>
            </div><button className="button button_blue form__end-button">Войти</button>
          </div>
        </form>
        <div className="modal-form__end">Я помню пароль! <a className="link" data-hystmodal="#login">Войти</a></div>
      </div>
    </Hystmodal>

    <Hystmodal
      id="partnership"
      title="Стать партнёром"
      footer={<div className="popup__footer popup__footer_modal"><button className="button">Отправить запрос</button></div>}>
      <div className="modal-form">
        <div className="form">
          <div className="form__row">
            <div className="form__item">
              <div className="field"><label className="field__inner">
                  <div className="field__label">ИНН партнёра</div><input className="field__input input" type="text" required="required" />
                </label>
                <div className="field__info"></div>
              </div>
            </div>
            <div className="form__item">
              <div className="field"><label className="field__inner">
                  <div className="field__label">Наименование партнёра</div><input className="field__input input" type="text" required="required" />
                </label>
                <div className="field__info"></div>
              </div>
            </div>
            <div className="form__item">
              <div className="field"><label className="field__inner">
                  <div className="field__label">ФИО контактного лица</div><input className="field__input input" type="text" required="required" />
                </label>
                <div className="field__info"></div>
              </div>
            </div>
            <div className="form__item">
              <div className="field"><label className="field__inner">
                  <div className="field__label">Электронная почта</div><input className="field__input input" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" required="required" />
                </label>
                <div className="field__info"></div>
              </div>
            </div>
          </div>
          <div className="form__row form__row_2-1">
            <div className="form__item">
              <div className="field"><label className="field__inner">
                  <div className="field__label">Телефон</div><input className="field__input input input_phone" type="text" placeholder="+7 (___) ___-__-__" />
                </label>
                <div className="field__info"></div>
              </div>
            </div>
            <div className="form__item">
              <div className="field"><label className="field__inner">
                  <div className="field__label">доб.</div><input className="field__input input" type="text" required="required" />
                </label>
                <div className="field__info"></div>
              </div>
            </div>
          </div>
          <div className="form__row form__row_2-1">
            <div className="form__item">
              <div className="field"><label className="field__inner">
                  <div className="field__label">Введите код с картинки</div><input className="field__input input" type="text" required="required" />
                </label>
                <div className="field__info"></div>
              </div>
            </div>
            <div className="form__item">captcha</div>
          </div>
        </div>
      </div>
    </Hystmodal>

    <Hystmodal
      id="request"
      title="Оставить заявку"
      footer={<div className="popup__footer popup__footer_modal"><button className="button">Отправить заявку</button></div>}>
      <div className="modal-form">
        <div className="form">
          <div className="form__row">
            <div className="form__item">
              <div className="field"><label className="field__inner">
                  <div className="field__label">Как к вам обращаться</div><input className="field__input input" type="text" required="required" />
                </label>
                <div className="field__info"></div>
              </div>
            </div>
            <div className="form__item">
              <div className="field"><label className="field__inner">
                  <div className="field__label">Телефон</div><input className="field__input input input_phone" type="text" placeholder="+7 (___) ___-__-__" />
                </label>
                <div className="field__info"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Hystmodal>

    <Hystmodal
      id="bg"
      title="Банковская гарантия"
      footer={<div className="popup__footer popup__footer_modal"><Link className="button button_blue" href="/calculator">Рассчитать стоимость</Link><a className="button" data-hystmodal="#request">Оставить заявку</a></div>}>
      <div className="production-popup">
        <div className="production-popup__row">
          <div className="production-popup__col production-popup__col_half">
            <div className="production-popup__text"><strong>Банковская гарантия</strong> — это один из наиболее удобных и надежных способов финансового обеспечения участия и исполнения государственного контракта. При использовании банковской гарантии вам не нужно замораживать собственные средства, вы лишь оплачиваете минимальную комиссию в банк за её выпуск.</div>
            <div className="production-popup__text">Получить банковскую гарантию через Телепорт — быстро и выгодно. В онлайн режиме вы одновременно подаете заявки во все банки-партнеры и далее выбираете выгодное предложение для вас.</div>
          </div>
          <div className="production-popup__col production-popup__col_half">
            <div className="production-popup__bubble">
              <h3 className="production-popup__title">Гарантии:</h3>
              <ul className="production-popup__list">
                <li className="production-popup__li">на обеспечение заявки на участие в закупке</li>
                <li className="production-popup__li">на обеспечение исполнение контракта</li>
                <li className="production-popup__li">на обеспечение возврата авансового платежа</li>
                <li className="production-popup__li">на обеспечение гарантийных обязательствкоммерческие гарантии</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="production-popup__row">
          <div className="production-popup__col">
            <h3 className="production-popup__title">Параметры:</h3>
            <div className="production-popup__grid">
              <div className="production-popup__grid-item">
                <div className="production-popup__grid-text">от <strong>0 ₽</strong><br/>до <strong>1 млрд. ₽</strong></div>
              </div>
              <div className="production-popup__grid-item">
                <div className="production-popup__grid-text">Максимальный срок<br/>на исполнение — <strong>7 лет</strong><br/>на гарантийные обязательства — <strong>10 лет</strong></div>
              </div>
              <div className="production-popup__grid-item">
                <div className="production-popup__grid-text">Все регионы, в том числе <strong>Крым</strong> и <strong>Кавказ</strong></div>
              </div>
              <div className="production-popup__grid-item">
                <div className="production-popup__grid-text">Выпуск гарантии от заведения до выдачи <strong>в течение 2 часов</strong></div>
              </div>
              <div className="production-popup__grid-item">
                <div className="production-popup__grid-text"><strong>Персональный менеджер</strong></div>
              </div>
            </div>
          </div>
        </div><small className="production-popup__small">Выдаваемое обеспечение соответствует требованиям 44-ФЗ и включено в единый реестр банковских гарантий.</small>
      </div>
    </Hystmodal>

    <Hystmodal
      id="credit"
      title="Кредит на исполнение контракта"
      footer={<div className="popup__footer popup__footer_modal"><a className="button" data-hystmodal="#request">Оставить заявку</a></div>}>
      <div className="production-popup">
        <div className="production-popup__row">
          <div className="production-popup__col production-popup__col_3-4">
            <div className="production-popup__text"><strong>Кредит на исполнение контракта</strong> — это кредит для пополнения оборотных средств в целях исполнения государственных контрактов.</div>
            <div className="production-popup__text">Кредит погашается за счёт средств, полученных от контрагента по мере исполнения контракта.</div>
          </div>
        </div>
        <div className="production-popup__row">
          <div className="production-popup__col">
            <h3 className="production-popup__title">Условия предоставления:</h3>
            <div className="production-popup__grid">
              <div className="production-popup__grid-item">
                <div className="production-popup__grid-text">От <strong>10 %</strong> годовых</div>
              </div>
              <div className="production-popup__grid-item">
                <div className="production-popup__grid-text">Сумма — <strong>от 30 % до 70 %</strong> от суммы контракта</div>
              </div>
              <div className="production-popup__grid-item">
                <div className="production-popup__grid-text">Срок рассмотрения <strong>от 1 дня</strong></div>
              </div>
              <div className="production-popup__grid-item">
                <div className="production-popup__grid-text">Максимальная сумма по кредиту — <strong>50 млн. ₽</strong></div>
              </div>
              <div className="production-popup__grid-item">
                <div className="production-popup__grid-text">Максимальный срок кредита — <strong>до 36 месяцев</strong></div>
              </div>
            </div>
          </div>
        </div><small className="production-popup__small">Выдаваемое обеспечение соответствует требованиям 44-ФЗ и включено в единый реестр банковских гарантий.</small>
      </div>
    </Hystmodal>

    <Hystmodal
      id="account"
      title="Расчётный счет"
      footer={<div className="popup__footer popup__footer_modal"><a className="button" data-hystmodal="#request">Оставить заявку</a></div>}>
      <div className="production-popup">
        <div className="production-popup__row">
          <div className="production-popup__col">
            <div className="production-popup__text">Расчётный счет</div>
          </div>
        </div>
      </div>
    </Hystmodal>

    <Hystmodal
      id="signup-success"
      title="Успешная регистрация"
      footer={<div className="popup__footer popup__footer_modal"><Link href="/" className="button">ОК</Link></div>}>
      <div className="production-popup">
        <div className="production-popup__row">
          <div className="production-popup__col">
            <div className="production-popup__text">Пароль отправлен на указанный e-mail</div>
          </div>
        </div>
      </div>
    </Hystmodal>

    <Hystmodal
      id="signup-failure"
      title="Ошибка">
      <div className="production-popup">
        <div className="production-popup__row">
          <div className="production-popup__col">
            <div className="production-popup__text">Произошла ошибка, попробуйте повторить позже</div>
          </div>
        </div>
      </div>
    </Hystmodal>

    <Hystmodal
      id="signup-invalid"
      title="Ошибка">
      <div className="production-popup">
        <div className="production-popup__row">
          <div className="production-popup__col">
            <div className="production-popup__text">Не все поля заполнены корректно</div>
          </div>
        </div>
      </div>
    </Hystmodal>
  </>);
};

export default MainPopups;