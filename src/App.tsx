let auth;

export const getAuthInstance = async () => {
  if (auth) {
    return auth;
  }

  if (typeof window !== 'undefined') {
    auth = new Promise((resolve) => {
      import('./authentication/auth').then((module) => {
        const Auth = module.default;
        resolve(new Auth());
      });
    });
  } else {
    // on serverside, nothing needs to be done
    auth = {
      login: () => {
        console.log('serverside noop: login');
      },
      refresh: () => {
        console.log('serverside noop: refresh');
      },
    };
  }
  return auth;
};

export const authRefresh = async () => {
  return (await getAuthInstance()).refresh();
};

export const logout = async () => {
  return (await getAuthInstance()).logout();
};

export const login = async () => {
  return (await getAuthInstance()).login();
};

export const initiateAuthOnCallback = async () => {
  return getAuthInstance();
};
