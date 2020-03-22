import React, { Component } from 'react'
import '../css/textGame1.css';
import { Redirect } from 'react-router-dom';

export default class TextGame1 extends Component {

    constructor(props) {
        super(props)
        this.state = { //Placeholder data
            questions: [
                "Hvem i rommet er den smarteste?", 
                "Hvem i rommet har den beste latteren?", 
                "Hvem i rommet er mest opptatt av utseende?"
                ],
            winnerText: [
                "er den smarteste i rommet og må ramse opp alle kommunene i Norge for å bevise det!", 
                "har den beste latteren og får ikke lov til å le de neste 5 minuttene!", 
                "er mest opptatt av utseende og må la en annen person gjøre det den vil med hårsveisen til den utvalgte"
                ],
            persons: [ 
                {name: "Ola", score: 0},
                {name: "Anne", score: 0},
                {name: "Sofie", score: 0},
                {name: "Øystein", score: 0}
                ],
            redirect: null
        }
    }

    componentWillMount() {
    }

    componentDidMount() { //Når komponenten har tegnet seg ferdig på DOM
        if(this.props.roomCode == null) {
            this.setState({redirect: "/"})
        }
        this.buttons(this.state.persons.length)
    }

    
    componentWillUnmount() {

    }
    /*
    * Metode som lager element som viser første spørsmål fra array
    *
    * @param questions    Array av spørsmål/påstander fra state.questions
    */
    question = (questions) => {
        let text;
        if(questions.length>0) {
            text = questions.shift();
        } else {
            text = "Ingen spørsmål"
        }
        //console.log("kjør")
        return( <h3>{text}</h3> )
    }

    /*
    * Metode som henter og viser neste spørsmål fra array
    *
    * @param questions    Array av spørsmål/påstander fra state.questions
    */
    nextQuestion = (questions) => {
        const question = document.getElementsByTagName("h3")[0]; //Hent element for visning av spm
        var i = questions.length; //Antall spørsmål
        if (i>0) { //Hvis ikke flere spørsmål
            question.textContent = questions.shift();
        } else {
            question.textContent=`Runden er over`
            const buttons = document.getElementsByClassName("answerBtn");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.display = "none" //Skjul knapper hvis runde over
            }
        }
    }

    /*
    * Metode som oppretter knapper for svaralternativer, 
    * setter også opp klikklyttere for disse. 
    *
    * @param num    Antall knapper som skal legges inn, bruker antall deltakere fra state.persons
    */
    buttons = (num) => { 
        const wrapper = document.getElementsByClassName("textGame")[0]; //Henter wrapper element

        const nextQuestionBtn = document.createElement("a"); //Lager knapp for "Neste spørsmål"
        nextQuestionBtn.className = "nextQuestion"; //sett CSS klasse
        nextQuestionBtn.textContent = "Neste spørsmål" //Sett knappen sin tekst
        nextQuestionBtn.addEventListener("click", () => {
            const buttons = document.getElementsByClassName("answerBtn") //Henter array av alle svar knapper
                nextQuestionBtn.remove() //Fjerner "Neste spørsmål" knapp
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].style.display = "flex" //Setter display tilbake til flex så svarknapper er synlige
                }
                this.nextQuestion(this.state.questions); //Kjører nextQuestion metode som viser neste spørsmål
        })

        for (let i = 0; i < num; i++) { //Lager x antall knapper etter @param num
            const button = document.createElement("a"); //Lag knapp
            button.className = "answerBtn"; //sett CSS klasse
            button.textContent= this.state.persons[i].name; //Sett knappen sin tekst til deltaker sitt navn
            button.addEventListener("click", () => { 
                const buttons = document.getElementsByClassName("answerBtn") //Hent array av alle knappe elementer på siden
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].style.display = "none" //Skjul alle knapper
                }
                const winner = document.getElementsByTagName("h3")[0]; //Hent hoved tekstelement
                winner.textContent = `Stemmene er talt! ${this.state.persons[i].name} ${this.state.winnerText.shift()}`
                wrapper.appendChild(nextQuestionBtn) //Legg til "Neste spørsmål" knapp
            })
            wrapper.appendChild(button); //Legg knapper inn på siden
        }
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="textGame">
                {this.question(this.state.questions)}
            </div>
        ) 
    }
}
