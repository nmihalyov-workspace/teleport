import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { api_query } from '../../api';
import closePersonalPopup from '../../helpers/closePersonalPopup';

import Modal from '../Modal';
import withPersonalPopups from '../_hoc/withPersonalPopups';

const PersonalPopups = ({ state, setNewClient, setNewUser, setNewSubagent, setChangePassword, addNewClient, addNewUser, addNewSubagent, requestChangePassword }) => {
  const { newClient, newUser, newSubagent, changePassword } = state;
  const clientCardData = useSelector(state => state.clientCard.data);
  const editUserData = useSelector(state => state.editUser.data);
  const errorMessageData = useSelector(state => state.errorMessage.data);
  const [credentials, setCredentials] = useState(null);
  const [clientCard, setClientCard] = useState(clientCardData.client_organization || {});
  const [editUser, setEditUser] = useState(editUserData || {});
  const [errorMessage, setErrorMessage] = useState(errorMessageData || '');

  const setClientCardData = (key, value) => {
    if (['annual_reports', 'quarterly_reports', 'passports', 'protocols', 'charters'].includes(key)) {
      value = [value];
    }
  
    setClientCard({
      ...clientCard,
      [key]: value
    });
  };

  const setEditUserData = (key, value) => {
    setEditUser({
      ...editUser,
      emailWasUpdated: key === 'email' ? true : editUser.emailWasUpdated,
      [key]: value
    });
  };

  useEffect(() => {
    api_query.post('/user/credentials')
    .then(res => {
      const { success, credentials } = res.data;

      if (success) {
        setCredentials(credentials);
      }
    });
  }, []);

  useEffect(() => {
    setClientCard(clientCardData.client_organization || {});
  }, [clientCardData]);
  
  useEffect(() => {
    setEditUser(replaceNull(editUserData) || {});
  }, [editUserData]);

  useEffect(() => {
    setErrorMessage(errorMessageData || '');
  }, [errorMessageData]);

  const replaceNull = obj => {
    const replacer = (key, value) => String(value) ==='null' || String(value) === 'undefined' ? '' : value;

    return JSON.parse(JSON.stringify(obj, replacer));
  }

  const formData = inputData => {
    const data = Object.assign({}, inputData);
    let isValid = true;

    Object.keys(data).map(el => {
      if (data[el] === false) data[el] = 0;
      if (data[el] === true) data[el] = 1;
      if (el === 'client_organization_id' && !el) isValid = false;
    });

    return ({data, isValid});
  }

  const clientCardEditRequest = ({data, isValid}) => {
    if (isValid) {
      const formData = new FormData();
      const token_api = JSON.parse(localStorage.getItem('user')).auth.token;
      Object.keys(data).map(el => {
        if (data[el] === null) {
          return false;
        } else if (Array.isArray(data[el])) {
          data[el].map(e => {
            formData.append(el + '[]', e);
          });
        } else if (['annual_reports', 'quarterly_reports', 'passports', 'protocols', 'charters'].includes(el)) {
          formData.append('client_organization_' + el, data[el]);
        } else if (el === 'id') {
          formData.append('client_organization_id', data[el]);
        } else {
          formData.append(el, data[el]);
        }
      });
      formData.append('token_api', token_api);

      api_query.post('/client_organization/edit', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
        if (res.data.success) {
          closePersonalPopup();
          Router.reload(window.location.pathname);
        }
      });
    }
  };

  const editUserSendRequest = ({data, isValid}) => {
    if (isValid) {
      const token_api = JSON.parse(localStorage.getItem('user')).auth.token;
      data.token_api = token_api;
      data.user_id = data.id;
      data.user_credential_id = data.user_credential.id;
      data.phone = parseInt(data.phone);
      data.phone_addition = parseInt(data.phone_addition);
      if (!data.emailWasUpdated) {
        delete(data.email)
      }

      api_query.post('/user/edit', data).then(res => {
        if (res.data.success) {
          closePersonalPopup();
          Router.reload(window.location.pathname);
        }
      });
    }
  };

  const clientCardEdit = e => {
    e.preventDefault();

    const data = clientCard;

    clientCardEditRequest(formData(data));
  };

  const editUserSend = e => {
    e.preventDefault();

    const data = editUser;

    editUserSendRequest(formData(data));
  };

  return (<>
    <Modal
      id="error"
      scrollable
      size="md"
      title="Произошла ошибка"
      footer={<button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Закрыть</button>}>
        <p className="col-form-label">{errorMessage}</p>
    </Modal>
    <Modal
      id="changePass"
      scrollable
      size="md"
      title="Изменение пароля"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button" onClick={requestChangePassword}>Сохранить</button></>}>
        <><div className="form-group row"><label className="col-lg-4 col-form-label text-lg-right" htmlFor="oldPassword">Старый пароль</label>
          <div className="col-lg-8"><input className="form-control" id="oldPassword" type="password" onChange={e => setChangePassword('old_password', e.target.value)} value={changePassword.old_password} /></div>
        </div>
        <div className="form-group row"><label className="col-lg-4 col-form-label text-lg-right" htmlFor="newPassword">Новый пароль</label>
          <div className="col-lg-8"><input className="form-control" id="newPassword" type="password" onChange={e => setChangePassword('new_password', e.target.value)} value={changePassword.new_password} /></div>
        </div>
        <div className="form-group row mb-0"><label className="col-lg-4 col-form-label text-lg-right" htmlFor="repeatPassword">Подтверждение нового пароля</label>
          <div className="col-lg-8"><input className="form-control" id="repeatPassword" type="password" onChange={e => setChangePassword('repeat_password', e.target.value)} value={changePassword.repeat_password} /></div>
        </div></>
    </Modal>
    <Modal
      id="editRepresent"
      scrollable
      size="lg"
      title="Представитель юр. лица"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button">Сохранить</button></>}>
        <><div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="head">ФИО руководителя</label>
          <div className="col-lg-9"><input className="form-control" id="head" type="text" placeholder="ФИО" /></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="place">Должность руководителя</label>
          <div className="col-lg-9"><input className="form-control" id="place" type="text" placeholder="Должность" /></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right">Паспорт руководителя</label>
          <div className="col-lg-9">
            <div className="dropzone dropzone-multi" id="dropzone_dir-passport">
              <div className="dropzone-panel mb-lg-0 mb-2"><a className="dropzone-select btn btn-light-primary font-weight-bold btn-sm">Прикрепить файлы</a></div>
              <div className="dropzone-items">
                <div className="dropzone-item" style={{display: 'none'}}>
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
              </div>
            </div><span className="form-text text-muted">Максимальный размер — 1MB, максимальное количество — 5 шт.</span>
          </div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right">Протокол/решение о назначении</label>
          <div className="col-lg-9">
            <div className="dropzone dropzone-multi" id="dropzone_protocol">
              <div className="dropzone-panel mb-lg-0 mb-2"><a className="dropzone-select btn btn-light-primary font-weight-bold btn-sm">Прикрепить файлы</a></div>
              <div className="dropzone-items">
                <div className="dropzone-item" style={{display: 'none'}}>
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
              </div>
            </div><span className="form-text text-muted">Максимальный размер — 1MB, максимальное количество — 5 шт.</span>
          </div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="number">Номер телефона</label>
          <div className="col-lg-9"><input className="form-control" id="number" type="tel" placeholder="+79501234567" /></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlFor="email">Электронная почта</label>
          <div className="col-lg-9"><input className="form-control" id="email" type="email" placeholder="email@email.ru" /></div>
        </div></>
    </Modal>
    <Modal
      id="addClient"
      scrollable
      size="lg"
      title="Добавить клиента"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button" onClick={addNewClient}>Сохранить</button></>}>
        <><div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="innClient">ИНН</label>
          <div className="col-lg-9"><input className="form-control" id="innClient" type="text" value={newClient.inn} onChange={e => setNewClient('inn', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="fioClient">ФИО</label>
          <div className="col-lg-9"><input className="form-control" id="fioClient" type="text" value={newClient.full_name} onChange={e => setNewClient('full_name', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="phoneClient">Номер телефона</label>
          <div className="col-lg-9"><input className="form-control" id="phoneClient" type="tel" value={newClient.phone} onChange={e => setNewClient('phone', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="emailClient">E-mail</label>
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
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" onClick={clientCardEdit} type="button">Сохранить</button></>}>
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
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="fullname">Полное наименование</label><input className="form-control" id="fullname" type="text" value={clientCard.full_name} disabled/></div>
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="name">Наименование</label><input className="form-control" id="name" type="text" value={clientCard.name} disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="foreign-name">Наименование на иностранном языке</label><input className="form-control" id="foreign-name" type="text" value={clientCard.foreign_language_name} disabled/></div>
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="foreign-short-name">Сокращённое наименование на иностранном языке</label><input className="form-control" id="foreign-short-name" type="text" value={clientCard.foreign_language_name_short} disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="inn">ИНН</label><input className="form-control" id="inn" type="text" value={clientCard.inn} disabled/></div>
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="kpp">КПП</label><input className="form-control" id="kpp" type="text" value={clientCard.kpp} disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="ogrn">ОГРН</label><input className="form-control" id="ogrn" type="text" value={clientCard.ogrn} disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="okved">Основной вид деятельности (ОКВЭД)</label><input className="form-control" id="okved" type="text" value={clientCard.okved} disabled/>
                    {/* <div className="form-text text-muted">Строительство жилых и нежилых зданий</div> */}
                  </div>
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="head">Генеральный директор:</label><input className="form-control" id="head" type="text" value={clientCard.ceo} disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="capital">Заявленный уставный капитал (₽):</label><input className="form-control" id="capital" type="text" value={clientCard.declared_capital} disabled/>
                    <div className="checkbox-inline mt-4"><label className="checkbox"><input type="checkbox" checked={clientCard.full_paid} /><span></span>Оплачен полностью</label></div>
                  </div>
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="payment">Оплаченный уставный капитал (₽):</label><input className="form-control" id="payment" type="text" value={clientCard.paid_capital} disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="registration">Кем зарегистрирован:</label><input className="form-control" id="registration" type="text" value={clientCard.registered_by} disabled/></div>
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="date">Дата создания компании:</label><input className="form-control" id="date" type="text" value={clientCard.establishment_date} disabled/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="address">Адрес регистрирующего органа:</label><input className="form-control" id="address" type="text" value={clientCard.registration_authority_address} disabled/></div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group"><label className="col-form-label" htmlhtmlFor="sum">Контактное лицо</label><input className="form-control" id="sum" type="text" value={clientCard.contact_person} onChange={e => setClientCardData('contact_person', e.target.value)}/></div>
                <div className="form-group"><label className="col-form-label" htmlhtmlFor="phone">Номер телефона</label><input className="form-control" id="phone" type="tel" value={clientCard.phone} onChange={e => setClientCardData('phone', e.target.value)}/></div>
                <div className="form-group"><label className="col-form-label" htmlhtmlFor="email">E-mail</label><input className="form-control" id="email" type="email" value={clientCard.email} onChange={e => setClientCardData('email', e.target.value)}/></div>
                <div className="form-group"><label className="col-form-label" htmlhtmlFor="region">Регион</label><select className="form-control" id="region">
                    <option>выберите регион</option>
                    <option>Центральный федеральный округ</option>
                    <option>Северо-Западный федеральный округ</option>
                    <option>Южный федеральный округ</option>
                    <option>Приволжский федеральный округ</option>
                    <option>Уральский федеральный округ</option>
                    <option>Сибирский федеральный округ</option>
                    <option>Дальневосточный федеральный округ</option>
                  </select></div>
                <div className="form-group"><label className="col-form-label" htmlhtmlFor="time">Время клиента</label><select className="form-control" value={clientCard.timezone} onChange={e => setClientCardData('timezone', e.target.value)} id="time">
                    <option>выберите время</option>
                    <option>GMT-3</option>
                    <option>GMT-2</option>
                    <option>GMT-1</option>
                    <option>GMT+0</option>
                    <option>GMT+1</option>
                    <option>GMT+2</option>
                    <option>GMT+3</option>
                  </select></div>
                <div className="form-group"><label className="col-form-label" htmlhtmlFor="underwriter">Андеррайтер</label><input className="form-control" id="underwriter" type="text" value={clientCard.underwriter} disabled/></div>
                <div className="form-group"><label className="col-form-label" htmlhtmlFor="commentField">Комментарий</label><textarea className="form-control" id="commentField" rows="8" value={clientCard.comment} onChange={e => setClientCardData('comment', e.target.value)}></textarea></div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="client_tab_2" role="tabpanel" aria-labelledby="client_tab_2">
            <div className="row">
              <div className="col-lg-6">
                <div className="font-weight-bold font-size-h4 text-dark-75 mb-2">Юридический адрес</div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="postIndex">Индекс</label><input className="form-control" id="postIndex" type="text" pattern="[0-9]{6}" value={clientCard.al_index} onChange={e => setClientCardData('al_index', e.target.value)}/></div>
                  <div className="col-lg-6"><label className="col-form-label">Страна</label><select className="form-control" data-actions-box="true" data-size="5" data-live-search="true" value={clientCard.al_country} onChange={e => setClientCardData('al_country', e.target.value)}>
                      <option value="">Выберите страну</option>
                      <option value="Греция">Греция</option>
                      <option value="Российская Федерация">Российская Федерация</option>
                      <option value="Уругвай">Уругвай</option>
                    </select></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label">Регион (область)</label><select className="form-control" data-actions-box="true" data-size="5" data-live-search="true" value={clientCard.al_region} onChange={e => setClientCardData('al_region', e.target.value)}>
                      <option value="">Выберите регион (область)</option>
                      <option value="Татарстан Республика">Татарстан Республика</option>
                      <option value="Пензенская область">Пензенская область</option>
                      <option value="Московская область">Московская область</option>
                    </select></div>
                  <div className="col-lg-6"><label className="col-form-label">Город</label><select className="form-control" data-actions-box="true" data-size="5" data-live-search="true" value={clientCard.al_city}onChange={e => setClientCardData('al_city', e.target.value)}>
                      <option value="">Выберите город</option>
                      <option value="Казань">Казань</option>
                      <option value="Альметьевск">Альметьевск</option>
                      <option value="Нижнекамск">Нижнекамск</option>
                    </select></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label">Район</label><select className="form-control" data-actions-box="true" data-size="5" data-live-search="true" value={clientCard.al_district} onChange={e => setClientCardData('al_district', e.target.value)}>
                      <option value="">Выберите район</option>
                      <option value="Вахитовский район">Вахитовский район</option>
                      <option value="Советский район">Советский район</option>
                      <option value="Московский район">Московский район</option>
                    </select></div>
                  <div className="col-lg-6"><label className="col-form-label">Улица</label><select className="form-control" data-actions-box="true" data-size="5" data-live-search="true" value={clientCard.al_street} onChange={e => setClientCardData('al_street', e.target.value)}>
                      <option value="">Выберите улицу</option>
                      <option value="Пушкина ул.">Пушкина ул.</option>
                      <option value="Тукая ул.">Тукая ул.</option>
                      <option value="Фрунзе ул.">Фрунзе ул.</option>
                    </select></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label">Дом</label><select className="form-control" data-actions-box="true" data-size="5" data-live-search="true" value={clientCard.al_house} onChange={e => setClientCardData('al_house', e.target.value)}>
                      <option value="">Выберите дом</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select></div>
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="kvartira">Квартира</label><input className="form-control" id="kvartira" type="text" value={clientCard.al_flat} onChange={e => setClientCardData('al_flat', e.target.value)}/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="fias">Код ФИАС</label><input className="form-control" id="fias" type="text" value={clientCard.al_fias} onChange={e => setClientCardData('al_fias', e.target.value)}/></div>
                </div>
                <div className="checkbox-inline mt-4"><label className="checkbox"><input type="checkbox" checked={clientCard.address_matches_actual} onChange={e => setClientCardData('address_matches_actual', e.target.value)}/><span></span>Адрес сопадает с фактическим</label></div>
              </div>
              <div className="col-lg-6">
                <div className="font-weight-bold font-size-h4 text-dark-75 mb-2">Фактический адрес</div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="postIndexFact">Индекс</label><input className="form-control" id="postIndexFact" type="text" pattern="[0-9]{6}" value={clientCard.aa_index} onChange={e => setClientCardData('aa_index', e.target.value)}/></div>
                  <div className="col-lg-6"><label className="col-form-label">Страна</label><select className="form-control" data-actions-box="true" data-size="5" data-live-search="true" value={clientCard.aa_country}  onChange={e => setClientCardData('aa_country', e.target.value)}>
                      <option value="">Выберите страну</option>
                      <option value="Греция">Греция</option>
                      <option value="Российская Федерация">Российская Федерация</option>
                      <option value="Уругвай">Уругвай</option>
                    </select></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label">Регион (область)</label><select className="form-control" data-actions-box="true" data-size="5" data-live-search="true" value={clientCard.aa_region} onChange={e => setClientCardData('aa_region', e.target.value)}>
                      <option value="">Выберите регион (область)</option>
                      <option value="Татарстан Республика">Татарстан Республика</option>
                      <option value="Пензенская область">Пензенская область</option>
                      <option value="Московская область">Московская область</option>
                    </select></div>
                  <div className="col-lg-6"><label className="col-form-label">Город</label><select className="form-control" data-actions-box="true" data-size="5" data-live-search="true" value={clientCard.aa_city} onChange={e => setClientCardData('aa_city', e.target.value)}>
                      <option value="">Выберите город</option>
                      <option value="Казань">Казань</option>
                      <option value="Альметьевск">Альметьевск</option>
                      <option value="Нижнекамск">Нижнекамск</option>
                    </select></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label">Район</label><select className="form-control" data-actions-box="true" data-size="5" data-live-search="true" value={clientCard.aa_district} onChange={e => setClientCardData('aa_district', e.target.value)}>
                      <option value="">Выберите район</option>
                      <option value="Вахитовский район">Вахитовский район</option>
                      <option value="Советский район">Советский район</option>
                      <option value="Московский район">Московский район</option>
                    </select></div>
                  <div className="col-lg-6"><label className="col-form-label">Улица</label><select className="form-control" data-actions-box="true" data-size="5" data-live-search="true" value={clientCard.aa_street} onChange={e => setClientCardData('aa_street', e.target.value)}>
                      <option value="">Выберите улицу</option>
                      <option value="Пушкина ул.">Пушкина ул.</option>
                      <option value="Тукая ул.">Тукая ул.</option>
                      <option value="Фрунзе ул.">Фрунзе ул.</option>
                    </select></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label">Дом</label><select className="form-control" data-actions-box="true" data-size="5" data-live-search="true" value={clientCard.aa_house} onChange={e => setClientCardData('aa_house', e.target.value)}>
                      <option value="">Выберите дом</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select></div>
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="kvartiraFact">Квартира</label><input className="form-control" id="kvartiraFact" type="text" value={clientCard.aa_flat} onChange={e => setClientCardData('aa_flat', e.target.value)}/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6"><label className="col-form-label" htmlhtmlFor="fiasFact">Код ФИАС</label><input className="form-control" id="fiasFact" type="text" value={clientCard.aa_fias} onChange={e => setClientCardData('aa_fias', e.target.value)}/></div>
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
                  <div className="col-lg-4"><label className="col-form-label" htmlhtmlFor="bik">БИК</label><input className="form-control" id="bik" type="text" placeholder="введите БИК" value={clientCard.bik} onChange={e => setClientCardData('bik', e.target.value)}/></div>
                  <div className="col-lg-4"><label className="col-form-label" htmlhtmlFor="name">Наименование банка</label><input className="form-control" id="bank" type="text" placeholder="введите наименование банка" value={clientCard.bank_name} onChange={e => setClientCardData('bank_name', e.target.value)}/></div>
                  <div className="col-lg-4"><label className="col-form-label" htmlhtmlFor="ks">Корреспондентский счёт</label><input className="form-control" id="ks" type="text" placeholder="введите корреспондентский счёт" value={clientCard.correspondent_account} onChange={e => setClientCardData('correspondent_account', e.target.value)}/></div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4"><label className="col-form-label" htmlhtmlFor="rs">Расчётный счёт</label><input className="form-control" id="rs" type="text" placeholder="введите расчётный счёт" value={clientCard.checking_account} onChange={e => setClientCardData('checking_account', e.target.value)}/></div>
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
                        <td className="align-middle">
                          {(clientCard.annual_reports && clientCard.annual_reports.length) ?
                            <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="filename.pdf" download>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" data-toggle="modal" data-target="#removeFile"><i className="flaticon2-trash icon-nm"></i></button></div> :
                            <label className="btn btn-sm btn-light-success font-weight-bold">
                              Загрузить
                              <input style={{visibility: 'hidden', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, border: 0}} type="file" accept=".doc, .docx, .pdf" value={clientCard.annual_reports} onChange={e => setClientCardData('annual_reports', e.target.files[0])} />
                            </label>
                          }
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">Квартальная бухгалтерская отчётность
                          <span className="font-weight-bolder text-danger">*</span>
                        </td>
                        <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                        <td className="align-middle">
                          {(clientCard.quarterly_reports && clientCard.quarterly_reports.length) ?
                            <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="filename.pdf" download>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" data-toggle="modal" data-target="#removeFile"><i className="flaticon2-trash icon-nm"></i></button></div> :
                            <label className="btn btn-sm btn-light-success font-weight-bold">
                              Загрузить
                              <input style={{visibility: 'hidden', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, border: 0}} type="file" accept=".doc, .docx, .pdf" value={clientCard.quarterly_reports} onChange={e => setClientCardData('quarterly_reports', e.target.files[0])} />
                            </label>
                          }
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">Паспорт</td>
                        <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                        <td className="align-middle">
                          {(clientCard.passports && clientCard.passports.length) ?
                            <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="filename.pdf" download>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" data-toggle="modal" data-target="#removeFile"><i className="flaticon2-trash icon-nm"></i></button></div> :
                            <label className="btn btn-sm btn-light-success font-weight-bold">
                              Загрузить
                              <input style={{visibility: 'hidden', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, border: 0}} type="file" accept=".doc, .docx, .pdf" value={clientCard.passports} onChange={e => setClientCardData('passports', e.target.files[0])} />
                            </label>
                          }
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">Протокол</td>
                        <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                        <td className="align-middle">
                          {(clientCard.protocols && clientCard.protocols.length) ?
                            <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="filename.pdf" download>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" data-toggle="modal" data-target="#removeFile"><i className="flaticon2-trash icon-nm"></i></button></div> :
                            <label className="btn btn-sm btn-light-success font-weight-bold">
                              Загрузить
                              <input style={{visibility: 'hidden', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, border: 0}} type="file" accept=".doc, .docx, .pdf" value={clientCard.protocols} onChange={e => setClientCardData('protocols', e.target.files[0])} />
                            </label>
                          }
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">Устав</td>
                        <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                        <td className="align-middle">
                          {(clientCard.charters && clientCard.charters.length) ?
                            <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="filename.pdf" download>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" data-toggle="modal" data-target="#removeFile"><i className="flaticon2-trash icon-nm"></i></button></div> :
                            <label className="btn btn-sm btn-light-success font-weight-bold">
                              Загрузить
                              <input style={{visibility: 'hidden', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, border: 0}} type="file" accept=".doc, .docx, .pdf" value={clientCard.charter} onChange={e => setClientCardData('charters', e.target.files[0])} />
                            </label>
                          }
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
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="lastname">Фамилия</label><input className="form-control" id="lastname" type="text" value="Иванов"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="firstname">Имя</label><input className="form-control" id="firstname" type="text" value="Иван"/></div>
              <div className="form-group"><label className="col-form-label" htmlhtmlFor="fathername">Отчество</label><input className="form-control" id="fathername" type="text" value="Иванович"/></div>
              <div className="form-group m-0">
                <div className="checkbox-inline"><label className="checkbox align-items-start"><input type="checkbox" name="Check1"/><span></span>Является иностранным публичным должностным лицом, должностным лицом публичных международных организаций, а также лицом, замещающим (занимающим) государственные должности РФ, должности членов Совета директоров ЦБ РФ, должности федеральной государственной службы, назначение на которые и освобождение от которых государственных корпорациях и иных организациях, созданных РФ на основании федеральных законов, включенные в перечни должностей, определяемые Президентом РФ</label></div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="inn2">ИНН</label><input className="form-control" id="inn2" type="text" value="123456789"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="snils">Снилс</label><input className="form-control" id="snils" type="text" value="123456789"/></div>
              <div className="form-group"><label className="col-form-label" htmlhtmlFor="number">Номер телефона</label><input className="form-control" id="number" type="tel" placeholder="+79501234567"/></div>
              <div className="form-group m-0">
                <div className="checkbox-inline"><label className="checkbox align-items-start"><input type="checkbox" name="Check1"/><span></span>Является родственником по отношению к иностранным публичным должностным лицам, должностным лицам публичных международных организаций, а также лицам, замещающим (занимающим) государственные должности РФ, должности членов Совета директоров ЦБ РФ, должности федеральной государственной службы, назначение на которые и освобождение от которых осуществляются Президентом РФ или Правительством РФ, должности в ЦБ РФ, государственных корпорациях и иных организациях, созданных РФ на основании федеральных законов, включенные в перечни должностей, определяемые Президентом РФ</label></div>
              </div>
            </div>
          </div>
          <div className="separator separator-solid my-6"></div>
          <h4>Роль в организации</h4>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="share">Доля в уставном капитале</label><input className="form-control" id="share" type="text" value="100"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="admission">Основание признания лица</label><input className="form-control" id="admission" type="text" value="Прямое или косвенное владение долей более 25%"/></div>
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
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="place">Должнсть физ. лица</label><input className="form-control" id="place" type="text" value="Генеральный директор"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="datePlace">Дата назначения на должность</label>
                <div className="input-daterange input-group" id="requests-date"><input className="form-control" id="datePlace" type="text" name="start"/></div>
              </div>
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="ogrnip">ОГРНИП</label><input className="form-control" id="ogrnip" type="text" value="123456789"/></div>
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
                    <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="seria">Серия</label><input className="form-control" id="seria" type="text" placeholder="0000"/></div>
                  </div>
                  <div className="col-6">
                    <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="num">Номер</label><input className="form-control" id="num" type="text" placeholder="000000"/></div>
                  </div>
                </div>
                <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="passportDate">Дата выдачи</label>
                  <div className="input-daterange input-group"><input className="form-control" id="passportDate" type="text" name="passportDate" placeholder="дд.мм.гггг"/></div>
                </div>
                <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="code">Код подразделения</label><input className="form-control" id="code" type="text" placeholder="000-000"/></div>
                <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="who">Кем выдан</label><input className="form-control" id="who" type="text"/></div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-4"><label className="col-form-label">Пол</label>
                  <div className="col-form-label">
                    <div className="radio-inline"><label className="radio radio-primary"><input type="radio" name="radio4" checked="checked"/><span></span>Муж</label><label className="radio radio-primary"><input type="radio" name="radio4"/><span></span>Жен</label></div>
                  </div>
                </div>
                <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="birthPlace">Место рождения</label><input className="form-control" id="birthPlace" type="text"/></div>
                <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="birthDate">Дата рождения</label>
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
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="index">Индекс</label><input className="form-control" id="index" type="text" placeholder="000000"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="country">Страна</label><input className="form-control" id="country" type="text"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="regionSelect">Регион (Область)</label><select className="form-control selectpicker" id="regionSelect" data-size="5" data-live-search="true">
                  <option>Выберите регион</option>
                  <option>Регион 1</option>
                  <option>Регион 2</option>
                  <option>Регион 3</option>
                  <option>Регион 4</option>
                  <option>Регион 5</option>
                  <option>Регион 6</option>
                </select></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="district">Район</label><select className="form-control selectpicker" id="district" data-size="5" data-live-search="true">
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
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="city">Город / Населённый пункт</label><select className="form-control selectpicker" id="city" data-size="5" data-live-search="true">
                  <option>Выберите город</option>
                  <option>Город 1</option>
                  <option>Город 2</option>
                  <option>Город 3</option>
                  <option>Город 4</option>
                  <option>Город 5</option>
                  <option>Город 6</option>
                </select></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="street">Улица</label><select className="form-control selectpicker" id="street" data-size="5" data-live-search="true">
                  <option>Выберите улицу</option>
                  <option>Улица 1</option>
                  <option>Улица 2</option>
                  <option>Улица 3</option>
                  <option>Улица 4</option>
                  <option>Улица 5</option>
                  <option>Улица 6</option>
                </select></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="house">Дом</label><input className="form-control" id="house" type="text"/></div>
              <div className="form-group mb-4"><label className="col-form-label" htmlhtmlFor="apartment">Квартира</label><input className="form-control" id="apartment" type="text"/></div>
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
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="fio">ФИО</label>
          <div className="col-lg-9"><input className="form-control" id="fio" type="text" placeholder="ФИО" value={newUser.full_name} onChange={e => setNewUser('full_name', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="place">Должность</label>
          <div className="col-lg-9"><input className="form-control" id="place" type="text" placeholder="введите должность" value={newUser.position} onChange={e => setNewUser('position', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="number">Номер телефона</label>
          <div className="col-lg-5"><input className="form-control" id="number" type="tel" placeholder="+79501234567" value={newUser.phone} onChange={e => setNewUser('phone', e.target.value)}/></div>
          <div className="col-lg-4"><input className="form-control" type="text" placeholder="добавочный" value={newUser.phone_addition} onChange={e => setNewUser('phone_addition', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="email">Электронная почта</label>
          <div className="col-lg-9"><input className="form-control" id="email" type="email" placeholder="email@email.ru" value={newUser.email} onChange={e => setNewUser('email', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="credentials">Полномочия</label>
          <div className="col-lg-9"><select className="form-control" id="credentials" onChange={e => setNewUser('user_credential', +e.target.value)} value={newUser.user_credential}>
              <option>выберите уровень</option>
              {newUser.credentials && newUser.credentials.map(el =>
                <option key={el.id} value={el.id}>{el.name}</option>
              )}
            </select></div>
        </div>
        <div className="form-group row mb-0"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="password">Пароль</label>
          <div className="col-lg-9"><input className="form-control" id="password" type="text" value={newUser.password} onChange={e => setNewUser('password', e.target.value)} placeholder="пароль"/></div>
        </div>
    </></Modal>
    <Modal
      id="editUser"
      scrollable
      size="lg"
      title="Редактировать пользователя"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button" onClick={editUserSend}>Сохранить</button></>}><>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="fio">ФИО</label>
          <div className="col-lg-9"><input className="form-control" id="fio" type="text" placeholder="ФИО" value={editUser.full_name} onChange={e => setEditUserData('full_name', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="place">Должность</label>
          <div className="col-lg-9"><input className="form-control" id="place" type="text" placeholder="введите должность" value={editUser.position} onChange={e => setEditUserData('position', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="number">Номер телефона</label>
          <div className="col-lg-5"><input className="form-control" id="number" type="tel" placeholder="+79501234567" value={editUser.phone} onChange={e => setEditUserData('phone', e.target.value)}/></div>
          <div className="col-lg-4"><input className="form-control" type="text" placeholder="добавочный" value={editUser.phone_addition} onChange={e => setEditUserData('phone_addition', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="email">Электронная почта</label>
          <div className="col-lg-9"><input className="form-control" id="email" type="email" placeholder="email@email.ru" value={editUser.email} onChange={e => setEditUserData('email', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="credentials">Полномочия</label>
          <div className="col-lg-9"><select className="form-control" id="credentials" onChange={e => setEditUserData('user_credential', +e.target.value)} value={editUser.user_credential?.id || editUser.user_credential}>
              <option>выберите уровень</option>
              {credentials && credentials.map(el =>
                <option key={el.id} value={el.id}>{el.name}</option>
              )}
            </select></div>
        </div>
        <div className="form-group row mb-0"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="password">Пароль</label>
          <div className="col-lg-9"><input className="form-control" id="password" type="text" value={editUser.password} onChange={e => setEditUserData('password', e.target.value)} placeholder="пароль"/></div>
        </div>
    </></Modal>
    <Modal
      id="addSubagent"
      scrollable
      size="lg"
      title="Добавить субагента"
      footer={<><button className="btn btn-light-primary font-weight-bold" type="button" data-dismiss="modal">Отмена</button><button className="btn btn-primary font-weight-bold" type="button" onClick={addNewSubagent}>Сохранить</button></>}><>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="inn">ИНН</label>
          <div className="col-lg-9"><input className="form-control" id="inn" type="text" placeholder="ИНН" value={newSubagent.inn} onChange={e => setNewSubagent('inn', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="full_name">Наименование</label>
          <div className="col-lg-9"><input className="form-control" id="full_name" type="text" placeholder="Наименование" value={newSubagent.full_name} onChange={e => setNewSubagent('full_name', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="number">Номер телефона</label>
          <div className="col-lg-5"><input className="form-control" id="number" type="tel" placeholder="+79501234567" value={newSubagent.phone} onChange={e => setNewSubagent('phone', e.target.value)}/></div>
        </div>
        <div className="form-group row"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="email">Электронная почта</label>
          <div className="col-lg-9"><input className="form-control" id="email" type="email" placeholder="email@email.ru" value={newSubagent.email} onChange={e => setNewSubagent('email', e.target.value)}/></div>
        </div>
        <div className="form-group row mb-0"><label className="col-lg-3 col-form-label text-lg-right" htmlhtmlFor="password">Пароль</label>
          <div className="col-lg-9"><input className="form-control" id="password" type="text" value={newSubagent.password} onChange={e => setNewSubagent('password', e.target.value)} placeholder="пароль"/></div>
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