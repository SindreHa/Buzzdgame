import React, { Component } from 'react'
import WhoIs from './WhoIs';
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
        if(!this.props.room) {
            this.setState({redirect: "/"})
        }
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        if (this.props.room.gameMode == 1) {
            return (
                <WhoIs
                    room={this.props.room}
                    handleRoomCode={this.props.handleRoomCode}
                />
            )
        }
    }
}
