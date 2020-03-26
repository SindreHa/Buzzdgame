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
            redirect: null,
            nextQuestion: false
        }
        this.gameText = "";
    }

    componentWillMount() {
        if(this.props.room == null) {
            this.setState({redirect: "/"})
        }
        this.getPlayers()
    }

    componentDidMount() { //Når komponenten har tegnet seg ferdig på DOM
        this.getQuestion();
    }

    componentWillUnmount() {
    }

    getPlayers = () => {
        this.setState({
            players: this.props.room.players
        })
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
                        players = {this.props.room.players} 
                        winnerText = {this.state.winnerText}
                        getQuestion = {this.getQuestion}
                    />
                </div>
            </TransIn>
        ) 
    }
}
