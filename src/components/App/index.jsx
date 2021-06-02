import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation, Redirect } from 'react-router-dom';
import GlobalContext from '../../context/global';
import { api_query } from '../../api';

import AppShell from '../AppShell'
import PersonalAppShell from '../PersonalAppShell'
import routes from '../../routes.js';

const AppRouterWrapper = ({ children }) => {
  const [counter, addCounter] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (counter > 0) {
      const script = document.querySelector('head script[src*="scripts.bundle.js"]');
      const scriptSrc = document.querySelector('head script[src*="scripts.bundle.js"]').getAttribute('src');
  
      if (script) {
        script.remove();
        setTimeout(() => {
          let script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = scriptSrc;
          document.querySelector('head').insertAdjacentElement('beforeend', script);
        }, 0)
      }
    }

    addCounter(() => counter + 1);
  }, [location]);

  return <>{children}</>;
};

const App = () => {
  const userLoggedIn = () => {
    if (!JSON.parse(localStorage.getItem('userLoggedIn'))) {
      return false;
    } else {
      const token_api = JSON.parse(localStorage.getItem('user')).auth.token;

      return api_query.post('/user/info', {token_api})
      .then(res => res.data.success)
      .catch(() => false);
    }
  }

  return (
    <GlobalContext.Provider value={{}}>
      <Router>
        <AppRouterWrapper>
          <Switch>
            {routes.map(route => {
              const Page = () => route.personal ? <PersonalAppShell>{route.page()}</PersonalAppShell> : <AppShell>{route.page()}</AppShell>;

              return <Route key={route.path} path={route.path} exact={route.exact} component={() => route.personal && !userLoggedIn() ? <Redirect to={{pathname: '/'}} /> : <Page />} />;
            })}
          </Switch>
        </AppRouterWrapper>
      </Router>
    </GlobalContext.Provider>
  );
};

export default App;