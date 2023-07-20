#
# This triggers the e2e smoke tests running on circleci
# that needs these pipeline parameters:
# - SUT base url
# - current commit aka version of given branch

env | sort -u |grep -vi SECRET|grep -vi TOKEN |grep -vi key

echo VERCEL_GITHUB_COMMIT_SHA: commit: $VERCEL_GITHUB_COMMIT_SHA
echo VERCEL_GITHUB_COMMIT_REF: branch: $VERCEL_GITHUB_COMMIT_REF
echo VERCEL_URL:  $VERCEL_URL

# TOKEN: "trigger-from-netlify-hook"
# old: CIRCLE_API_USER_TOKEN=1851154c07ebcb2a01c99a5851a79fe9e8ca893c

#COMMIT
#VERCEL_GITHUB_COMMIT_SHA=b0d003070bbbd81bf1e8b15f3cd76cd389b13d72

#BRANCH=activate-vercel-serverless
BRANCH=$VERCEL_GITHUB_COMMIT_REF

#SUT_URL=https://coolboard-790uxmthz.vercel.app/
TEST_URL=https://$VERCEL_URL

if [ "${BRANCH}" == "main" ]; then
  echo testing main branch deployment: www.coolboard.fun
  TEST_URL="https://www.coolboard.fun"
fi

echo
echo testing "$TEST_URL"
echo

CIRCLE="https://circleci.com/api/v2/project"
URL="$CIRCLE/gh/lowsky/coolboard/pipeline"

echo
echo triggering circleci build via: $URL
echo

curl --request POST \
  --header "Circle-Token: $CIRCLE_API_USER_TOKEN" \
  $URL \
  --header 'Content-Type: application/json' \
  --data '{
	"branch": "'$BRANCH'",
	"parameters":
    {
			"deployed-sha": "'$VERCEL_GITHUB_COMMIT_SHA'",
			"VERCEL_URL": "'$VERCEL_URL'",
			"test-url": "'$TEST_URL'"
		}
}'
