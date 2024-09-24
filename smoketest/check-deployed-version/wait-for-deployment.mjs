/* eslint-disable no-undef */
import got from 'got';

const baseUrl = process.env.CYPRESS_baseUrl || 'https://coolboard.fun';
const url = `${baseUrl}/meta.json`;

const EXPECTED_GIT_SHA1 = process.env.GIT_SHA1;

if (!EXPECTED_GIT_SHA1) {
  console.error(
    `git commit check failed: Please add environment variable: GIT_SHA1`
  );
  process.exit(1);
}

console.log('Checking if deployed site on this url: ', url);

console.log('...is based on this GIT_SHA1: ', EXPECTED_GIT_SHA1);

let intTimeMs = 1000; // retry period
let noRetries = 1; // number retries

async function checkSiteVersion() {
  try {
    const responseAll = await got(url);
    const response = JSON.parse(responseAll.body);

    const validGitCommitReceived = EXPECTED_GIT_SHA1 === response.GIT_SHA1;

    if (validGitCommitReceived) {
      console.log(`✓ Deployed site is based on the expected commit. ✓`);
      return true;
    }
    console.warn(
      `⚠️ Deployed site is based on this commit: ${response.GIT_SHA1} - expected: ${EXPECTED_GIT_SHA1}`
    );
  } catch (err) {
    console.info(`Error fetching from ${url} details:`, err.message, err);
  }
  return false;
}

const runCheck = async (noRetries) => {
  const validGitCommitReceived = await checkSiteVersion();
  if (validGitCommitReceived) {
    return true;
  }

  if (noRetries === 0) {
    return false;
  }

  console.log(
    `Will retry check another ${noRetries} times after waiting ${intTimeMs} ms`
  );

  await delay(intTimeMs);
  return await runCheck(noRetries - 1);
};

async function delay(timeMs) {
  return await new Promise((resolve) => setTimeout(resolve, timeMs));
}

if (await runCheck(noRetries)) {
  process.exit(0);
} else {
  console.error('Timeout. Error.');
  process.exit(-1);
}
