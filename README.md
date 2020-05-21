# express-demo
Express web framework demo for Node.js

`$ mkdir express-demo && cd express-demo`
`$ npm init -y`
`$ npm install --save express dotenv cors body-parser helmet morgan pug`
`$ npm install --save-dev `
`$ mkdir src && touch app.js`

C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE

`curl http://localhost:3000/messages/849d9407-d7c6-4712-8c91-1a99f7b22ef5`

`curl http://localhost:3000/messages`

`curl -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text":"Hello World"}'`

`curl -X DELETE http://localhost:3000/messages/1`

