<img src="https://www.coolboard.fun/CoolBoardLogo100.png" width="120" alt="coolboard">

# coolboard

This repo contains the client and the server code for the
https://www.coolboard.fun

---

## Hands-on application building with GraphQL and React

Video Course:
<img src="https://www.coolboard.fun/packt-page-v141.png" alt="course-on-packt-publishing">

Publish by [Packt](https://www.packtpub.com/).

Author: Robert Hostlowsky https://mastodontech.de/@lowsky

```shell

TOKEN=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

CONTENT_TYPE_H='Content-Type:application/json'

AUTH_H="Authorization: token $TOKEN"

DATA='{"state":"pending","target_url":"https://www.github.com/lowsky/coolboard","description":"description","context":"CTXT"}'
echo $DATA

curl -H "$CONTENT_TYPE_H" -H "$AUTH_H" -d "$DATA" -X POST https://api.github.com/repos/lowsky/coolboard/statuses/4f09536a3d8d8bd3c43d5e744920d009f28443b4
echo $CONTENT_TYPE_H $AUTH_H

```
