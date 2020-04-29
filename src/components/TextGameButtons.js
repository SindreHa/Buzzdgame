import React, { Component } from 'react'

export default class TextGameButtons extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
        if (!this.props.nextQuestion) {
            return (
            
                <section id="playerButtons">
                {
                    this.props.buttonText.map((text, i) => (
                        <a
                        key={i} 
                        className = "answerBtn" 
                        onClick = {() => this.props.setWinner(text)}>
                            <p>{text}</p>
                        </a>
                    ))
                }
                </section>
            )
        } else {
            return (
            
                <section id="nextQuestion">
                    <a 
                    className="nextQuestion" 
                    onClick={() => this.props.runNext()}>
                    <p>Neste spørsmål</p>
                    </a>
                </section>
            )
        }
        
    }
}
