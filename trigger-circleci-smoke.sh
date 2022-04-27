#if 0 == echo VERCEL_GITHUB_DEPLOYMENT $VERCEL_GITHUB_DEPLOYMENT
# exit ...

env | sort -u |grep -v SECRET

echo VERCEL_GITHUB_COMMIT_SHA: commit: $VERCEL_GITHUB_COMMIT_SHA
echo VERCEL_GITHUB_COMMIT_REF: branch: $VERCEL_GITHUB_COMMIT_REF
echo VERCEL_URL:  $VERCEL_URL

# token: "trigger-from-netlify-hook"
CIRCLE_API_USER_TOKEN=1851154c07ebcb2a01c99a5851a79fe9e8ca893c

#COMMIT
#VERCEL_GITHUB_COMMIT_SHA=b0d003070bbbd81bf1e8b15f3cd76cd389b13d72

#BRANCH=activate-vercel-serverless
BRANCH=$VERCEL_GITHUB_COMMIT_REF

#SUT_URL=https://coolboard-790uxmthz.vercel.app/
TEST_URL=https://$VERCEL_URL
echo
echo testing "$TEST_URL"
echo

CIRCLE="https://circleci.com/api/v2/project"
URL="$CIRCLE/gh/lowsky/Hands-on-Application-Building-with-GraphQL-and-React/pipeline"

echo
echo triggering url : $URL
echo

curl --request POST \
  -u ${CIRCLE_API_USER_TOKEN}: $URL \
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
