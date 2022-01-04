echo '{ "GIT_SHA1" : "'$COMMIT_REF'" }' | tee public/meta.json

echo '{' | tee src/auth0config.json
echo '  "context" : "'$CONTEXT'", ' | tee -a src/auth0config.json
echo '  "URL" : "'$URL'", ' | tee -a src/auth0config.json
echo '  "DEPLOY_PRIME_URL" : "'$DEPLOY_PRIME_URL'", ' | tee -a src/auth0config.json
echo '  "DEPLOY_URL" : "'$DEPLOY_URL'" ' | tee -a src/auth0config.json
echo '}' | tee -a src/auth0config.json
