import React, { useState, useEffect } from 'react';
import Script from 'next/script'
import Router from 'next/router';
import AppShell from '../AppShell';
import PersonalAppShell from '../PersonalAppShell';
import GlobalContext from '../../context/global';
import { api_query } from '../../api';

// import '../../public/assets/plugins/global/plugins.bundle.js';
// import '../../public/assets/js/scripts.bundle.js';

const AppWrapper = props => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('userLoggedIn'))) {
      Router.push('/')
    } else {
      const token_api = JSON.parse(localStorage.getItem('user')).auth ? JSON.parse(localStorage.getItem('user')).auth.token : '';
  
      if (token_api) {
        api_query.post('/user/info', {token_api})
        .then(res => {
          !res.data.success && Router.push('/');
        })
        .catch(() => {
          Router.push('/');
        });
      } else {
        Router.push('/');
      }
    }
  }, []);

  return (<>
    <Script src="/assets/plugins/global/plugins.bundle.js" />
    <Script src="/assets/js/scripts.bundle.js" />
    <GlobalContext.Provider value={{user, setUser}}>
      {props.personal ?
        <PersonalAppShell title={props.title}>
          {props.children}
        </PersonalAppShell> :
        <AppShell title={props.title}>
          {props.children}
        </AppShell>
      }
    </GlobalContext.Provider>
  </>);
};

export default AppWrapper;