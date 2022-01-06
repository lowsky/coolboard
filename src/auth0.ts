import { ConfigParameters, initAuth0 } from '@auth0/nextjs-auth0';
import auth0config from './auth0config.json';
import { SignInWithAuth0 } from '@auth0/nextjs-auth0/dist/instance';

type META_INFO = {
  context: string;
  DEPLOY_PRIME_URL: string;
  URL: string;
};

const {
  // e.g. branch-deploy
  context,
  // e.g. DEPLOY_PRIME_URL=https://migrate-to-nextjs-auth0--coolboard.netlify.app
  // e.g. DEPLOY_URL=https://61d389db82d39a00078dbf33--coolboard.netlify.app
  DEPLOY_PRIME_URL,
  // e.g. https://coolboard.fun
  URL,
  // later: DEPLOY_URL
} = auth0config as META_INFO;

const baseURL = context === 'production' ? URL : DEPLOY_PRIME_URL;

const params: ConfigParameters = {
  authorizationParams: {
    ///response_type: 'id_token' | 'code id_token' | 'code';
    // response_type: 'code',
    ///response_mode: 'query' | 'form_post';
    response_mode: 'form_post',
  },
  enableTelemetry: false,
};
console.log('DEBUG: ', auth0config);

export function initializeInstance(): SignInWithAuth0 {
  console.log('initializeInstance', params);
  if (!baseURL || baseURL === '') return initAuth0(params);
  return initAuth0({ ...params, baseURL });
}

const auth0 = initializeInstance();

export default auth0;
