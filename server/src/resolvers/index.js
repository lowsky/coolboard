import Query from './Query';
import Subscription from './Subscription';
import board from './Mutation/board';
import list from './Mutation/list';
import card from './Mutation/card';
import AuthPayload from './AuthPayload';

export default {
  Query,
  Mutation: {
    ...board,
    ...list,
    ...card,
  },
  Subscription,
  // AuthPayload,
};
