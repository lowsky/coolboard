import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import { Loader } from 'semantic-ui-react';

import Home from './pages/home/Home';

// import { unregister } from './registerServiceWorker';

// Instead of integrating the
// css here, with running webpack bundling every time while developing,
// I put this into the index page:
// <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
//
import 'semantic-ui-css/semantic.min.css';

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
          render={() => <Home />}
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
// unregister();
