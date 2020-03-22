const dgram = require('dgram');
var http = require('http');

const socket = dgram.createSocket('udp4');

var log=[];

socket.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });
  
  socket.on('message', (msg, rinfo) => {
    log.push(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    msg="echo from server, your IP address is: "+rinfo.address+":"+rinfo.port;
    socket.send(msg,rinfo.port,rinfo.address,()=>{
      log.push("echo sent: ",msg);
    })
  });
  
  socket.on('listening', () => {
    const address = socket.address();
    log.push(`server listening ${address.address}:${address.port}`);
    console.log(`server listening ${address.address}:${address.port}`);
  });
  
http.createServer(function (req, res) {
  res.write(JSON.stringify(log)); 
  res.end(); 
}).listen(process.env.PORT || 2222);

socket.bind(process.env.PORT || 2222);