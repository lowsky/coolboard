# Hands-on Application Building with GraphQL (and React)

This repository will contain the client and the server code.
Both will always fit together, when you navigate through the git history
for each section. 

---
## Start and connect to specific server

`REACT_APP_SERVER_HOST=coolboard.netlify.com yarn start`

## Section 1: GraphQL basics

### Video 1.4: Our basic GraphQL schema

```
type Board @model {
    id: ID! @isUnique
    lists: [List!]! @relation(name: "BoardOnList")
    name: String!
}
type List @model {
    board: Board @relation(name: "BoardOnList")
    cards: [Card!]! @relation(name: "CardOnList")
    id: ID! @isUnique
    name: String!
}
type Card @model {
    id: ID! @isUnique
    list: List @relation(name: "CardOnList")
    name: String!
}
```

## Section 2:

## Hands-on application building with GraphQL and React

Publish by [Packt](https://www.packtpub.com/).

Author: Robert Hostlowsky [@rhosts](https://www.twitter.com/rhosts)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Find some information on how to perform common task in the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
