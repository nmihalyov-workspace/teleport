import React, { useEffect } from 'react';

const MainPage = () => {
  useEffect(() => {
    document.title = "Телепорт — Все банки одним кликом"
  }, []);

	return (<>
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__slider hero-slider swiper-container">
          <div className="hero-slider__inner swiper-wrapper">
            <div className="hero-slider__slide swiper-slide">
              <div className="grid">
                <div className="grid__row">
                  <div className="grid__col grid__col_sm_8 grid__col_md_6 grid__col_xl_5">
                    <div className="hero-slider__info">
                      <div className="hero-slider__tag">#ВремяДеньги</div>
                      <h2 className="hero-slider__title">Все банки одним кликом</h2>
                      <p className="hero-slider__descr">Инновационный портал для получения банковской гарантии</p><a className="button button_large" data-hystmodal="#registration">Регистрация</a>
                    </div>
                  </div>
                  <div className="grid__col grid__col_sm_4 grid__col_md_6 grid__col_xl_6 grid__col-offset_xl_1"><img className="hero-slider__img" src="img/img__hero_01.png" srcSet="img/img__hero_01.png, img/img__hero_01_x2.png 2x" alt="" /></div>
                </div>
              </div>
            </div>
            <div className="hero-slider__slide swiper-slide">
              <div className="grid">
                <div className="grid__row">
                  <div className="grid__col grid__col_sm_8 grid__col_md_6 grid__col_xl_5">
                    <div className="hero-slider__info">
                      <h2 className="hero-slider__title">Банковская гарантия</h2>
                      <p className="hero-slider__descr">По 44-ФЗ, 223-ФЗ, 185-ФЗ (615ПП)<br/>Коммерческие гарантии</p><a className="button button_large" href="calculator.html">Рассчитать стоимость</a>
                    </div>
                  </div>
                  <div className="grid__col grid__col_sm_4 grid__col_md_6 grid__col_xl_6 grid__col-offset_xl_1"><img className="hero-slider__img" src="img/img__hero_02.png" srcSet="img/img__hero_02.png, img/img__hero_02_x2.png 2x" alt="" /></div>
                </div>
              </div>
            </div>
            <div className="hero-slider__slide swiper-slide">
              <div className="grid">
                <div className="grid__row">
                  <div className="grid__col grid__col_sm_8 grid__col_md_6 grid__col_xl_5">
                    <div className="hero-slider__info">
                      <h2 className="hero-slider__title">Наши партнеры</h2>
                      <p className="hero-slider__descr">Инновационный портал для получения банковской гарантии</p><a className="button button_large" href="partners.html">Подробнее</a>
                    </div>
                  </div>
                  <div className="grid__col grid__col_sm_4 grid__col_md_6 grid__col_xl_6 grid__col-offset_xl_1"><img className="hero-slider__img" src="img/img__hero_03.png" srcSet="img/img__hero_03.png, img/img__hero_03_x2.png 2x" alt="" /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-slider__pagination swiper-pagination"></div>
        </div>
        <div className="hero__circle"></div>
      </div>
    </section>
    <section className="section section_bg_white about">
      <div className="section__anchor" id="about"></div>
      <div className="grid">
        <div className="grid__row">
          <div className="grid__col grid__col_lg_6 grid__col_xl_5">
            <div className="section__header">
              <h2 className="page__heading" data-aos="fade-up">О нас</h2>
            </div>
            <p className="page__text" data-aos="fade-up"><strong>Телепорт</strong> — это оптимизированная айти-платформа, где каждый участник государственных закупок в режиме онлайн сможет получить необходимый банковский продукт для исполнения контракта.</p>
            <p className="page__text" data-aos="fade-up" data-aos-delay="125">Уникальность <strong>Телепорта</strong> в том, что одним кликом вы получаете решения от всех банков-партнеров. Вам больше не потребуется тратить ресурсы на заведение и подписание заявок во все банки.</p>
            <p className="page__text" data-aos="fade-up" data-aos-delay="250">Цель айти-платформы в том, чтобы вы получили максимальный результат с минимальными расходами.</p>
          </div>
          <div className="grid__col grid__col_lg_6 grid__col_xl_7">
            <div className="about__inner" data-aos="fade-left" data-aos-anchor-placement="bottom-bottom">
              <picture>
                <source media="(max-width: 1199px)" srcSet="img/img__about.png, img/img__about_x2.png 2x" />
                <source media="(min-width: 1200px)" srcSet="img/img__about_x2.png" /><img className="about__img" src="img/img__about.png" alt="" />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section partners">
      <div className="section__anchor" id="partners"></div>
      <div className="grid">
        <div className="grid__row">
          <div className="grid__col" data-aos="fade">
            <div className="section__header">
              <h2 className="page__heading">Наши партнёры</h2><a className="button button_blue section__button" href="partners.html">Все партнёры</a>
            </div>
            <div className="swiper-container partners__slider partners-slider">
              <div className="swiper-wrapper partners-slider__inner">
                <div className="partners-slider__slide swiper-slide"><img className="partners-slider__img" src="img/img__partner-logo.png" alt="Partner name" /></div>
                <div className="partners-slider__slide swiper-slide"><img className="partners-slider__img" src="img/img__partner-logo.png" alt="Partner name" /></div>
                <div className="partners-slider__slide swiper-slide"><img className="partners-slider__img" src="img/img__partner-logo.png" alt="Partner name" /></div>
              </div>
              <div className="partners-slider__button-prev swiper-button-prev"><svg className="partners-slider__icon svg">
                  <use xlinkHref="/img/svgSprite.svg#icon__shevron_left"></use>
                </svg></div>
              <div className="partners-slider__button-next swiper-button-next"><svg className="partners-slider__icon svg">
                  <use xlinkHref="/img/svgSprite.svg#icon__shevron_right"></use>
                </svg></div>
            </div>
            <div className="button-block">
              <div className="button-block__text">Приглашаем банки<br/>к сотрудничеству</div><a className="button button_round button-block__button" data-hystmodal="#partnership">Стать партнёром</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section section_bg_white production">
      <div className="section__anchor" id="production"></div>
      <div className="grid">
        <div className="grid__row">
          <div className="grid__col">
            <div className="section__header">
              <h2 className="page__heading">Чем мы будем Вам полезны</h2>
            </div>
            <div className="production__grid production-grid"><a className="production-grid__tile" data-hystmodal="#bg" data-aos="fade-up">
                <div className="production-grid__item">Банковская гарантия</div>
                <div className="production-grid__item">Коммерческие гарантии</div>
                <div className="production-grid__item">Гарантии<div className="production-grid__secondary">по 44-ФЗ, 223-ФЗ, 185-ФЗ (615-ПП)</div>
                </div>
              </a><a className="production-grid__tile" data-hystmodal="#credit" data-aos="fade-up" data-aos-delay="250">
                <div className="production-grid__item">Кредит на исполнение контракта<div className="production-grid__secondary">по 44-ФЗ, 223-ФЗ</div>
                </div>
              </a>
              <div className="production-grid__tile" data-aos="fade-up" data-aos-delay="500">
                <div className="production-grid__item">Расчётный счет</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section steps">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__col">
            <div className="section__header">
              <h2 className="page__heading">3 шага к успеху</h2><a className="button button_blue section__button" href="calculator.html">Рассчитать стоимость</a>
            </div>
            <div className="steps__grid steps-grid">
              <div className="steps-grid__tile" data-aos="fade-up">
                <div className="steps-grid__num">1</div>
                <div className="steps-grid__text"><strong>Создайте заявку</strong> в личном кабинете и подпишите документы ЭЦП</div>
              </div>
              <div className="steps-grid__tile" data-aos="fade-up" data-aos-delay="250">
                <div className="steps-grid__num">2</div>
                <div className="steps-grid__text">Банки рассмотрят вашу заявку и <strong>ответят в течении 15 минут</strong></div>
              </div>
              <div className="steps-grid__tile" data-aos="fade-up" data-aos-delay="500">
                <div className="steps-grid__num">3</div>
                <div className="steps-grid__text"><strong>Поздравляем</strong>, вы получили самую выгодную банковскую гарантию!</div>
              </div>
            </div><a className="steps__button button button_round" data-hystmodal="#request">Оставить заявку</a>
          </div>
        </div>
      </div>
    </section>
    <section className="section section_bg_white agent">
      <div className="section__anchor" id="agent"></div>
      <div className="grid">
        <div className="grid__row">
          <div className="grid__col grid__col_xl_10 grid__col-offset_xl_1">
            <div className="section__header">
              <h2 className="page__heading">Агентам</h2>
            </div>
            <div className="agent__grid agent-grid">
              <div className="agent-grid__tile" data-aos="fade-right">
                <h3 className="agent-grid__title">Быстро</h3>
                <div className="agent-grid__text">Наш сервис позволяет завести и подписать заявку для всех банков-партнеров. Одним действием вы получаете лучшие предложения. Минимальный расход времени — максимальный результат! Помните, <span>#ВремяДеньги</span>!</div>
              </div>
              <div className="agent-grid__tile" data-aos="fade-left" data-aos-delay="250">
                <h3 className="agent-grid__title">Выгодно</h3>
                <div className="agent-grid__text">При работе с айти-платформой вы получаете лучшие предложения от банков-партнеров по выгодной для вас цене. Вам останется самое сложное – выбрать лучшее из лучших!</div>
              </div>
              <div className="agent-grid__tile" data-aos="fade-right" data-aos-delay="500">
                <h3 className="agent-grid__title">Удобно</h3>
                <div className="agent-grid__text">Через личный кабинет в режиме онлайн вы всегда видите актуальную информацию. Работа с порталом сопровождается личным куратором, который поможет вам на каждом этапе сделки. С вас документы – от нас решение!</div>
              </div>
              <div className="agent-grid__tile" data-aos="fade-left" data-aos-delay="750">
                <h3 className="agent-grid__title">Надежно</h3>
                <div className="agent-grid__text">Все наши банки-партнеры входят в перечень Минфина. Данные пользователей айти-платформы надежно защищены. Безопасность данных клиентов обеспечивается с помощью системы идентификации. Для документов используются электронные подписи клиентов и банков. С нами вы в надежных руках!</div>
              </div>
            </div><a className="agent__button button button_round" data-hystmodal="#registration">Регистрация</a>
          </div>
        </div>
      </div>
    </section>
    <section className="section last">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__col grid__col_xl_10 grid__col-offset_xl_1" data-aos="fade">
            <div className="section__header">
              <h2 className="page__heading">Вам больше <span>не</span> придётся</h2>
            </div>
            <div className="last__grid">
              <div className="last__item"><svg className="last__icon svg">
                  <use xlinkHref="/img/svgSprite.svg#icon__no_web"></use>
                </svg>
                <div className="last__text">Изучать сайты банков</div>
              </div>
              <div className="last__item"><svg className="last__icon svg">
                  <use xlinkHref="/img/svgSprite.svg#icon__no_form"></use>
                </svg>
                <div className="last__text">Заполнять однотипные анкеты</div>
              </div>
              <div className="last__item"><svg className="last__icon svg">
                  <use xlinkHref="/img/svgSprite.svg#icon__no_phone"></use>
                </svg>
                <div className="last__text">Тратить время на телефонные разговоры</div>
              </div>
              <div className="last__item"><svg className="last__icon svg">
                  <use xlinkHref="/img/svgSprite.svg#icon__no_compare"></use>
                </svg>
                <div className="last__text">Самому сравнивать предложения</div>
              </div>
              <div className="last__item"><svg className="last__icon svg">
                  <use xlinkHref="/img/svgSprite.svg#icon__no_mail"></use>
                </svg>
                <div className="last__text">Плодить переписки, теряя письма</div>
              </div>
            </div>
            <div className="button-block">
              <div className="button-block__text">Экономь время и деньги<br/>вместе с нами!</div><a className="button button_round button-block__button" data-hystmodal="#registration">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>);
};

export default MainPage;