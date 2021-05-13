import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalContext from './context/global';

import AppShell from '../AppShell'
import routes from '../../routes.js';

class App extends React.PureComponent {
	render() {
		return (
      <GlobalContext.Provider value={{}}>
        <Router>
          <AppShell>
            <Switch>
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={true}
                  component={route.page}/>
              ))}
            </Switch>
          </AppShell>
        </Router>
      </GlobalContext.Provider>
		);
	}
}

export default App;