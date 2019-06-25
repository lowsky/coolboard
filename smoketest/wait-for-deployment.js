// eslint-disable-next-line no-unused-vars,no-undef
var rp = require('request-promise');

const url = (process.env.CYPRESS_baseUrl || 'http://localhost:3000') + '/meta.json';

const EXPECTED_GIT_SHA1 = process.env.GIT_SHA1 || '';

// fast-fail
if (!EXPECTED_GIT_SHA1) {
  console.error(
    'git commit check failed, missing ENV variable: GIT_SHA1 !'
  );
  process.exit(1);
}

console.error(
  'Checking if deployed site is based on this GIT_SHA1:',
  EXPECTED_GIT_SHA1
);

let intTimeMs = 10000; // interval duration
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
      }
      console.warn(
        `Deployed site is based on this commit: ${response.GIT_SHA1} - expected is ${EXPECTED_GIT_SHA1}`
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
  console.log(
    ' Check triggered! still %d times',
    ntimes
  );

  checkSiteVersion();

  ntimes--;

  if (!ntimes || validGitCommitReceived) {
    console.log('cleared!');
    clearInterval(interval);
    if (validGitCommitReceived) {
      process.exit(0);
    } else process.exit(-1);
  }
};

const interval = setInterval(retryCheck, intTimeMs);
