import React, { Component } from 'react'
import '../css/header.css';
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";

var socket;
export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://localhost:3001/" // Port som server.js kjører på
          };
        socket = socketIOClient(this.state.endpoint);

    }
    
    componentDidMount() {
        this.eventListeners();
    };

    componentDidUpdate() {
        this.toggleRoomCode();
    }

    /**
     * Lyttere som legger til animasjoner på header tittel
     */
    eventListeners = () => {
        var buzz = document.getElementsByClassName("headerTitle")[0];
        /* Lyttere som fjerner CSS animasjons klasser etter fullført */
        buzz.onanimationend = () => {
            buzz.classList.remove("buzz", "zoomBounce")
        }
        buzz.onclick = () => {
            buzz.classList.add("zoomBounce");
            this.props.handleRoomCode(null)
        }
    }

    /** 
     * Metode som skjuler/viser romkode i header 
     */
    toggleRoomCode = () => {
        if (this.props.roomCode) {
            document.getElementById("roomCode").classList.remove("hidden")
        } else {
            document.getElementById("roomCode").classList.add("hidden")
        }
    }

    render() {
        return (
                <div className="navHeader">
                    <Link to="/" className="headerTitle" >BUZZD</Link>
                    <p id="roomCode" className="hidden">Romkode: {
                        this.props.roomCode
                    }</p>
                </div>
        )
    }
}
export { Header, socket };

