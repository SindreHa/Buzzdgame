import React, { Component } from 'react'
import WhoInRoom from './WhoInRoom';
import { Redirect } from 'react-router-dom';

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: null
        }
    }

    componentWillMount() {
        /* Sjekker om rom data er sendt inn, hvis ikke redirect til home */
        if(!this.props.room || !this.props.room.gameMode) {
            this.setState({redirect: "/"})
            this.props.handleRoomCode("")
        }
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        switch(this.props.room.gameMode) {
            case 1:
                return (
                    <WhoInRoom
                    room={this.props.room}
                    handleRoomCode={this.props.handleRoomCode}
                    /> 
                )
            case 2:
                return (
                    {/* Et annet spill */}
                )
            default:
                this.setState({redirect: "/"})
          }
    }
}