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
const messages = [];

wss.on('connection', (ws) => {
  // Keep track of how many clients have connected
  let clientIsConnected = 'connected!';
  connectedClients.push(clientIsConnected);
  // Generate random colour to later assign to 'message'
  let clientColour = ['#685C79', '#455C7B', '#DA727E', '#AC6C82', '#FF5349', '#18CDCA', '#4F80E1', '#292C44', '#8EB9A8', '#0B6887', '#17AEC2'];
  clientColour = clientColour[Math.floor(Math.random() * 11)];

  connectedClientsObject = {
    connectedClients: connectedClients
  }

  // Send the array of connected clients to every client (to get the length on the client side)
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({connectedClients: connectedClients}));
  })

  // Receive message from client side, attach random colour and id
  ws.on('message', function incoming(message) {
    let msg = JSON.parse(message);
    msg.id = uuidv4();
    msg.colour = clientColour;

    // Send message with attached id & colour to client side
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () =>  {
    console.log('Client disconnected')
    // Every time a client disconnects, remove one from connectedClients array
    connectedClientsObject.connectedClients.shift();
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({connectedClients:connectedClients}));
    })
  });
});













