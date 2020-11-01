#if 0 == echo VERCEL_GITHUB_DEPLOYMENT $VERCEL_GITHUB_DEPLOYMENT
# exit ...

env | sort -u |grep -v SECRET

# token: "trigger-from-netlify-hook"
CIRCLE_API_USER_TOKEN=1851154c07ebcb2a01c99a5851a79fe9e8ca893c

#DEPLOYED_SHA1=811fbecf6b228aa46a9cb72224cd8e5d1e467ff5
#DEPLOYED_SHA1=b0d003070bbbd81bf1e8b15f3cd76cd389b13d72
DEPLOYED_SHA1=$VERCEL_GITHUB_COMMIT_SHA
DEPLOYED_SHA1=

#BRANCH=activate-vercel-serverless
BRANCH=$VERCEL_GITHUB_COMMIT_REF
CIRCLE_PR_NUMBER=565

SUT_URL=$VERCEL_GITHUB_DEPLOYMENT
SUT_URL=https://hands-on-application-building-with-graph-ql-and-reac-790uxmthz.vercel.app/

CIRCLE="https://circleci.com/api/v1.1/project"
PROJ="$CIRCLE/github/lowsky/Hands-on-Application-Building-with-GraphQL-and-React/tree/${BRANCH}"

URL="$PROJ?build_parameters%5BCIRCLE_JOB%5D=build&build_parameters%5BDEPLOYED_SHA1%5D=$DEPLOYED_SHA1&build_parameters%5BCIRCLE_PR_NUMBER%5D=$CIRCLE_PR_NUMBER&build_parameters%5BTEST_URL%5D=http://sut"

curl -u ${CIRCLE_API_USER_TOKEN}: $URL \
    -d "build_parameters[CIRCLE_PR_NUMBER]=${CIRCLE_PR_NUMBER}" \
    -d "build_parameters[DEPLOYED_SHA1]=$DEPLOYED_SHA1" \
    -d "build_parameters[CYPRESS_baseUrl]=$SUT_URL"
