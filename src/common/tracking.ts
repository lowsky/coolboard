import { isInBrowserEnv } from './isInBrowserEnv';

export const trackPage = (nameOrRoute) => {
  // Function gets injected by instana eum library into page
  if (isInBrowserEnv()) {
    if (window['ineum']) window['ineum']('page', nameOrRoute);
  }
};
