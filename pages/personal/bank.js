import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dataIsReady from '../../helpers/dataIsReady';
import countDays from '../../helpers/countDays';

import AppWrapper from '../../components/AppWrapper';

const BankPage = () => {
  const bankData = useSelector(state => state.bank.data);
  const [data, setData] = useState(bankData || {});

  useEffect(() => {
    setData(bankData || {});
  }, [bankData]);
  console.log('data: ', data)

  return (
    <AppWrapper title="Взаимодействие с банком" personal>
      {dataIsReady(data) &&
        <div className="d-flex flex-column-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-custom gutter-b">
                  <div className="card-body">
                    <div className="d-flex flex-wrap justify-content-between align-items-end">
                      <div className="d-block"><img className="w-auto h-40px" alt="bank" src={`http://vbg.staffboost.ru${data.bank.logo}`} />
                        <div className="text-dark-75 mt-4 font-weight-bolder font-size-lg">{data.bank.name}</div>
                      </div>
                      <div className="d-block text-md-right mt-4">
                        <div className="text-dark-50 font-weight-bold">Срок действия предложения:</div>
                        <div className="text-dark-75 mb-1 font-weight-bolder font-size-lg">до {Intl.DateTimeFormat('ru-Ru', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(data.expiration_date))}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-custom gutter-b">
                  <div className="card-body">
                    <div className="d-flex flex-wrap">
                      <div className="d-flex flex-column mr-8 px-4 py-2">
                        <div className="text-dark-50 font-weight-bold">Продукт</div>
                        <div className="text-dark-75 mb-1 font-weight-bolder font-size-lg">{data.bank_bid_product.name}</div>
                      </div>
                      <div className="d-flex flex-column mr-8 px-4 py-2">
                        <div className="text-dark-50 font-weight-bold">Сумма гарантии</div>
                        <div className="text-dark-75 mb-1 font-weight-bolder font-size-lg">{data.bid.bg_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽</div>
                      </div>
                      <div className="d-flex flex-column mr-8 px-4 py-2">
                        <div className="text-dark-50 font-weight-bold">Дата выдачи</div>
                        <div className="text-dark-75 mb-1 font-weight-bolder font-size-lg">{Intl.DateTimeFormat('ru-Ru').format(new Date(data.issue_date))}</div>
                      </div>
                      <div className="d-flex flex-column mr-8 px-4 py-2">
                        <div className="text-dark-50 font-weight-bold">Дата окончания</div>
                        <div className="text-dark-75 mb-1 font-weight-bolder font-size-lg">{Intl.DateTimeFormat('ru-Ru').format(new Date(data.expiration_date))}</div>
                      </div>
                      <div className="d-flex flex-column mr-8 px-4 py-2">
                        <div className="text-dark-50 font-weight-bold">Срок</div>
                        <div className="text-dark-75 mb-1 font-weight-bolder font-size-lg">{countDays(data.issue_date, data.expiration_date)} дня</div>
                      </div>
                      <div className="d-flex flex-column mr-8 px-4 py-2 bg-danger-o-25 rounded">
                        <div className="text-dark-50 font-weight-bold">Комиссия за выдачу</div>
                        <div className="text-dark-75 mb-1 font-weight-bolder font-size-lg">{data.issuance_fee ? data.issuance_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : 0} ₽</div>
                      </div>
                      <div className="d-flex flex-column mr-8 px-4 py-2">
                        <div className="text-dark-50 font-weight-bold">Коммиссия в % годовых</div>
                        <div className="text-dark-75 mb-1 font-weight-bolder font-size-lg">{data.commission_percent || 0} %</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="card card-custom gutter-b">
                  <div className="card-header align-items-center">
                    <div className="card-title">
                      <h3 className="card-label font-weight-bolder font-size-h4 text-dark-75">Документы от банка</h3>
                    </div>
                  </div>
                  <div className="card-body">
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
                          <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                          <td className="align-middle"><a className="btn btn-primary btn-sm btn-light-primary font-weight-bold" href="filename.pdf" download>Скачать</a></td>
                        </tr>
                        <tr>
                          <td className="align-middle">Индивидуальные условия предоставления БГ</td>
                          <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                          <td className="align-middle"><a className="btn btn-primary btn-sm btn-light-primary font-weight-bold" href="filename.pdf" download>Скачать</a></td>
                        </tr>
                        <tr>
                          <td className="align-middle">Счёт на оплату</td>
                          <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                          <td className="align-middle"><a className="btn btn-primary btn-sm btn-light-primary font-weight-bold" href="filename.pdf" download>Скачать</a></td>
                        </tr>
                        <tr>
                          <td className="align-middle">Проект банковской гарантии</td>
                          <td className="align-middle"><span className="svg-icon svg-icon-success" data-toggle="tooltip" title="Всплывающая подсказка" data-placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle><rect fill="#000000" x="11" y="10" width="2" height="7" rx="1"></rect><rect fill="#000000" x="11" y="7" width="2" height="2" rx="1"></rect></g></svg></span></td>
                          <td className="align-middle"><a className="btn btn-primary btn-sm btn-light-primary font-weight-bold" href="filename.pdf" download>Скачать</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card card-custom gutter-b">
                  <div className="card-header ribbon ribbon-top">
                    <div className="ribbon-target bg-danger" style={{top: '-2px', right: '20px'}}>Внимание!</div>
                    <h3 className="card-title">Проект Гарантии</h3>
                  </div>
                  <div className="card-body">
                    <p className="text-dark-50">Если у вас есть пожелания от заказчика относительно проекта банковской гарантии, воспользуйтесь специальной формой для согласования</p><a className="btn font-weight-bolder text-uppercase btn-warning py-4 px-6" href="#">Согласование макета и чат с банком</a>
                    <div className="h4 text-dark mt-8">Итоговая комиссия:</div>
                    <p className="text-dark-50">Если у вас есть конкурентный счёт, загрузите его в бизнес-чат ВБГ</p><a className="btn btn-light-success mr-1 mb-1" href="#"><i className="flaticon2-chat-1"></i> Чат с банком</a><a className="btn btn-light-info" href="#"><i className="flaticon2-chat-1"></i> Чат с порталом</a>
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

export default BankPage;