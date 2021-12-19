import { isInBrowserEnv } from './isInBrowserEnv';

export const trackPage = (nameOrRoute) => {
  // function gets injected by instana eum library into page
  if (isInBrowserEnv()) {
    if (window['ineum']) window['ineum']('page', nameOrRoute);
  }
};
