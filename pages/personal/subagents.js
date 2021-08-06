import React, { useEffect, useState } from 'react';
import { api_query } from '../../api';
import { useDispatch } from 'react-redux';
import dataIsReady from '../../helpers/dataIsReady';
import classNames from 'classnames';

import { setData } from '../../store/editUser';
import AppWrapper from '../../components/AppWrapper';
import withUserData from '../../components/_hoc/withUserData';

const SubagentsPage = ({ user }) => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState([]);
  const [users, setUsers] = useState([]);
  const [subagents, setSubagents] = useState([]);
  const [usersPages, setUsersPages] = useState({
    current: 1,
    total: 1
  });
  const [subagentsPages, setSubagentsPages] = useState({
    current: 1,
    total: 1
  });

  useEffect(() => {
    const token_api = JSON.parse(localStorage.getItem('user')).auth.token;

    api_query.post('/user/credentials')
    .then(res => {
      const { success, credentials } = res.data;

      if (success) {
        setCredentials(credentials)
      }
    });

    api_query.post('/user/list', {
      token_api,
      agents: 1,
      type: [1, 2, 3, 4],
      page: 1
    })
    .then(res => {
      const { success, data } = res.data;

      if (success) {
        setUsers(data.users);
        setUsersPages({
          current: usersPages.current,
          total: data.pages
        });
      }
    });

    api_query.post('/user/list', {
      token_api,
      child_organizations: 1,
      page: 1
    })
    .then(res => {
      const { success, data } = res.data;

      if (success) {
        setSubagents(data.users);
        setSubagentsPages({
          current: subagentsPages.current,
          total: data.pages
        });
      }
    });
  }, []);

  return (
    <AppWrapper title="Мои пользователи/субагенты" personal>
      {dataIsReady(user) &&
        <div className="d-flex flex-column-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-custom gutter-b">
                  <div className="card-header card-header-tabs-line">
                    <div className="card-title">
                      <h3 className="card-label font-weight-bolder font-size-h4 text-dark-75">Мои пользователи/субагенты</h3>
                    </div>
                    <div className="card-toolbar">
                      <ul className="nav nav-tabs nav-bold nav-tabs-line" id="tab-panel">
                        <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#usersub_1">Пользователи</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#usersub_2">Субагенты</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="usersub_1" role="tabpanel">
                        <div className="mb-7"><button className="btn btn-sm btn-success font-weight-bold" type="button" data-toggle="modal" data-target="#addUser">Добавить пользователя</button></div>
                        <div className="mb-7">
                          <div className="row align-items-center">
                            <div className="col-12">
                              <div className="row align-items-center">
                                <div className="col-md-4 my-2 my-md-0">
                                  <div className="input-icon"><input className="form-control" id="kt_userTable_search_query" type="text" placeholder="Поиск..." /><span><i className="flaticon2-search-1 text-muted"></i></span></div>
                                </div>
                                <div className="col-md-4 my-2 my-md-0">
                                  <div className="d-flex align-items-center"><label className="mr-3 mb-0 d-none d-md-block">Статус:</label><select className="form-control" id="kt_userTable_search_status">
                                      <option value="">Все</option>
                                      {credentials.map(el =>
                                        <option key={el.id} value={el.id}>{el.name}</option>
                                      )}
                                    </select></div>
                                </div>
                                <div className="col-md-4 my-2 my-md-0">
                                  <div className="d-flex align-items-center"><label className="mr-3 mb-0 d-none d-md-block">Состояние:</label><select className="form-control" id="kt_userTable_search_state">
                                      <option value="">Все</option>
                                      <option value="1">Активный</option>
                                      <option value="2">Приостановленный</option>
                                    </select></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-8">
                            <div className="col-12 justify-content-end d-flex"><button className="btn btn-secondary btn-secondary--icon ml-2" id="kt_userTable_reset" type="button"><span><i className="la la-close"></i><span>Сброс</span></span></button></div>
                          </div>
                        </div>
                        <div className="datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded" id="userTable" style={{display: "block"}}>
                          <table className="datatable-table" style={{display: "block"}}>
                            <thead className="datatable-head">
                              <tr className="datatable-row" style={{left: "0px"}}>
                                <th data-field="State" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: "16px"}}></span>
                                </th>
                                <th data-field="Fio" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: "110px"}}>ФИО</span>
                                </th>
                                <th data-field="Status" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: "136px"}}>Статус</span>
                                </th>
                                <th data-field="Place" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: "110px"}}>Должность</span>
                                </th>
                                <th data-field="Email" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: "120px"}}>Email</span>
                                </th>
                                <th data-field="Phone" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: "125px"}}>Телефон</span>
                                </th>
                                <th data-field="Date" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: "105px"}}>Дата добавления</span>
                                </th>
                                <th data-field="Actions" data-autohide-disabled="false" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: "32px"}}></span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="datatable-body">
                              {users.length ? users.map((el, i) =>
                                <tr key={el.id}  data-row={i} className="datatable-row" style={{left: "0px"}}>
                                  <td data-field="State" aria-label="1" className="datatable-cell">
                                    <span style={{width: "16px"}}>
                                      <span className="label label-dot label-xl  label-success" title="Активный"></span>
                                    </span>
                                  </td>
                                  <td data-field="Fio" aria-label={el.full_name} className="datatable-cell">
                                    <span style={{width: "110px"}}>{el.full_name}</span>
                                  </td>
                                  <td data-field="Status" aria-label="1" className="datatable-cell">
                                    <span style={{width: "136px"}}>
                                      <span className="label font-weight-bold  label-light-success label-inline text-nowrap">{el.user_credential.name}</span>
                                    </span>
                                  </td>
                                  <td data-field="Place" aria-label={el.position} className="datatable-cell">
                                    <span style={{width: "110px"}}>{el.position}</span>
                                  </td>
                                  <td data-field="Email" aria-label={el.email} className="datatable-cell">
                                    <span style={{width: "120px"}}>{el.email}</span>
                                  </td>
                                  <td data-field="Phone" aria-label={el.phone.toString().replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")} className="datatable-cell">
                                    <span style={{width: "125px"}}>{el.phone.toString().replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")}</span>
                                  </td>
                                  <td data-field="Date" aria-label={Intl.DateTimeFormat('ru-Ru').format(new Date(el.created_at))} className="datatable-cell">
                                    <span style={{width: "105px"}}>{Intl.DateTimeFormat('ru-Ru').format(new Date(el.created_at))}</span>
                                  </td>
                                  <td data-field="Actions" data-autohide-disabled="false" aria-label="null" className="datatable-cell">
                                    <span style={{overflow: "visible", position: "relative", width: "32px"}}>
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
                                              <a href="#" onClick={() => {dispatch(setData(el))}} className="navi-link" data-toggle="modal" data-target="#editUser">
                                                <span className="navi-icon">
                                                  <i className="la la-edit text-primary"></i>
                                                </span>
                                                <span className="navi-text">Редактировать</span>
                                              </a>
                                            </li>
                                            <li className="navi-item">
                                              <a href="#" className="navi-link">
                                                <span className="navi-icon">
                                                  <i className="la la-exchange text-success"></i>
                                                </span>
                                                <span className="navi-text">Приостановить/возобновить</span>
                                              </a>
                                            </li>
                                            <li className="navi-item">
                                              <a href="#" className="navi-link" data-toggle="modal" data-target="#resetPass">
                                                <span className="navi-icon">
                                                  <i className="la la-lock text-warning"></i>
                                                </span>
                                                <span className="navi-text">Сбросить пароль</span>
                                              </a>
                                            </li>
                                            <li className="navi-item">
                                              <a href="#" className="navi-link" data-toggle="modal" data-target="#removeUser">
                                                <span className="navi-icon">
                                                  <i className="la la-trash-o text-danger"></i>
                                                </span>
                                                <span className="navi-text">Удалить</span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </span>
                                  </td>
                                </tr>
                              ) : null}
                            </tbody>
                          </table>
                          <div className="datatable-pager datatable-paging-loaded">
                            <ul className="datatable-pager-nav my-2 mb-sm-0">
                              <li>
                                <a title="Первая страница" className={classNames('datatable-pager-link datatable-pager-link-first', {'datatable-pager-link-disabled': usersPages.current === 1})} data-page="1" disabled={usersPages.current === 1}>
                                  <i className="flaticon2-fast-back"></i>
                                </a>
                              </li>
                              <li>
                                <a title="Предыдущая страница" className={classNames('datatable-pager-link datatable-pager-link-prev', {'datatable-pager-link-disabled': usersPages.current === 1})} data-page="1" disabled={usersPages.current === 1}>
                                  <i className="flaticon2-back"></i>
                                </a>
                              </li>
                              <li style={{display: "none"}}>
                                <input type="text" className="datatable-pager-input form-control" title="Номер страницы" />
                              </li>
                              {Array.from({length: usersPages.total}).map((_, i) =>
                                <li key={i}>
                                  <a className={classNames('datatable-pager-link datatable-pager-link-number', {'datatable-pager-link-active': usersPages.current === usersPages.total})} data-page={i + 1} title={i + 1}>{i + 1}</a>
                                </li>
                              )}
                              <li>
                                <a title="Следующая страница" className={classNames('datatable-pager-link datatable-pager-link-next', {'datatable-pager-link-disabled': usersPages.current === usersPages.total})} data-page={usersPages.total} disabled={usersPages.current === usersPages.total}>
                                  <i className="flaticon2-next"></i>
                                </a>
                              </li>
                              <li>
                                <a title="Последняя страница" className={classNames('datatable-pager-link datatable-pager-link-last', {'datatable-pager-link-disabled': usersPages.current === usersPages.total})} data-page={usersPages.total} disabled={usersPages.current === usersPages.total}>
                                  <i className="flaticon2-fast-next"></i>
                                </a>
                              </li>
                            </ul>
                            <div className="datatable-pager-info my-2 mb-sm-0">
                              {/* <div className="dropdown bootstrap-select datatable-pager-size" style={{width: "60px"}}>
                                <select className="selectpicker datatable-pager-size" title="Количество строк" data-width="60px" data-container="body" data-selected="10">
                                  <option className="bs-title-option" value=""></option>
                                  <option value="5">5</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                  <option value="30">30</option>
                                  <option value="50">50</option>
                                  <option value="100">100</option>
                                </select>
                                <button type="button" tabIndex="-1" className="btn dropdown-toggle btn-light" data-toggle="dropdown" role="combobox" aria-owns="bs-select-4" aria-haspopup="listbox" aria-expanded="false" title="Количество строк">
                                <div className="filter-option">
                                  <div className="filter-option-inner">
                                    <div className="filter-option-inner-inner">10</div>
                                  </div>
                                </div>
                                </button>
                                <div className="dropdown-menu ">
                                  <div className="inner show" role="listbox" id="bs-select-4" tabIndex="-1">
                                    <ul className="dropdown-menu inner show" role="presentation"></ul>
                                  </div>
                                </div>
                              </div> */}
                              <span className="datatable-pager-detail">Показано {users.length ? (usersPages.current * users.length - users.length + 1) : 0} - {users.length} из {users.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="usersub_2" role="tabpanel">
                        <div className="mb-7"><button className="btn btn-sm btn-success font-weight-bold" type="button" data-toggle="modal" data-target="#addSubagent">Добавить субагента</button></div>
                        <div className="mb-7">
                          <div className="row align-items-center">
                            <div className="col-12">
                              <div className="row align-items-center">
                                <div className="col-md-4 my-2 my-md-0">
                                  <div className="input-icon"><input className="form-control" id="kt_subTable_search_query" type="text" placeholder="Поиск..." /><span><i className="flaticon2-search-1 text-muted"></i></span></div>
                                </div>
                                <div className="col-md-4 my-2 my-md-0">
                                  <div className="d-flex align-items-center"><label className="mr-3 mb-0 d-none d-md-block">Состояние:</label><select className="form-control" id="kt_subTable_search_state">
                                      <option value="">Все</option>
                                      <option value="1">Активный</option>
                                      <option value="2">Приостановленный</option>
                                    </select></div>
                                </div>
                                <div className="col-md-4 justify-content-end d-flex"><button className="btn btn-secondary btn-secondary--icon ml-2" id="kt_subTable_reset" type="button"><span><i className="la la-close"></i><span>Сброс</span></span></button></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded" id="subTable" style={{display: "block"}}>
                          <table className="datatable-table" style={{display: "block"}}>
                            <thead className="datatable-head">
                              <tr className="datatable-row" style={{left: '0px;'}}>
                                <th data-field="State" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: '16px'}}></span>
                                </th>
                                <th data-field="Name" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: '160px'}}>Наименование</span>
                                </th>
                                <th data-field="Inn" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: '160px'}}>ИНН</span>
                                </th>
                                <th data-field="Email" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: '120px'}}>Email</span>
                                </th>
                                <th data-field="Phone" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: '120px'}}>Телефон</span>
                                </th>
                                <th data-field="Actions" data-autohide-disabled="false" className="datatable-cell datatable-cell-sort">
                                  <span style={{width: '32px'}}></span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="datatable-body">
                              {subagents.length ? subagents.map((el, i) =>
                                <tr data-row={i} key={el.id} className="datatable-row" style={{left: '0px'}}>
                                  <td data-field="State" aria-label="1" className="datatable-cell">
                                    <span style={{width: '16px'}}>
                                      <span className="label label-dot label-xl  label-success" title="Активный"></span>
                                    </span>
                                  </td>
                                  <td data-field="Name" aria-label={el.full_name} className="datatable-cell">
                                    <span style={{width: '160px'}}>{el.full_name}</span>
                                  </td>
                                  <td data-field="Inn" aria-label={el.agent_organization.inn} className="datatable-cell">
                                    <span style={{width: '160px'}}>{el.agent_organization.inn}</span>
                                  </td>
                                  <td data-field="Email" aria-label={el.email} className="datatable-cell">
                                    <span style={{width: '120px'}}>{el.email}</span>
                                  </td>
                                  <td data-field="Phone" aria-label={el.phone.toString().replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")} className="datatable-cell">
                                    <span style={{width: '120px'}}>{el.phone.toString().replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")}</span>
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
                                              <a href="#" className="navi-link" data-toggle="modal" data-target="#addSub">
                                                <span className="navi-icon"><i className="la la-edit text-primary"></i></span>
                                                <span className="navi-text">Редактировать</span>
                                              </a>
                                            </li>
                                            <li className="navi-item">
                                              <a href="#" className="navi-link">
                                                <span className="navi-icon"><i className="la la-exchange text-success"></i></span>
                                                <span className="navi-text">Приостановить/возобновить</span>
                                              </a>
                                            </li>
                                            <li className="navi-item">
                                              <a href="#" className="navi-link" data-toggle="modal" data-target="#resetPass">
                                                <span className="navi-icon"><i className="la la-lock text-warning"></i></span>
                                                <span className="navi-text">Сбросить пароль</span>
                                              </a>
                                            </li>
                                            <li className="navi-item">
                                              <a href="#" className="navi-link" data-toggle="modal" data-target="#removeUser">
                                                <span className="navi-icon"><i className="la la-trash-o text-danger"></i></span>
                                                <span className="navi-text">Удалить</span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </span>
                                  </td>
                                </tr>) : null
                              }
                            </tbody>
                          </table>
                          <div className="datatable-pager datatable-paging-loaded">
                            <ul className="datatable-pager-nav my-2 mb-sm-0">
                              <li>
                                <a title="Первая страница" className={classNames('datatable-pager-link datatable-pager-link-first', {'datatable-pager-link-disabled': subagentsPages.current === 1})} data-page="1" disabled={subagentsPages.current === 1}>
                                  <i className="flaticon2-fast-back"></i>
                                </a>
                              </li>
                              <li>
                                <a title="Предыдущая страница" className={classNames('datatable-pager-link datatable-pager-link-prev', {'datatable-pager-link-disabled': subagentsPages.current === 1})} data-page="1" disabled={subagentsPages.current === 1}>
                                  <i className="flaticon2-back"></i>
                                </a>
                              </li>
                              <li style={{display: "none"}}>
                                <input type="text" className="datatable-pager-input form-control" title="Номер страницы" />
                              </li>
                              {Array.from({length: subagentsPages.total}).map((_, i) =>
                                <li key={i}>
                                  <a className={classNames('datatable-pager-link datatable-pager-link-number', {'datatable-pager-link-active': subagentsPages.current === subagentsPages.total})} data-page={i + 1} title={i + 1}>{i + 1}</a>
                                </li>
                              )}
                              <li>
                                <a title="Следующая страница" className={classNames('datatable-pager-link datatable-pager-link-next', {'datatable-pager-link-disabled': subagentsPages.current === subagentsPages.total})} data-page={subagentsPages.total} disabled={subagentsPages.current === subagentsPages.total}>
                                  <i className="flaticon2-next"></i>
                                </a>
                              </li>
                              <li>
                                <a title="Последняя страница" className={classNames('datatable-pager-link datatable-pager-link-last', {'datatable-pager-link-disabled': subagentsPages.current === subagentsPages.total})} data-page={subagentsPages.total} disabled={subagentsPages.current === subagentsPages.total}>
                                  <i className="flaticon2-fast-next"></i>
                                </a>
                              </li>
                            </ul>
                            <div className="datatable-pager-info my-2 mb-sm-0">
                              {/* <div className="dropdown bootstrap-select datatable-pager-size" style={{width: "60px"}}>
                                <select className="selectpicker datatable-pager-size" title="Количество строк" data-width="60px" data-container="body" data-selected="10">
                                  <option className="bs-title-option" value=""></option>
                                  <option value="5">5</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                  <option value="30">30</option>
                                  <option value="50">50</option>
                                  <option value="100">100</option>
                                </select>
                                <button type="button" tabIndex="-1" className="btn dropdown-toggle btn-light" data-toggle="dropdown" role="combobox" aria-owns="bs-select-4" aria-haspopup="listbox" aria-expanded="false" title="Количество строк">
                                <div className="filter-option">
                                  <div className="filter-option-inner">
                                    <div className="filter-option-inner-inner">10</div>
                                  </div>
                                </div>
                                </button>
                                <div className="dropdown-menu ">
                                  <div className="inner show" role="listbox" id="bs-select-4" tabIndex="-1">
                                    <ul className="dropdown-menu inner show" role="presentation"></ul>
                                  </div>
                                </div>
                              </div> */}
                              <span className="datatable-pager-detail">Показано {subagents.length ? (subagentsPages.current * subagents.length - subagents.length + 1) : 0} - {subagents.length} из {subagents.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </AppWrapper>
  );
};

export default withUserData(SubagentsPage);