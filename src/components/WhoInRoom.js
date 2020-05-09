import React, { Component } from 'react'
import TextGameHeader from './TextGameHeader';
import { Redirect } from 'react-router-dom';
import TextGameButtons from './TextGameButtons';
import { CSSTransition }  from 'react-transition-group';

/** 
 * Animasjon med CSSTransition pakken
 * @param {Boolean} inProp - kondisjon om animasjon skal kjøres
 * @param {Node} children - element som skal animeres
 */
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

/**
 * Variabel for gjeldende posisjon i array med spørmsål
 */
let currentIndex = 0;

export default class WhoInRoom extends Component {

    constructor(props) {
        super(props)
        this.state = { //Placeholder data
            transIn: true,
            questions: [
                "Hvem i rommet er alltid på mobilen?", 
                "Hvem i rommet er den dårligste sjåføren?", 
                "Hvem i rommet er flinkest på skolen?",
                "Hvem i rommet er mest overlegen?",
                "Hvem i rommet er sterkest?",
                "Hvem i rommet havner på gata?",
                "Hvem i rommet nørder mest?",
                "Hvem i rommet tar flest selfies?",
                "Hvem i rommet er den svetteste gameren?",
                "Hvem i rommet har flest blonde øyeblikk?",
                "Hvem i rommet har kortest telefonsamtaler?",
                "Hvem i rommet har hatt flest kjønnssjukdommer?",
                "Hvem i rommet har størst kjendisfaktor?",
                "Hvem i rommet har dårligst musikksmak?",
                "Hvem i rommet er mest ubesluttsom?",
                "Hvem i rommet slipper de verste fisene?",
                "Hvem i rommet har de vakreste øynene?",
                "Hvem i rommet har lettest for å bryte isen med noen ukjente?",
                "Hvem i rommet har best sjanse til å overleve mot en bjørn?",
                "Hvem i rommet er mest klar for arbeidslivet?",
                ],
            winnerText: [
                "må ta 3 slurker",
                "må synge bæ bæ lille lam ELLER ta en shot",
                "må si hvem den synes er penest i rommet ELLER ta 5 slurker",
                "må fortelle om sitt første kyss",
                "må bytte genser/skjorte med den til høyre for seg ELLER ta 3 slurker av hverandre sin drink",
                "må gjette favorittfargen til den til venstre for seg. Tar den feil må den ta 5 slurker",
                "må velge neste sang",
                "må fortelle en flau historie ELLER ta 2 shots"
                ],
            redirect: null,
            nextQuestion: false
        }
    }

    componentWillMount() {
        /* Sjekker om rom data er sendt inn, hvis ikke redirect til home */
        if(!this.props.room) {
            this.setState({redirect: "/"})
        } else {
            this.setGameText();
        }
    }

    componentWillUnmount() {
        currentIndex = 0
    }

    /**
    * Metode som henter neste spørsmål i array
    * Når det ikke er fler spørsmål kjøres redirect til home
    * Bruker alert som midlertidig melding til bruker
    * @returns {Redirect}
    */
    setGameText = () => {
        const text = this.state.questions[currentIndex];
        
        if (!text) {
            this.setState({redirect: "/"})
            this.props.handleRoomCode(null)
            alert("Spillet er slutt")
        } else {
            this.setState({
                gameText: text
            })
        }
    }

    /**
     * Metode som setter tekst etter stemmer er talt 
     * med en tilfeldig utfordring for vinner
     * @param {String} name - spiller som fikk flest stemmer
     */
    setWinnerText = (name) => {
        this.setState({nextQuestion: true})
        const winnerText = Math.floor(Math.random() * this.state.winnerText.length)
        this.setState({
            gameText: `Stemmene er talt! ${name} ${this.state.winnerText[winnerText]}`
        })
    }

    /**
     * Metode som kjører neste spørsmål
     */
    runNext = () => {
        currentIndex++
        this.setGameText();
        this.setState({nextQuestion: false})
    }

    render() {

        /**
         * Hvis state for redirect blir true kjøres redirect til satt url
         * @param {Boolean}
         * @returns {Redirect}
         */
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <TransIn in={this.state.transIn}>
                <div className="textGame">
                    <TextGameHeader text = {this.state.gameText} />
                    <TextGameButtons 
                        buttonText = {this.props.room.players}
                        runNext = {this.runNext}
                        setWinner = {this.setWinnerText}
                        nextQuestion = {this.state.nextQuestion}
                    />
                </div>
            </TransIn>
        ) 
    }
}
