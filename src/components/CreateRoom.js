import React, { Component } from 'react'
import '../css/createRoom.css';
import { CSSTransition }  from 'react-transition-group';
import { Redirect } from 'react-router-dom';
import DropdownSelect from './DropdownSelect';

/** 
 * Animasjon med CSSTransition pakken
 * @param {Boolean} inProp - kondisjon om animasjon skal kjøres
 * @param {Node} children - element som skal animeres
 */
const FadeIn = ({in: inProp, children }) => (
    <CSSTransition
        in={inProp}
        timeout={{ enter: 0, exit: 400 }}
        classNames='fadeIn'
        appear
         >
            {children}
    </CSSTransition>
);

/** 
 * Animasjon med CSSTransition pakken
 * @param {Boolean} inProp - kondisjon om animasjon skal kjøres
 * @param {Node} children - element som skal animeres
 */
const SlideIn = ({in: inProp, children }) => (
    
    <CSSTransition
        unmountOnExit
        in={inProp}
        timeout={{ enter: 0, exit: 400 }}
        classNames='slideIn'
        appear >
            {children}
    </CSSTransition>
);

export default class CreateRoom extends Component {
    
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
            trans: true,
            gameModes: [
                { value: 1, label: 'Hvem i rommet' },
                { value: 2, label: 'Utsagn spillet' }
                ]
        }
    }

    componentDidMount() {
        this.eventListeners();
    }

    /** 
     * Metode som legger til wiggle effekt på element 
     * @param {Element} e - gjeldende HTML element
    */
    wiggleError = (e) => {
        e.setAttribute("style", "box-shadow: inset 0px 0px 0px 3px red;");
        e.classList.add("wiggle")

        e.addEventListener("animationend", function() {
            e.classList.remove("wiggle")
            setTimeout(() => {
                e.removeAttribute("style");
            }, 1500)
        }, false)
    }

    eventListeners = () => {

        var previousValue = document.getElementById('roomCodeInput').value;
        var pattern = /^\S*$/;

        /** 
         * Regex sjekk av input, fjerner mellomrom 
         * @param {Event} e - gjeldende event
         */
        function validateInput(e) {
            e = e || window.event;
            var newValue = e.target.value || '';

            if (newValue.match(pattern)) {
                previousValue = newValue;
            } else {
                e.target.value = previousValue;
            }
        }

        /* Nekt mellomrom i romkode input */
        document.getElementById("roomCodeInput").onkeyup = validateInput;

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
     * Metode som først kjører validering av inputfelt.
     * Kjører så @function addRoom fra props som ligger i @class App.js
     */
    createRoom = () => {
        const roomcode = document.getElementById("roomCodeInput")
        const roomCodeEmpty = roomcode.value.replace(/\s/g, '').length
        const room = this.state.room[0]
        if (!roomCodeEmpty && !room.players.length) {
            this.wiggleError(roomcode)
            this.wiggleError(document.getElementById("addPlayer"))
            return
        } else if(!room.players.length ) {
            this.wiggleError(document.getElementById("addPlayer"))
            return
        } else if(!roomCodeEmpty) {
            this.wiggleError(roomcode)
            return
        } else {
            this.setState({
                room:[
                    {
                        roomCode: document.getElementById("roomCodeInput").value.toUpperCase().trim(),
                        gameMode: this.state.room[0].gameMode ? this.state.gameModes[0].value : this.state.gameModes[0].value,
                        players: this.state.room[0].players
                    }
                ],
                redirect: "/" //Redirecter til hjemside, fjern for å unngå/stoppe redirect
                })
            this.props.addRoom(this.state.room[0])
        }
    }

    /**
     * Metode som skal starte websocket lytter
     */
    hostRoom = () => {
        console.log("Host room")
        /*
            Bruk setState som vist i metoden over for å legge til spillere.
        */
    }

    /**
     * Metode som legger spiler til state
     */
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

    /**
     * Metode som halvveis fungerer,
     * er ikke alle elementer som blir slettt av en rar grunn
     * @param {Element} e - gjeldende spiller container element
    */
    removePeople = (e) => {
        const parent = e.target.parentElement;
        const targetValue = e.target.previousSibling.innerHTML.toString();
        
        parent.classList.add("playerRemove")
        
        parent.onanimationend = () => {
            let filteredArray = this.state.room[0].players.filter(item => item.toString() !== targetValue)
            this.setState({
                room: [
                    {
                        roomCode: document.getElementById("roomCodeInput").value.toUpperCase(),
                        gameMode: this.state.room[0].gameMode,
                        players: filteredArray
                    }
                ]
               });
        }
    }

    /** 
     * Hent ut valgt spill verdi fra select 
     * @param {Object} selectedOption - valgt verdi fra dropdown som er et eget objekt
     */
    handleGamePick = (selectedOption) => {
        this.setState({ 
            room: [
                {
                    roomCode: this.state.room.roomcode,
                    gameMode: selectedOption ? selectedOption.value : 1,
                    players: this.state.room[0].players
                }
            ]
        });
      }
    
    render() {
        
        /**
         * Hvis state for redirect blir true kjøres redirect til satt url
         * @param {Boolean}
         * @returns {Redirect}
         */
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <FadeIn in={this.state.trans}>
            <div className="createRoomWrapper">
                <h2>Opprett et nytt rom</h2>
                <section>
                    <div className="createRoomInput">
                        <p>Romkode</p>
                        <input autoComplete="off" maxLength="8" type="text" id="roomCodeInput"/>
                    </div>
                    <div className="createRoomInput">
                        <p>Velg spilltype</p>
                        <DropdownSelect 
                            gameModes={this.state.gameModes} 
                            handleGamePick={this.handleGamePick}
                        />
                    </div>
                    <div className="createRoomInput">
                        <p>Legg til spillere</p>
                        <div id="addPlayer">
                            <input autoComplete="off" type="text" id="addPlayerInput"/>
                            <a className="btn" id="addPlayerBtn">Legg til</a>
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
                        <a className="btn" onClick={() => this.createRoom()}>Opprett rom</a>
                    </div>
                </section>
            </div>
            </FadeIn>
        )
    }

}
