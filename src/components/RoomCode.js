import React, { Component } from 'react'
import '../css/roomcode.css';
import { Link, Redirect } from 'react-router-dom';
import { CSSTransition }  from 'react-transition-group';
import PacmanLoader from "react-spinners/PulseLoader";
//import $ from 'jquery'

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

export default class RoomCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            roomCode: null,
            transIn: true
        }
    }

    componentDidMount() {
        //this.props.handleRoomCode(null);
        this.eventListeners();
    }


    eventListeners = () => {
        /* Event lyttere for "Spill" knapp */
        document.getElementsByClassName("enter")[0].onclick = () => {
            this.submitRoomCode();
        }

        document.getElementById("roomCodeInput").onkeyup = (e) => {
            if (document.activeElement === document.getElementById("roomCodeInput") && e.key === "Enter") {
                this.submitRoomCode();
            }
        }

        /* Lyttere som fjerner animasjon CSS klasser etter fullført */
        document.getElementById("roomCodeInput").onanimationend = () => {
            document.getElementById("roomCodeInput").classList.remove("wiggle")
        }

        document.getElementById("roomCodeError").onanimationend = () => {
            document.getElementById("roomCodeError").classList.remove("visible")
        }

        var previousValue = document.getElementById('roomCodeInput').value;
        var pattern = /^\S*$/;

        /** 
         * Regex sjekk av input, fjerner mellomrom 
         * @param {Event} e - gjeldende input event
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
    }

    /** 
     * Animasjon på header
     * @param {Element} e - gjeldende element som skal animeres 
     */
    buzzAnim = (e) => {
        if(e.target.tagName.toUpperCase() === 'input' || e.target.classList.contains('btn'))
            document.getElementsByClassName("headerTitle")[0].classList.add("buzz")
    }

    bounceAnim() {
        document.getElementsByClassName("headerTitle")[0].classList.add("zoomBounce")
    }

    /** 
     * Sjekker om rom eksisterer, bruker @function some
     * @param {Int} roomCode - gjeldende romkode
     * @returns {Boolean}
     */
    checkRoomCode = (roomCode) => {
        return this.props.rooms.some((room) => room.roomcode === roomCode)
    }

    /* Sender inn romkode til App.js som så prosseserer med gjeldende kode */
    submitRoomCode = () => {
        const input = document.getElementsByTagName("input")[0];
        const errorMsg =  document.getElementById("roomCodeError");
        const roomCode = input.value.toUpperCase();
        
        if (this.checkRoomCode(roomCode)) {
            this.props.handleRoomCode(roomCode);
            this.props.setRoom(roomCode)
            this.bounceAnim();
            this.setState({redirect: "/game"})
        } else {
            input.classList.add("wiggle")
            errorMsg.classList.add("visible")
        }
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

        const faqWrapper = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          };
        return (
            <div className="wrapper" key="RoomCode">
            <SlideIn in={this.state.transIn}>
                <div className="input">
                    <p id="roomCodeError">Rommet eksisterer ikke</p>
                    <input id="roomCodeInput" type="text" autoComplete="off" onFocus={this.buzzAnim} name="kode" placeholder="Romkode" maxLength="8"/>
                    <a className="btn enter">
                        Spill
                    </a>
                    <Link to="create-room" onClick={this.buzzAnim} className="btn host">
                        Lag rom
                    </Link>
                </div>
            </SlideIn>
                <div style={faqWrapper}>
                    <Link onClick={this.buzzAnim} to="/faq" className="faq">
                        Spørsmål og svar
                    </Link>
                </div>
                
            </div>
        )
    }
}