var socket = io.connect('http://localhost:5000');

var username  = document.getElementById('username');
var message   = document.getElementById('message');
var send 	  = document.getElementById('send');
var chat 	  = document.getElementById('chat');
var broadcast 	  = document.getElementById('broadcast');

send.addEventListener('click',function(){
    socket.emit('message',{
        username:username.value,
        message:message.value,
    });
});

message.addEventListener('keypress',function(){
    socket.emit('broad',{
        username:username.value
    });
});


socket.on('new_msg',function(data){
    broadcast.innerHTML = ""
    chat.innerHTML += '<div class="container"><strong>'+data.username+':</strong>'+data.message+'</div>';
});
socket.on('new_broad',function(data){
    broadcast.innerHTML = '<strong>'+data.username+': </strong> write message <img src="/write.gif" style="width:25px;height:20px" />';
});
