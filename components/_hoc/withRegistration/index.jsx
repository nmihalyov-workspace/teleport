import React from 'react';
import { api_query } from '../../../api';
import 'react-datepicker/dist/react-datepicker.css'

const withRegistration = WrappedComponent => {
	return class extends React.PureComponent {
		state = {
			entity: {
        user_type_id: 1,
        email: '',
        inn: '',
        kpp: '',
        ogrn: '',
        organization_name: '',
        head_full_name: '',
        head_position: '',
        head_basis_authorities: null,
        basis_authority_id: '',
        taxation_systems: null,
        taxation_system_id: '',
        okved: '',
        registration_date: '',
        authorized_capital: '',
        employees_number: '',
        address_legal: '',
        address_post: '',
        address_post_matches_legal: true,
        address_actual: '',
        address_actual_matches_legal: true,
        charter: [],
        director_appointment_protocol: [],
        director_passport: [],
        bank_bik: '',
        bank_rs: '',
        bank_ks: '',
        bank_name: '',
        phone: '',
        policy_agreement: true
      },
      entrepreneur: {
        user_type_id: 2,
        email: '',
        inn: '',
        ogrnip: '',
        named: '',
        okved: '',
        registration_date: '',
        taxation_systems: null,
        taxation_system_id: '',
        address_legal: '',
        address_post: '',
        address_post_matches_legal: true,
        address_actual: '',
        address_actual_matches_legal: true,
        passport: [],
        bank_bik: '',
        bank_rs: '',
        bank_ks: '',
        bank_name: '',
        phone: '',
        policy_agreement: true
      },
      selfemployed: {
        user_type_id: 3,
        email: '',
        name: '',
        surname: '',
        patronymic: '',
        passport_series: '',
        passport_issue_date: '',
        birthdate: '',
        passport_issued_by: '',
        registration_address: '',
        inn: '',
        snils: '',
        passport_main_spread: [],
        passport_current_registration: [],
        snils_image: '',
        bank_bik: '',
        bank_rs: '',
        bank_ks: '',
        bank_name: '',
        phone: '',
        policy_agreement: true
      }
		}

    componentDidMount() {
      api_query.post('/agent_organization/head_basis_authorities')
      .then(res => {
        const { success, head_basis_authorities } = res.data;

        if (success) {
          this.setState(prevState => ({
            ...prevState,
            entity: {
              ...prevState.entity,
              head_basis_authorities: head_basis_authorities
            }
          }));
        }
      });

      api_query.post('/agent_organization/taxation_systems')
      .then(res => {
        const { success, taxation_systems } = res.data;

        if (success) {
          this.setState(prevState => ({
            ...prevState,
            entity: {
              ...prevState.entity,
              taxation_systems: taxation_systems
            },
            entrepreneur: {
              ...prevState.entrepreneur,
              taxation_systems: taxation_systems
            }
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
        if (['registration_date', 'passport_issue_date', 'birthdate'].includes(el)) {
          const date = new Date(data[el]);
          const year = date.getFullYear();
          const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
          const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          data[el] = `${year}-${month}-${day}`;
        }
        if (['', null, false, 0].includes(data[el])) isValid = false;
        if (el === 'phone' && data[el] < 1000000000) isValid = false;
      });

      return ({data, isValid});
    }

    sendRequest = ({data, isValid}) => {
      if (isValid) {
        const formData = new FormData();
        Object.keys(data).map(el => {
          if (Array.isArray(data[el])) {
            data[el].map(e => {
              formData.append(el + '[]', e);
            });
          } else {
            formData.append(el, data[el]);
          }
        });

        api_query.post('/user/register', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
          if (res.data.success) {
            const redirectOnClick = () => {
              window.location.replace('/');
              window.$('.popup__close, .hystmodal__shadow, .popup__footer .button').off('click', redirectOnClick);
            };
            window.hystModal.open('#signup-success');
            window.$('.popup__close, .hystmodal__shadow, .popup__footer .button').on('click', redirectOnClick);
          } else {
            window.hystModal.open('#signup-failure');
          }
        });
      } else {
        window.hystModal.open('#signup-invalid');
      }
    }

    setEntity = async (key, value, isNumber) => {
      if (['charter', 'director_appointment_protocol', 'director_passport'].includes(key)) {
        value = [value];
      }

      if (isNumber) {
        value = value.replace(/[^0-9]/gi, '');
      }

      this.setState(prevState => ({
        ...prevState,
        entity: {
          ...prevState.entity,
          [key]: value
        }
      }));
    }

    setEntrepreneur = async (key, value, isNumber) => {
      if (key === 'passport') {
        value = [value];
      }

      if (isNumber) {
        value = value.replace(/[^0-9]/gi, '');
      }

      this.setState(prevState => ({
        ...prevState,
        entrepreneur: {
          ...prevState.entrepreneur,
          [key]: value
        }
      }));
    }

    setSelfemployed = async (key, value, isNumber) => {
      if (['passport_main_spread', 'passport_current_registration', 'snils_image'].includes(key)) {
        value = [value];
      }

      if (isNumber) {
        value = value.replace(/[^0-9]/gi, '');
      }

      this.setState(prevState => ({
        ...prevState,
        selfemployed: {
          ...prevState.selfemployed,
          [key]: value
        }
      }));
    }

    signupEntity = e => {
      e.preventDefault();

      const entityData = this.state.entity;
      entityData.phone = parseInt(document.querySelector('.input_phone-entity').value.replaceAll(' ', ''));

      this.sendRequest(this.formData(entityData));
    }

    signupEntrepreneur = e => {
      e.preventDefault();

      const entrepreneurData = this.state.entrepreneur;
      entrepreneurData.phone = parseInt(document.querySelector('.input_phone-entrepreneur').value.replaceAll(' ', ''));

      this.sendRequest(this.formData(entrepreneurData));
    }

    signupSelfemployed = e => {
      e.preventDefault();

      const selfemployedData = this.state.selfemployed;
      selfemployedData.phone = parseInt(document.querySelector('.input_phone-selfemployed').value.replaceAll(' ', ''));

      this.sendRequest(this.formData(selfemployedData));
    }

		render() {
      const { state, setEntity, setEntrepreneur, setSelfemployed, signupEntity, signupEntrepreneur, signupSelfemployed } = this;

			return WrappedComponent ?
        <WrappedComponent
          setEntity={setEntity}
          setEntrepreneur={setEntrepreneur}
          setSelfemployed={setSelfemployed}
          state={state}
          signupEntity={signupEntity}
          signupEntrepreneur={signupEntrepreneur}
          signupSelfemployed={signupSelfemployed}
          {...this.props} /> : null;
		}
	};
}

export default withRegistration;