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
                    const buttons = document.getElementsByClassName("answerBtn") //Henter array av alle svar knapper
                    this.setState({nextQuestion: false}) //Fjerner "Neste spørsmål" knapp
                    for (let i = 0; i < buttons.length; i++) {
                        buttons[i].style.display = "flex" //Setter display tilbake til flex så svarknapper er synlige
                    }
                    this.props.getQuestion(); //Kjører getQuestion i TextGame1
                    this.setState({nextQuestion: false}) //Gjør så "Neste spørsmål" knapp vises
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
                        onClick = { () => { //Eventlistener
                            const buttons = document.getElementsByClassName("answerBtn") //Hent array av alle knappe elementer på siden
                            for (let i = 0; i < buttons.length; i++) {
                                buttons[i].style.display = "none" //Skjul alle knapper
                            }
                            const winner = document.getElementById("gameText"); //Hent hoved tekstelement
                            winner.textContent = `Stemmene er talt! ${person.name} ${this.props.winnerText.shift()}`
                            this.setState({nextQuestion: true}) //Gjør så "Neste spørsmål" knapp vises
                        }}>
                            {person.name/*Tekst på knapp*/} 
                        </a>
                    ))}
                </section>
            )
    }
}
