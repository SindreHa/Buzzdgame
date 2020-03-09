import React, { Component } from 'react'
import '../css/header.css';
import  CSSTransition  from 'react-transition-group';

export default class Header extends Component {
    
    bounceAnim() {
        this.classList.add("zoomBounce")
    };

    render() {
        return (
            <div className="navHeader">
                {/* <CSSTransition
                    in={true}
                    appear={true} 
                    timeout={200} 
                    classNames="headerTrans"> */}

                    <h1 onClick={this.bounceAnim}>BUZZD</h1>
                    
                {/* </CSSTransition> */}
            </div>
        )
    }
}
