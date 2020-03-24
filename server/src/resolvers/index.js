import Query from './Query';
import Subscription from './Subscription';
import auth from './Mutation/auth';
import auth0 from './Mutation/auth0.js';
import board from './Mutation/board';
import list from './Mutation/list';
import card from './Mutation/card';
import AuthPayload from './AuthPayload';

export default {
  Query,
  Mutation: {
    ...auth,
    ...auth0,
    ...board,
    ...list,
    ...card,
  },
  Subscription,
  AuthPayload,
};
