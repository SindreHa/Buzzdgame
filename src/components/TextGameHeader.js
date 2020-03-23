import React, { Component } from 'react'

export default class TextGameHeader extends Component {
    

    render() {
        return (
            <h3 id="gameText">
                {this.props.text}
            </h3>
        )
    }
}
