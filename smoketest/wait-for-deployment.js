// eslint-disable-next-line no-unused-vars,no-undef
var rp = require('request-promise');

const url =
  (process.env.CYPRESS_baseUrl ||
    'http://localhost:3000') + '/meta.json';

const EXPECTED_GIT_SHA1 = process.env.GIT_SHA1 || '';

// fast-fail
if (!EXPECTED_GIT_SHA1) {
  console.error(
    'git commit check failed: missing ENV variable: GIT_SHA1 !'
  );
  process.exit(1);
}

console.log(
  'Checking if deployed site is based on this GIT_SHA1:',
  EXPECTED_GIT_SHA1
);

let intTimeMs = 60000; // interval duration
let ntimes = 6; // number retries

var options = {
  uri: url,
  headers: { 'User-Agent': 'Request-Promise' },
  json: true, // Automatically parses the JSON string in the response
};

let validGitCommitReceived;

function checkSiteVersion() {
  return rp(options)
    .then(response => {
      validGitCommitReceived =
        EXPECTED_GIT_SHA1 === response.GIT_SHA1;

      if (validGitCommitReceived) {
        console.log(
          `Deployed site is based on the expected commit: ${response.GIT_SHA1} ✓`
        );
        clearInterval(interval);
        process.exit(0);
      }
      console.warn(
        `Deployed site is based on this commit: ${response.GIT_SHA1} - expected was ${EXPECTED_GIT_SHA1}`
      );
    })
    .catch(err => {
      console.warn(
        `Error fetching from ${url} details:`,
        err.error
      );
    });
}

const retryCheck = () => {
  checkSiteVersion();

  ntimes--;

  if (!ntimes || validGitCommitReceived) {
    clearInterval(interval);
    if (validGitCommitReceived) {
      process.exit(0);
    }
    console.error('Timeout. Error.');
    process.exit(-1);
  }
  console.log(
    ' Will retry check another %d times',
    ntimes
  );
};

checkSiteVersion();

const interval = setInterval(retryCheck, intTimeMs);
