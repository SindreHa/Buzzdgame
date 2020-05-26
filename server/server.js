//Importer dependencies
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");


// Importer klasser
const {GameRoom} = require('./utils/gameRoom');
const {Players} = require('./utils/players');

var games = new GameRoom();


// Kobler til database med monk.
var connection_string = "mongodb+srv://BuzzdAdmin:Bachelor2020@bachelorcluster-seq7b.azure.mongodb.net/BuzzdGame";
const db = require("monk")(connection_string);

// get collections
const collection_gameRoom = db.get("GameRoom");
// localhost port
const port = process.env.PORT || 3001;
const app = express();
// server
const server = http.createServer(app);
// Oppretter socket
const io = socketIO(server);

//Starting server on port 3001
server.listen(port, () => {
    console.log("Server started on port 3001");
});

io.on("connection", socket => {
    console.log("New client connected" + socket.id);
    console.log(socket);
    room_code = "FINTEST";

    /*var roomCount = collection_gameRoom.count({}, () => {
        console.log(roomCount);
      });
   */
    
    socket.on("playerJoin", emitData => {
        room_code = emitData.roomCode;
        playerName = emitData.playerName;
        socket.join(room_code, (room_code) => io.to(room_code).emit('playerJoin'));
        console.log("new room connected: " +Object.keys(io.sockets.adapter.sids[socket.id]));
        console.log(playerName);
        collection_gameRoom.update({ roomCode: room_code}, { $addToSet: {players: playerName}  }).then(updatedDoc => {
           // io.to(room_code).emit("players_in_game", room_code);
        socket.emit("change_data");
        
        }); 
    }); 
// Henter spillernavn fra gameRoom collection
socket.on ("players_in_game", (room_code) => {
  var test =   collection_gameRoom.find({roomCode: room_code}).then(docs => {
        socket.emit("get_data", docs);
    });
    console.log(test);

});
   /* var playerArray = collection_gameRoom.find({roomCode: room_code},{players: 1}, function (e, docs){
        
        console.log("playerarray: " + playerArray);
    });
    console.log("playerarray: " + playerArray);

    //collection_gameRoom.find({roomCode: room_code}).then(docs => {
        //var players = collection_gameRoom.findOne({roomCode: room_code}.then((doc) => {}));


      //  io.to(room_code).emit("get_players", docs);
  //  });
});

*/
    //  Legger rom til i database
    socket.on("createRoom", newRoom => {
        
        collection_gameRoom.insert(newRoom)
        
    
});

});

