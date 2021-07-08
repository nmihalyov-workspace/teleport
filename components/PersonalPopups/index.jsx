import React from 'react';
import Image from 'next/image';
import Modal from '../Modal';

import withPersonalPopups from '../_hoc/withPersonalPopups';

const PersonalPopups = ({ state, setNewClient, setNewUser, addNewClient, addNewUser }) => {
  const { newClient, newUser } = state;

  return (<>
    <Modal
      id="addClient"
      scrollable
      size="lg"
      title="Добавить клиента"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button" onClick={addNewClient}>Сохранить</button></>}>
        <><div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="innClient">ИНН</label>
          <div className="col-lg-9"><input className="form-control" id="innClient" type="text" value={newClient.inn} onChange={e => setNewClient('inn', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="organization_types">Тип организации</label>
          <div className="col-lg-9"><select className="form-control" id="organization_types" onChange={e => setNewClient('user_client_organization_type_id', +e.target.value)} value={newClient.user_client_organization_type_id}>
              <option>выберите тип организации</option>
              {newClient.client_organization_types && newClient.client_organization_types.map(el =>
                <option key={el.id} value={el.id}>{el.name}</option>
              )}
            </select></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="fioClient">ФИО</label>
          <div className="col-lg-9"><input className="form-control" id="fioClient" type="text" value={newClient.full_name} onChange={e => setNewClient('full_name', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="phoneClient">Номер телефона</label>
          <div className="col-lg-9"><input className="form-control" id="phoneClient" type="tel" value={newClient.phone} onChange={e => setNewClient('phone', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="emailClient">E-mail</label>
          <div className="col-lg-9"><input className="form-control" id="emailClient" type="email" value={newClient.email} onChange={e => setNewClient('email', e.target.value)}/></div>
        </div></>
    </Modal>
    <Modal
      id="removeClient"
      scrollable
      size="md"
      title="Удаление клиента"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button">Сохранить</button></>}>
        <p className="mb-0 text-danger h6 font-weight-bold">Сообщение о безвозратности удаления пользователя</p>
    </Modal>
    <Modal
      id="changeUnderwriter"
      size="md"
      title="Смена оператора"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button">Сохранить</button></>}>
        <select className="form-control selectpicker" data-size="5" data-live-search="true">
          <option>Выберите оператора</option>
          <option>Иван Иванов</option>
          <option>Пётр Петров</option>
          <option>Сидор Сидоров</option>
          <option>Михайлов Михаил Михайлович</option>
          <option>Пушкин Александ Сергеевич</option>
          <option>Лермонтов Юрий Михайлович</option>
        </select>
    </Modal>
    <Modal
      id="openModal"
      size="xl"
      title="Карточка клиента"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button">Сохранить</button></>}>
        <><ul className="nav nav-tabs nav-tabs-line">
          <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#client_tab_1">Данные юр. лица</a></li>
          <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#client_tab_2">Местонахождение</a></li>
          <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#client_tab_3">Представитель юр. лица</a></li>
          <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#client_tab_4">Финансовая отчетность</a></li>
          <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#client_tab_5">Банковские реквизиты</a></li>
          <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#client_tab_6">Документы</a></li>
        </ul>
        <div className="tab-content mt-5" id="clientTabs">
          <div className="tab-pane fade show active" id="client_tab_1" role="tabpanel" aria-labelledby="client_tab_1">
            <div className="row">
              <div className="col-lg-8">
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="fullname">Полное наименование</label><input className="form-control" id="fullname" type="text" value="Общество с ограниченной ответственностью «Альфа»" disabled/></div>
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="name">Наименование</label><input className="form-control" id="name" type="text" value="ООО «Альфа»" disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="foreign-name">Наименование на иностранном языке</label><input className="form-control" id="foreign-name" type="text" value="Alfa Gbht" disabled/></div>
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="foreign-short-name">Сокращённое наименование на иностранном языке</label><input className="form-control" id="foreign-short-name" type="text" value="Alfa" disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="inn">ИНН</label><input className="form-control" id="inn" type="text" value="123456789" disabled/></div>
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="kpp">КПП</label><input className="form-control" id="kpp" type="text" value="272000000" disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="ogrn">ОГРН</label><input className="form-control" id="ogrn" type="text" value="12027000000000" disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="okved">Основной вид деятельности (ОКВЭД)</label><input className="form-control" id="okved" type="text" value="41.20" disabled/>
                    <div className="form-text text-muted">Строительство жилых и нежилых зданий</div>
                  </div>
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="head">Генеральный директор:</label><input className="form-control" id="head" type="text" value="Иванов Иван Иванович" disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="capital">Заявленный уставный капитал (₽):</label><input className="form-control" id="capital" type="text" value="10 000" disabled/>
                    <div className="checkbox-inline mt-4"><label className="checkbox"><input type="checkbox" checked/><span></span>Оплачен полностью</label></div>
                  </div>
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="payment">Оплаченный уставный капитал (₽):</label><input className="form-control" id="payment" type="text" value="10 000" disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="registration">Кем зарегистрирован:</label><input className="form-control" id="registration" type="text" value="Инспекция Федеральной налоговой службы по Советскому району г. Урюпинска" disabled/></div>
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="date">Дата создания компании:</label><input className="form-control" id="date" type="text" value="2020-08-26" disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="address">Адрес регистрирующего органа:</label><input className="form-control" id="address" type="text" value="г. Урюпинска, ул. Пушкина, д. 1" disabled/></div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group"><label className="col-form-label" htmlFor="sum">Контактное лицо</label><input className="form-control" id="sum" type="text" value="Пушкин Александр Сергеевич"/></div>
                <div className="form-group"><label className="col-form-label" htmlFor="phone">Номер телефона</label><input className="form-control" id="phone" type="tel" value="+7 (950) 123-45-67"/></div>
                <div className="form-group"><label className="col-form-label" htmlFor="email">E-mail</label><input className="form-control" id="email" type="email" value="mail@example.com"/></div>
                <div className="form-group"><label className="col-form-label" htmlFor="region">Регион</label><select className="form-control" id="region">
                    <option>выберите регион</option>
                    <option>Центральный федеральный округ</option>
                    <option>Северо-Западный федеральный округ</option>
                    <option>Южный федеральный округ</option>
                    <option>Приволжский федеральный округ</option>
                    <option>Уральский федеральный округ</option>
                    <option>Сибирский федеральный округ</option>
                    <option>Дальневосточный федеральный округ</option>
                  </select></div>
                <div className="form-group"><label className="col-form-label" htmlFor="time">Время клиента</label><select className="form-control" id="time">
                    <option>выберите время</option>
                    <option>GMT-3</option>
                    <option>GMT-2</option>
                    <option>GMT-1</option>
                    <option>GMT+0</option>
                    <option>GMT+1</option>
                    <option>GMT+2</option>
                    <option>GMT+3</option>
                  </select></div>
                <div className="form-group"><label className="col-form-label" htmlFor="underwriter">Андеррайтер</label><input className="form-control" id="underwriter" type="text" value="Белозёрова Венера Викторовна" disabled/></div>
                <div className="form-group"><label className="col-form-label" htmlFor="commentField">Комментарий</label><textarea className="form-control" id="commentField" rows="8"></textarea></div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="client_tab_2" role="tabpanel" aria-labelledby="client_tab_2">
            <div className="row">
              <div className="col-lg-6">
                <div className="font-weight-bold font-size-h4 text-dark-75 mb-2">Юридический адрес</div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="postIndex">Индекс</label><input className="form-control" id="postIndex" type="text" pattern="[0-9]{6}"/></div>
                  <div className="col-lg-6"><label className="col-form-label">Страна</label><select className="form-control selectpicker" data-actions-box="true" data-size="5" data-live-search="true">
                      <option value="">Выберите страну</option>
                      <option value="Греция">Греция</option>
                      <option value="Российская Федерация">Российская Федерация</option>
                      <option value="Уругвай">Уругвай</option>
                    </select></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label">Регион (область)</label><select className="form-control selectpicker" data-actions-box="true" data-size="5" data-live-search="true">
                      <option value="">Выберите регион (область)</option>
                      <option value="Татарстан Республика">Татарстан Республика</option>
                      <option value="Пензенская область">Пензенская область</option>
                      <option value="Московская область">Московская область</option>
                    </select></div>
                  <div className="col-lg-6"><label className="col-form-label">Город</label><select className="form-control selectpicker" data-actions-box="true" data-size="5" data-live-search="true">
                      <option value="">Выберите город</option>
                      <option value="Казань">Казань</option>
                      <option value="Альметьевск">Альметьевск</option>
                      <option value="Нижнекамск">Нижнекамск</option>
                    </select></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label">Район</label><select className="form-control selectpicker" data-actions-box="true" data-size="5" data-live-search="true">
                      <option value="">Выберите район</option>
                      <option value="Вахитовский район">Вахитовский район</option>
                      <option value="Советский район">Советский район</option>
                      <option value="Московский район">Московский район</option>
                    </select></div>
                  <div className="col-lg-6"><label className="col-form-label">Улица</label><select className="form-control selectpicker" data-actions-box="true" data-size="5" data-live-search="true">
                      <option value="">Выберите улицу</option>
                      <option value="Пушкина ул.">Пушкина ул.</option>
                      <option value="Тукая ул.">Тукая ул.</option>
                      <option value="Фрунзе ул.">Фрунзе ул.</option>
                    </select></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label">Дом</label><select className="form-control selectpicker" data-actions-box="true" data-size="5" data-live-search="true">
                      <option value="">Выберите дом</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select></div>
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="kvartira">Квартира</label><input className="form-control" id="kvartira" type="text"/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="fias">Код ФИАС</label><input className="form-control" id="fias" type="text"/></div>
                </div>
                <div className="checkbox-inline mt-4"><label className="checkbox"><input type="checkbox" checked/><span></span>Адрес сопадает с фактическим</label></div>
              </div>
              <div className="col-lg-6">
                <div className="font-weight-bold font-size-h4 text-dark-75 mb-2">Фактический адрес</div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="postIndexFact">Индекс</label><input className="form-control" id="postIndexFact" type="text" pattern="[0-9]{6}"/></div>
                  <div className="col-lg-6"><label className="col-form-label">Страна</label><select className="form-control selectpicker" data-actions-box="true" data-size="5" data-live-search="true">
                      <option value="">Выберите страну</option>
                      <option value="Греция">Греция</option>
                      <option value="Российская Федерация">Российская Федерация</option>
                      <option value="Уругвай">Уругвай</option>
                    </select></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label">Регион (область)</label><select className="form-control selectpicker" data-actions-box="true" data-size="5" data-live-search="true">
                      <option value="">Выберите регион (область)</option>
                      <option value="Татарстан Республика">Татарстан Республика</option>
                      <option value="Пензенская область">Пензенская область</option>
                      <option value="Московская область">Московская область</option>
                    </select></div>
                  <div className="col-lg-6"><label className="col-form-label">Город</label><select className="form-control selectpicker" data-actions-box="true" data-size="5" data-live-search="true">
                      <option value="">Выберите город</option>
                      <option value="Казань">Казань</option>
                      <option value="Альметьевск">Альметьевск</option>
                      <option value="Нижнекамск">Нижнекамск</option>
                    </select></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label">Район</label><select className="form-control selectpicker" data-actions-box="true" data-size="5" data-live-search="true">
                      <option value="">Выберите район</option>
                      <option value="Вахитовский район">Вахитовский район</option>
                      <option value="Советский район">Советский район</option>
                      <option value="Московский район">Московский район</option>
                    </select></div>
                  <div className="col-lg-6"><label className="col-form-label">Улица</label><select className="form-control selectpicker" data-actions-box="true" data-size="5" data-live-search="true">
                      <option value="">Выберите улицу</option>
                      <option value="Пушкина ул.">Пушкина ул.</option>
                      <option value="Тукая ул.">Тукая ул.</option>
                      <option value="Фрунзе ул.">Фрунзе ул.</option>
                    </select></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label">Дом</label><select className="form-control selectpicker" data-actions-box="true" data-size="5" data-live-search="true">
                      <option value="">Выберите дом</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select></div>
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="kvartiraFact">Квартира</label><input className="form-control" id="kvartiraFact" type="text"/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlFor="fiasFact">Код ФИАС</label><input className="form-control" id="fiasFact" type="text"/></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-end mt-2"><button className="btn btn-success font-weight-bold">Сохранить</button></div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="client_tab_3" role="tabpanel" aria-labelledby="client_tab_3">
            <div className="row mb-4">
              <div className="col-12">
                <div className="font-weight-bold font-size-h4 text-dark-75 mb-2">Представитель юридического лица</div>
                <div className="table-responsive">
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">ФИО</th>
                        <th scope="col">Дата последнего изменения в ЕГРЮЛ</th>
                        <th scope="col">Дата последнего изменения ВБГ</th>
                        <th scope="col">Скан паспорта</th>
                        <th scope="col">ЕИО</th>
                        <th scope="col">Участник с долей УК</th>
                        <th scope="col">Редактировать</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="align-middle">Пушкин Александр Сергеевич</td>
                        <td className="align-middle">32.03.2021</td>
                        <td className="align-middle">32.03.2021</td>
                        <td className="align-middle">
                          <div className="btn-group" role="group"><button className="btn btn-light-primary btn-sm" type="button">Скачать</button><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить"><i className="flaticon2-trash icon-nm"></i></button></div>
                        </td>
                        <td className="align-middle">✅</td>
                        <td className="align-middle">25%</td>
                        <td className="align-middle">
                          <div className="btn-group" role="group"><button className="btn btn-light-success btn-sm" type="button" data-toggle="modal" data-target="#editRepr">Открыть</button><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить"><i className="flaticon2-trash icon-nm"></i></button></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">Лермонтов Михаил Юрьевич</td>
                        <td className="align-middle">32.03.2021</td>
                        <td className="align-middle">32.03.2021</td>
                        <td className="align-middle">
                          <div className="btn-group" role="group"><button className="btn btn-light-primary btn-sm" type="button">Скачать</button><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить"><i className="flaticon2-trash icon-nm"></i></button></div>
                        </td>
                        <td className="align-middle">✅</td>
                        <td className="align-middle">50%</td>
                        <td className="align-middle">
                          <div className="btn-group" role="group"><button className="btn btn-light-success btn-sm" type="button" data-toggle="modal" data-target="#editRepr">Открыть</button><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить"><i className="flaticon2-trash icon-nm"></i></button></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">Толстой Лев Николаевич</td>
                        <td className="align-middle">32.03.2021</td>
                        <td className="align-middle">32.03.2021</td>
                        <td className="align-middle">
                          <div className="btn-group" role="group"><button className="btn btn-light-primary btn-sm" type="button">Скачать</button><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить"><i className="flaticon2-trash icon-nm"></i></button></div>
                        </td>
                        <td className="align-middle">➖</td>
                        <td className="align-middle">25%</td>
                        <td className="align-middle">
                          <div className="btn-group" role="group"><button className="btn btn-light-success btn-sm" type="button" data-toggle="modal" data-target="#editRepr">Открыть</button><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить"><i className="flaticon2-trash icon-nm"></i></button></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="client_tab_4" role="tabpanel" aria-labelledby="client_tab_4">
            <div className="h4 text-dark mb-4">Заголовок</div>
            <div className="accordion accordion-solid accordion-toggle-plus" id="accordion">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <div className="card-title" data-toggle="collapse" data-target="#collapseOne">Заголовок первого уровня</div>
                </div>
                <div className="collapse show" id="collapseOne" data-parent="#accordion">
                  <div className="card-body p-0">
                    <div className="table-responsive mt-2">
                      <table className="table mb-2">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="text-center" scope="col" colSpan="6">Заголовок второго уровня</th>
                          </tr>
                          <tr className="bg-gray-100">
                            <th scope="col">Наименование показателя</th>
                            <th scope="col">Код строки</th>
                            <th scope="col">3 квартал 2020 года</th>
                            <th scope="col">2019 год</th>
                            <th scope="col">2018 год</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className="align-middle" scope="row">Результаты исследрования и разработок</th>
                            <td className="align-middle">1000</td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                          </tr>
                          <tr>
                            <th className="align-middle" scope="row">Нематериальные активы</th>
                            <td className="align-middle">1000</td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                          </tr>
                          <tr>
                            <th className="align-middle" scope="row">Материальные активы</th>
                            <td className="align-middle">1000</td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="bg-gray-300">
                            <th className="align-middle" scope="row">Итого</th>
                            <td className="align-middle">1000</td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <div className="card-title collapsed" data-toggle="collapse" data-target="#collapseTwo">Заголовок первого уровня 2</div>
                </div>
                <div className="collapse" id="collapseTwo" data-parent="#accordion">
                  <div className="card-body p-0">
                    <div className="table-responsive mt-2">
                      <table className="table mb-2">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="text-center" scope="col" colSpan="6">Заголовок второго уровня</th>
                          </tr>
                          <tr className="bg-gray-100">
                            <th scope="col">Наименование показателя</th>
                            <th scope="col">Код строки</th>
                            <th scope="col">3 квартал 2020 года</th>
                            <th scope="col">2019 год</th>
                            <th scope="col">2018 год</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className="align-middle" scope="row">Результаты исследрования и разработок</th>
                            <td className="align-middle">1000</td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                          </tr>
                          <tr>
                            <th className="align-middle" scope="row">Нематериальные активы</th>
                            <td className="align-middle">1000</td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                          </tr>
                          <tr>
                            <th className="align-middle" scope="row">Материальные активы</th>
                            <td className="align-middle">1000</td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="bg-gray-300">
                            <th className="align-middle" scope="row">Итого</th>
                            <td className="align-middle">1000</td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                            <td className="align-middle w-160px"><input className="form-control" type="number" value="0"/></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center bg-light rounded p-4 my-2"><span>Утверждение: <span className="font-weight-500 text-success">Да</span></span></div>
              <div className="d-flex justify-content-center bg-light rounded p-4 my-2"><span>Утверждение: <span className="font-weight-500 text-danger">Нет</span></span></div>
            </div>
          </div>
          <div className="tab-pane fade" id="client_tab_5" role="tabpanel" aria-labelledby="client_tab_5">
            <div className="row">
              <div className="col-12">
                <div className="form-group row">
                  <div className="col-lg-4"><label className="col-form-label" htmlFor="bik">БИК</label><input className="form-control" id="bik" type="text" placeholder="введите БИК"/></div>
                  <div className="col-lg-4"><label className="col-form-label" htmlFor="name">Наименование банка</label><input className="form-control" id="bank" type="text" placeholder="введите наименование банка"/></div>
                  <div className="col-lg-4"><label className="col-form-label" htmlFor="ks">Корреспондентский счёт</label><input className="form-control" id="ks" type="text" placeholder="введите корреспондентский счёт"/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4"><label className="col-form-label" htmlFor="rs">Расчётный счёт</label><input className="form-control" id="rs" type="text" placeholder="введите расчётный счёт"/></div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="client_tab_6" role="tabpanel" aria-labelledby="client_tab_6">
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" colSpan="2">Наименование документа</th>
                        <th scope="col">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="align-middle">Годовая бухгалтерская отчётность
                          <span className="font-weight-bolder text-danger">*</span>
                        </td>
                        <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                        <td className="align-middle"><a className="btn btn-sm btn-light-success font-weight-bold" href="" data-toggle="modal" data-target="#loadFile">Загрузить</a></td>
                      </tr>
                      <tr>
                        <td className="align-middle">Квартальная бухгалтерская отчётность
                          <span className="font-weight-bolder text-danger">*</span>
                        </td>
                        <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                        <td className="align-middle">
                          <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="filename.pdf" download>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" data-toggle="modal" data-target="#removeFile"><i className="flaticon2-trash icon-nm"></i></button></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">Паспорт</td>
                        <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                        <td className="align-middle">
                          <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="filename.pdf" download>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" data-toggle="modal" data-target="#removeFile"><i className="flaticon2-trash icon-nm"></i></button></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">Протокол</td>
                        <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                        <td className="align-middle">
                          <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="filename.pdf" download>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" data-toggle="modal" data-target="#removeFile"><i className="flaticon2-trash icon-nm"></i></button></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">Устав</td>
                        <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                        <td className="align-middle">
                          <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="filename.pdf" download>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" data-toggle="modal" data-target="#removeFile"><i className="flaticon2-trash icon-nm"></i></button></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div></>
    </Modal>
    <Modal
      id="comment"
      size="md"
      title="Комментарий"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button">Сохранить</button></>}>
        <div className="form-group mb-0"><textarea className="form-control" rows="5"></textarea></div>
    </Modal>
    <Modal
      id="editRepr"
      scrollable
      size="xl"
      title="Редактировать представителя"
      footer={<><button className="btn btn-light-danger font-weight-bold" type="button">Удалить</button><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button">Сохранить</button></>}>
        <form className="form">
          <h4>Основные сведения</h4>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="lastname">Фамилия</label><input className="form-control" id="lastname" type="text" value="Иванов"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="firstname">Имя</label><input className="form-control" id="firstname" type="text" value="Иван"/></div>
              <div className="form-group"><label className="col-form-label" htmlFor="fathername">Отчество</label><input className="form-control" id="fathername" type="text" value="Иванович"/></div>
              <div className="form-group m-0">
                <div className="checkbox-inline"><label className="checkbox align-items-start"><input type="checkbox" name="Check1"/><span></span>Является иностранным публичным должностным лицом, должностным лицом публичных международных организаций, а также лицом, замещающим (занимающим) государственные должности РФ, должности членов Совета директоров ЦБ РФ, должности федеральной государственной службы, назначение на которые и освобождение от которых государственных корпорациях и иных организациях, созданных РФ на основании федеральных законов, включенные в перечни должностей, определяемые Президентом РФ</label></div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="inn2">ИНН</label><input className="form-control" id="inn2" type="text" value="123456789"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="snils">Снилс</label><input className="form-control" id="snils" type="text" value="123456789"/></div>
              <div className="form-group"><label className="col-form-label" htmlFor="number">Номер телефона</label><input className="form-control" id="number" type="tel" placeholder="+79501234567"/></div>
              <div className="form-group m-0">
                <div className="checkbox-inline"><label className="checkbox align-items-start"><input type="checkbox" name="Check1"/><span></span>Является родственником по отношению к иностранным публичным должностным лицам, должностным лицам публичных международных организаций, а также лицам, замещающим (занимающим) государственные должности РФ, должности членов Совета директоров ЦБ РФ, должности федеральной государственной службы, назначение на которые и освобождение от которых осуществляются Президентом РФ или Правительством РФ, должности в ЦБ РФ, государственных корпорациях и иных организациях, созданных РФ на основании федеральных законов, включенные в перечни должностей, определяемые Президентом РФ</label></div>
              </div>
            </div>
          </div>
          <div className="separator separator-solid my-6"></div>
          <h4>Роль в организации</h4>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="share">Доля в уставном капитале</label><input className="form-control" id="share" type="text" value="100"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="admission">Основание признания лица</label><input className="form-control" id="admission" type="text" value="Прямое или косвенное владение долей более 25%"/></div>
              <div className="form-group row mb-0"><label className="col-lg-6 col-form-label">Единоличный исп. орган:</label>
                <div className="col-6 col-form-label">
                  <div className="radio-inline"><label className="radio radio-primary"><input type="radio" name="radio" checked="checked"/><span></span>Да</label><label className="radio radio-primary"><input type="radio" name="radio"/><span></span>Нет</label></div>
                </div>
              </div>
              <div className="form-group row mb-0"><label className="col-lg-6 col-form-label">Акционер с долей не менее 1%</label>
                <div className="col-6 col-form-label">
                  <div className="radio-inline"><label className="radio radio-primary"><input type="radio" name="radio1" checked="checked"/><span></span>Да</label><label className="radio radio-primary"><input type="radio" name="radio1"/><span></span>Нет</label></div>
                </div>
              </div>
              <div className="form-group row mb-0"><label className="col-lg-6 col-form-label">Бенефициар / Доля в УК (%)</label>
                <div className="col-6 col-form-label">
                  <div className="radio-inline"><label className="radio radio-primary"><input type="radio" name="radio2" checked="checked"/><span></span>Да</label><label className="radio radio-primary"><input type="radio" name="radio2"/><span></span>Нет</label></div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="place">Должнсть физ. лица</label><input className="form-control" id="place" type="text" value="Генеральный директор"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="datePlace">Дата назначения на должность</label>
                <div className="input-daterange input-group" id="requests-date"><input className="form-control" id="datePlace" type="text" name="start"/></div>
              </div>
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="ogrnip">ОГРНИП</label><input className="form-control" id="ogrnip" type="text" value="123456789"/></div>
            </div>
          </div>
          <div className="separator separator-solid my-6"></div>
          <h4>Паспортные данные</h4>
          <div className="row">
            <div className="col-12">
              <div className="form-group mb-4"><label className="col-form-label">Удостоверение личности</label>
                <div className="col-form-label">
                  <div className="radio-inline"><label className="radio radio-primary"><input type="radio" name="radio3" checked="checked"/><span></span>Паспорт РФ</label><label className="radio radio-primary radio-disabled"><input type="radio" name="radio3" disabled/><span></span>Другой документ РФ</label><label className="radio radio-primary radio-disabled"><input type="radio" name="radio3" disabled/><span></span>Я нерезидент РФ</label></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group mb-4"><label className="col-form-label" htmlFor="seria">Серия</label><input className="form-control" id="seria" type="text" placeholder="0000"/></div>
                  </div>
                  <div className="col-6">
                    <div className="form-group mb-4"><label className="col-form-label" htmlFor="num">Номер</label><input className="form-control" id="num" type="text" placeholder="000000"/></div>
                  </div>
                </div>
                <div className="form-group mb-4"><label className="col-form-label" htmlFor="passportDate">Дата выдачи</label>
                  <div className="input-daterange input-group"><input className="form-control" id="passportDate" type="text" name="passportDate" placeholder="дд.мм.гггг"/></div>
                </div>
                <div className="form-group mb-4"><label className="col-form-label" htmlFor="code">Код подразделения</label><input className="form-control" id="code" type="text" placeholder="000-000"/></div>
                <div className="form-group mb-4"><label className="col-form-label" htmlFor="who">Кем выдан</label><input className="form-control" id="who" type="text"/></div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-4"><label className="col-form-label">Пол</label>
                  <div className="col-form-label">
                    <div className="radio-inline"><label className="radio radio-primary"><input type="radio" name="radio4" checked="checked"/><span></span>Муж</label><label className="radio radio-primary"><input type="radio" name="radio4"/><span></span>Жен</label></div>
                  </div>
                </div>
                <div className="form-group mb-4"><label className="col-form-label" htmlFor="birthPlace">Место рождения</label><input className="form-control" id="birthPlace" type="text"/></div>
                <div className="form-group mb-4"><label className="col-form-label" htmlFor="birthDate">Дата рождения</label>
                  <div className="input-daterange input-group"><input className="form-control" id="birthDate" type="text" name="passportDate" placeholder="дд.мм.гггг"/></div>
                </div>
                <div className="form-group mb-4"><label className="col-form-label">Скан паспорта</label>
                  <div className="dropzone dropzone-multi" id="dropzone_client_passport">
                    <div className="dropzone-panel mb-lg-0 mb-2"><a className="dropzone-select btn btn-light-primary font-weight-bold btn-sm">Прикрепить файлы</a></div>
                    <div className="dropzone-items">
                      <div className="dropzone-item" style={{display: "none"}}>
                        <div className="dropzone-file">
                          <div className="dropzone-filename" title="some_image_file_name.jpg"><span data-dz-name="">some_image_file_name.jpg</span><strong>(<span data-dz-size="">340kb</span>)</strong></div>
                          <div className="dropzone-error" data-dz-errormessage=""></div>
                        </div>
                        <div className="dropzone-progress">
                          <div className="progress">
                            <div className="progress-bar bg-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-dz-uploadprogress=""></div>
                          </div>
                        </div>
                        <div className="dropzone-toolbar"><span className="dropzone-delete" data-dz-remove=""><i className="flaticon2-cross"></i></span></div>
                      </div>
                    </div><span className="form-text text-muted">Максимальный размер — 1MB, максимальное количество — 5 шт.</span>
                  </div>
                </div>
                <div className="form-group mb-4"><label className="col-form-label">Скан паспорта</label>
                  <div className="d-block">
                    <div className="btn-group" role="group"><a className="btn btn-light-success btn-sm" href="somefile.pdf" download>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить"><i className="flaticon2-trash icon-nm"></i></button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="separator separator-solid my-6"></div>
          <h4>Адрес регистрации</h4>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="index">Индекс</label><input className="form-control" id="index" type="text" placeholder="000000"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="country">Страна</label><input className="form-control" id="country" type="text"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="regionSelect">Регион (Область)</label><select className="form-control selectpicker" id="regionSelect" data-size="5" data-live-search="true">
                  <option>Выберите регион</option>
                  <option>Регион 1</option>
                  <option>Регион 2</option>
                  <option>Регион 3</option>
                  <option>Регион 4</option>
                  <option>Регион 5</option>
                  <option>Регион 6</option>
                </select></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="district">Район</label><select className="form-control selectpicker" id="district" data-size="5" data-live-search="true">
                  <option>Выберите район</option>
                  <option>Район 1</option>
                  <option>Район 2</option>
                  <option>Район 3</option>
                  <option>Район 4</option>
                  <option>Район 5</option>
                  <option>Район 6</option>
                </select></div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="city">Город / Населённый пункт</label><select className="form-control selectpicker" id="city" data-size="5" data-live-search="true">
                  <option>Выберите город</option>
                  <option>Город 1</option>
                  <option>Город 2</option>
                  <option>Город 3</option>
                  <option>Город 4</option>
                  <option>Город 5</option>
                  <option>Город 6</option>
                </select></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="street">Улица</label><select className="form-control selectpicker" id="street" data-size="5" data-live-search="true">
                  <option>Выберите улицу</option>
                  <option>Улица 1</option>
                  <option>Улица 2</option>
                  <option>Улица 3</option>
                  <option>Улица 4</option>
                  <option>Улица 5</option>
                  <option>Улица 6</option>
                </select></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="house">Дом</label><input className="form-control" id="house" type="text"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlFor="apartment">Квартира</label><input className="form-control" id="apartment" type="text"/></div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="checkbox-inline mt-2"><label className="checkbox"><input type="checkbox" checked="checked" name="checkbox1"/><span></span>Адрес места регистрации совпадает с адресом местонахождения</label></div>
            </div>
          </div>
        </form>
    </Modal>
    <Modal
      id="loadFile"
      size="md"
      title="Загрузить файл"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button">Сохранить</button></>}>
        <div className="form-group m-0"><label className="col-form-label text-lg-right">Файл</label>
          <div className="dropzone dropzone-success" id="newFile">
            <div className="dropzone-msg dz-message needsclick">
              <h3 className="dropzone-msg-title">Для загрузки перетащите файл сюда или кликните</h3><span className="dropzone-msg-desc">Доступные для загрузки форматы: PDF, DOCX</span>
            </div>
          </div>
        </div>
    </Modal>
    <Modal
      id="removeFile"
      scrollable
      size="sm"
      title="Удаление файла"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Нет</button><button className="btn btn-primary font-weight-bold" type="button">Да</button></>}>
        <p className="mb-0 text-danger h6 font-weight-bold">Вы точно хотите удалить данный файл?</p>
    </Modal>
    <Modal
      id="requestInfo"
      scrollable
      size="md"
      title="Заявки от банков"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Закрыть</button></>}><>
        <div className="rounded bg-light p-3 d-flex align-items-center justify-content-between flex-wrap"><Image className="w-auto h-25px" alt="bank" layout="fill" src="/assets/media/logos/bank-abb.png"/><span className="label label-warning label-pill label-inline mr-2 my-2">Запрос от банка</span></div>
        <div className="rounded bg-light p-3 mt-2 d-flex align-items-center justify-content-between flex-wrap"><Image className="w-auto h-25px" alt="bank" layout="fill" src="/assets/media/logos/bank-gp.png"/><span className="label label-danger label-pill label-inline mr-2 my-2">Отклонена банком</span></div>
        <div className="rounded bg-light p-3 mt-2 d-flex align-items-center justify-content-between flex-wrap"><Image className="w-auto h-25px" alt="bank" layout="fill" src="/assets/media/logos/bank-rs.png"/><span className="label label-light-success label-pill label-inline mr-2 my-2">Есть предложение</span></div>
        <div className="rounded bg-light p-3 mt-2 d-flex align-items-center justify-content-between flex-wrap"><Image className="w-auto h-25px" alt="bank" layout="fill" src="/assets/media/logos/bank-spb.png"/><span className="label label-info label-pill label-inline mr-2 my-2">Доступна банку</span></div>
        <div className="rounded bg-light p-3 mt-2 d-flex align-items-center justify-content-between flex-wrap"><Image className="w-auto h-25px" alt="bank" layout="fill" src="/assets/media/logos/bank-us.png"/><span className="label label-secondary label-pill label-inline mr-2 my-2">Доступна отправка</span></div>
        <div className="rounded bg-light p-3 mt-2 d-flex align-items-center justify-content-between flex-wrap"><Image className="w-auto h-25px" alt="bank" layout="fill" src="/assets/media/logos/bank-us.png"/><span className="label label-success label-pill label-inline mr-2 my-2">Исполнена</span></div>
        <div className="rounded bg-light p-3 mt-2 d-flex align-items-center justify-content-between flex-wrap"><Image className="w-auto h-25px" alt="bank" layout="fill" src="/assets/media/logos/bank-abb.png"/><span className="label label-warning label-pill label-inline mr-2 my-2">Принято другое предложение</span></div>
        <div className="rounded bg-light p-3 mt-2 d-flex align-items-center justify-content-between flex-wrap"><Image className="w-auto h-25px" alt="bank" layout="fill" src="/assets/media/logos/bank-abb.png"/><span className="label label-danger label-pill label-inline mr-2 my-2">Изменение комиссии</span></div>
    </></Modal>
    <Modal
      id="addUser"
      scrollable
      size="lg"
      title="Добавить пользователя"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button" onClick={addNewUser}>Сохранить</button></>}><>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="fio">ФИО</label>
          <div className="col-lg-9"><input className="form-control" id="fio" type="text" placeholder="ФИО" value={newUser.full_name} onChange={e => setNewUser('full_name', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="place">Должность</label>
          <div className="col-lg-9"><input className="form-control" id="place" type="text" placeholder="введите должность" value={newUser.position} onChange={e => setNewUser('position', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="number">Номер телефона</label>
          <div className="col-lg-5"><input className="form-control" id="number" type="tel" placeholder="+79501234567" value={newUser.phone} onChange={e => setNewUser('phone', e.target.value)}/></div>
          <div className="col-lg-4"><input className="form-control" type="text" placeholder="добавочный" value={newUser.phone_addition} onChange={e => setNewUser('phone_addition', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="email">Электронная почта</label>
          <div className="col-lg-9"><input className="form-control" id="email" type="email" placeholder="email@email.ru" value={newUser.email} onChange={e => setNewUser('email', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="credentials">Полномочия</label>
          <div className="col-lg-9"><select className="form-control" id="credentials" onChange={e => setNewUser('user_credential', +e.target.value)} value={newUser.user_credential}>
              <option>выберите уровень</option>
              {newUser.credentials && newUser.credentials.map(el =>
                <option key={el.id} value={el.id}>{el.name}</option>
              )}
            </select></div>
        </div>
        <div className="form-group row mb-0"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="password">Пароль</label>
          <div className="col-lg-9"><input className="form-control" id="password" type="text" value={newUser.password} onChange={e => setNewUser('password', e.target.value)} placeholder="пароль"/></div>
        </div>
    </></Modal>
    <Modal
      id="removeUser"
      scrollable
      size="md"
      title="Удаление записи"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button">Сохранить</button></>}><>
        <p className="mb-0 text-danger h6 font-weight-bold">Сообщение о безвозратности удаления записи</p>
    </></Modal>
  </>);
};

export default withPersonalPopups(PersonalPopups);