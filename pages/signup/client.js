import React from 'react';
import AppWrapper from '../../components/AppWrapper';

const SignupClientPage = () => {
  return (
    <AppWrapper title="Телепорт — Все банки одним кликом">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__col"></div>
        </div>
        <div className="grid__row">
          <div className="grid__col grid__col_md_8 grid__col-offset_md_2 grid__col_lg_6 grid__col-offset_lg_3 grid__col_xxl_4 grid__col-offset_xxl_4">
            <section className="section">
              <div className="section__header">
                <h1 className="page__heading page__heading_tac">Регистрация клиента</h1>
              </div>
              <div className="tabs">
                <ul className="tabs__caption">
                  <li className="tabs__item tabs__item_active">Без сертификата ЭЦП</li>
                  <li className="tabs__item">По сертификату ЭЦП</li>
                </ul>
                <div className="tabs__content">
                  <div className="tabs__tab tabs__tab_active">
                    <form className="form">
                      <div className="form__row">
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">ИНН</div><input className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">ФИО</div><input className="field__input input" type="text" required="required" />
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
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Электронная почта</div><input className="field__input input" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row"><label className="checkbox"><input className="checkbox__input" type="checkbox" checked />
                          <div className="checkbox__fake-input">
                            <div className="checkbox__mark"></div>
                          </div>
                          <div className="checkbox__label">Нажимая кнопку «Зарегистрироваться», я даю свое согласие на обработку моей персональной информации на уловиях, определенных <a className="link" href="#">Политикой конфиденциальности</a>, а также принимаю условия <a className="link" href="#">Договора-оферты</a>.</div>
                        </label><button className="button form__end-button">Зарегистрироваться</button></div>
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
                        <div className="cripto__title">У вас установлено и включено расширение <strong>CryproPro CAsES Browser Plugin</strong>, вы можете войти</div><button className="button">Регистрация</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default SignupClientPage;