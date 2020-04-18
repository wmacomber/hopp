const WebSocket_port = 5000;
const Backend_port = 5001;

// set up websocket server for the web side
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: WebSocket_port });

// set up plain socket server for the backend
const backend = require('socket.io')();

// define our websocket server
wss.on('connection', (ws) => {
    ws.on('message', (msg) => {
        console.log('Received: %s', msg);
    });

    ws.send('Connection initialized');
});

// listen for log packets
backend.on('connection', (client) => {
    console.log('Backend connection established from ' + client.conn.remoteAddress);
    client.on('packet', (packet) => {
        console.log(packet);
        // go through each of the connected websocket clients
        wss.clients.forEach(function each(c) {
            if (c.readyState === WebSocket.OPEN) {
                // remember to JSON.parse this in the viewer
                c.send(JSON.stringify(packet));
            }
        });
    });
});
backend.listen(Backend_port);