GIT_SHA1=${VERCEL_GITHUB_COMMIT_SHA:-$COMMIT_REF}
echo "{ \"GIT_SHA1\" : \"$GIT_SHA1\" }" | tee public/meta.json
