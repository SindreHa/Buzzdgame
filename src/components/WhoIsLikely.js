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

export default class WhoIsLikely extends Component {

    constructor(props) {
        super(props)
        this.state = { //Placeholder data
            transIn: true,
            statement: [
                    {
                        statement: "ender mest sannsynlig opp som",
                        alternatives: ["Rik", "Fattig", "Singel", "Gift"]
                    },
                    {
                        statement: "hadde valgt",
                        alternatives: ["Evig lykke", "1 million kroner", "Å gifte seg med sin celebrity crush", "Gratis øl resten av livet", "Å være 20år for alltid"]
                    },
                    {
                        statement: "ender mest sannsynlig opp som",
                        alternatives: ["Enslig", "Gift", "Alene", "Ikke alene"]
                    }
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
            this.setButtonText();
        }
    }

    componentWillUnmount() {
        currentIndex = 0
    }

    componentDidMount() {
        //console.log(this.state)
    }

    /**
    * Metode som henter neste spørsmål i array
    * Når det ikke er fler spørsmål kjøres redirect til home
    * Bruker alert som midlertidig melding til bruker
    */
    setGameText = () => {
        const text = this.state.statement[currentIndex]; 
        const personindex = Math.floor(Math.random() * this.props.room.players.length)
        this.setState({currentPersonIndex: personindex})
        
        if (!text) {
            this.setState({redirect: "/"})
            this.props.handleRoomCode(null)
            alert("Spillet er slutt")
        } else {
            this.setState({
                gameText: `${this.props.room.players[personindex]} ${text.statement}`
            })
        }
    }

    /**
     * Setter knapper til gjeldende statement fra array i state
     */
    setButtonText = () => {
        if (this.state.statement[currentIndex]) {
            const btnTxtArray = this.state.statement[currentIndex].alternatives; 
            this.setState({btnTxtArray: [...btnTxtArray]})
        }
    }

    /**
     * Metode som setter tekst etter stemmer er talt 
     * med en tilfeldig utfordring for vinner
     * @param {String} name - spiller som fikk flest stemmer
     */
    setWinnerText = (answer) => {
        this.setState({nextQuestion: true})
        const currentStatement = this.state.statement[currentIndex].statement
        const currentPerson = this.props.room.players[this.state.currentPersonIndex]
        const winnerChallenge = this.state.winnerText[Math.floor(Math.random() * this.state.winnerText.length)]
        this.setState({
            gameText: `Stemmene er talt! ${currentPerson} ${currentStatement} ${answer.toLowerCase()} og ${winnerChallenge}`
        })
    }

    /**
     * Metode som kjører neste spørsmål
     */
    runNext = () => {
        currentIndex++
        this.setGameText();
        this.setButtonText();
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
                        buttonText = {this.state.btnTxtArray}
                        runNext = {this.runNext}
                        setWinner = {this.setWinnerText}
                        nextQuestion = {this.state.nextQuestion}
                    />
                </div>
            </TransIn>
        ) 
    }
}
