import React, { Component } from 'react'
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

    /*
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

    setButtonText = () => {
        if (this.state.statement[currentIndex]) {
            const btnTxtArray = this.state.statement[currentIndex].alternatives; 
            this.setState({btnTxtArray: [...btnTxtArray]})
        }
    }

    setWinnerText = (answer) => {
        this.setState({nextQuestion: true})
        const currentStatement = this.state.statement[currentIndex].statement
        const currentPerson = this.props.room.players[this.state.currentPersonIndex]
        const winnerChallenge = this.state.winnerText[Math.floor(Math.random() * this.state.winnerText.length)]
        this.setState({
            gameText: `Stemmene er talt! ${currentPerson} ${currentStatement} ${answer.toLowerCase()} og ${winnerChallenge}`
        })
    }

    runNext = () => {
        currentIndex++
        this.setGameText();
        this.setButtonText();
        this.setState({nextQuestion: false})
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
