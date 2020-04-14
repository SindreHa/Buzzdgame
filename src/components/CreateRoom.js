import React, { Component } from 'react'
import '../css/createRoom.css';
import { CSSTransition }  from 'react-transition-group';
import { Redirect } from 'react-router-dom';

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
                    roomcode: null,
                    gameMode: null,
                    players: []
                }
            ],
            trans: true
        }
    }

    componentDidMount() {
        this.eventListeners();
    }

    /* Metode som legger til wiggle effekt på element */
    wiggleError = (e) => {
        e.setAttribute("style", "box-shadow: inset 0px 0px 0px 3px red;");
        e.classList.add("wiggle")

        e.addEventListener("animationend", function() {
            e.classList.remove("wiggle")
            setTimeout(() => {
                e.setAttribute("style", null);
            }, 1500)
        }, false)
    }

    eventListeners = () => {
        
        /* Nekt mellomrom i romkode input */
        document.getElementById("roomCodeInput").addEventListener("keydown", (e) => {
             if(e.which === 32) e.preventDefault();
        })

        document.getElementById("addPlayerBtn").addEventListener("click", () => {
            this.addPlayer()
        })

        document.getElementById("addPlayerInput").addEventListener("keydown", (e) => {
            if(e.key === "Enter") this.addPlayer()
        })

        /* Input validering før oppretting av rom */
        document.getElementById("createRoom").addEventListener("click", () => {
            const roomcode = document.getElementById("roomCodeInput")
            const roomCodeEmpty = roomcode.value.replace(/\s/g, '').length
            if (!roomCodeEmpty && !this.state.room[0].players.length) {
                this.wiggleError(roomcode)
                this.wiggleError(document.getElementById("addPlayer"))
                return
            } else if(!this.state.room[0].players.length) {
                this.wiggleError(document.getElementById("addPlayer"))
                return
            } else if(!roomCodeEmpty) {
                this.wiggleError(roomcode)
                return
            } else {
                this.setState({
                    room:[
                        {
                            roomcode: document.getElementById("roomCodeInput").value.toUpperCase().trim(),
                            gameMode: 1,
                            players: this.state.room[0].players
                        }
                    ],
                    redirect: "/"
                    })
                this.props.addRoom(this.state.room[0]) 
            }
        })
    }

    addPlayer = () => {
        const input = document.getElementById("addPlayerInput");
        if (input.value) {
            this.setState({
                room: [
                    {
                        roomcode: document.getElementById("roomCodeInput").value.toUpperCase(),
                        players: [...this.state.room[0].players, input.value.trim()]
                    }
                ]
               })
        }
        input.value = ""
    }

    /* Metode som hallveis fungerer,
     * er ikke alle elementer som blir slettt av en rar grunn
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
                        roomcode: this.state.room[0].roomcode,
                        players: filteredArray
                    }
                ]
               });
        }
    }
    
    render() {
        
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
                        <input autoComplete="off" type="text" id="roomCodeInput"/>
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
                    <a className="btn" id="createRoom">Opprett rom</a>
                </section>
            </div>
            </FadeIn>
        )
    }

}
