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

// import { unregister } from './registerServiceWorker';

// Instead of integrating the
// css here, with running webpack bundling every time while developing,
// I put something like this into the index page:
// <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.18/semantic.min.css"></link>
// instead of this line here:
// import 'semantic-ui-css/semantic.min.css';

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
// unregister();
