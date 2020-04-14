import React, { Component } from 'react'
import '../css/roomcode.css';
import { Link, Redirect } from 'react-router-dom';
import { CSSTransition }  from 'react-transition-group';
//import $ from 'jquery'

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
        document.getElementsByClassName("enter")[0].addEventListener("click", () => {
            this.submitRoomCode();
        })

        document.getElementById("roomCodeInput").addEventListener("keyup", (e) => {
            if (document.activeElement === document.getElementById("roomCodeInput") && e.key === "Enter") {
                this.submitRoomCode();
            }
        })

        document.getElementById("roomCodeInput").addEventListener("animationend", function() {
            document.getElementById("roomCodeInput").classList.remove("wiggle")
        }, false)

        document.getElementById("roomCodeError").addEventListener("animationend", function() {
            document.getElementById("roomCodeError").classList.remove("visible")
        }, false)
    }

    buzzAnim = (e) => {
        if(e.target.tagName.toUpperCase() === 'input' || e.target.classList.contains('btn'))
            document.getElementsByClassName("headerTitle")[0].classList.add("buzz")
    }

    checkRoomCode = (roomCode) => {
        return this.props.rooms.some((room) => room.roomcode === roomCode)
    }

    bounceAnim() {
        document.getElementsByClassName("headerTitle")[0].classList.add("zoomBounce")
    }
    
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
                    <input id="roomCodeInput" type="text" autoComplete="off" onFocus={this.buzzAnim} name="kode" placeholder="Romkode"/>
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