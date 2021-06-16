import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import Home from './pages/home/Home';
import { trackPage } from './common/tracking';

const App = lazy(() =>
  import('./App').then(module => ({
    default: module.App,
  }))
);

const Root = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            trackPage('Home');
            return <Home />;
          }}
        />
        <Route component={App} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
