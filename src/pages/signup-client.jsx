import React from 'react';

const SignupClientPage = () => {
  return (
		<div className="page">
			<div className="page__header">
				<div className="header">
					<div className="grid">
						<div className="grid__row">
							<div className="grid__col">
								<div className="header__top"><a href="/"><svg className="header__logo svg">
											<use xlinkHref="/img/svgSprite.svg#logo"></use>
										</svg></a><a className="header__phone header__phone_mobile header-phone" href="tel:88002000000">
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
											<div className="header-nav__item"><a className="header-nav__text" href="/index.html#about">О нас</a></div>
											<div className="header-nav__item"><a className="header-nav__text" href="index.html#production">Продукты</a><a className="header-nav__trigger"><svg className="header-nav__icon svg">
														<use xlinkHref="/img/svgSprite.svg#icon__arrow_down"></use>
													</svg></a>
												<div className="header-nav__drop"><a className="header-nav__text" data-hystmodal="#bg">Банковская гарантия</a><a className="header-nav__text" data-hystmodal="#credit">Кредит на исполнение контракта</a><a className="header-nav__text" href="#">Расчетный счёт</a></div>
											</div>
											<div className="header-nav__item"><a className="header-nav__text" href="index.html#agent">Агентам</a></div>
											<div className="header-nav__item"><a className="header-nav__text" href="index.html#partners">Партнёры</a></div>
											<div className="header-nav__item"><a className="header-nav__text" href="calculator.html">Калькулятор</a></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="page__main">
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
			</div>
			<div className="page__footer">
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
											<div className="footer-list__title">Продукты</div><a className="footer-list__link" href="#">Банковская гарантия</a><a className="footer-list__link" href="#">Кредит на исполнение контракта</a><a className="footer-list__link" href="#">Тендерные займы</a><a className="footer-list__link" href="#">Открытие р/с</a><a className="footer-list__link" href="#">Выпуск ЭЦП</a>
										</div>
									</div>
									<div className="footer__col">
										<div className="footer-list">
											<div className="footer-list__title">Документация</div><a className="footer-list__link" href="#">Инструкции</a><a className="footer-list__link" href="#">Полезные ссылки</a>
										</div>
									</div>
									<div className="footer__col">
										<div className="footer__hash">#ВремяДеньги</div>
										<div className="footer__socials footer-socials"><a className="footer-socials__item" href="#"><svg className="footer-socials__icon svg">
													<use xlinkHref="/img/svgSprite.svg#icon__vk"></use>
												</svg></a><a className="footer-socials__item" href="#"><svg className="footer-socials__icon svg">
													<use xlinkHref="/img/svgSprite.svg#icon__fb"></use>
												</svg></a><a className="footer-socials__item" href="#"><svg className="footer-socials__icon svg">
													<use xlinkHref="/img/svgSprite.svg#icon__tg"></use>
												</svg></a></div><a className="footer__button" href="#">Свяжитесь со мной</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div><a className="page__to-top"><svg className="page__icon svg">
					<use xlinkHref="/img/svgSprite.svg#icon__arrow_down"></use>
				</svg></a>
		</div>
  );
};

export default SignupClientPage;