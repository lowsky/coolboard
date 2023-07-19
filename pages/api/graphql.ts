// load this first for instrumenting all other modules
const instana = require('@instana/aws-lambda');

const graphqlHandler = require('../../server/graphql');

export default instana.wrap(graphqlHandler);
