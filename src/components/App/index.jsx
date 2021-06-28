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
    if (counter === 0) {
      const script = document.querySelector('head script[src*="scripts.bundle.js"]');
      const scriptSrc = document.querySelector('head script[src*="scripts.bundle.js"]').getAttribute('src');
      
      if (document.querySelector('head link[href*="chunk.css"]')) {
        document.querySelector('head link[href*="chunk.css"]').remove();
      }
      
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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('userLoggedIn'))) {
      setLoggedIn(false);
      setLoading(false);
    } else {
      const token_api = JSON.parse(localStorage.getItem('user')).auth ? JSON.parse(localStorage.getItem('user')).auth.token : '';
  
      if (token_api) {
        setLoggedIn(true);
        setLoading(false);
        // api_query.post('/user/info', {token_api})
        // .then(res => {
        //   setLoggedIn(res.data.success || false);
        //   setLoading(false);
        // })
        // .catch(() => {
        //   setLoggedIn(false);
        //   setLoading(false);
        // });
      } else {
        setLoggedIn(false);
        setLoading(false);
      }
    }
  }, []);

  return (
    <GlobalContext.Provider value={{user, setUser}}>
      <Router>
        <AppRouterWrapper>
          <Switch>
            {routes.map(route => {
              const Page = () => route.personal ? <PersonalAppShell>{route.page()}</PersonalAppShell> : <AppShell>{route.page()}</AppShell>;

              return <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={() => loading ? null : route.personal && !loggedIn ? <Redirect to={{pathname: '/'}} /> : <Page />} />;
            })}
          </Switch>
        </AppRouterWrapper>
      </Router>
    </GlobalContext.Provider>
  );
};

export default App;