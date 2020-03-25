import React, { Component } from 'react'
import '../css/header.css';
import { Link } from "react-router-dom";

export default class Header extends Component {

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.eventListeners();
    };

    componentDidUpdate() {
        this.toggleRoomCode();
    }

    eventListeners = () => {
        var buzz = document.getElementsByClassName("headerTitle")[0];
        buzz.addEventListener("animationend", function() {
            buzz.classList.remove("buzz", "zoomBounce")
        }, false)
        buzz.addEventListener("click", () => {
            buzz.classList.add("zoomBounce");
            this.props.handleRoomCode(null)
        }, false)
    }

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
