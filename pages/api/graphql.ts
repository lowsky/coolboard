// load this first for instrumenting all other modules
// DISABLED temporary const instana = require('@instana/aws-lambda');

const graphqlHandler = require('../../server/graphql');

// DISABLED temporary export default instana.wrap(graphqlHandler);

export default graphqlHandler;
