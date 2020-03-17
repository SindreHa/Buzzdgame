import React, { Component } from 'react'
import '../css/roomcode.css';
import { Link, Redirect } from 'react-router-dom';
//import $ from 'jquery'

export default class RoomCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            roomCode: "demo"
        }
    }

    componentDidMount() {
        //this.props.handleRoomCode(null);
        this.eventListeners();
    }


    eventListeners = () => {
        document.getElementsByClassName("enter")[0].addEventListener("click", () => {
            this.submitRoomCode();
        })

        document.getElementById("roomCodeInput").addEventListener("keyup", (e) => {
            if (document.activeElement === document.getElementById("roomCodeInput") && e.key === "Enter") {
                this.submitRoomCode();
            }
        })

        document.getElementById("roomCodeInput").addEventListener("animationend", function() {
            document.getElementById("roomCodeInput").classList.remove("error")
        }, false)
    }

    buzzAnim = (e) => {
        if(e.target.tagName.toUpperCase() === 'input' || e.target.classList.contains('btn'))
            document.getElementsByClassName("headerTitle")[0].classList.add("buzz")
    }

    checkRoomCode = (roomCode) => {
        if(roomCode === this.state.roomCode.toUpperCase()) {
            return true;
        } else {
            console.log("Input = " + roomCode + " State = " + this.state.roomCode.toLowerCase())
        }
    }

    bounceAnim() {
        document.getElementsByClassName("headerTitle")[0].classList.add("zoomBounce")
    }
    
    submitRoomCode = () => {
        const input = document.getElementsByTagName("input")[0];
        const roomCode = input.value.toUpperCase();
        
        if (this.checkRoomCode(roomCode)) {
            this.props.handleRoomCode(roomCode);
            input.value = "";
            input.blur();
            this.bounceAnim();
            this.setState({redirect: "/game"})
        } else {
            input.classList.add("error")
            document.getElementById("wrongCode").classList.add("visible")
        }
        
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const faqWrapper = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          };
        return (
            <div className="wrapper" key="RoomCode">
                    <div className="input">
                        <span id="wrongCode">Rommet eksisterer ikke</span>
                        <input id="roomCodeInput" type="text" autoComplete="off" onFocus={this.buzzAnim} name="kode" placeholder="Romkode"/>
                        <a className="btn enter">
                            Spill
                        </a>
                        <a onClick={this.buzzAnim} className="btn host">
                            Lag rom
                        </a>
                    </div>
                    <div style={faqWrapper}>
                        <Link onClick={this.buzzAnim} to="/faq" className="faq">
                            Spørsmål og svar
                        </Link>
                    </div>
                
            </div>
        )
    }
}