import React, { Component } from 'react'
import '../css/header.css';

export default class Header extends Component {
    
    bounceAnim() {
        document.querySelector("h1").classList.add("zoomBounce")
    };

    componentDidMount() {
        
    }

    render() {
        return (
            <div className="navHeader">
                <h1 onClick={this.bounceAnim}>BUZZD</h1>
            </div>
        )
    }
}
