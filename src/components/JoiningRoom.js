import React, { Component } from 'react'
import '../css/joiningRoom.css';
import { CSSTransition }  from 'react-transition-group';


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
    

    joinRoom = () => {
        document.querySelector(".joinRoomInput").remove()
        document.querySelector(".joiningRoomWrapper").classList.add("joined")
    }

    metodenavn = () => {
        console.log("Klikk")
    }

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
                            <a id="removePlayer" onClick={this.removePeople}>&#10005;</a>
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
