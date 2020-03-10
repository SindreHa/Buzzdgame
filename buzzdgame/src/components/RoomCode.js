import React, { Component } from 'react'
import '../css/roomcode.css';
import { Link } from 'react-router-dom';
//import $ from 'jquery'

export default class RoomCode extends Component {
    
    componentDidMount() {
    };

    buzzAnim = (e) => {
        e.preventDefault();
        if(e.target.tagName.toLowerCase() === 'input' || e.target.classList.contains('btn'))
            document.getElementsByClassName("headerTitle")[0].classList.add("buzz")
    }

    bounceAnim() {
        document.getElementsByClassName("headerTitle")[0].classList.add("zoomBounce")
    }
    
    onSubmit = (e) => {
        const input = document.getElementsByTagName("input")[0];
        if (document.activeElement === input && e.key === "Enter") {
            input.value = "";
            input.blur();
            this.bounceAnim();
        }
    }

    render() {
        return (
            <div className="wrapper" key="RoomCode">
                    <div className="input">
                        <input type="text" onFocus={this.buzzAnim} onKeyDown={this.onSubmit} name="kode" placeholder="Romkode"/>
                        <Link onClick={this.buzzAnim} to="/game" className="btn enter">
                            Spill
                        </Link>
                        <a onClick={this.buzzAnim} className="btn host">
                            Lag rom
                        </a>
                    </div>
                    <div className="faqWrapper">
                        <h5>¯\_(ツ)_/¯</h5>
                        <p className="faq">Spørsmål og svar</p>
                    </div>
                
            </div>
        )
    }
}