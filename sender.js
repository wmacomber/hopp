const settings = {
    schema: 'http',
    host: 'example.com',
    port: 5001,
    path: '',
    logfile: ''
};

// build the socket for sending the data we gather
let socket = require('socket.io-client')(settings.schema + '://' + settings.host + ':' + settings.port + '/' + settings.path);
socket.on('connect', () => {
    console.log('Backend socket connected');
});
socket.on('disconnect', () => {
    console.log('Backend socket disconnected');
});

// gather data to send, in this case by tailing a log file
Tail = require('tail').Tail;
tail = new Tail(settings.logfile);
tail.on('line', (data) => {
    console.log(data);
    let send = true;
    let dt = new Date();
    let packet = {
        date: formatDate(dt),
        time: formatTime(dt),
        message: data
    };
    if (send) {
        socket.emit('packet', packet);
    }
});
tail.on('error', (err) => {
    console.log('ERROR: ', err);
});

function formatDate(dt)
{
    return ('0' + (dt.getMonth() + 1)).substr(-2) + '/' + ('0' + dt.getDate()).substr(-2) + '/' + dt.getFullYear();
}

function formatTime(dt)
{
    return ('0' + dt.getHours()).substr(-2) + ':' + ('0' + dt.getMinutes()).substr(-2) + ':' + ('0' + dt.getSeconds()).substr(-2);
}