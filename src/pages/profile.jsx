import React, { useContext, useEffect, useState } from 'react';
import globalContext from '../context/global';
import { api_query } from '../api';

const ProfilePage = () => {
  const [types, setTypes] = useState([]);
  const [taxations, setTaxations] = useState([]);
  const { user } = useContext(globalContext);
  const { agent_organization } = user;

  useEffect(() => {
    document.title = "Профиль";

    api_query.post('/user/types')
    .then(res => {
      const { success, types } = res.data;

      if (success) {
        setTypes(types);
      }
    });

    api_query.post('/user/agent_organization/taxation_systems')
    .then(res => {
      const { success, taxation_systems } = res.data;

      if (success) {
        setTaxations(taxation_systems);
      }
    });
  }, []);

	return (
    <div className="d-flex flex-column-fluid">
      <div className="container">

        <div className="row">
          <div className="col-lg-12">
            <div className="card card-custom gutter-b">
              <div className="card-body d-flex align-items-center py-5 py-lg-10">
                <div className="d-none flex-center position-relative ml-5 mr-15 ml-lg-9 d-sm-flex"><span className="svg-icon svg-icon-5x svg-icon-danger position-absolute opacity-15"><svg xmlns="http://www.w3.org/2000/svg" width="70px" height="70px" viewBox="0 0 70 70" fill="none"><g stroke="none" strokeWidth="1" fillRule="evenodd"><path d="M28 4.04145C32.3316 1.54059 37.6684 1.54059 42 4.04145L58.3109 13.4585C62.6425 15.9594 65.3109 20.5812 65.3109 25.5829V44.4171C65.3109 49.4188 62.6425 54.0406 58.3109 56.5415L42 65.9585C37.6684 68.4594 32.3316 68.4594 28 65.9585L11.6891 56.5415C7.3575 54.0406 4.68911 49.4188 4.68911 44.4171V25.5829C4.68911 20.5812 7.3575 15.9594 11.6891 13.4585L28 4.04145Z" fill="#000000"></path></g></svg></span><span className="svg-icon svg-icon-3x svg-icon-danger position-absolute mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M11.1669899,4.49941818 L2.82535718,19.5143571 C2.557144,19.9971408 2.7310878,20.6059441 3.21387153,20.8741573 C3.36242953,20.9566895 3.52957021,21 3.69951446,21 L21.2169432,21 C21.7692279,21 22.2169432,20.5522847 22.2169432,20 C22.2169432,19.8159952 22.1661743,19.6355579 22.070225,19.47855 L12.894429,4.4636111 C12.6064401,3.99235656 11.9909517,3.84379039 11.5196972,4.13177928 C11.3723594,4.22181902 11.2508468,4.34847583 11.1669899,4.49941818 Z" fill="#000000" opacity="0.3"></path><rect fill="#000000" x="11" y="9" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="17" width="2" height="2" rx="1"></rect></g></svg></span></div>
                <div className="d-flex flex-column">
                  <h4 className="h4 text-dark mb-3">Нужен договор!</h4>
                  <p className="m-0 text-dark-50 font-weight-bold font-size-lg">Для работы в системе необходимо подписать договор с Порталом. До подписания договора создание клиентов и заявок недоступно.</p>
                  <div className="flex-shrink-0 mt-5"><a className="btn font-weight-bolder btn-light-primary mr-3 mb-2 w-100 w-sm-200px" href="filename.pdf" download target="_blank">Скачать договор</a><a className="btn font-weight-bolder btn-light-success mr-3 mb-2 w-100 w-sm-200px" href="#" data-toggle="modal" data-target="#addAgreement">Загрузить скан договора</a><a className="btn font-weight-bolder btn-primary mb-2 w-100 w-sm-200px" href="#" target="_blank">Подписать договор ЭЦП</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card card-custom gutter-b">
              <div className="card-header border-0 pt-6">
                <h3 className="card-title align-items-start flex-column"><span className="card-label font-weight-bolder font-size-h4 text-dark-75">Мои данные</span></h3>
              </div>
              <div className="separator separator-solid my-0"></div>
              <div className="card-body">
                <div className="d-flex">
                  <div className="d-flex flex-column">
                    {/* TODO: replace head_position with organization_name */}
                    <div className="d-flex flex-column mb-2"><span className="text-dark font-size-h5 font-weight-bold mb-0">{agent_organization.head_position}</span><span className="text-muted font-weight-bold">ИНН: {agent_organization.inn}</span></div>
                    <div className="d-flex flex-wrap my-2"><span className="text-muted font-weight-bold"><span className="svg-icon svg-icon-md svg-icon-gray-500 mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><polygon points="0 0 24 0 24 24 0 24"></polygon><path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z M10.875,15.75 C11.1145833,15.75 11.3541667,15.6541667 11.5458333,15.4625 L15.3791667,11.6291667 C15.7625,11.2458333 15.7625,10.6708333 15.3791667,10.2875 C14.9958333,9.90416667 14.4208333,9.90416667 14.0375,10.2875 L10.875,13.45 L9.62916667,12.2041667 C9.29375,11.8208333 8.67083333,11.8208333 8.2875,12.2041667 C7.90416667,12.5875 7.90416667,13.1625 8.2875,13.5458333 L10.2041667,15.4625 C10.3958333,15.6541667 10.6354167,15.75 10.875,15.75 Z" fill="#000000" fillRule="nonzero" opacity="0.3"></path><path d="M10.875,15.75 C10.6354167,15.75 10.3958333,15.6541667 10.2041667,15.4625 L8.2875,13.5458333 C7.90416667,13.1625 7.90416667,12.5875 8.2875,12.2041667 C8.67083333,11.8208333 9.29375,11.8208333 9.62916667,12.2041667 L10.875,13.45 L14.0375,10.2875 C14.4208333,9.90416667 14.9958333,9.90416667 15.3791667,10.2875 C15.7625,10.6708333 15.7625,11.2458333 15.3791667,11.6291667 L11.5458333,15.4625 C11.3541667,15.6541667 11.1145833,15.75 10.875,15.75 Z" fill="#000000"></path></g></svg></span><span className="label label-light-danger label-pill label-inline mr-2" data-toggle="tooltip" title="Договор с порталом" data-placement="top">Договор не подписан</span></span></div>
                    <div className="mt-4"><button className="btn btn-danger btn-sm font-weight-bolder w-100 w-sm-130px" type="button" data-toggle="modal" data-target="#changePass">Изменить пароль</button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card card-custom card-stretch gutter-b">
              <div className="card-header card-header-tabs-line">
                <ul className="nav nav-tabs nav-tabs-line">
                  <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#profile_tab_1">Представитель юр. лица</a></li>
                  <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#profile_tab_2">Данные юр. лица</a></li>
                  <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#profile_tab_3">Контактная информация</a></li>
                  <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#profile_tab_4">Банковские реквизиты</a></li>
                </ul>
              </div>
              <div className="tab-content" id="requestTabs">
                <div className="tab-pane fade show active" id="profile_tab_1" role="tabpanel" aria-labelledby="profile_tab_1">
                  <div className="card-body pt-6">
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-sm-right">ФИО руководителя</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.head_full_name}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-sm-right">Должность руководителя</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.head_position}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Паспорт</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9"><a className="btn btn-primary btn-sm btn-light-primary font-weight-bold" href={agent_organization.director_passport} download>Скачать</a></div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Протокол/решение о назначении</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9"><a className="btn btn-primary btn-sm btn-light-primary font-weight-bold" href={agent_organization.director_appointment_protocol} download>Скачать</a></div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Телефон</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9"><a className="text-primary font-weight-bold" href={`tel:${user.phone}`}>{user.phone.toString().replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")}</a></div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Почта</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9"><a className="text-primary font-weight-bold" href={`mailto:${user.email}`}>{user.email}</a></div>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between"><button className="btn btn-sm btn-danger font-weight-bold" type="button" data-toggle="modal" data-target="#editRepresent">Редактировать</button></div>
                </div>
                <div className="tab-pane fade" id="profile_tab_2" role="tabpanel" aria-labelledby="profile_tab_2">
                  <div className="card-body pt-6">
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Полное наименование компании</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        {/* TODO: replace head_position with organization_name */}
                        <div className="text-dark-75 font-weight-bold">{agent_organization.head_position}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">ФИО директора/генерального директора</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.head_full_name}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Система налогообложения</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        {taxations.map(el => {
                          if (el.id === agent_organization.taxation_system_id) {
                            return <div className="text-dark-75 font-weight-bold">{el.name}</div>;
                          }
                        })}
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">ОГРН</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.ogrn}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">ИНН</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.inn}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">КПП</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.kpp}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">ОКВЭД</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.okved}</div>
                        <div className="text-muted font-size-sm">Консультирование по вопросам коммерческой деятельности и управления</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Тип</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        {types.map(el => {
                          if (el.id === user.user_type_id) {
                            return <div key={el.id} className="text-dark-75 font-weight-bold">{el.name}</div>;
                          }
                        })}
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Дата регистрации</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{Intl.DateTimeFormat('ru-Ru', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(agent_organization.registration_date))}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Численность сотрудников компании</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.employees_number}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Уставный капитал</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.authorized_capital} ₽</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Устав</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9"><a className="btn btn-primary btn-sm btn-light-primary font-weight-bold" href={agent_organization.charter} download>Скачать</a></div>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between"><button className="btn btn-sm btn-danger font-weight-bold" type="button" data-toggle="modal" data-target="#editData">Редактировать</button></div>
                </div>
                <div className="tab-pane fade" id="profile_tab_3" role="tabpanel" aria-labelledby="profile_tab_3">
                  <div className="card-body pt-6">
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Телефон организации</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9"><a className="text-primary font-weight-bold" href={`tel:${(user.phone_addition || user.phone)}`}>{(user.phone_addition || user.phone).toString().replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")}</a></div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Почта организации</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9"><a className="text-primary font-weight-bold" href={`mailto:user.email`}>{agent_organization.email}</a></div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Юридический адрес</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.address_legal}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Фактический адрес</div>
                        <div className="text-success text-right font-size-sm">{agent_organization.address_actual_matches_legal === 1 ? 'совпадает с юридическим адресом' : 'не совпадает с юридическим адресом'}</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.address_actual}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Почтовый адрес</div>
                        <div className="text-success text-right font-size-sm">{agent_organization.address_post_matches_legal === 1 ? 'совпадает с юридическим адресом' : 'не совпадает с юридическим адресом'}</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.address_post}</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Сайт</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9"><a className="text-dark-75 font-weight-bold text-hover-primary" href="#" target="_blank">www.roga-kopyta.com</a></div>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between"><button className="btn btn-sm btn-danger font-weight-bold" type="button" data-toggle="modal" data-target="#editContacts">Редактировать</button></div>
                </div>
                <div className="tab-pane fade" id="profile_tab_4" role="tabpanel" aria-labelledby="profile_tab_4">
                  <div className="card-body pt-6">
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">БИК</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.bank_bik}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Наименование банка</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.bank_name}</div>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Корреспондентский счёт</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.bank_ks}</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-4 col-md-3">
                        <div className="text-muted text-right">Расчётный счёт</div>
                      </div>
                      <div className="col-12 col-sm-8 col-md-9">
                        <div className="text-dark-75 font-weight-bold">{agent_organization.bank_rs}</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between"><button className="btn btn-sm btn-danger font-weight-bold" type="button" data-toggle="modal" data-target="#editRequisites">Редактировать</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;