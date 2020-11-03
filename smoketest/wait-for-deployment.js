const got = require('got');

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

let intTimeMs = 5000; // retry period
let noRetries = 3; // number retries

let interval;
let validGitCommitReceived;

function checkSiteVersion() {
  got(url)
    .then((responseAll) => {
      const response = JSON.parse(responseAll.body);

      validGitCommitReceived =
        EXPECTED_GIT_SHA1 === response.GIT_SHA1;

      if (validGitCommitReceived) {
        console.log(
          `✓ Deployed site is based on the expected commit. ✓`
        );
        if (interval) clearInterval(interval);
        process.exit(0);
      }
      console.warn(
        `⚠️ Deployed site is based on this commit: ${response.GIT_SHA1} - expected: ${EXPECTED_GIT_SHA1}`
      );
    })
    .catch((err) => {
      console.info(
        `Error fetching from ${url} details:`,
        err
      );
    });
}

const retryCheck = () => {
  checkSiteVersion();

  noRetries--;

  if (noRetries < 0 || validGitCommitReceived) {
    clearInterval(interval);
    if (validGitCommitReceived) {
      process.exit(0);
    }
    console.error('Timeout. Error.');
    process.exit(-1);
  }
  console.log(
    ' Will retry check another %d times',
    noRetries
  );
};

checkSiteVersion();

interval = setInterval(retryCheck, intTimeMs);
