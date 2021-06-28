import React from 'react';
import { withRouter } from 'react-router-dom';
import { api_query } from '../../../api';

const withPersonalPopups = WrappedComponent => {
	return withRouter(class extends React.PureComponent {
		state = {
			newClient: {
        email: '',
        full_name: '',
        phone: '',
        inn: ''
      }
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

    addNewClient = e => {
      e.preventDefault();

      const token_api = JSON.parse(localStorage.getItem('user')).auth.token;
      const { data, isValid } = this.formData(this.state.newClient);
      data.token_api = token_api;

      if (isValid) {
        api_query.post('/user/register_client', data).then(res => {
          if (res.data.success) {
            
          }
          console.log(res.data)
        });
      }
    }

		render() {
      const { state, setNewClient, addNewClient } = this;

			return WrappedComponent ?
        <WrappedComponent
          setNewClient={setNewClient}
          addNewClient={addNewClient}
          state={state}
          {...this.props} /> : null;
		}
	})
}

export default withPersonalPopups;