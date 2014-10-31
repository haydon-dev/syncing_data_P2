//import the websocket library. There are many, but socket.io is one of the most common and feature rich
var socketio = require('socket.io');

//start a socketio server and grab the server as io
var io = socketio.listen(31415);

//object to hold all of our connected users
var users = {};

//function to attach a handler for when people join
var onJoined = function(socket) {

	socket.on("join", function(data) {
    
        var joinMsg = {
            name: 'server', 
            msg: 'There are ' + Object.keys(users).length + ' users online'
        };
		
        socket.name = new Date().getTime();
	
        users[socket.name] = socket.name;
		
        socket.join('room1');
		
		console.log(socket.name + ' joined');
		
		socket.emit('helloClient', { name: socket.name });
	});
};

//function to attach a handler for when people send a message
var onNewObj = function(socket) {
   socket.on('newObj', function(data) {
		console.log("data received " + data.object.x + " / " + data.object.y);
        io.sockets.in('room1').emit('newObj', {time: data.time, object: data.object});
	});
};

//function to attach a handler for when people disconnect
var onDisconnect = function(socket) {
	socket.on("disconnect", function(data) {
		socket.leave('room1');
        delete users[socket.name];
	});
};

console.log('starting up');

//tell the server what to do when new sockets connect
//'connection' is a built-in event from socketio that fires any time a new connection occurs
//The 'connection' event automatically sends the newly connected socket to the function 
io.sockets.on("connection", function(socket) {

    console.log('started');
    
    //call the functions to attach handlers and send in the new socket connect
    onJoined(socket); //pass socket to onJoined to attach joined event
    onNewObj(socket); //pass socket to onMsg to attach message event
    onDisconnect(socket); //pass socket to onDisconnect to attach disconnect event
	
});

