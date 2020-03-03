import React, { Component } from 'react'
import '../css/roomcode.css';
//import $ from 'jquery'

export default class RoomCode extends Component {
    
    componentDidMount() {
        var buzz = document.querySelector("h1")
        buzz.addEventListener("animationend", function() {
            document.querySelector("h1").classList.remove("buzz", "zoomBounce")
        }, false)
    };

    buzzAnim = (e) => {
        if(e.target.tagName.toLowerCase() == 'input' || e.target.classList.contains('btn'))
            document.querySelector("h1").classList.add("buzz")
    }

    bounceAnim() {
        document.querySelector("h1").classList.add("zoomBounce")
    }
    
    onSubmit = (e) => {
        const input = document.getElementsByTagName("input")[0];
        if (document.activeElement === input && e.key == "Enter") {
            input.value = "";
            input.blur();
            this.bounceAnim();
        }

/*         if ($("input").is(":focus") && e.key == "Enter") {
            $('input').val('');
            $("input").blur();
            $('h1').addClass("zoomBounce");
        } */
    }
    
    render() {
        return (
            <div className="wrapper">
                <div className="input">
                    <input type="text" onFocus={this.buzzAnim} onKeyDown={this.onSubmit} name="kode" placeholder="Romkode"/>
                    <a onClick={this.buzzAnim} href="#" className="btn enter">
                        Spill
                    </a>
                    <a onClick={this.buzzAnim} href="#" className="btn host">
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