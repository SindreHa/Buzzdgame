import React, { Component } from 'react'

export default class TextGameButtons extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            nextQuestion: false,
            buttonText: this.props.buttonText
        }
    }

    nextQuestion = () => {
        /* Henter array av alle svar knapper */
        const buttons = document.getElementsByClassName("answerBtn")
        /* Fjerner "Neste spørsmål" knapp */
        this.setState({nextQuestion: false})
        for (let i = 0; i < buttons.length; i++) {
            /* Setter display tilbake til flex så svarknapper er synlige */
            buttons[i].style.display = "flex"
        }
        /* Kjører getQuestion i TextGame1 */
        this.props.getNext();
        /* Gjør så "Neste spørsmål" knapp vises */
        this.setState({nextQuestion: false})
    }

    submitVote = (e) => {
        const name = e.target.textContent
        /* Hent array av alle knappe elementer på siden */
        const buttons = document.getElementsByClassName("answerBtn")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.display = "none" //Skjul alle knapper
        }
        /* Hent hoved tekstelement */
        const gameText = document.getElementById("gameText");
        /* Velg random vinnertekst med posisjon i array */
        if (this.props.gameMode == 1) {
            const winnerText = Math.floor(Math.random() * this.props.winnerText.length)
            gameText.textContent = `Stemmene er talt! ${name} ${this.props.winnerText[winnerText]}`
        } else if (this.props.gameMode == 2) {
            const winnerText = Math.floor(Math.random() * this.props.winnerText.length)
            gameText.textContent = `test`
        }
        /* Gjør så "Neste spørsmål" knapp vises */
        this.setState({nextQuestion: true})
    }

    render() {

        let btnTextArr = []

        if (this.props.gameMode == 1) {
            btnTextArr = this.state.buttonText
        } else {
            var arr = this.state.buttonText.shift()
            btnTextArr = [arr.alternatives]
        }

        if (this.state.nextQuestion) { 
            return (
                <a 
                className="nextQuestion" 
                onClick={this.nextQuestion}>
                    Neste spørsmål
                </a>
            )
        } else 
            return (
                <section id="playerButtons">
                    {
                    btnTextArr.map((text, i) => (
                        <a
                        key={i} 
                        className = "answerBtn" 
                        onClick = {this.submitVote}>
                            {text/*Tekst på knapp*/} 
                        </a>
                    ))}
                </section>
            )
    }
}
