export const trackPage = nameOrRoute => {
  // function gets injected by instana eum library into page
  window.ineum?.('page', nameOrRoute);
}
