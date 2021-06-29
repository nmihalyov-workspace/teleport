import React from 'react';
import { api_query } from '../../../api';
import classNames from 'classnames';

import AppWrapper from '../../../components/AppWrapper';

class RequestsPage extends React.PureComponent {
  state = {
    pages: {
      current: 1,
      total: 1
    },
    requests: []
  }

  componentDidMount() {
    api_query.post('/bid/list', {page: 1})
    .then(res => {
      const { success, data } = res.data;

      if (success) {
        this.setState(prevState => ({
          ...prevState,
          requests: data.bids
        }));
      }
    });
  }

  countDays = (start, end) => {
    const oneDay = 24 * 60 * 60 * 1000;

    start = new Date(start);
    end = new Date(end);

    return Math.round(Math.abs((start - end) / oneDay));
  }

  render() {
    const { pages, requests } = this.state;
    const { countDays } = this;

    return (
      <AppWrapper title="Мои заявки" personal>
        <div className="d-flex flex-column-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-custom gutter-b">
                  <div className="card-header align-items-center">
                    <div className="card-title">
                      <h3 className="card-label font-weight-bolder font-size-h4 text-dark-75">Мои заявки</h3>
                    </div>
                    <div className="card-toolbar"><button className="btn btn-sm btn-success font-weight-bold" type="button" data-toggle="modal" data-target="#addRequest">Добавить</button></div>
                  </div>
                  <div className="card-body">
                    <form className="mb-15">
                      <div className="row mb-6">
                        <div className="col-md-6 col-xl-4 mb-xl-0 mb-6"><label htmlFor="kt_reviewsTable_search_client">ИНН или название клиента</label><input className="form-control" id="kt_reviewsTable_search_client" type="text"/></div>
                        <div className="col-md-6 col-xl-4 mb-md-0 mb-6"><label>№ заявки</label><input className="form-control datatable-input" id="kt_reviewsTable_search_number" type="text"/></div>
                        <div className="col-md-6 col-xl-4 mb-xl-0 mb-6"><label>№ закупки</label><input className="form-control datatable-input" id="kt_reviewsTable_search_purchase_num" type="text"/></div>
                      </div>
                      <div className="row mb-6">
                        <div className="col-md-6 col-xl-4 mb-md-0 mb-6"><label>Дата</label>
                          <div className="input-group" id="requests-date"><input className="form-control" type="date" name="start"/>
                            <div className="input-group-append"><span className="input-group-text"><i className="la la-ellipsis-h"></i></span></div><input className="form-control" type="date" name="end"/>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-4 mb-md-0 mb-6"><label>Сумма</label>
                          <div className="input-group"><input className="input-sum form-control" type="text" name="from"/>
                            <div className="input-group-append"><span className="input-group-text">₽</span></div><input className="input-sum form-control" type="text" name="to"/>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-4 mb-md-0 mb-6"><label>Оператор</label><select className="form-control selectpicker" id="requestsEmployees" multiple="multiple" data-actions-box="true" data-size="5" data-live-search="true">
                            <option value="Белозёрова Венера Викторовна">Белозёрова Венера Викторовна</option>
                            <option value="Ковалёва Илона Константиновна">Ковалёва Илона Константиновна</option>
                            <option value="Романова Цветана Платоновна">Романова Цветана Платоновна</option>
                          </select></div>
                      </div>
                      <div className="row mb-6">
                        <div className="col-12 mb-xl-0 mb-6"><label>Статус</label>
                          <div><button className="btn btn-light btn-sm font-weight-bold mr-1 mb-1" type="button" data-radio="status">Все</button><button className="btn btn-light-dark btn-sm font-weight-bold mr-1 mb-1" type="button" data-radio="status" data-value="1">Черновики</button><button className="btn btn-light-warning btn-sm font-weight-bold mr-1 mb-1" type="button" data-radio="status" data-value="2">Проверка порталом</button><button className="btn btn-light-danger btn-sm font-weight-bold mr-1 mb-1" type="button" data-radio="status" data-value="3">Доработать</button><button className="btn btn-light-info btn-sm font-weight-bold mr-1 mb-1" type="button" data-radio="status" data-value="4">В банках</button><button className="btn btn-light-success btn-sm font-weight-bold mr-1 mb-1" type="button" data-radio="status" data-value="5">Есть предложение</button><button className="btn btn-light-warning btn-sm font-weight-bold mr-1 mb-1" type="button" data-radio="status" data-value="6">Согласование макета</button><button className="btn btn-light-success btn-sm font-weight-bold mr-1 mb-1" type="button" data-radio="status" data-value="7">Предложение принято</button><button className="btn btn-light-info btn-sm font-weight-bold mr-1 mb-1" type="button" data-radio="status" data-value="8">Оплачено</button><button className="btn btn-light-success btn-sm font-weight-bold mr-1 mb-1" type="button" data-radio="status" data-value="9">Выпущено</button><button className="btn btn-light-danger btn-sm font-weight-bold mr-1 mb-1" type="button" data-radio="status" data-value="0">Перевыпуск</button></div>
                        </div>
                      </div>
                      <div className="row mt-8">
                        <div className="col-12 justify-content-end d-flex"><button className="btn btn-secondary btn-secondary--icon ml-2" id="kt_reset" type="button"><span><i className="la la-close"></i><span>Сброс</span></span></button></div>
                      </div>
                    </form>
                    <div className="datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded" id="kt_requestsTable" style={{display: 'block'}}>
                      <table className="datatable-table">
                        <thead className="datatable-head">
                          <tr className="datatable-row" style={{left: 0}}>
                            <th className="datatable-cell datatable-toggle-detail"><span></span></th>
                            <th data-field="ID" className="datatable-cell datatable-cell-sort">
                              <span style={{width: '133px'}}>№ заявки</span>
                            </th>
                            <th data-field="Client" className="datatable-cell datatable-cell-sort">
                              <span style={{width: '144px'}}>Клиент, ИНН</span>
                            </th>
                            <th data-field="purchaseNum" className="datatable-cell datatable-cell-sort">
                              <span style={{width: '160px'}}>Номер закупки,<br/>Тип БГ</span>
                            </th>
                            <th data-field="BGsum" className="datatable-cell datatable-cell-sort">
                              <span style={{width: '120px'}}>Сумма БГ, срок БГ</span>
                            </th>
                            <th data-field="Status" className="datatable-cell datatable-cell-sort">
                              <span style={{width: '100px'}}>Статус</span>
                            </th>
                            <th data-field="ChangeDate" className="datatable-cell datatable-cell-sort" style={{display: "none"}}>
                              <span style={{width: '120x'}}>Последнее изменение</span>
                            </th>
                            <th data-field="Chat" className="datatable-cell datatable-cell-sort" style={{display: "none"}}>
                              <span style={{width: '80px'}}>Чат с банком</span>
                            </th>
                            <th data-field="Manager" className="datatable-cell datatable-cell-sort" style={{display: "none"}}>
                              <span style={{width: '120px'}}>Оператор</span>
                            </th>
                            <th data-field="Actions" data-autohide-disabled="false" className="datatable-cell datatable-cell-sort">
                              <span style={{width: '32px'}}></span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="datatable-body">
                          {requests.length && requests.map((el, i) =>
                            <tr data-row="0" className="datatable-row" style={{left: '0px'}} key={i}>
                              <td className="datatable-cell datatable-toggle-detail">
                                <a className="datatable-toggle-detail" href="javascript:">
                                  <i className="fa fa-caret-right"></i>
                                </a>
                              </td>
                              <td className="datatable-cell-sorted datatable-cell" data-field="ID" aria-label={el.id}>
                                <span style={{width: '133px'}}>
                                  <a className="text-dark-75 font-weight-bolder text-hover-primary" href="#">{el.id}</a>
                                  <div className="font-size-sm text-muted">{Intl.DateTimeFormat('ru-Ru').format(new Date(el.created_at))}<br/>{Intl.DateTimeFormat('ru-Ru', {hour: 'numeric',minute: 'numeric'}).format(new Date(el.created_at))}</div>
                                </span>
                              </td>
                              <td data-field="Client" aria-label={el.client.full_name} className="datatable-cell">
                                <span style={{width: '144px'}}>
                                  <a className="text-dark-75 font-weight-bolder text-hover-primary" href="#">{el.client.full_name}</a>
                                  <div className="font-size-sm text-muted">ИНН 7418476233</div>
                                </span>
                              </td>
                              <td data-field="purchaseNum" aria-label={el.eis} className="datatable-cell">
                                <span style={{width: '160px'}}>
                                  <span className="font-size-sm text-nowrap">{el.eis}</span>
                                  <div className="font-size-sm text-muted">Коммерческая БГ</div>
                                </span>
                              </td>
                              <td data-field="BGsum" aria-label={el.bg_sum} className="datatable-cell">
                                <span style={{width: '120px'}}>
                                  <span className="font-size-sm text-nowrap">{el.bg_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽</span>
                                  <div className="font-size-sm text-muted">По {Intl.DateTimeFormat('ru-Ru').format(new Date(el.bg_end))} г, {countDays(el.bg_start, el.bg_end)}&nbsp;дн.</div>
                                </span>
                              </td>
                              <td data-field="Status" aria-label="0" className="datatable-cell">
                                <span style={{width: '100px'}}>
                                  <span className="label label-inline font-weight-bold h-auto label-light-danger">{el.bid_guarantee.name}</span>
                                  <div className="cursor-pointer mt-4" data-toggle="modal" data-target="#requestInfo">
                                    <span className="label label-sm label-rounded label-info" title="Подано заявлений">5</span> | <span className="label label-sm label-rounded label-success" title="Одобрено заявлений">2</span> / <span className="label label-sm label-rounded label-danger" title="Отказано">3</span>
                                  </div>
                                </span>
                              </td>
                              <td data-field="ChangeDate" aria-label={`${Intl.DateTimeFormat('ru-Ru').format(new Date(el.created_at))}T${Intl.DateTimeFormat('ru-Ru', {hour: 'numeric',minute: 'numeric'}).format(new Date(el.created_at))}`} className="datatable-cell" style={{display: 'none'}}>
                                <span style={{width: '120px'}}>
                                  <div className="font-size-sm">{Intl.DateTimeFormat('ru-Ru').format(new Date(el.created_at))}<br/>{Intl.DateTimeFormat('ru-Ru', {hour: 'numeric',minute: 'numeric'}).format(new Date(el.created_at))}</div>
                                </span>
                              </td>
                              <td data-field="Chat" aria-label="null" className="datatable-cell" style={{display: 'none'}}>
                                <span style={{width: '80px'}}>
                                  <a className="btn btn-icon btn-light-success btn-circle btn-sm mr-2" href="16.html" title="Чат с&nbsp;банком">
                                    <i className="flaticon2-chat-1"></i>
                                  </a>
                                </span>
                              </td>
                              <td data-field="Manager" aria-label="Романова Цветана Платоновна" className="datatable-cell" style={{display: 'none'}}>
                                <span style={{width: '120px'}}>Романова Цветана Платоновна</span>
                              </td>
                              <td data-field="Actions" data-autohide-disabled="false" aria-label="null" className="datatable-cell">
                                <span style={{overflow: 'visible', position: 'relative', width: '32px'}}>
                                  <div className="dropdown dropdown-inline">
                                    <a href="javascript:;" className="btn btn-sm btn-clean btn-icon" data-toggle="dropdown">
                                      <span className="svg-icon svg-icon-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"></rect>
                                            <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path>
                                          </g>
                                        </svg>
                                      </span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                      <ul className="navi flex-column navi-hover py-2">
                                        <li className="navi-item">
                                          <a href="#" className="navi-link">
                                            <span className="navi-icon"><i className="la la-door-open text-primary"></i></span>
                                            <span className="navi-text">Открыть</span>
                                          </a>
                                        </li>
                                        <li className="navi-item">
                                          <a href="/17.html#price-management" className="navi-link">
                                            <span className="navi-icon"><i className="la la-gear text-success"></i></span>
                                            <span className="navi-text">Управлять ценой</span>
                                          </a>
                                        </li>
                                        <li className="navi-item">
                                          <a href="#" className="navi-link">
                                            <span className="navi-icon"><i className="la la-user-circle-o text-danger"></i></span>
                                            <span className="navi-text">В аккаунт клиента</span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </span>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <div className="datatable-pager datatable-paging-loaded">
                        <ul className="datatable-pager-nav my-2 mb-sm-0">
                          <li>
                            <a title="Первая страница" className={classNames('datatable-pager-link datatable-pager-link-first', {'datatable-pager-link-disabled': pages.current === 1})} data-page="1" disabled={pages.current === 1}>
                              <i className="flaticon2-fast-back"></i>
                            </a>
                          </li>
                          <li>
                            <a title="Предыдущая страница" className={classNames('datatable-pager-link datatable-pager-link-prev', {'datatable-pager-link-disabled': pages.current === 1})} data-page="1" disabled={pages.current === 1}>
                              <i className="flaticon2-back"></i>
                            </a>
                          </li>
                          <li style={{display: 'none'}}><input type="text" className="datatable-pager-input form-control" title="Номер страницы"/></li>
                          {Array.from({length: pages.total}).map((_, i) =>
                            <li key={i}>
                              <a className={classNames('datatable-pager-link datatable-pager-link-number', {'datatable-pager-link-active': pages.current === pages.total})} data-page={i + 1} title={i + 1}>{i + 1}</a>
                            </li>
                          )}
                          <li>
                            <a title="Следующая страница" className={classNames('datatable-pager-link datatable-pager-link-next', {'datatable-pager-link-disabled': pages.current === pages.total})} data-page={pages.total} disabled={pages.current === pages.total}>
                              <i className="flaticon2-next"></i>
                            </a>
                          </li>
                          <li>
                            <a title="Последняя страница" className={classNames('datatable-pager-link datatable-pager-link-last', {'datatable-pager-link-disabled': pages.current === pages.total})} data-page={pages.total} disabled={pages.current === pages.total}>
                              <i className="flaticon2-fast-next"></i>
                            </a>
                          </li>
                        </ul>
                      <div className="datatable-pager-info my-2 mb-sm-0">
                        {/* <div className="dropdown bootstrap-select datatable-pager-size" style={{width: '60px'}}>
                          <select className="selectpicker datatable-pager-size" title="Количество строк" data-width="60px" data-container="body" data-selected="10">
                            <option className="bs-title-option" value=""></option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                          <button type="button" tabIndex="-1" className="btn dropdown-toggle btn-light" data-toggle="dropdown" role="combobox" aria-owns="bs-select-3" aria-haspopup="listbox" aria-expanded="false" title="Количество строк">
                            <div className="filter-option">
                              <div className="filter-option-inner">
                                <div className="filter-option-inner-inner">10</div>
                              </div>
                            </div>
                          </button>
                          <div className="dropdown-menu">
                            <div className="inner show" role="listbox" id="bs-select-3" tabIndex="-1">
                              <ul className="dropdown-menu inner show" role="presentation"></ul>
                            </div>
                          </div>
                        </div> */}
                        <span className="datatable-pager-detail">Показано 1 - {requests.length} из {requests.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppWrapper>
    );
  }
}

export default RequestsPage;