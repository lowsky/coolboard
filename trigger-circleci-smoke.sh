#
# This triggers the e2e smoke tests running on circleci
# that needs these pipeline parameters:
# - SUT base url
# - current commit aka version of given branch

echo Git Commit:
echo VERCEL_GITHUB_COMMIT_SHA=$VERCEL_GITHUB_COMMIT_SHA
echo
echo Branch:
echo VERCEL_GITHUB_COMMIT_REF=$VERCEL_GITHUB_COMMIT_REF
BRANCH=$VERCEL_GITHUB_COMMIT_REF
echo
echo Deployment on vercel - if not main branch...
echo VERCEL_URL=$VERCEL_URL
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
			"test-url": "'$TEST_URL'"
		}
}'
