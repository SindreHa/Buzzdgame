import React, { Component } from 'react'
import RoomCode from './components/RoomCode';
import ChooseGame from './components/ChooseGame';
import TextGame1 from './components/TextGame1';
import Header from './components/Header';
import Faq from './components/Faq';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

export default class App extends Component {

  constructor(props) {
    super(props);
      this.state = {
        roomCode: null
      }
  }

  componentDidMount() {
    this.getViewHeight();
    
    window.addEventListener('resize', () => {
      this.getViewHeight();
    });
  }

  handleRoomCode = (roomCode) => {
      this.setState({ roomCode: roomCode })
  }

  /* Metode som henter høyde av viewport minus nettleser sin toolbar */
  getViewHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  render() {


      return (
        <Router>
          <Header roomCode={this.state.roomCode} handleRoomCode={this.handleRoomCode}/>
            <Route 
              exact path="/" 
              render={props => 
                <RoomCode 
                  handleRoomCode={this.handleRoomCode} 
                />} 
            /> 
            <Route 
              path="/choose-game" 
              component = {ChooseGame}
            />
            <Route 
              path="/game" 
              render={props => 
                <TextGame1 
                  roomCode={this.state.roomCode} 
                  handleRoomCode={this.handleRoomCode} 
                />}
            />
            <Route 
              path="/faq" 
              component = {Faq}
            />
        </Router>
      );
  }
}
