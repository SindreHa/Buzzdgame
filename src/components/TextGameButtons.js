import React, { Component } from 'react'

export default class TextGameButtons extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            nextQuestion: false
        }
    }

    render() {
        if (this.state.nextQuestion) { 
            return (
                <a 
                className="nextQuestion"
                onClick={() => {
                    /* Henter array av alle svar knapper */
                    const buttons = document.getElementsByClassName("answerBtn")
                    /* Fjerner "Neste spørsmål" knapp */
                    this.setState({nextQuestion: false})
                    for (let i = 0; i < buttons.length; i++) {
                        /* Setter display tilbake til flex så svarknapper er synlige */
                        buttons[i].style.display = "flex"
                    }
                    /* Kjører getQuestion i TextGame1 */
                    this.props.getQuestion();
                    /* Gjør så "Neste spørsmål" knapp vises */
                    this.setState({nextQuestion: false})
                }}>
                    Neste spørsmål
                </a>
            )
        } else 
            return (
                <section id="playerButtons">
                    {this.props.players.map((person, i) => ( //For hver person fra array
                        
                        <a
                        key={i} 
                        className = "answerBtn" 
                        onClick = { () => {
                            /* Hent array av alle knappe elementer på siden */
                            const buttons = document.getElementsByClassName("answerBtn")
                            for (let i = 0; i < buttons.length; i++) {
                                buttons[i].style.display = "none" //Skjul alle knapper
                            }
                            /* Hent hoved tekstelement */
                            const winner = document.getElementById("gameText");
                            /* Velg random vinnertekst med posisjon i array */
                            const winnerText = Math.floor(Math.random() * this.props.winnerText.length)
                            winner.textContent = `Stemmene er talt! ${person} ${this.props.winnerText[winnerText]}`
                            /* Gjør så "Neste spørsmål" knapp vises */
                            this.setState({nextQuestion: true})
                        }}>
                            {person/*Tekst på knapp*/} 
                        </a>
                    ))}
                </section>
            )
    }
}
