export const trackPage = nameOrRoute => {
  // function gets injected by instana eum library into page
  if (window.ineum) window.ineum('page', nameOrRoute);
};
