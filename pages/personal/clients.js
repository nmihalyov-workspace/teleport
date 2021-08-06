import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { api_query } from '../../api';
import classNames from 'classnames';

import { setData } from '../../store/clientCard';
import AppWrapper from '../../components/AppWrapper';

const ClientsPage = () => {
  const dispatch = useDispatch();
  const [filters, _setFilters] = useState({
    inn: '',
    region: '',
    type: 0,
    operators: []
  });
  const [regions, setRegions] = useState([
    {id: 1, name: 'Республика Татарстан'},
    {id: 2, name: 'Московская область'},
    {id: 3, name: 'Иркутская область'},
    {id: 4, name: 'Пермский край'},
    {id: 5, name: 'Красноярский край'},
    {id: 6, name: 'Камчатский край'},
    {id: 7, name: 'Забайкальский край'}
  ]);
  const [types, setTypes] = useState([]);
  const [operators, setOperators] = useState([
    {id: 1, name: 'Белозёрова Венера Викторовна'},
    {id: 2, name: 'Андреева Кристина Ивановна'},
    {id: 3, name: 'Пономарёва Руслана Никитевна'},
    {id: 4, name: 'Кабанова Капитолина Агафоновна'}
  ]);
  const [clients, setClients] = useState({
    total: 0,
    verified: 0,
    issued: 0
  });
  const [clientsData, setClientsData] = useState([]);
  const [pages, setPages] = useState({
    current: 1,
    total: 1
  });

  const setFilters = (key, target, isNumber) => {
    let value;

    if (key === 'operators') {
      value = Array.from(target.selectedOptions, option => +option.value);
    } else if (isNumber) {
      value = target.value.replace(/[^0-9]/gi, '');
    } else {
      value = target.value;
    }

    _setFilters({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    window.$('.bs-deselect-all').click();
    _setFilters({
      inn: '',
      region: '',
      type: 0,
      operators: []
    })
  };

  useEffect(() => {
    api_query.post('/user/types')
    .then(res => {
      const { success, types } = res.data;

      if (success) {
        setTypes(types);
      }
    });
  }, []);

  useEffect(() => {
    const options = {
      token_api: JSON.parse(localStorage.getItem('user')).auth.token,
      page: 1,
      agents: 1,
      type: [5, 6, 7]
    };

    if (filters.inn.length) {
      options.inn = filters.inn;
    }

    if (filters.region.length) {
      options.region = filters.region;
    }

    api_query.post('/user/list', options)
    .then(res => {
      const { success, data } = res.data;

      if (success) {
        setClientsData(data.users);
        setClients({
          ...clients,
          total: data.total
        });
        setPages({
          current: pages.current,
          total: data.pages
        });
      }
    });
  }, [filters]);

	return (
    <AppWrapper title="Мои клиенты" personal>
      <div className="d-flex flex-column-fluid">
        <div className="container">
  
          <div className="row">
            <div className="col-lg-12">
              <div className="card card-custom gutter-b">
                <div className="card-header align-items-center">
                  <div className="card-title">
                    <h3 className="card-label font-weight-bolder font-size-h4 text-dark-75">Клиенты</h3>
                  </div>
                  <div className="card-toolbar"><button className="btn btn-sm btn-success font-weight-bold" type="button" data-toggle="modal" data-target="#addClient">Добавить</button></div>
                </div>
                <div className="card-body">
                  <form className="mb-15">
                    <div className="row mb-6">
                      <div className="col-md-6 col-xl-4 mb-md-0 mb-6"><label htmlFor="kt_clientsTable_search_query">ИНН или название клиента</label><input className="form-control" id="kt_clientsTable_search_query" type="text" value={filters.inn} onChange={e => setFilters('inn', e.target)} /></div>
                      <div className="col-md-6 col-xl-4 mb-md-0 mb-6"><label htmlFor="regionClient">Регион клиента</label><input className="form-control" id="regionClient" type="text" onChange={e => setFilters('region', e.target)} value={filters.region} /></div>
                      <div className="col-md-6 col-xl-4 mb-md-0 mb-6"><label htmlFor="kt_clientsTable_search_type">Тип клиента</label><select className="form-control" id="kt_clientsTable_search_type" onChange={e => setFilters('type', e.target, true)} value={filters.type}>
                          <option value="">выберите тип</option>
                          {types.map(el => {
                            if (el.name.toLowerCase().includes('клиент')) {
                              return <option key={el.id} value={el.id}>{el.name.replace('Клиент: ', '')}</option>;
                            }
                          }
                          )}
                        </select></div>
                    </div>
                    <div className="row mb-6">
                      <div className="col-12 mb-md-0 mb-6"><label>Операторы</label><select className="form-control selectpicker" id="clientsOperators" multiple="multiple" data-actions-box="true" data-size="5" data-live-search="true" onChange={e => setFilters('operators', e.target)} value={filters.operators}>
                          {operators.map(el =>
                            <option key={el.id} value={el.id}>{el.name}</option>
                          )}
                        </select></div>
                    </div>
                    <div className="row mt-8">
                      <div className="col-12 justify-content-end d-flex"><button className="btn btn-secondary btn-secondary--icon ml-2" id="kt_reset_v2" type="button" onClick={clearFilters}><span><i className="la la-close"></i><span>Сброс</span></span></button></div>
                    </div>
                  </form>
                  <div className="d-flex flex-wrap mb-15">
                    <div className="d-flex flex-column mr-8 px-4 py-2 bg-primary-o-20 rounded">
                      <div className="text-dark-50 font-weight-bold">Всего клиентов</div>
                      <div className="text-dark-75 mb-1 font-weight-bolder font-size-lg">{clients.total}</div>
                    </div>
                    <div className="d-flex flex-column mr-8 px-4 py-2 bg-success-o-20 rounded">
                      <div className="text-dark-50 font-weight-bold">Подтвержденные порталом</div>
                      <div className="text-dark-75 mb-1 font-weight-bolder font-size-lg">{clients.verified}</div>
                    </div>
                    <div className="d-flex flex-column mr-8 px-4 py-2 bg-warning-o-20 rounded">
                      <div className="text-dark-50 font-weight-bold">Выпущенные</div>
                      <div className="text-dark-75 mb-1 font-weight-bolder font-size-lg">{clients.issued}</div>
                    </div>
                    <div className="d-flex flex-column mr-8 px-4 py-2"></div>
                  </div>
                  <div className="datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded" id="kt_clientsTable" style={{display: 'block'}}>
                    <table className="datatable-table">
                      <thead className="datatable-head">
                        <tr className="datatable-row" style={{left: 0}}>
                          <th className="datatable-cell datatable-cell-sort">
                            <span style={{width: '20px'}}></span>
                          </th>
                          <th data-field="regDate" className="datatable-cell datatable-cell-sort">
                            <span style={{width: '112px'}}>Дата добавления</span>
                          </th>
                          <th data-field="Org" className="datatable-cell datatable-cell-sort">
                            <span style={{width: '112px'}}>Организация</span>
                          </th>
                          <th data-field="regionTime" className="datatable-cell datatable-cell-sort">
                            <span style={{width: '112px'}}>Регион и время клиента</span>
                          </th>
                          <th data-field="Operator" className="datatable-cell datatable-cell-sort">
                            <span style={{width: '112px'}}>Оператор</span>
                          </th>
                          <th data-field="Comment" className="datatable-cell datatable-cell-sort">
                            <span style={{width: '112px'}}>Комментарий</span>
                          </th>
                          <th data-field="Actions" data-autohide-disabled="false" className="datatable-cell datatable-cell-sort">
                            <span style={{width: '32px'}}></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="datatable-body">
                        {clientsData.length ? clientsData.map((el, i) =>
                          <tr data-row={i} className="datatable-row" style={{left: 0}} key={i}>
                            <td data-field="RecordID" aria-label={el.id} className="datatable-cell">
                              <span style={{width: '20px'}}>{el.id}</span>
                            </td>
                            <td data-field="regDate" aria-label={Intl.DateTimeFormat('ru-Ru').format(new Date(el.created_at))} className="datatable-cell">
                              <span style={{width: '112px'}}><span>{Intl.DateTimeFormat('ru-Ru').format(new Date(el.created_at))}</span><div>{Intl.DateTimeFormat('ru-Ru', {hour: 'numeric',minute: 'numeric'}).format(new Date(el.created_at))}</div></span>
                            </td>
                            <td data-field="Org" aria-label={`${el.client_organization.user_client_organization_type} ${el.client_organization.name}`} className="datatable-cell">
                              <span style={{width: '112px'}}><span className="d-block font-weight-bolder">{el.client_organization.user_client_organization_type} {el.client_organization.name}</span><span className="font-size-sm">ИНН: {el.client_organization.inn}</span></span>
                            </td>
                            <td data-field="regionTime" aria-label="null" className="datatable-cell">
                              <span style={{width: '112px'}}><span className="d-block font-weight-bolder">Московская область</span><span className="font-size-sm">12:03</span></span>
                            </td>
                            <td className="datatable-cell" data-field="Operator" aria-label={el.full_name}>
                              <span style={{width: '112px'}}>{el.full_name}</span>
                            </td>
                            <td data-field="Comment" aria-label="Кстати, некоторые особенности внутренней политики лишь добавляют фракционных разногласий и разоблачены!" className="datatable-cell">
                              <span style={{width: '112px'}}><span className="font-size-sm">Кстати, некоторые особенности внутренней политики лишь добавляют фракционных разногласий и разоблачены!</span></span>
                            </td>
                            <td data-field="Actions" data-autohide-disabled="false" aria-label="null" className="datatable-cell">
                              <span style={{overflow: 'visible', position: 'relative', width: '32px'}}>
                                <div className="dropdown dropdown-inline">
                                  <a href="javascript:void(0);" className="btn btn-sm btn-clean btn-icon" data-toggle="dropdown">
                                    <span className="svg-icon svg-icon-md">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path></g></svg>
                                    </span>
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                    <ul className="navi flex-column navi-hover py-2">
                                      <li className="navi-item">
                                        <a href="#" className="navi-link" data-toggle="modal" data-target="#openModal" onClick={() => {dispatch(setData(el))}}>
                                          <span className="navi-icon"><i className="la la-window-maximize text-primary"></i></span>
                                          <span className="navi-text">Открыть</span>
                                        </a>
                                      </li>
                                      <li className="navi-item">
                                        <a href="#" className="navi-link">
                                          <span className="navi-icon"><i className="la la-vcard text-success"></i></span>
                                          <span className="navi-text">Карточка компании</span>
                                        </a>
                                      </li>
                                      <li className="navi-item">
                                        <Link href={`/personal/requests/edit?add=true&client=${el.id}`}>
                                          <a className="navi-link">
                                            <span className="navi-icon"><i className="la la-edit text-warning"></i></span>
                                            <span className="navi-text">Создать заявку</span>
                                          </a>
                                        </Link>
                                      </li>
                                      <li className="navi-item">
                                        <a href="#" className="navi-link" data-toggle="modal" data-target="#comment">
                                          <span className="navi-icon"><i className="la la-comment-o text-info"></i></span>
                                          <span className="navi-text">Комментарий</span>
                                        </a>
                                      </li>
                                      <li className="navi-item">
                                        <a href="#" className="navi-link" data-toggle="modal" data-target="#changeUnderwriter">
                                          <span className="navi-icon"><i className="la la-exchange text-info"></i></span>
                                          <span className="navi-text">Сменить оператора</span>
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
                      <span className="datatable-pager-detail">Показано {clientsData.length ? (pages.current * clientsData.length - clientsData.length + 1) : 0} - {clientsData.length} из {clientsData.length}</span>
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

export default ClientsPage;