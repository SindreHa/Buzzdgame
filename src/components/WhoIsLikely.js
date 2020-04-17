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

export default class WhoIsLikely extends Component {

    constructor(props) {
        super(props)
        this.state = { //Placeholder data
            transIn: true,
            statement: [
                    {
                        statement: "ender mest sannsynlig opp som",
                        alternatives: ["Rik", "Fattig", "Singel", "Gift"]
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
        this.gameText = "";
    }

    componentWillMount() {
        /* Sjekker om rom data er sendt inn, hvis ikke redirect til home */
        if(!this.props.room) {
            this.setState({redirect: "/"})
        } else {
            this.getPlayers()
        }
    }

    componentDidMount() {
        this.getStatement();
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
    getStatement = () => {
        const text = this.state.statement.shift(); 
        const playerIndex = Math.floor(Math.random() * this.state.players.length)
        
        if (text == null) {
            this.setState({redirect: "/"})
            this.props.handleRoomCode(null)
            alert("Spillet er slutt")
        } else {
            this.setState({gameText: `${this.state.players[playerIndex]} ${text.statement}`})
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
                        buttonText = {this.state.statement} 
                        winnerText = {this.state.winnerText}
                        getNext = {this.getStatement}
                        gameMode = {this.props.room.gameMode}
                    />
                </div>
            </TransIn>
        ) 
    }
}
