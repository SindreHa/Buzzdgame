import React, { Component } from 'react'
import '../css/joiningRoom.css';
import { CSSTransition }  from 'react-transition-group';
import * as io from 'socket.io-client';
import { socket } from "./Header";

var sockets = io();

var url = require ('url');
var adr = window.location.href;
var q = url.parse(adr, true);
var qdata = q.query;



/** 
 * Animasjon med CSSTransition pakken
 * @param {Boolean} inProp - kondisjon om animasjon skal kjøres
 * @param {Node} children - element som skal animeres
 */
const FadeIn = ({in: inProp, outProp, children }) => (
    <CSSTransition
        in={inProp}
        out={outProp}
        timeout={{ enter: 0, exit: 400 }}
        classNames='fadeIn'
        appear
        unmountOnExit
         >
            {children}
    </CSSTransition>
);      




export default class JoiningRoom extends Component {

    constructor(props){
        super(props);
        this.state = {
            trans: true,
            redirect: null,
            room: [
                {
                    roomCode: "",
                    gameMode: 1,
                    players: []
                }
            ],
        }
    }
    // setter spillere fra database i state
    getPlayers = playerList => {
        
/*           this.setState({
                room: [
                    {
                        ...this.state.room[0].players,  playerz 
                       
                    }
                ]
            });
        */
    }
    changeData = () => socket.emit("players_in_game");
    
    componentDidMount() {
        socket.emit("players_in_game", qdata.roomcode);
        socket.on("get_data", this.getPlayers);
        socket.on("change_data", this.changeData);


    /**
    * Socket.io magic
    */
socket.on('updatePlayerLobby', function(data){
    
    document.getElementById('players').value = "";
    
    for(var i = 0; i < data.length; i++){
        document.getElementById('players').value += data[i].name + "\n";
    }
    
});
    }
    
    joinRoom = () => {
        var playerName = document.getElementById("joinRoomInput").value.trim();
        document.querySelector(".joinRoomInput").remove()
        document.querySelector(".joiningRoomWrapper").classList.add("joined")
       
        console.log("playername: " + playerName);
        console.log("q roomcode: " + qdata.roomcode);

        //Sender romkode fra url og spillernavn til server.
        socket.emit('playerJoin', { roomCode: qdata.roomcode, playerName: playerName});
    }

    metodenavn = () => {
        console.log("Klikk")
    }


    eventListeners = () => {

        
        /* Legg til spiller */
        document.getElementById("addPlayerBtn").onclick = () => {
            this.addPlayer()
        }

        /* Legg til spiller med enter tast */
        document.getElementById("addPlayerInput").onkeydown = (e) => {
            if(e.key === "Enter") this.addPlayer()
        }

    }

    /**
     * Metode som legger spiler til state
    
    addPlayer = () => {
        const input = document.getElementById("addPlayerInput");
        if (input.value) {
            this.setState({
                room: [
                    {
                        roomCode: document.getElementById("roomCodeInput").value.toUpperCase(),
                        gameMode: this.state.room[0].gameMode,
                        players: [...this.state.room[0].players, input.value.trim()]
                    }
                ]
               })
        }
        input.value = ""
    }
 */
    render() {
        return (
            <FadeIn in={this.state.trans}>
            <section className="joiningRoomWrapper">
                <div className="joinRoomInput">
                    <div id="join">
                        <input autoComplete="off" type="text" id="joinRoomInput"/>
                        <a className="btn" id="addPlayerBtn"
                        onClick={() => this.joinRoom()}>Bli med</a>
                    </div>
                </div>
                <div className="playerList">
                    <div className="players">
                    {
                    this.state.room[0].players.map((player, i) => (
                        <div className="playerWrapper" key={i}>
                            <p>{player}</p>
                        </div>
                    ))
                    }
                    </div>
                </div>
                
                <div className="btnWrapper">
                        <a className="btn" onClick={() => this.metodenavn()}>Tekst på knapp</a>
                    </div>
            </section>
            </FadeIn>
        )
    }
}

