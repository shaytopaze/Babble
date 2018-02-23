# Babble

A chatting app that allows users to communicate with each other without having to register accounts. It uses React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel. <--- Hence the clever name ;)

=====================

Primarily a client-side SPA (single-page app) built with ReactJS
Contains a chat log displaying messages and notifications
Contains an input field to change your name and an input field to send a message
The client-side app communicates with a server via WebSockets for multi-user real-time updates
No persistent database is involved; the focus is on the client-side experience

### Screenshots

!["Screenshot of Babble](https://github.com/shaytopaze/ChattyApp/blob/master/docs/Screen%20Shot%202018-02-23%20at%201.34.47%20PM.png?raw=true)
!["Second Screenshot of Babble"](https://github.com/shaytopaze/ChattyApp/blob/master/docs/Screen%20Shot%202018-02-23%20at%201.36.13%20PM.png?raw=true)


### Usage

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```


### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
