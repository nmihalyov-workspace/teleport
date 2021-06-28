import React from 'react';
import { api_query } from '../api';

class EditRequestPage extends React.PureComponent {
  state = {
    clients: [],
    guarantees: [],
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
    document.title = "Добавление и просмотр заявки";

    api_query.post('/user/list', {
      page: 1
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

    api_query.post('/bid/purchase', {
      token_api: JSON.parse(localStorage.getItem('user')).auth.token,
      number: "0188300000921000044"
    })
    .then(res => {
      const { success, purchase } = res.data;

      if (success) {
        this.setState(prevState => ({
          ...prevState,
          requestData: {
            ...prevState.requestData,
            bid_purchase_id: purchase.id
          }
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


  setRequestData = (key, target, toNumber) => {
    let value;

    if (toNumber) {
      value = +target.value;
    } else {
      value = target.checked || target.value;
    }

    this.setState(prevState => ({
      ...prevState,
      requestData: {
        ...prevState.requestData,
        [key]: value
      }
    }));
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
      if (['', null, false, 0].includes(data[el])) isValid = false;
    });

    return ({data, isValid});
  }

  sendRequest = ({data, isValid}) => {
    if (isValid) {
      api_query.post('/bid/create', {token_api: JSON.parse(localStorage.getItem('user')).auth.token, ...data}).then(res => {
        console.log(res.data)
        if (res.data.success) {
          // const redirectOnClick = () => {
          //   window.location.replace('/');
          //   window.$('.popup__close, .hystmodal__shadow, .popup__footer .button').off('click', redirectOnClick);
          // };
          // window.hystModal.open('#signup-success');
          // window.$('.popup__close, .hystmodal__shadow, .popup__footer .button').on('click', redirectOnClick);
        } else {
          // window.hystModal.open('#signup-failure');
        }
      });
    } else {
      // window.hystModal.open('#signup-invalid');
    }
  }

  createRequest = e => {
    e.preventDefault();

    const newRequestData = Object.assign({}, this.state.requestData);

    this.sendRequest(this.formData(newRequestData));
  }

  render() {
    const { requestData, clients, guarantees } = this.state;
    const { setRequestData, createRequest } = this;

    return (
      <div className="d-flex flex-column-fluid">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card card-custom gutter-b">
                <div className="card-body">
                  <div className="d-flex flex-wrap">
                    <div className="d-flex flex-column mr-8 px-4 py-2">
                      <div className="text-dark-50 font-weight-bold font-size-sm">№ заявки</div>
                      <div className="text-dark-75 mb-1 font-weight-bolder">450126</div>
                    </div>
                    <div className="d-flex flex-column mr-8 px-4 py-2">
                      <div className="text-dark-50 font-weight-bold font-size-sm">Статус</div>
                      <div className="text-dark-75 mb-1 font-weight-bolder">Требует подписи</div>
                    </div>
                    <div className="d-flex flex-column mr-8 px-4 py-2">
                      <div className="text-dark-50 font-weight-bold font-size-sm">Сумма</div>
                      <div className="text-dark-75 mb-1 font-weight-bolder">1 499 000,00 ₽</div>
                    </div>
                    <div className="d-flex flex-column mr-8 px-4 py-2">
                      <div className="text-dark-50 font-weight-bold font-size-sm">Срок</div>
                      <div className="text-dark-75 mb-1 font-weight-bolder">360 дней</div>
                    </div>
                    <div className="d-flex flex-column mr-8 px-4 py-2">
                      <div className="text-dark-50 font-weight-bold font-size-sm">№ закупки</div>
                      <div className="text-dark-75 mb-1 font-weight-bolder">03722000000654000084</div>
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
                          <div className="form-group js-toggle"><label className="col-form-label" htmlFor="clientSelect">Существующий клиент</label><select className="form-control selectpicker" id="clientSelect" data-size="5" data-live-search="true" onChange={e => setRequestData('client_id', e.target, true)} value={requestData.client_id}>
                              <option>Выберите клиента</option>
                              {clients.map(el =>
                                <option key={el.id} value={el.id}>{el.full_name}</option>
                              )}
                            </select></div>
                          <div className="form-group js-toggle" style={{display: 'none'}}><label className="col-form-label" htmlFor="number">Новый клиент</label><input className="form-control" id="clentField" type="text" value=""/></div>
                          <div className="form-group row">
                            <div className="col-12"><label className="col-form-label" htmlFor="number">№ закупки в ЕИС</label><input className="form-control" id="number" type="text" onChange={e => setRequestData('eis', e.target)} value={requestData.eis}/></div>
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
                        <div className="col-lg-6">
                          <div className="bg-light rounded p-4">
                            <div className="font-weight-bold font-size-lg text-dark-75 mb-4">Информация о закупке</div>
                            <div className="d-flex flex-column py-2">
                              <div className="text-dark-50 font-weight-bolder">Номер закупки/закон</div>
                              <div className="text-dark-75 mb-1 font-size-lg"><a href="#">037220000065465425152</a> / 44-ФЗ</div>
                            </div>
                            <div className="d-flex flex-column py-2">
                              <div className="text-dark-50 font-weight-bolder">Предмет тендера</div>
                              <div className="text-dark-75 mb-1 font-size-lg">Следует отметить, что понимание сути ресурсосберегающих технологий в значительной степени обусловливает важность как самодостаточных, так и внешне зависимых концептуальных решений.</div>
                            </div>
                            <div className="d-flex flex-column py-2">
                              <div className="text-dark-50 font-weight-bolder">Заказчик ИНН 123456789</div>
                              <div className="text-dark-75 mb-1 font-size-lg">Разнообразный и богатый опыт говорит нам, что социально-экономическое развитие играет определяющее значение для инновационных методов управления процессами.</div>
                            </div>
                            <div className="d-flex flex-column py-2">
                              <div className="text-dark-50 font-weight-bolder">НМЦ</div>
                              <div className="text-dark-75 mb-1 font-size-lg">15 123 050,00 ₽</div>
                            </div>
                            <div className="d-flex flex-column py-2">
                              <div className="text-dark-50 font-weight-bolder">Дата публикации извещения</div>
                              <div className="text-dark-75 mb-1 font-size-lg">32.04.2021</div>
                            </div>
                            <div className="d-flex flex-column py-2">
                              <div className="text-dark-50 font-weight-bolder">Окончание подачи заявок</div>
                              <div className="text-dark-75 mb-1 font-size-lg">32.04.2021 | 12:00</div>
                            </div>
                            <div className="d-flex flex-column py-2">
                              <div className="text-dark-50 font-weight-bolder">Наличие аванса по контракту</div>
                              <div className="text-dark-75 mb-1 font-size-lg">нет</div>
                            </div>
                            <div className="d-flex flex-column py-2">
                              <div className="text-dark-50 font-weight-bolder">Размер обеспечения исполнения контракта</div>
                              <div className="text-dark-75 mb-1 font-size-lg">15 321 050,00 ₽</div>
                            </div>
                            <div className="d-flex flex-column py-2">
                              <div className="text-dark-50 font-weight-bolder">Размер обеспечения заявки</div>
                              <div className="text-dark-75 mb-1 font-size-lg">753 050,00 ₽</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                      <div className="row mb-4">
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
                      </div>
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
                                  <td className="align-middle">ООО Банк «Империал»</td>
                                  <td className="align-middle">123456789</td>
                                  <td className="align-middle">00165498798654</td>
                                  <td className="align-middle">3216548</td>
                                </tr>
                                <tr>
                                  <td className="align-middle">ООО Банк «Адыгейский»</td>
                                  <td className="align-middle">6549812</td>
                                  <td className="align-middle">54642135468463</td>
                                  <td className="align-middle">3216548</td>
                                </tr>
                                <tr>
                                  <td className="align-middle">ООО Банк «Сбербанк»</td>
                                  <td className="align-middle">6546454632</td>
                                  <td className="align-middle">32165487366543</td>
                                  <td className="align-middle">15493214</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="bg-primary-o-20 rounded p-4 h-100">
                            <div className="font-weight-bold font-size-h4 text-dark-75 mb-2">Основные данные</div>
                            <div className="d-flex flex-column py-2">
                              <div className="text-dark-50">Основной ОКВЭД</div>
                              <div className="text-dark-75 mb-1 font-size-lg font-weight-bolder">01.45.4</div>
                            </div>
                            <div className="d-flex flex-column py-2">
                              <div className="text-dark-50">Местонахождение компании</div>
                              <div className="text-dark-75 mb-1 font-size-l font-weight-bolder">г. Сыктывкар, ул. 2-я строителей, д. 8</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="bg-primary-o-20 rounded p-4 mt-4 mt-md-0 h-100">
                            <div className="font-weight-bold font-size-h4 text-dark-75 mb-2">Контактные данные</div>
                            <div className="py-2">
                              <div className="text-dark font-weight-bold font-size-lg mb-2">Пушкин Александр Сергеевич</div>
                              <div className="d-flex align-items-center mb-2"><span className="flex-shrink-0 mr-2"><span className="svg-icon svg-icon-md"><i className="flaticon2-phone text-primary"></i></span></span><span className="font-weight-bold">+7 (950) 123-45-67</span></div>
                              <div className="d-flex align-items-center"><span className="flex-shrink-0 mr-2"><span className="svg-icon svg-icon-md"><i className="flaticon2-envelope text-primary"></i></span></span><span className="font-weight-bold">mail@example.com</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                              <th scope="col" colspan="2">Наименование документа</th>
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
                            <tr>
                              <td className="align-middle"><a className="text-dark-75 font-weight-bolder text-hover-primary font-size-lg" href="16.html">ООО Банк «Империал»</a></td>
                              <td className="align-middle">100%</td>
                              <td className="align-middle">
                                <div className="label label-rounded label-success label-inline label-lg text-nowrap">Есть предложение</div><span className="svg-icon svg-icon-success ml-3" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span>
                              </td>
                              <td className="align-middle">32.03.2022<br/>09:16</td>
                              <td className="align-middle">
                                <div className="d-flex align-items-center"><a className="btn btn-icon btn-light-info btn-circle btn-sm font-weight-bold" href="" data-toggle="modal" data-target="#editCommission">₽</a>
                                  <div className="bg-light rounded p-1 d-flex align-items-center w-110px ml-1"><span className="svg-icon svg-icon-success mr-1" data-toggle="tooltip" title="Время для изменения комиссии. Далее предложение направляется клиенту" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span>
                                    <p className="text-nowrap m-0" id="timer"></p>
                                  </div>
                                </div>
                              </td>
                              <td className="align-middle">154,00 ₽</td>
                              <td className="align-middle"><a className="btn btn-icon btn-light-success btn-circle btn-sm mr-2" href="16.html"><i className="flaticon2-chat-1"></i></a></td>
                              <td className="align-middle">
                                <div className="dropdown dropdown-inline"><a className="btn btn-sm btn-clean btn-icon" href="javascript:;" data-toggle="dropdown"><span className="svg-icon svg-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path></g></svg></span></a>
                                  <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                    <ul className="navi flex-column navi-hover py-2">
                                      <li className="navi-item"><a className="navi-link" href="#"><span className="navi-icon"><i className="la la-door-open text-primary"></i></span><span className="navi-text">Открыть заявку</span></a></li>
                                      <li className="navi-item"><a className="navi-link" href="#"><span className="navi-icon"><i className="la la-send text-success"></i></span><span className="navi-text">Отправить клиенту</span></a></li>
                                      <li className="navi-item"><a className="navi-link" href="" data-toggle="modal" data-target="#editCommission"><span className="navi-icon"><i className="la la-edit text-danger"></i></span><span className="navi-text">Изменить комиссию</span></a></li>
                                    </ul>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="align-middle"><a className="text-dark-75 font-weight-bolder text-hover-primary font-size-lg" href="16.html">ООО Банк «Адыгейский»</a></td>
                              <td className="align-middle">100%</td>
                              <td className="align-middle">
                                <div className="label label-rounded label-danger label-inline label-lg text-nowrap">Отклонена</div><span className="svg-icon svg-icon-success ml-3" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span>
                              </td>
                              <td className="align-middle">32.03.2022<br/>09:16</td>
                              <td className="align-middle"></td>
                              <td className="align-middle">10 519,00 ₽</td>
                              <td className="align-middle"><a className="btn btn-icon btn-light-success btn-circle btn-sm mr-2" href="16.html"><i className="flaticon2-chat-1"></i></a></td>
                              <td className="align-middle">
                                <div className="dropdown dropdown-inline"><a className="btn btn-sm btn-clean btn-icon" href="javascript:;" data-toggle="dropdown"><span className="svg-icon svg-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path></g></svg></span></a>
                                  <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                    <ul className="navi flex-column navi-hover py-2">
                                      <li className="navi-item"><a className="navi-link" href="#"><span className="navi-icon"><i className="la la-door-open text-primary"></i></span><span className="navi-text">Открыть заявку</span></a></li>
                                    </ul>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="align-middle"><a className="text-dark-75 font-weight-bolder text-hover-primary font-size-lg" href="16.html">ООО Банк «Русский стандарт»</a></td>
                              <td className="align-middle">100%</td>
                              <td className="align-middle">
                                <div className="label label-rounded label-info label-inline label-lg text-nowrap">Рассмотрение</div><span className="svg-icon svg-icon-success ml-3" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span>
                              </td>
                              <td className="align-middle">32.03.2022<br/>09:16</td>
                              <td className="align-middle"></td>
                              <td className="align-middle">2 762,00 ₽</td>
                              <td className="align-middle"><a className="btn btn-icon btn-light-success btn-circle btn-sm mr-2" href="16.html"><i className="flaticon2-chat-1"></i></a></td>
                              <td className="align-middle">
                                <div className="dropdown dropdown-inline"><a className="btn btn-sm btn-clean btn-icon" href="javascript:;" data-toggle="dropdown"><span className="svg-icon svg-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path></g></svg></span></a>
                                  <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                    <ul className="navi flex-column navi-hover py-2">
                                      <li className="navi-item"><a className="navi-link" href="#"><span className="navi-icon"><i className="la la-door-open text-primary"></i></span><span className="navi-text">Открыть заявку</span></a></li>
                                    </ul>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="align-middle"><a className="text-dark-75 font-weight-bolder text-hover-primary font-size-lg" href="16.html">ООО Банк «Сбербанк»</a></td>
                              <td className="align-middle">100%</td>
                              <td className="align-middle">
                                <div className="label label-rounded label-warning label-inline label-lg text-nowrap">Запрос от банка</div><span className="svg-icon svg-icon-success ml-3" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span>
                              </td>
                              <td className="align-middle">32.03.2022<br/>09:16</td>
                              <td className="align-middle"></td>
                              <td className="align-middle">726,15 ₽</td>
                              <td className="align-middle"><a className="btn btn-icon btn-light-success btn-circle btn-sm mr-2" href="16.html"><i className="flaticon2-chat-1"></i></a></td>
                              <td className="align-middle">
                                <div className="dropdown dropdown-inline"><a className="btn btn-sm btn-clean btn-icon" href="javascript:;" data-toggle="dropdown"><span className="svg-icon svg-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path></g></svg></span></a>
                                  <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                    <ul className="navi flex-column navi-hover py-2">
                                      <li className="navi-item"><a className="navi-link" href="#"><span className="navi-icon"><i className="la la-door-open text-primary"></i></span><span className="navi-text">Открыть заявку</span></a></li>
                                    </ul>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="align-middle"><a className="text-dark-75 font-weight-bolder text-hover-primary font-size-lg" href="16.html">ООО Банк «Сбербанк»</a></td>
                              <td className="align-middle">100%</td>
                              <td className="align-middle">
                                <div className="label label-rounded label-danger label-inline label-lg text-nowrap">Неполный пакет</div><span className="svg-icon svg-icon-success ml-3" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span>
                              </td>
                              <td className="align-middle">32.03.2022<br/>09:16</td>
                              <td className="align-middle"></td>
                              <td className="align-middle">726,15 ₽</td>
                              <td className="align-middle"><a className="btn btn-icon btn-light-success btn-circle btn-sm mr-2" href="16.html"><i className="flaticon2-chat-1"></i></a></td>
                              <td className="align-middle">
                                <div className="dropdown dropdown-inline"><a className="btn btn-sm btn-clean btn-icon" href="javascript:;" data-toggle="dropdown"><span className="svg-icon svg-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path></g></svg></span></a>
                                  <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                    <ul className="navi flex-column navi-hover py-2">
                                      <li className="navi-item"><a className="navi-link" href="#"><span className="navi-icon"><i className="la la-door-open text-primary"></i></span><span className="navi-text">Открыть заявку</span></a></li>
                                    </ul>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="align-middle"><a className="text-dark-75 font-weight-bolder text-hover-primary font-size-lg" href="16.html">ООО Банк «Сбербанк»</a></td>
                              <td className="align-middle">100%</td>
                              <td className="align-middle">
                                <div className="label label-rounded label-warning label-inline label-lg text-nowrap">Занят</div><span className="svg-icon svg-icon-success ml-3" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span>
                              </td>
                              <td className="align-middle">32.03.2022<br/>09:16</td>
                              <td className="align-middle"></td>
                              <td className="align-middle">726,15 ₽</td>
                              <td className="align-middle"><a className="btn btn-icon btn-light-success btn-circle btn-sm mr-2" href="16.html"><i className="flaticon2-chat-1"></i></a></td>
                              <td className="align-middle">
                                <div className="dropdown dropdown-inline"><a className="btn btn-sm btn-clean btn-icon" href="javascript:;" data-toggle="dropdown"><span className="svg-icon svg-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path></g></svg></span></a>
                                  <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                    <ul className="navi flex-column navi-hover py-2">
                                      <li className="navi-item"><a className="navi-link" href="#"><span className="navi-icon"><i className="la la-door-open text-primary"></i></span><span className="navi-text">Открыть заявку</span></a></li>
                                    </ul>
                                  </div>
                                </div>
                              </td>
                            </tr>
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
                                <th scope="col" colspan="2">Наименование документа</th>
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
                          <div className="bg-success-o-30 rounded py-4 px-6 mb-4"><img className="w-auto h-25px" alt="bank" src="assets/media/logos/bank-us.png"/>
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
                <div className="card-footer d-flex justify-content-between"><a className="btn btn-light-danger font-weight-bold" href="#">Удалить заявку</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditRequestPage;