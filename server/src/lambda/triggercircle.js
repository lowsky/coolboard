const fetch = require('cross-fetch');

require('dotenv').config();

exports.handler = async event => {
  console.log(
    'deploy-success type of body',
    typeof event.body
  );
  const { CIRCLE_API_USER_TOKEN } = process.env;
  console.log(
    'deploy-success type of fetch=',
    typeof fetch
  );
  console.log('deploy-success fetch=', fetch);
  console.log('deploy-success body=', event.body);
  console.log(
    'deploy-success body, json = ',
    JSON.stringify(event.body)
  );

  const {
    branch = 'test-triggering-ci',
    review_id = '0',
    commit_ref = '43bd262',
  } = event.body;

  const url = `https://${CIRCLE_API_USER_TOKEN}@circleci.com/api/v1.1/project/github/lowsky/Hands-on-Application-Building-with-GraphQL-and-React/tree/${branch}`; // ?build_parameters%5BCIRCLE_JOB%5D=smoke&build_parameters%5BCIRCLE_PR_NUMBER%5D=${review_id}&build_parameters%5BDEPLOYED_SHA1%5D=${commit_ref}`;
  //const url = `http://localhost:9000/.netlify/functions/deploy-succeeded`;
  // const url = `http://localhost:9000/.netlify/functions/deploy-succeeded?build_parameters%5BCIRCLE_JOB%5D=smoke&build_parameters%5BCIRCLE_PR_NUMBER%5D=${review_id}&build_parameters%5BDEPLOYED_SHA1%5D=${commit_ref}`;

  const build_parameters = {
    CIRCLE_JOB: 'smoke',
    CIRCLE_PR_NUMBER: review_id,
    DEPLOYED_SHA1: commit_ref,
  };

  console.log(
    'triggering build on via',
    url,
    build_parameters
  );

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        build_parameters,
      }),
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return {
        statusCode: response.status,
        body: response.statusText,
      };
    }

    console.log(response);

    return {
      statusCode: 200,
      body: `Smoketest on circle-ci triggerd for branch ${branch} PR ${review_id} commit ${commit_ref}`,
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
