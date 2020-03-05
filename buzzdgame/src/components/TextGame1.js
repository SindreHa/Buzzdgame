import React, { Component } from 'react'
import '../css/textGame1.css';

export default class TextGame1 extends Component {

    componentDidMount() {
        const wrapper = document.getElementsByClassName("wrapper")[0];
        for (let num = 0; num < 4; num++) {
            const button = document.createElement("div");
            button.className = "answerBtn";
            const btnLink = document.createElement("a");
            btnLink.textContent= `Svar alternativ ${num}`;
            button.appendChild(btnLink);
            wrapper.appendChild(button);
        }
    }
        

    render() {
        return (
            <div className="wrapper">
                <h3>React Router has great and simple features for accessing route params and ... On the other hand, if your query has many parameters, your method name will be</h3>
            </div>
        )
    }
}
