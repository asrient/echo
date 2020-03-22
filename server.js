const dgram = require('dgram');

const socket = dgram.createSocket('udp4');

socket.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });
  
  socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    msg="echo from server, your IP address is: "+rinfo.address+":"+rinfo.port;
    socket.send(msg,rinfo.port,rinfo.address,()=>{
        console.log("echo sent: ",msg);
    })
  });
  
  socket.on('listening', () => {
    const address = socket.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });
  
  socket.bind(process.env.PORT || 2222);