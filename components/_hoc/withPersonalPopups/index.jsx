import React from 'react';
import Router from 'next/router';
import closePersonalPopup from '../../../helpers/closePersonalPopup';
import { api_query } from '../../../api';

const defaultState = {
  newClient: {
    email: '',
    full_name: '',
    phone: '',
    inn: ''
  },
  newUser: {
    email: '',
    full_name: '',
    position: '',
    phone: '',
    phone_addition: '',
    password: '',
    credentials: [],
    user_credential: 0     
  },
  newSubagent: {
    inn: '',
    full_name: '',
    phone: '',
    email: '',
    password: ''

  },
  changePassword : {
    old_password: '',
    new_password: '',
    repeat_password: ''
  }
};

const withPersonalPopups = WrappedComponent => {
	return class extends React.PureComponent {
		state = Object.assign({}, defaultState)

    componentDidMount() {
      api_query.post('/user/credentials')
      .then(res => {
        const { success, credentials } = res.data;

        if (success) {
          this.setState(prevState => ({
            ...prevState,
            newUser: {
              ...prevState.newUser,
              credentials: credentials.filter(el => el.name !== 'Клиент')
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
        if (['', null, false, 0].includes(data[el])) isValid = false;
      });

      return ({data, isValid});
    }

    setNewClient = async (key, value) => {
      this.setState(prevState => ({
        ...prevState,
        newClient: {
          ...prevState.newClient,
          [key]: value
        }
      }));
    }

    setNewUser = async (key, value) => {
      this.setState(prevState => ({
        ...prevState,
        newUser: {
          ...prevState.newUser,
          [key]: value
        }
      }));
    }

    setNewSubagent = async (key, value) => {
      this.setState(prevState => ({
        ...prevState,
        newSubagent: {
          ...prevState.newSubagent,
          [key]: value
        }
      }));
    }

    setChangePassword = async (key, value) => {
      this.setState(prevState => ({
        changePassword: {
          ...prevState.changePassword,
          [key]: value
        }
      }));
    }

    addNewClient = e => {
      e.preventDefault();

      const token_api = JSON.parse(localStorage.getItem('user')).auth.token;
      const { data, isValid } = this.formData(this.state.newClient);
      data.token_api = token_api;

      if (isValid) {
        api_query.post('/user/register_client', data).then(res => {
          if (res.data.success) {
            this.setState(prevState => ({
              ...prevState,
              newClient: defaultState.newClient
            }));
            closePersonalPopup();
          }
        });
      }
    }

    addNewUser = e => {
      e.preventDefault();

      const token_api = JSON.parse(localStorage.getItem('user')).auth.token;
      const { data, isValid } = this.formData(this.state.newUser);
      data.token_api = token_api;

      if (isValid) {
        api_query.post('/user/register_subagent', data).then(res => {
          if (res.data.success) {
            this.setState(prevState => ({
              ...prevState,
              newUser: {
                ...defaultState.newUser,
                credentials: prevState.newUser.credentials
              }
            }));
            closePersonalPopup();
            Router.reload(window.location.pathname);
          }
        });
      }
    }

    addNewSubagent = e => {
      e.preventDefault();

      const token_api = JSON.parse(localStorage.getItem('user')).auth.token;
      const { data, isValid } = this.formData(this.state.newSubagent);
      data.token_api = token_api;

      if (isValid) {
        api_query.post('/user/register_organization_subagent', data).then(res => {
          if (res.data.success) {
            this.setState(prevState => ({
              ...prevState,
              newSubagent: {
                ...defaultState.newSubagent
              }
            }));
            closePersonalPopup();
            Router.reload(window.location.pathname);
          }
        });
      }
    }

    requestChangePassword = e => {
      e.preventDefault();

      const token_api = JSON.parse(localStorage.getItem('user')).auth.token;
      const { data, isValid } = this.formData(this.state.changePassword);
      data.token_api = token_api;

      if (isValid && data.newPassword === data.repeatPassword) {
        api_query.post('/user/iedit', data).then(res => {
          if (res.data.success) {
            this.setState({
              changePassword: {
                ...defaultState.changePassword
              }
            });
            closePersonalPopup();
          }
        });
      }
    }

		render() {
      const { state, setNewClient, setNewUser, setNewSubagent, setChangePassword, addNewClient, addNewUser, addNewSubagent, requestChangePassword } = this;

			return WrappedComponent ?
        <WrappedComponent
          setNewClient={setNewClient}
          setNewUser={setNewUser}
          setNewSubagent={setNewSubagent}
          setChangePassword={setChangePassword}
          addNewClient={addNewClient}
          addNewUser={addNewUser}
          addNewSubagent={addNewSubagent}
          requestChangePassword={requestChangePassword}
          state={state}
          {...this.props} /> : null;
		}
	}
}

export default withPersonalPopups;