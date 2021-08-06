import React from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { api_query } from '../../../api';
import downloadFile from '../../../helpers/downloadFile';
import deleteFile from '../../../helpers/deleteFile';
import store from '../../../store';
import { setData as setErrorData } from '../../../store/errorMessage';
import { setData as setBankData } from '../../../store/bank';

import AppWrapper from '../../../components/AppWrapper';

class EditRequestPage extends React.Component {
  state = {
    add: false,
    id: 0,
    clients: [],
    bankBids: [],
    guarantees: [],
    purchase: null,
    purchaseError: null,
    requestData: {
      client_id: 0,
      bid_purchase_id: 0,
      eis: "",
      bid_guarantee_id: 0,
      bg_sum: 0,
      bg_start: "",
      bg_end: "",
      advance_payment_availability: false,
      closed_purchase: false,
      organization_favor: false,
      ts_price: 0,
      ts_rate: 0,
      tc_price: 0,
      tc_rate: 0
    }
  }

  componentDidMount() {
    const token_api = JSON.parse(localStorage.getItem('user')).auth.token;

    this.setState(prevState => ({
      add: JSON.parse(new URL(location.href).searchParams.get('add')),
      id: JSON.parse(new URL(location.href).searchParams.get('id')),
      requestData: {
        ...prevState.requestData,
        client_id: JSON.parse(new URL(location.href).searchParams.get('client')) || 0
      }
    }), () => {
      const { id } = this.state;

      if (id) {
        this.getBidData();
        this.getBankBids();
      }
    });

    api_query.post('/user/list', {
      token_api,
      page: 1,
      agents: 1,
      type: [5, 6, 7]
    })
    .then(res => {
      const { success, data } = res.data;

      if (success) {
        this.setState(prevState => ({
          ...prevState,
          clients: data.users
        }));
      }
    });

    api_query.post('/bid/guarantees')
    .then(res => {
      const { success, guarantees } = res.data;

      if (success) {
        this.setState(prevState => ({
          ...prevState,
          guarantees
        }));
      }
    });
  }

  getBidData = () => {
    const { id } = this.state;
    const token_api = JSON.parse(localStorage.getItem('user')).auth.token;

    api_query.post('/bid/list', {
      token_api,
      page: 1,
      filter: {
        bid: id
      }
    })
    .then(res => {
      const { success, data } = res.data;
      console.log('bid: ', res.data)

      if (success) {
        this.setState({
          requestData: {
            ...data.bids[0],
            bid_guarantee_id: data.bids[0].bid_guarantee.id,
            client_id: data.bids[0].client.id
          }
        }, this.getPurchase);
      }
    });
  }

  getBankBids = () => {
    const { id } = this.state;
    const token_api = JSON.parse(localStorage.getItem('user')).auth.token;

    api_query.post('/bank/bids', {
      token_api,
      page: 1,
      bid_id: id
    })
    .then(res => {
      const { success, data } = res.data;

      if (success) {
        this.setState({
          bankBids: data.bids
        })
      }
    });
  }

  setRequestData = (key, target, isNumber) => {
    let value;

    if (isNumber) {
      value = target.value.replace(/[^0-9]/gi, '');
    } else {
      value = target.checked || target.value;
    }

    this.setState(prevState => ({
      requestData: {
        ...prevState.requestData,
        [key]: value
      }
    }));
  }

  getPurchase = () => {
    api_query.post('/bid/purchase', {
      token_api: JSON.parse(localStorage.getItem('user')).auth.token,
      number: this.state.requestData.eis
    })
    .then(res => {
      const { success, purchase, error } = res.data;

      if (success) {
        this.setState(prevState => ({
          purchaseError: null,
          requestData: {
            ...prevState.requestData,
            bid_purchase_id: purchase.id
          },
          purchase
        }));
      } else {
        store.dispatch(setErrorData(error));
        $('[data-target="#error"]').click();

        this.setState(prevState => ({
          purchaseError: error,
          requestData: {
            ...prevState.requestData,
            bid_purchase_id: 0
          },
          purchase: null
        }));
      }
    });
  }

  formData = inputData => {
    const data = Object.assign({}, inputData);
    let isValid = true;

    Object.keys(data).map(el => {
      if (data[el] === false) data[el] = 0;
      if (data[el] === true) data[el] = 1;
      if (['bg_start', 'bg_end'].includes(el)) {
        const date = new Date(data[el]);
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        data[el] = `${year}-${month}-${day}`;
      }
      if (data[el] === true) data[el] = 1;
      if (el === 'client_id') {
        data[el] = inputData[el]
      };
      if (!['closed_purchase', 'organization_favor', 'advance_payment_availability'].includes(el) && ['', null, false, 0].includes(data[el])) {
        isValid = false
      };
    });

    return ({data, isValid});
  }

