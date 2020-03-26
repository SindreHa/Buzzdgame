import React, { Component } from 'react'
import RoomCode from './components/RoomCode';
import CreateRoom from './components/CreateRoom';
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
        roomCode: null,
        rooms: [
          {
            roomcode: "DEMO",
            players: [
              {
                name: "Ola"
              },
              {
                name: "Sofie"
              },
              {
                name: "Max"
              },
              {
                name: "Hannah"
              },
              {
                name: "Anne"
              }
            ]
          }
        ]
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
                  rooms={this.state.rooms}
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
