import React, { Component } from 'react'
import '../css/header.css';
import  CSSTransition  from 'react-transition-group';
import { Link } from "react-router-dom";

export default class Header extends Component {
    
    componentDidMount() {
        this.eventListeners();
    };

    eventListeners = () => {
        var buzz = document.getElementsByClassName("headerTitle")[0];
        buzz.addEventListener("animationend", function() {
            buzz.classList.remove("buzz", "zoomBounce")
        }, false)
        buzz.addEventListener("click", function() {
            buzz.classList.add("zoomBounce")
        }, false)
    }

    bounceAnim() {
        document.getElementsByClassName("headerTitle")[0].classList.add("zoomBounce")
    };

    render() {
        return (
            <div className="navHeader">
                {/* <CSSTransition
                    in={true}
                    appear={true} 
                    timeout={200} 
                    classNames="headerTrans"> */}

                    <Link to="/" className="headerTitle">BUZZD</Link>
                    
                {/* </CSSTransition> */}
            </div>
        )
    }
}