  sendRequest = ({data, isValid}) => {
    if (isValid) {
      api_query.post('/bid/create', {token_api: JSON.parse(localStorage.getItem('user')).auth.token, ...data}).then(res => {
        const { success, error } = res.data;
        if (success) {
          Router.push('/personal/requests');
        } else {
          console.log(res.data)
          console.log(error)
          store.dispatch(setErrorData(error));
          $('[data-target="#error"]').click();
        }
      });
    }
  }

  createRequest = e => {
    e.preventDefault();

    const newRequestData = Object.assign({}, this.state.requestData);

    this.sendRequest(this.formData(newRequestData));
  }

  setClientDocuments = (key, file) => {
    const clientOrganizationId = this.state.requestData.client.client_organization.id;
    const formData = new FormData();
    const token_api = JSON.parse(localStorage.getItem('user')).auth.token;

    formData.append('token_api', token_api);
    formData.append('client_organization_id', clientOrganizationId);
    formData.append(key.replace('client_organization_', '') + '[]', file);

    api_query.post('/client_organization/edit', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
      if (res.data.success) {
        this.getBidData();
      }
    });
  }

  goToBank = bankData => {
    store.dispatch(setBankData(bankData));
    Router.push('/personal/bank');
  }

  downloadClientDocument = (document_type, document_id) => {
    downloadFile({
      token_api: JSON.parse(localStorage.getItem('user')).auth.token,
      document_type,
      document_id
    });
  }

  deleteClientDocument = (document_type, document_id) => {
    deleteFile({
      token_api: JSON.parse(localStorage.getItem('user')).auth.token,
      document_type,
      document_id
    }, this.getBidData);
  }

  render() {
    const { add, requestData, clients, guarantees, purchase, purchaseError, bankBids } = this.state;
    const { setRequestData, getPurchase, createRequest, setClientDocuments, goToBank, downloadClientDocument, deleteClientDocument } = this;
    console.log('bankBids: ', bankBids)

    return (
      <AppWrapper title="Добавление и просмотр заявки" personal>
        <div className="d-flex flex-column-fluid">
          <div className="container">
            <button style={{visibility: 'hidden', opacity: 0, width: 0, height: 0}} data-toggle="modal" data-target="#error"></button>
            {!add && purchase &&
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-custom gutter-b">
                    <div className="card-body">
                      <div className="d-flex flex-wrap">
                        <div className="d-flex flex-column mr-8 px-4 py-2">
                          <div className="text-dark-50 font-weight-bold font-size-sm">№ заявки</div>
                          <div className="text-dark-75 mb-1 font-weight-bolder">{requestData.id}</div>
                        </div>
                        <div className="d-flex flex-column mr-8 px-4 py-2">
                          <div className="text-dark-50 font-weight-bold font-size-sm">Статус</div>
                          <div className="text-dark-75 mb-1 font-weight-bolder">Требует подписи</div>
                        </div>
                        <div className="d-flex flex-column mr-8 px-4 py-2">
                          <div className="text-dark-50 font-weight-bold font-size-sm">Сумма</div>
                          <div className="text-dark-75 mb-1 font-weight-bolder">{purchase.amount_application_security} ₽</div>
                        </div>
                        <div className="d-flex flex-column mr-8 px-4 py-2">
                          <div className="text-dark-50 font-weight-bold font-size-sm">Срок</div>
                          <div className="text-dark-75 mb-1 font-weight-bolder">{Math.round(Math.abs((new Date("2021-07-15T05:34:59.000000Z") - new Date("2021-06-19 00:00:00")) / (24 * 60 * 60 * 1000)))} дней</div>
                        </div>
                        <div className="d-flex flex-column mr-8 px-4 py-2">
                          <div className="text-dark-50 font-weight-bold font-size-sm">№ закупки</div>
                          <div className="text-dark-75 mb-1 font-weight-bolder">{purchase.number}</div>
                        </div>
                        <div className="d-flex flex-column mr-8 px-4 py-2">
                          <div className="text-dark-50 font-weight-bold font-size-sm">Тип гарантии</div>
                          <div className="text-dark-75 mb-1 font-weight-bolder">На участие</div>
                        </div>
                        <div className="d-flex flex-column mr-8 px-4 py-2">
                          <div className="text-dark-50 font-weight-bold font-size-sm">Агент</div>
                          <div className="text-dark-75 mb-1 font-weight-bolder">ООО «Рога и копыта»</div>
                        </div>
                        <div className="d-flex flex-column mr-8 px-4 py-2">
                          <div className="text-dark-50 font-weight-bold font-size-sm">Код агента</div>
                          <div className="text-dark-75 mb-1 font-weight-bolder">123a-16b</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-custom gutter-b">
                  <div className="card-header card-header-tabs-line">
                    <div className="card-toolbar">
                      <ul className="nav nav-tabs nav-tabs-line">
                        <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#request_tab_1">Данные</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#request_tab_2">Анкета</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#request_tab_3">Документы</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#request_tab_4">Рассмотрение</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#request_tab_5">Получение</a></li>
                      </ul>
                    </div>
                    <div className="card-toolbar"><a className="btn btn-outline-secondary font-weight-bold" href="#">Бизнес чат</a></div>
                  </div>
                  <div className="card-body">
                    <div className="tab-content" id="requestTabs">
                      <div className="tab-pane fade show active" id="request_tab_1" role="tabpanel" aria-labelledby="request_tab_1">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <div className="radio-inline"><label className="radio"><input id="clientExist" type="radio" name="client" value="clientExist" checked/><span></span>Существующий клиент</label><label className="radio"><input id="clientNew" type="radio" name="client" value="clientNew"/><span></span>Новый клиент (ИНН)</label></div>
                            </div>
                            <div className="form-group js-toggle"><label className="col-form-label" htmlFor="clientSelect">Существующий клиент</label><select className="form-control" id="clientSelect" data-size="5" data-live-search="true" onChange={e => setRequestData('client_id', e.target, true)} value={requestData.client_id}>
                                <option>Выберите клиента</option>
                                {clients.map(el =>
                                  <option key={el.id} value={el.id}>{el.full_name}</option>
                                )}
                              </select></div>
                            <div className="form-group js-toggle" style={{display: 'none'}}><label className="col-form-label" htmlFor="number">Новый клиент</label><input className="form-control" id="clentField" type="text" value=""/></div>
                            <div className="form-group row">
                              <div className="col-12"><label className="col-form-label" htmlFor="number">№ закупки в ЕИС</label><input className="form-control" id="number" type="text" onChange={e => setRequestData('eis', e.target)} onBlur={getPurchase} value={requestData.eis}/></div>
                            </div>
                            <div className="form-group row">
                              <div className="col-md-6"><label className="col-form-label" htmlFor="type">Тип гарантии</label><select className="form-control" id="type" onChange={e => setRequestData('bid_guarantee_id', e.target, true)} value={requestData.bid_guarantee_id}>
                                  <option>Выберите тип</option>
                                  {guarantees.map(el =>
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                  )}
                                </select></div>
                              <div className="col-md-6"><label className="col-form-label" htmlFor="sum">Сумма БГ</label><input className="input-sum form-control" id="sum" type="text" onChange={e => setRequestData('bg_sum', e.target, true)} value={requestData.bg_sum}/>
                                <div className="form-text text-muted">Проверьте сумму перед подачей заявки!</div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-md-6"><label className="col-form-label" htmlFor="startDate">Начало действия БГ</label><input className="form-control" id="startDate" type="date" onChange={e => setRequestData('bg_start', e.target)} value={requestData.bg_start}/></div>
                              <div className="col-md-6"><label className="col-form-label" htmlFor="endDate">Окончание действия БГ</label><input className="form-control" id="endDate" type="date" onChange={e => setRequestData('bg_end', e.target)} value={requestData.bg_end}/></div>
                            </div>
                            <div className="form-group">
                              <div className="checkbox-list"><label className="checkbox"><input type="checkbox" onChange={e => setRequestData('advance_payment_availability', e.target)} checked={requestData.advance_payment_availability} name="Checkbox1"/><span></span>Наличие аванса по государственному контракту</label><label className="checkbox"><input type="checkbox" onChange={e => setRequestData('closed_purchase', e.target)} checked={requestData.closed_purchase} name="Checkbox2"/><span></span>Закупка является закрытой</label><label className="checkbox"><input type="checkbox" onChange={e => setRequestData('organization_favor', e.target)} checked={requestData.organization_favor} name="Checkbox3"/><span></span>В пользу организации, осуществляющей размещение</label></div>
                            </div>
                            <div className="mt-8" id="price-management">
                              <div className="font-weight-bold font-size-h4 text-dark-75">Управление ценой</div>
                              <div className="text-muted font-weight-bold">Укажите нужную стоимость, видите только вы, клиент не видит</div>
                              <div className="bg-success-o-20 rounded p-6 mt-3">
                                <div className="font-weight-bold font-size-lg text-dark-75">Стандартные тариф</div>
                                <div className="form-group row mb-0">
                                  <div className="col-xl-6"><label className="col-form-label" htmlFor="priceRub">Цена в ₽</label><input className="form-control" id="priceRub" type="text" onChange={e => setRequestData('ts_price', e.target, true)} value={requestData.ts_price}/></div>
                                  <div className="col-xl-6"><label className="col-form-label" htmlFor="pricePerc">% ставка в годовых</label><input className="form-control" id="pricePerc" type="text" onChange={e => setRequestData('ts_rate', e.target, true)} value={requestData.ts_rate}/></div>
                                </div>
                              </div>
                              <div className="bg-success-o-20 rounded p-6 mt-3">
                                <div className="font-weight-bold font-size-lg text-dark-75">Тариф для клиента</div>
                                <div className="form-group row mb-0">
                                  <div className="col-xl-6"><label className="col-form-label" htmlFor="priceRub2">Цена в ₽</label><input className="form-control" id="priceRub2" type="text" onChange={e => setRequestData('tc_price', e.target, true)} value={requestData.tc_price}/></div>
                                  <div className="col-xl-6"><label className="col-form-label" htmlFor="pricePerc2">% ставка в годовых</label><input className="form-control" id="pricePerc2" type="text" onChange={e => setRequestData('tc_rate', e.target, true)} value={requestData.tc_rate}/></div>
                                </div>
                              </div>
                              <div className="d-flex justify-content-end mt-2"><button className="btn btn-success font-weight-bold" onClick={createRequest}>Сохранить</button></div>
                            </div>
                          </div>
                          {purchase &&
                            <div className="col-lg-6">
                              <div className="bg-light rounded p-4">
                                <div className="font-weight-bold font-size-lg text-dark-75 mb-4">Информация о закупке</div>
                                {purchase.number ?
                                  <div className="d-flex flex-column py-2">
                                    <div className="text-dark-50 font-weight-bolder">Номер закупки/закон</div>
                                    <div className="text-dark-75 mb-1 font-size-lg"><a href="#">{purchase.number}</a> / {purchase.bid_purchase_law.name}</div>
                                  </div> : null
                                }
                                {purchase.tender_subject ?
                                  <div className="d-flex flex-column py-2">
                                    <div className="text-dark-50 font-weight-bolder">Предмет тендера</div>
                                    <div className="text-dark-75 mb-1 font-size-lg">{purchase.tender_subject}</div>
                                  </div> : null
                                }
                                {purchase.customer_inn || purchase.customer_name ?
                                  <div className="d-flex flex-column py-2">
                                    {purchase.customer_inn ?
                                      <div className="text-dark-50 font-weight-bolder">Заказчик ИНН {purchase.customer_inn}</div> : null
                                    }
                                    {purchase.customer_name ?
                                      <div className="text-dark-75 mb-1 font-size-lg">{purchase.customer_name}</div> : null
                                    }
                                  </div> : null
                                }
                                {purchase.nmc ?
                                  <div className="d-flex flex-column py-2">
                                    <div className="text-dark-50 font-weight-bolder">НМЦ</div>
                                    <div className="text-dark-75 mb-1 font-size-lg">{purchase.nmc.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽</div>
                                  </div> : null
                                }
                                {purchase.publication_date ?
                                  <div className="d-flex flex-column py-2">
                                    <div className="text-dark-50 font-weight-bolder">Дата публикации извещения</div>
                                    <div className="text-dark-75 mb-1 font-size-lg">{Intl.DateTimeFormat('ru-Ru').format(new Date(purchase.publication_date))}</div>
                                  </div> : null
                                }
                                {purchase.deadline_applications ?
                                  <div className="d-flex flex-column py-2">
                                    <div className="text-dark-50 font-weight-bolder">Окончание подачи заявок</div>
                                    <div className="text-dark-75 mb-1 font-size-lg">{Intl.DateTimeFormat('ru-Ru').format(new Date(purchase.deadline_applications))} | {Intl.DateTimeFormat('ru-Ru', {hour: 'numeric',minute: 'numeric'}).format(new Date(purchase.deadline_applications))}</div>
                                  </div> : null
                                }
                                {(purchase.availability_advance != null && purchase.availability_advance != undefined) ?
                                  <div className="d-flex flex-column py-2">
                                    <div className="text-dark-50 font-weight-bolder">Наличие аванса по контракту</div>
                                    <div className="text-dark-75 mb-1 font-size-lg">{purchase.availability_advance ? 'да' : 'нет'}</div>
                                  </div> : null
                                }
                                {purchase.amount_contract_security ?
                                  <div className="d-flex flex-column py-2">
                                    <div className="text-dark-50 font-weight-bolder">Размер обеспечения исполнения контракта</div>
                                    <div className="text-dark-75 mb-1 font-size-lg">{purchase.amount_contract_security.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽</div>
                                  </div> : null
                                }
                                {purchase.amount_application_security ?
                                  <div className="d-flex flex-column py-2">
                                    <div className="text-dark-50 font-weight-bolder">Размер обеспечения заявки</div>
                                    <div className="text-dark-75 mb-1 font-size-lg">{purchase.amount_application_security.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽</div>
                                  </div> : null
                                }
                              </div>
                            </div>
                          }
                          {(!purchase && requestData.eis && purchaseError) ?
                            <div className="col-lg-6">
                              <div className="bg-light rounded p-4">
                                <div className="font-weight-bold font-size-lg text-dark-75">Не удалось получить данные с zakupki.gov</div>
                              </div>
                            </div> : null
                          }
                        </div>
                      </div>
                      {(requestData.client && requestData.client.client_organization) ?
                        <div className="tab-pane fade" id="request_tab_2" role="tabpanel" aria-labelledby="request_tab_2">
                          <div className="row mb-8">
                            <div className="col-xl-4">
                              <div className="font-weight-bold font-size-h3 text-dark-75 mb-2">Анкета заполнена на
                                <span className="text-info font-weight-bold">100 %</span>
                              </div>
                            </div>
                            <div className="col-xl-8">
                              <div className="d-xl-flex justify-content-xl-end"><a className="btn btn-sm btn-primary font-weight-bold my-2 mr-2 my-xl-0" href="18.html" target="_blank">Просмотр и редактирование</a><button className="btn btn-sm btn-success font-weight-bold my-2 my-xl-0" type="button">Заполнить автоматически</button></div>
                            </div>
                          </div>
                          {/* <div className="row mb-4">
                            <div className="col-12">
                              <div className="font-weight-bold font-size-h4 text-dark-75 mb-2">Сведения о руководителях и учредителях</div>
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
                                      <td className="align-middle"><a className="btn btn-light-success btn-sm" href="#">Открыть</a></td>
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
                                      <td className="align-middle"><a className="btn btn-light-success btn-sm" href="#">Открыть</a></td>
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
                                      <td className="align-middle"><a className="btn btn-light-success btn-sm" href="#">Открыть</a></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div> */}
                          {(requestData.client.client_organization.bank_name || requestData.client.client_organization.bik || requestData.client.client_organization.checking_account || requestData.client.client_organization.correspondent_account) &&
                            <div className="row mb-4">
                              <div className="col-12">
                                <div className="font-weight-bold font-size-h4 text-dark-75 mb-2">Банковские реквизиты</div>
                                <div className="table-responsive">
                                  <table className="table">
                                    <thead className="thead-light">
                                      <tr>
                                        <th scope="col">Наименование банка</th>
                                        <th scope="col">БИК</th>
                                        <th scope="col">Расчётный счёт</th>
                                        <th scope="col">Кор. счёт</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="align-middle">{requestData.client.client_organization.bank_name}</td>
                                        <td className="align-middle">{requestData.client.client_organization.bik}</td>
                                        <td className="align-middle">{requestData.client.client_organization.checking_account}</td>
                                        <td className="align-middle">{requestData.client.client_organization.correspondent_account}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          }
                          <div className="row">
                            {(requestData.client.client_organization.okved || requestData.client.client_organization.aa_city) &&
                              <div className="col-12 col-md-6">
                                <div className="bg-primary-o-20 rounded p-4 h-100">
                                  <div className="font-weight-bold font-size-h4 text-dark-75 mb-2">Основные данные</div>
                                  {requestData.client.client_organization.okved &&
                                    <div className="d-flex flex-column py-2">
                                      <div className="text-dark-50">Основной ОКВЭД</div>
                                      <div className="text-dark-75 mb-1 font-size-lg font-weight-bolder">{requestData.client.client_organization.okved}</div>
                                    </div>
                                  }
                                  {requestData.client.client_organization.city &&
                                    <div className="d-flex flex-column py-2">
                                      <div className="text-dark-50">Местонахождение компании</div>
                                      <div className="text-dark-75 mb-1 font-size-l font-weight-bolder">{`г. ${requestData.client.client_organization.aa_city}, ул. ${requestData.client.client_organization.aa_street}, д. ${requestData.client.client_organization.aa_house}`}</div>
                                    </div>
                                  }
                                </div>
                              </div>
                            }
                            {(requestData.client.client_organization.full_name || requestData.client.client_organization.phone || requestData.client.client_organization.email) &&
                              <div className="col-12 col-md-6">
                                <div className="bg-primary-o-20 rounded p-4 mt-4 mt-md-0 h-100">
                                  <div className="font-weight-bold font-size-h4 text-dark-75 mb-2">Контактные данные</div>
                                  <div className="py-2">
                                    {requestData.client.client_organization.full_name &&
                                      <div className="text-dark font-weight-bold font-size-lg mb-2">{requestData.client.full_name}</div>
                                    }
                                    {requestData.client.client_organization.phone &&
                                      <div className="d-flex align-items-center mb-2"><span className="flex-shrink-0 mr-2"><span className="svg-icon svg-icon-md"><i className="flaticon2-phone text-primary"></i></span></span><span className="font-weight-bold">{requestData.client.client_organization.phone.toString().replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")}</span></div>
                                    }
                                    {requestData.client.client_organization.email &&
                                      <div className="d-flex align-items-center"><span className="flex-shrink-0 mr-2"><span className="svg-icon svg-icon-md"><i className="flaticon2-envelope text-primary"></i></span></span><span className="font-weight-bold">{requestData.client.client_organization.email}</span></div>
                                    }
                                  </div>
                                </div>
                              </div>
                            }
                          </div>
                        </div> : null
                      }
                      <div className="tab-pane fade" id="request_tab_3" role="tabpanel" aria-labelledby="request_tab_3">
                        <div className="bg-primary-o-20 rounded p-4 mb-4 justify-content-between align-items-center d-sm-flex">
                          <div className="d-flex flex-column">
                            <div className="text-dark-50 font-weight-bolder">Ваш набор документов позволяет подать заявку:</div>
                            <div className="text-dark-75 mb-1 font-size-lg">в <span className="font-weight-bolder">2</span> банка из <span className="font-weight-bolder">5</span></div>
                          </div><button className="btn btn-info btn-sm mt-2 mt-sm-0" type="button" title="Банки" data-toggle="modal" data-target="#banksList">Банки</button>
                        </div>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className="thead-light">
                              <tr>
                                <th scope="col" colSpan="2">Наименование документа</th>
                                <th scope="col">Действия</th>
                              </tr>
                            </thead>
                            {(requestData.client && requestData.client.client_organization) ?
                              <tbody>
                                <tr>
                                  <td className="align-middle">Годовая бухгалтерская отчётность
                                    <span className="font-weight-bolder text-danger">*</span>
                                  </td>
                                  <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                                  <td className="align-middle">
                                    {(requestData.client.client_organization.client_organization_annual_reports.length) ?
                                      <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="#" onClick={e => {e.preventDefault(); downloadClientDocument(8, requestData.client.client_organization.client_organization_annual_reports[0].id);}}>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" onClick={e => {e.preventDefault(); deleteClientDocument(8, requestData.client.client_organization.client_organization_annual_reports[0].id);}}><i className="flaticon2-trash icon-nm"></i></button></div> :
                                      <label className="btn btn-sm btn-light-success font-weight-bold">
                                        Загрузить
                                        <input style={{visibility: 'hidden', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, border: 0}} type="file" accept=".doc, .docx, .pdf" onChange={e => setClientDocuments('client_organization_annual_reports', e.target.files[0])} />
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
                                    {(requestData.client.client_organization.client_organization_quarterly_reports.length) ?
                                      <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="#" onClick={e => {e.preventDefault(); downloadClientDocument(9, requestData.client.client_organization.client_organization_quarterly_reports[0].id);}}>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" onClick={e => {e.preventDefault(); deleteClientDocument(9, requestData.client.client_organization.client_organization_quarterly_reports[0].id);}}><i className="flaticon2-trash icon-nm"></i></button></div> :
                                      <label className="btn btn-sm btn-light-success font-weight-bold">
                                        Загрузить
                                        <input style={{visibility: 'hidden', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, border: 0}} type="file" accept=".doc, .docx, .pdf" onChange={e => setClientDocuments('client_organization_quarterly_reports', e.target.files[0])} />
                                      </label>
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <td className="align-middle">Паспорт</td>
                                  <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                                  <td className="align-middle">
                                    {(requestData.client.client_organization.client_organization_passports.length) ?
                                      <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="#" onClick={e => {e.preventDefault(); downloadClientDocument(10, requestData.client.client_organization.client_organization_passports[0].id);}}>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" onClick={e => {e.preventDefault(); deleteClientDocument(10, requestData.client.client_organization.client_organization_passports[0].id);}}><i className="flaticon2-trash icon-nm"></i></button></div> :
                                      <label className="btn btn-sm btn-light-success font-weight-bold">
                                        Загрузить
                                        <input style={{visibility: 'hidden', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, border: 0}} type="file" accept=".doc, .docx, .pdf" onChange={e => setClientDocuments('client_organization_passports', e.target.files[0])} />
                                      </label>
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <td className="align-middle">Протокол</td>
                                  <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                                  <td className="align-middle">
                                    {(requestData.client.client_organization.client_organization_protocols.length) ?
                                      <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="#" onClick={e => {e.preventDefault(); downloadClientDocument(11, requestData.client.client_organization.client_organization_protocols[0].id);}}>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" onClick={e => {e.preventDefault(); deleteClientDocument(11, requestData.client.client_organization.client_organization_protocols[0].id);}}><i className="flaticon2-trash icon-nm"></i></button></div> :
                                      <label className="btn btn-sm btn-light-success font-weight-bold">
                                        Загрузить
                                        <input style={{visibility: 'hidden', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, border: 0}} type="file" accept=".doc, .docx, .pdf" onChange={e => setClientDocuments('client_organization_protocols', e.target.files[0])} />
                                      </label>
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <td className="align-middle">Устав</td>
                                  <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                                  <td className="align-middle">
                                    {(requestData.client.client_organization.client_organization_charters.length) ?
                                      <div className="btn-group" role="group"><a className="btn btn-light-primary btn-sm font-weight-bold" href="#" onClick={e => {e.preventDefault(); downloadClientDocument(12, requestData.client.client_organization.client_organization_charters[0].id);}}>Скачать</a><button className="btn btn-light-danger btn-icon btn-sm" type="button" title="Удалить" onClick={e => {e.preventDefault(); deleteClientDocument(12, requestData.client.client_organization.client_organization_charters[0].id);}}><i className="flaticon2-trash icon-nm"></i></button></div> :
                                      <label className="btn btn-sm btn-light-success font-weight-bold">
                                        Загрузить
                                        <input style={{visibility: 'hidden', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, border: 0}} type="file" accept=".doc, .docx, .pdf" onChange={e => setClientDocuments('client_organization_charters', e.target.files[0])} />
                                      </label>
                                    }
                                  </td>
                                </tr>
                              </tbody> : null
                            }
                          </table>
                        </div>
                        <div className="bg-primary-o-20 rounded p-4 mt-4 justify-content-between align-items-center d-sm-flex">
                          <div className="d-flex flex-column">
                            <div className="text-dark-50 font-weight-bolder">Статус заявки</div><span className="label label-danger label-pill label-inline mr-2 my-2">Не подана</span>
                          </div><button className="btn btn-success btn-sm mt-2 mt-sm-0" type="button" title="Проверка перед подписанием">Проверка перед подписанием</button>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="request_tab_4" role="tabpanel" aria-labelledby="request_tab__4">
                        <div className="font-weight-bold font-size-h4 text-dark-75">Список доступных кредитных организаций</div>
                        <div className="text-muted font-weight-bold mb-4">Отправка возможна только в банки с полнотой заявки 100 %. Загрузите недостающие документы для других банков</div>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">Кредитная организация</th>
                                <th scope="col">Полнота заявки</th>
                                <th scope="col">Статус заявки</th>
                                <th scope="col">Изменение статуса</th>
                                <th scope="col">Изменить комиссию</th>
                                <th scope="col">Комиссия, ₽</th>
                                <th scope="col">Бизнес-чат с банком</th>
                                <th scope="col">Действия</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bankBids.map(el =>
                                <tr key={el.id}>
                                  <td className="align-middle"><a className="text-dark-75 font-weight-bolder text-hover-primary font-size-lg" href="16.html">{el.bank.name}</a></td>
                                  <td className="align-middle">{el.app_completeness || 0}%</td>
                                  <td className="align-middle">
                                    <div className={`label label-rounded label-inline label-lg text-nowrap ${el.bank_bid_status.id === 1 ? 'label-success' : (el.bank_bid_status.id === 2 || el.bank_bid_status.id === 5) ? 'label-danger' : el.bank_bid_status.id === 3 ? 'label-info' : el.bank_bid_status.id === 4 ? 'label-warning' : ''}`}>{el.bank_bid_status.name}</div><span className="svg-icon svg-icon-success ml-3" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span>
                                  </td>
                                  <td className="align-middle">{Intl.DateTimeFormat('ru-Ru').format(new Date(el.updated_at))}<br/>{Intl.DateTimeFormat('ru-Ru', {hour: 'numeric', minute: 'numeric'}).format(new Date(el.updated_at))}</td>
                                  <td className="align-middle">
                                    <div className="d-flex align-items-center"><a className="btn btn-icon btn-light-info btn-circle btn-sm font-weight-bold" href="" data-toggle="modal" data-target="#editCommission">₽</a>
                                      <div className="bg-light rounded p-1 d-flex align-items-center w-110px ml-1"><span className="svg-icon svg-icon-success mr-1" data-toggle="tooltip" title="Время для изменения комиссии. Далее предложение направляется клиенту" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span>
                                        <p className="text-nowrap m-0" id="timer"></p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="align-middle">{el.issuance_fee || 0} ₽</td>
                                  <td className="align-middle"><a className="btn btn-icon btn-light-success btn-circle btn-sm mr-2" href="16.html"><i className="flaticon2-chat-1"></i></a></td>
                                  <td className="align-middle">
                                    <div className="dropdown dropdown-inline"><a className="btn btn-sm btn-clean btn-icon" href="javascript:;" data-toggle="dropdown"><span className="svg-icon svg-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path></g></svg></span></a>
                                      <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                        <ul className="navi flex-column navi-hover py-2">
                                          <li className="navi-item"><a className="navi-link" href="#" onClick={() => goToBank(el)}><span className="navi-icon"><i className="la la-door-open text-primary"></i></span><span className="navi-text">Открыть заявку</span></a></li>
                                          <li className="navi-item"><a className="navi-link" href="#"><span className="navi-icon"><i className="la la-send text-success"></i></span><span className="navi-text">Отправить клиенту</span></a></li>
                                          <li className="navi-item"><a className="navi-link" href="" data-toggle="modal" data-target="#editCommission"><span className="navi-icon"><i className="la la-edit text-danger"></i></span><span className="navi-text">Изменить комиссию</span></a></li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="request_tab_5" role="tabpanel" aria-labelledby="request_tab_5">
                        <div className="row">
                          <div className="col-lg-6">
                            <h3 className="font-weight-bolder font-size-h4 text-dark-75 mb-4">Документы по сделке</h3>
                            <table className="table">
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col" colSpan="2">Наименование документа</th>
                                  <th scope="col">Действия</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="align-middle">Общие условия предоставления БГ</td>
                                  <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                                  <td className="align-middle"><a className="btn btn-primary btn-sm btn-light-primary font-weight-bold" href="filename.pdf" download>Скачать</a></td>
                                </tr>
                                <tr>
                                  <td className="align-middle">Индивидуальные условия предоставления БГ</td>
                                  <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                                  <td className="align-middle"><a className="btn btn-primary btn-sm btn-light-primary font-weight-bold" href="filename.pdf" download>Скачать</a></td>
                                </tr>
                                <tr>
                                  <td className="align-middle">Счёт на оплату</td>
                                  <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                                  <td className="align-middle"><a className="btn btn-primary btn-sm btn-light-primary font-weight-bold" href="filename.pdf" download>Скачать</a></td>
                                </tr>
                                <tr>
                                  <td className="align-middle">Проект банковской гарантии</td>
                                  <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                                  <td className="align-middle"><a className="btn btn-sm btn-light-primary font-weight-bold" href="filename.pdf" download>Скачать</a></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="col-lg-6">
                            <div className="bg-success-o-30 rounded py-4 px-6 mb-4"><Image width="75" height="25" className="w-auto h-25px" alt="bank" src="/assets/media/logos/bank-us.png"/>
                              <div className="separator separator-solid my-2"></div>
                              <div className="d-sm-flex align-items-center justify-content-between">
                                <h5 className="font-weight-bolder font-size-h5 text-dark-75 my-2">Банковская гарантия</h5><a className="btn btn-primary btn-sm btn-success font-weight-bold" href="filename.pdf" download>Скачать</a>
                              </div>
                              <div className="separator separator-solid my-3"></div>
                              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <div className="text-dark-50 font-weight-bold font-size-sm">Сумма</div>
                                <div className="text-dark-75 mb-1 font-weight-bolder">10 123 456,15 ₽</div>
                              </div>
                              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <div className="text-dark-50 font-weight-bold font-size-sm">Дата выдачи</div>
                                <div className="text-dark-75 mb-1 font-weight-bolder">32.03.2021 09:41</div>
                              </div>
                              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <div className="text-dark-50 font-weight-bold font-size-sm">Предложение принято</div>
                                <div className="text-dark-75 mb-1 font-weight-bolder">32.03.2021</div>
                              </div>
                              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <div className="text-dark-50 font-weight-bold font-size-sm">Предложение действительно до</div>
                                <div className="text-dark-75 mb-1 font-weight-bolder">32.03.2021</div>
                              </div>
                              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <div className="text-dark-50 font-weight-bold font-size-sm">Комиссия (2.24% годовых)</div>
                                <div className="text-dark-75 mb-1 font-weight-bolder">201 123,25 ₽</div>
                              </div>
                              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <div className="text-dark-50 font-weight-bold font-size-sm">Дата выдачи</div>
                                <div className="text-dark-75 mb-1 font-weight-bolder">32.03.2021 09:41</div>
                              </div>
                              <div className="separator separator-solid my-3 separator-success"></div>
                              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <div className="text-dark-50 font-weight-bold font-size-sm">Итого к оплате</div>
                                <div className="text-dark-75 mb-1 font-weight-bolder">201 123,25 ₽</div>
                              </div>
                              <div className="rounded bg-white p-3 text-dark-75 text-center">👍 Счёт оплачен</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!add &&
                    <div className="card-footer d-flex justify-content-between"><a className="btn btn-light-danger font-weight-bold" href="#">Удалить заявку</a></div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppWrapper>
    );
  }
}

export default EditRequestPage;