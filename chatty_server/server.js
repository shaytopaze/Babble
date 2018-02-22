const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let connectedClients = [];

wss.on('connection', (ws) => {
  console.log('Client connected');
  let clientIsConnected = 'connected!';
  let clientColour = ['#7FFFD4', '#8A2BE2', '#FF7F50', '#8FBC8F', ''];
  connectedClients.push(clientIsConnected);
  clientColour = clientColour[Math.floor(Math.random() * 4)];

  wss.clients.forEach((client) => {
  client.send(JSON.stringify(connectedClients));
  })

  ws.on('message', function incoming(message) {
    console.log(message);
    let msg = JSON.parse(message);
    msg.id = uuidv4();
    msg.colour = clientColour;

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () =>  {
    console.log('Client disconnected')
    connectedClients.shift();
     wss.clients.forEach((client) => {
      client.send(JSON.stringify(connectedClients));
     })
  });
});











