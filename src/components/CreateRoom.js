import React, { Component } from 'react'
import '../css/createRoom.css';
import { CSSTransition }  from 'react-transition-group';

const Trans = ({in: inProp, children }) => (
    
    <CSSTransition
        in={inProp}
        timeout={{ enter: 0, exit: 400 }}
        classNames='createRoomTrans'
        appear
         >
            {children}
    </CSSTransition>
);

export default class CreateRoom extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            players: [],
            trans: true
        }
    }

    componentDidMount() {
        this.eventListeners();
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

        document.getElementById("startGame").addEventListener("click", () => {
            this.setState({
                players:[]
                })
        })
    }

    addPlayer = () => {
        const input = document.getElementById("addPlayerInput");
        if (input.value) {
            this.setState({
                players: [...this.state.players, input.value]
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
            let filteredArray = this.state.players.filter(item => item.toString() !== targetValue)
            this.setState({players: filteredArray});
        }
    }
    
    render() {
        return (
            <Trans in={this.state.trans}>
            <div className="createRoomWrapper">
                <h2>Opprett et nytt rom</h2>
                <section>
                    <div className="createRoomInput">
                        <p>Romkode</p>
                        <input type="text" id="roomCodeInput"/>
                    </div>
                    <div className="createRoomInput">
                        <p>Legg til spiller</p>
                        <div id="addPlayer">
                            <input type="text" id="addPlayerInput"/>
                            <a className="btn" id="addPlayerBtn">Legg til</a>
                        </div>
                    </div>
                    <div className="playerList">
                        <div className="players">
                        {
                        this.state.players.map((player, i) => (
                            <div className="playerWrapper" key={i}>
                                <p>{player}</p>
                                <a id="removePlayer" onClick={this.removePeople}>&#10005;</a>
                            </div>
                        ))
                        }
                        </div>
                    </div>
                    <a className="btn" id="startGame">Start spill</a>
                    </section>
            </div>
            </Trans>
        )
    }

}
