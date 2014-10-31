var net = require('net');
var request = require('request');

var HOST = '184.168.221.61';
// var HOST = '0.0.0.0';
var PORT = 6969;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');
        
        request.get(
            'http://softbot-ras.herokuapp.com/remoteToOrigin/12/1/1/1234567/1/10/02/1991/12/45/30',
            { form: { key: 'value' } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );

    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);