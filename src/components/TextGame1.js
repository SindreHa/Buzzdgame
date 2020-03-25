import React, { Component } from 'react'
import '../css/textGame1.css';
import TextGameHeader from './TextGameHeader';
import { Redirect } from 'react-router-dom';
import TextGameButtons from './TextGameButtons';
import { CSSTransition }  from 'react-transition-group';

const TransIn = ({in: inProp, children }) => (
    
    <CSSTransition
        unmountOnExit
        in={inProp}
        timeout={{ enter: 0, exit: 400 }}
        classNames='textGameTrans'
        appear >
            {children}
    </CSSTransition>
);

export default class TextGame1 extends Component {

    constructor(props) {
        super(props)
        this.state = { //Placeholder data
            transIn: true,
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
            players: [ 
                {name: "Ola", score: 0},
                {name: "Anne", score: 0},
                {name: "Quarennc", score: 0},
                {name: "Lorem", score: 0},
                {name: "Hank", score: 0},
                {name: "Sofie", score: 0},
                {name: "Arne", score: 0},
                {name: "Morten", score: 0},
                {name: "Øystein", score: 0}
                ],
            redirect: null,
            nextQuestion: false
        }
        this.gameText = "";
    }

    componentDidMount() { //Når komponenten har tegnet seg ferdig på DOM
        if(this.props.roomCode == null) {
            this.setState({redirect: "/"})
        }
        this.getQuestion();
    }

    /*
    * Metode som henter neste spørsmål i array
    * Når det ikke er fler spørsmål kjøres redirect til home
    * Bruker alert som midlertidig melding til bruker
    */
    getQuestion = () => {
        let text = this.state.questions.shift(); 
        this.setState({gameText: text})
        if (text == null) {
            this.setState({redirect: "/"})
            this.props.handleRoomCode(null)
            alert("Spillet er slutt")
        }
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <TransIn in={this.state.transIn}>
                <div className="textGame">
                    <TextGameHeader text = {this.state.gameText} />
                    <TextGameButtons 
                        players = {this.state.players} 
                        winnerText = {this.state.winnerText}
                        getQuestion = {this.getQuestion}
                    />
                </div>
            </TransIn>
        ) 
    }
}
