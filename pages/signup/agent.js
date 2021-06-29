import React from 'react';
import Image from 'next/image';

import AppWrapper from '../../components/AppWrapper';
import withRegistration from '../../components/_hoc/withRegistration';

const SignupAgentPage = ({ state, setEntity, setEntrepreneur, setSelfemployed, signupEntity, signupEntrepreneur, signupSelfemployed }) => {
  const { entity, entrepreneur, selfemployed } = state;

	return (
    <AppWrapper title="Телепорт — Все банки одним кликом">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__col"></div>
        </div>
        <div className="grid__row">
          <div className="grid__col grid__col_lg_10 grid__col-offset_lg_1 grid__col_xl_8 grid__col-offset_xl_2">
            <section className="section">
              <div className="section__header">
                <h1 className="page__heading page__heading_tac">Регистрация агента</h1>
              </div>
              <div className="tabs">
                <ul className="tabs__caption">
                  <li className="tabs__item tabs__item_active">Юридическое лицо</li>
                  <li className="tabs__item">Индивидуальный предприниматель</li>
                  <li className="tabs__item">Самозанятый</li>
                </ul>
                <div className="tabs__content">
                  <div className="tabs__tab tabs__tab_active">
                    <form className="form">
                      <div className="form__row">
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">ИНН</div><input onChange={e => setEntity('inn', e.target.value)} value={entity.inn} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half form__item_loader"><Image src="img/img__loader.gif" alt="" style={{display: "none"}} /></div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">КПП</div><input onChange={e => setEntity('kpp', e.target.value)} value={entity.kpp} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">ОГРН</div><input onChange={e => setEntity('ogrn', e.target.value)} value={entity.ogrn} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Наименование организации</div><input onChange={e => setEntity('organization_name', e.target.value)} value={entity.organization_name} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">ФИО руководителя</div><input onChange={e => setEntity('head_full_name', e.target.value)} value={entity.head_full_name} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Должность руководителя</div><input onChange={e => setEntity('head_position', e.target.value)} value={entity.head_position} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Основание полномочий руководителя</div><select className="select" required="required" onChange={e => setEntity('basis_authority_id', +e.target.value)}>
                                <option>Выберите значение</option>
                                {entity.head_basis_authorities && entity.head_basis_authorities.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}
                              </select>
                            </label></div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Система налогообложения</div><select className="select" required="required" onChange={e => setEntity('taxation_system_id', +e.target.value)}>
                                <option>Выберите значение</option>
                                {entity.taxation_systems && entity.taxation_systems.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}
                              </select>
                            </label></div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">ОКВЭД</div><input onChange={e => setEntity('okved', e.target.value)} value={entity.okved} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Уставный капитал</div><input onChange={e => setEntity('authorized_capital', e.target.value)} value={entity.authorized_capital} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Дата регистрации</div>
                              <input onChange={e => setEntity('registration_date', e.target.value)} value={entity.registration_date} className="field__input input input_date" type="text" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Численность сотрудников</div><input onChange={e => setEntity('employees_number', +e.target.value)} value={entity.employees_number} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Юридический адрес</div><textarea onChange={e => setEntity('address_legal', e.target.value)} value={entity.address_legal} className="field__textarea textarea"></textarea>
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Почтовый адрес</div><textarea onChange={e => setEntity('address_post', e.target.value)} value={entity.address_post} className="field__textarea textarea"></textarea>
                            </label><label className="checkbox field__textarea-checkbox"><input onChange={e => setEntity('address_post_matches_legal', e.target.checked)} className="checkbox__input" type="checkbox" checked={entity.address_post_matches_legal} />
                              <div className="checkbox__fake-input">
                                <div className="checkbox__mark"></div>
                              </div>
                              <div className="checkbox__label">Почтовый адрес совпадает с юридическим</div>
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Фактический адрес</div><textarea onChange={e => setEntity('address_actual', e.target.value)} value={entity.address_actual} className="field__textarea textarea"></textarea>
                            </label><label className="checkbox field__textarea-checkbox"><input onChange={e => setEntity('address_actual_matches_legal', e.target.checked)} value={entity.address_actual_matches_legal} className="checkbox__input" type="checkbox" checked={entity.address_actual_matches_legal} />
                              <div className="checkbox__fake-input">
                                <div className="checkbox__mark"></div>
                              </div>
                              <div className="checkbox__label">Фактический адрес совпадает с юридическим</div>
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item">
                          <div className="field">
                            <div className="field__inner"><input accept=".jpg, .jpeg, .png" onChange={e => setEntity('charter', e.target.files[0])} className="field__input input jfilestyle" type="file" data-text="Устав" data-placeholder="Выберите файл" required="required" /></div>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item">
                          <div className="field">
                            <div className="field__inner"><input accept=".jpg, .jpeg, .png" onChange={e => setEntity('director_appointment_protocol', e.target.files[0])} className="field__input input jfilestyle" type="file" data-text="Протокол назначения директора" data-placeholder="Выберите файл" required="required" /></div>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item">
                          <div className="field">
                            <div className="field__inner"><input accept=".jpg, .jpeg, .png" onChange={e => setEntity('director_passport', e.target.files[0])} className="field__input input jfilestyle" type="file" data-text="Паспорт директора" data-placeholder="Выберите файл" required="required" /></div>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">БИК банка</div><input onChange={e => setEntity('bank_bik', e.target.value)} value={entity.bank_bik} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">К/С банка</div><input onChange={e => setEntity('bank_ks', e.target.value)} value={entity.bank_ks} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Р/С банка</div><input onChange={e => setEntity('bank_rs', e.target.value)} value={entity.bank_rs} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Наименование банка</div><input onChange={e => setEntity('bank_name', e.target.value)} value={entity.bank_name} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Телефон</div><input className="field__input input input_phone input_phone-entity" type="text" placeholder="+7 (___) ___-__-__" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Электронная почта</div><input onChange={e => setEntity('email', e.target.value)} value={entity.email} className="field__input input" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row"><label className="checkbox"><input onChange={e => setEntity('policy_agreement', e.target.checked)} className="checkbox__input" type="checkbox" checked={entity.policy_agreement} />
                          <div className="checkbox__fake-input">
                            <div className="checkbox__mark"></div>
                          </div>
                          <div className="checkbox__label">Нажимая кнопку «Зарегистрироваться», я даю свое согласие на обработку моей персональной информации на уловиях, определенных <a className="link" href="#">Политикой конфиденциальности</a>, а также принимаю условия <a className="link" href="#">Договора-оферты</a>.</div>
                        </label><button onClick={signupEntity} className="button form__end-button">Зарегистрироваться</button></div>
                    </form>
                  </div>
                  <div className="tabs__tab">
                    <form className="form">
                      <div className="form__row">
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">ИНН</div><input onChange={e => setEntrepreneur('inn', e.target.value)} value={entrepreneur.inn} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half form__item_loader"><Image src="img/img__loader.gif" style={{display: "none"}} /></div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Наименование</div><input onChange={e => setEntrepreneur('named', e.target.value)} value={entrepreneur.named} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">ОГРНИП</div><input onChange={e => setEntrepreneur('ogrnip', e.target.value)} value={entrepreneur.ogrnip} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">ОКВЭД</div><input onChange={e => setEntrepreneur('okved', e.target.value)} value={entrepreneur.okved} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Дата регистрации</div><input onChange={e => setEntrepreneur('registration_date', e.target.value)} value={entrepreneur.registration_date} className="field__input input input_date" type="text" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Система налогообложения</div><select className="select" required="required" onChange={e => setEntrepreneur('taxation_system_id', +e.target.value)}>
                                <option>Выберите значение</option>
                                {entrepreneur.taxation_systems && entrepreneur.taxation_systems.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}
                              </select>
                            </label></div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Адрес регистрации</div><textarea onChange={e => setEntrepreneur('address_legal', e.target.value)} value={entrepreneur.address_legal} className="field__textarea textarea"></textarea>
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Почтовый адрес</div><textarea onChange={e => setEntrepreneur('address_post', e.target.value)} value={entrepreneur.address_post} className="field__textarea textarea"></textarea>
                            </label><label className="checkbox field__textarea-checkbox"><input onChange={e => setEntrepreneur('address_post_matches_legal', e.target.checked)} className="checkbox__input" type="checkbox" checked={entrepreneur.address_post_matches_legal} />
                              <div className="checkbox__fake-input">
                                <div className="checkbox__mark"></div>
                              </div>
                              <div className="checkbox__label">Почтовый адрес совпадает с адресом регистрации</div>
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Фактический адрес</div><textarea onChange={e => setEntrepreneur('address_actual', e.target.value)} value={entrepreneur.address_actual} className="field__textarea textarea"></textarea>
                            </label><label className="checkbox field__textarea-checkbox"><input onChange={e => setEntrepreneur('address_actual_matches_legal', e.target.checked)} className="checkbox__input" type="checkbox" checked={entrepreneur.address_actual_matches_legal} />
                              <div className="checkbox__fake-input">
                                <div className="checkbox__mark"></div>
                              </div>
                              <div className="checkbox__label">Фактический адрес совпадает с адресом регистрации</div>
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item">
                          <div className="field">
                            <div className="field__inner"><input accept=".jpg, .jpeg, .png" onChange={e => setEntrepreneur('passport', e.target.files[0])} className="field__input input jfilestyle" type="file" data-text="Паспорт" data-placeholder="Выберите файл" required="required" /></div>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">БИК банка</div><input onChange={e => setEntrepreneur('banl_bik', e.target.value)} value={entrepreneur.banl_bik} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">К/С банка</div><input onChange={e => setEntrepreneur('bank_ks', e.target.value)} value={entrepreneur.bank_ks} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Р/С банка</div><input onChange={e => setEntrepreneur('bank_rs', e.target.value)} value={entrepreneur.bank_rs} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Наименование банка</div><input onChange={e => setEntrepreneur('bank_name', e.target.value)} value={entrepreneur.bank_name} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Телефон</div><input className="field__input input input_phone input_phone-entrepreneur" type="text" placeholder="+7 (___) ___-__-__" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Электронная почта</div><input onChange={e => setEntrepreneur('email', e.target.value)} value={entrepreneur.email} className="field__input input" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row"><label className="checkbox"><input onChange={e => setEntrepreneur('policy_agreement', e.target.checked)} className="checkbox__input" type="checkbox" checked={entrepreneur.policy_agreement} />
                          <div className="checkbox__fake-input">
                            <div className="checkbox__mark"></div>
                          </div>
                          <div className="checkbox__label">Нажимая кнопку «Зарегистрироваться», я даю свое согласие на обработку моей персональной информации на уловиях, определенных <a className="link" href="#">Политикой конфиденциальности</a>, а также принимаю условия <a className="link" href="#">Договора-оферты</a>.</div>
                        </label><button onClick={signupEntrepreneur} className="button form__end-button">Зарегистрироваться</button></div>
                    </form>
                  </div>
                  <div className="tabs__tab">
                    <form className="form">
                      <div className="form__row">
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Фамилия</div><input onChange={e => setSelfemployed('surname', e.target.value)} value={selfemployed.surname} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Имя</div><input onChange={e => setSelfemployed('name', e.target.value)} value={selfemployed.name} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Отчество</div><input onChange={e => setSelfemployed('patronymic', e.target.value)} value={selfemployed.patronymic} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Серия и номер паспорта</div><input onChange={e => setSelfemployed('passport_series', e.target.value)} value={selfemployed.passport_series} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Дата выдачи паспорта</div><input onChange={e => setSelfemployed('passport_issue_date', e.target.value)} value={selfemployed.passport_issue_date} className="field__input input input_date" type="text" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Дата рождения</div><input onChange={e => setSelfemployed('birthdate', e.target.value)} value={selfemployed.birthdate} className="field__input input input_date" type="text" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Кем выдан паспорт</div><textarea onChange={e => setSelfemployed('passport_issued_by', e.target.value)} value={selfemployed.passport_issued_by} className="field__textarea textarea"></textarea>
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Адрес регистрации</div><textarea onChange={e => setSelfemployed('registration_address', e.target.value)} value={selfemployed.registration_address} className="field__textarea textarea"></textarea>
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">ИНН</div><input onChange={e => setSelfemployed('inn', e.target.value)} value={selfemployed.inn} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">СНИЛС</div><input onChange={e => setSelfemployed('snils', e.target.value)} value={selfemployed.snils} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item">
                          <div className="field">
                            <div className="field__inner"><input accept=".jpg, .jpeg, .png" onChange={e => setSelfemployed('passport_main_spread', e.target.files[0])} className="field__input input jfilestyle" type="file" data-text="Паспорт (главный разворот)" data-placeholder="Выберите файл" required="required" /></div>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item">
                          <div className="field">
                            <div className="field__inner"><input accept=".jpg, .jpeg, .png" onChange={e => setSelfemployed('passport_current_registration', e.target.files[0])} className="field__input input jfilestyle" type="file" data-text="Паспорт (актуальная прописка)" data-placeholder="Выберите файл" required="required" /></div>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item">
                          <div className="field">
                            <div className="field__inner"><input accept=".jpg, .jpeg, .png" onChange={e => setSelfemployed('snils_image', e.target.files[0])} className="field__input input jfilestyle" type="file" data-text="СНИЛС" data-placeholder="Выберите файл" required="required" /></div>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">БИК банка</div><input onChange={e => setSelfemployed('bank_bik', e.target.value)} value={selfemployed.bank_bik} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">К/С банка</div><input onChange={e => setSelfemployed('bank_ks', e.target.value)} value={selfemployed.bank_ks} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Р/С банка</div><input onChange={e => setSelfemployed('bank_rs', e.target.value)} value={selfemployed.bank_rs} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Наименование банка</div><input onChange={e => setSelfemployed('bank_name', e.target.value)} value={selfemployed.bank_name} className="field__input input" type="text" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Телефон</div><input className="field__input input input_phone input_phone-selfemployed" type="text" placeholder="+7 (___) ___-__-__" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                        <div className="form__item form__item_half">
                          <div className="field"><label className="field__inner">
                              <div className="field__label">Электронная почта</div><input onChange={e => setSelfemployed('email', e.target.value)} value={selfemployed.email} className="field__input input" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" required="required" />
                            </label>
                            <div className="field__info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row"><label className="checkbox"><input onChange={e => setSelfemployed('policy_agreement', e.target.checked)} className="checkbox__input" type="checkbox" checked={selfemployed.policy_agreement} />
                          <div className="checkbox__fake-input">
                            <div className="checkbox__mark"></div>
                          </div>
                          <div className="checkbox__label">Нажимая кнопку «Зарегистрироваться», я даю свое согласие на обработку моей персональной информации на уловиях, определенных <a className="link" href="#">Политикой конфиденциальности</a>, а также принимаю условия <a className="link" href="#">Договора-оферты</a>.</div>
                        </label><button onClick={signupSelfemployed} className="button form__end-button">Зарегистрироваться</button></div>
                    </form>
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

export default withRegistration(SignupAgentPage);