'use strict'

//Dependencias
var fs = require('fs');

//Intanciar dependencias
var app = require('express')();
var server = require('https').createServer({
    key: fs.readFileSync('./MI_KEY_CERTIFICADO'),
    cert: fs.readFileSync('./MI_CRT_CERTIFICADO')
}, app);
var io = require('socket.io')(server);
const port = process.env.port || 2311

//Modificar datos para conexion a asterisk manager
var ami = require('asterisk-manager')(5038, '127.0.0.1', 'USERNAME', 'PASSWORD', true);

//corriendo servidor de express
server.listen(port, () => {
    console.log(`Servidor NODE JS iniciado en http://localhost:${port}`);
});

//Cliente de test
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Escucha conexiones de clientes
io.on('connection', function (socket) {
    //Log para ver el id del cliente conectado en terminal
    console.log("Cliente: " + socket.id);

    // Escucha el evento newchannel capturar llamadas entrantes
    ami.on('newchannel', function (evt) {
        //Envia infomacion del evento newchannel a todos los cliente conectados
        socket.emit('inbounce', evt);
    });
});



/**
 * Otros eventos
 */
//Escucha todos los eventos de asterisk
ami.on('managerevent', function (evt) { });

// Listen for specific AMI events. A list of event names can be found at
// https://wiki.asterisk.org/wiki/display/AST/Asterisk+11+AMI+Events
ami.on('hangup', function (evt) { });
ami.on('confbridgejoin', function (evt) { });

// // Listen for Action responses.
ami.on('response', function (evt) { });

// Perform an AMI Action. A list of actions can be found at
// https://wiki.asterisk.org/wiki/display/AST/Asterisk+11+AMI+Actions
ami.action({
    'action': 'originate',
    'channel': 'SIP/myphone',
    'context': 'default',
    'exten': 1234,
    'priority': 1,
    'variable': {
        'name1': 'value1',
        'name2': 'value2'
    }
}, function (err, res) { });