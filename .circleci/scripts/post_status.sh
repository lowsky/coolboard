#!/bin/sh

PostStatus() {
    [ -n "${CONTEXT}" ] || CONTEXT="circleci/$CIRCLE_JOB"

    API=https://api.github.com
    USER=$CIRCLE_PROJECT_USERNAME
    REPO=$CIRCLE_PROJECT_REPONAME
    SHA=$CIRCLE_SHA1

    URL=$API/repos/$USER/$REPO/statuses/$SHA

    if [ "$DEBUG" ]; then
        echo "$URL"
    fi

    ACCEPT="Accept: application/vnd.github.v3+json"

    AUTH=circleci:$GH_TOKEN

    BODY='
        {
            "state": "'"$STATE"'",
            "target_url": "'"$TARGET_URL"'",
            "description": "'"$DESCRIPTION"'",
            "context": "'"$CONTEXT"'"
        }
    '

    if [ "$DEBUG" ]; then
        echo "$BODY"
    fi

    curl -H "$ACCEPT" -u "$AUTH" -d "$BODY" -X POST "$URL"
}

# Will not run if sourced for bats-core tests
# View src/tests for more information
ORB_TEST_ENV="bats-core"
if [ "${0#*"$ORB_TEST_ENV"}" = "$0" ]; then
    PostStatus
fi
