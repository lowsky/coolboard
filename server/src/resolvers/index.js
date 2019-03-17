const { Query } = require('./Query');
const { Subscription } = require('./Subscription');
const { auth } = require('./Mutation/auth');
const { auth0 } = require('./Mutation/auth0');
const { board } = require('./Mutation/board');
const { list } = require('./Mutation/list');
const { card } = require('./Mutation/card');
const { AuthPayload } = require('./AuthPayload');

module.exports = {
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
