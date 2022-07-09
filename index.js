var express = require('express');
var socket  = require('socket.io');

var req_expr = express();
var server = req_expr.listen(5000,function(){
    console.log('Your Server Is runing at http:/localhost:5000');
});

req_expr.use(express.static('public_html'));

var sio = socket(server);

sio.on('connection',function(visitor){

    console.log('we have a new visitor as id=>',visitor.id);

    visitor.on('message',function(data){
        sio.sockets.emit('new_msg',data);
    });

    visitor.on('broad',function(data){
        visitor.broadcast.emit('new_broad',data);
    });
});
