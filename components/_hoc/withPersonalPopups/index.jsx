import React from 'react';
import closePersonalPopup from '../../../helpers/closePersonalPopup';
import { api_query } from '../../../api';

const defaultState = {
  newClient: {
    email: '',
    full_name: '',
    phone: '',
    client_organization_types: [],
    user_client_organization_type_id: 0,
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
              credentials
            }
          }));
        }
      });

      api_query.post('/user/client_organization_types')
      .then(res => {
        const { success, client_organization_types } = res.data;
  
        if (success) {
          this.setState(prevState => ({
            ...prevState,
            newClient: {
              ...prevState.newClient,
              client_organization_types
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

    addNewClient = e => {
      e.preventDefault();

      const token_api = JSON.parse(localStorage.getItem('user')).auth.token;
      const { data, isValid } = this.formData(this.state.newClient);

      if (isValid) {
        api_query.post('/user/register_client', data).then(res => {
          if (res.data.success) {
            this.setState(prevState => ({
              ...prevState,
              newClient: {
                ...defaultState.newClient,
                client_organization_types: prevState.newClient.client_organization_types
              }
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
          }
        });
      }
    }

		render() {
      const { state, setNewClient, setNewUser, addNewClient, addNewUser } = this;

			return WrappedComponent ?
        <WrappedComponent
          setNewClient={setNewClient}
          setNewUser={setNewUser}
          addNewClient={addNewClient}
          addNewUser={addNewUser}
          state={state}
          {...this.props} /> : null;
		}
	}
}

export default withPersonalPopups;