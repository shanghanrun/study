import http from 'http';
import WebSocket from 'ws';
import express from "express";
import SocketIO from 'socket.io';
const app = express();

app.set("view engine", "pug"); 
app.set("views", __dirname + "/views");  
app.use("/public", express.static(__dirname + "/public")); 

app.get("/", (req, res)=> res.render("home")); 
app.get("/*", (req, res)=>res.redirect("/"));

const handleListen = ()=> console.log(`Listing on http:3000`);

const httpServer = http.createServer(app);//
const wsServer = SocketIO(httpServer);  // io  대신 wsServer로 이름 지음   

wsServer.on("connection", socket =>{
  socket.onAny((event)=>{
    console.log(`Socket Event:${event}`)
  });
  socket.on("enter_room", (roomName, done)=> {
    socket.join(roomName); // room만들기
    console.log(socket.rooms);
    done();   
  });
});

// const wss = new WebSocket.Server({server}); 
// const sockets = [];
// wss.on("connection", (socket)=> {
//   sockets.push(socket);
//   socket["nickname"] = 'Anon';
//   console.log("Connected to Browser ✅");
//   socket.on("close", ()=> console.log("Disconnected from Browser❌"));
//   socket.on("message", (msg)=>{
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}: ${message.payload}`)
//         );
//         break;  // break를 안하면, 아래 케이스로 내려가며 이상한 오류 나온다.
//       case "nickname":
//         socket["nickname"] = message.payload;
//         break;
//     }        
//   });  
// });

httpServer.listen(3000, handleListen);  // httpServer로 이름 바꿈

