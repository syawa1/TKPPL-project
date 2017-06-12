var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)

var counter =0;



//admin
app.get('/', function(req, res) {
	res.sendfile('root/index.html')
})

io.on('connection', function(socket){

	// data.send(Q + " Ke Counter / Teller NO " )
	console.log("Connection Berhasil")
	socket.on('msg', function(data) {
		if(data.antrian > 0){
			counter  = data.antrian +1
		}
		else{
			counter = counter  +1 		
		}
		data.antrian  = counter
		console.log(data)
		io.sockets.emit('newmsg', data);
	})

	//handle reset
	socket.on('reset',function(){
		counter =0
	})
})



//console.log("server jalan");
server.listen(8081)