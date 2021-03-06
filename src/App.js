import React, { Component } from 'react'
import RoomCode from './components/RoomCode';
import CreateRoom from './components/CreateRoom';
import Game from './components/Game';
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
            gameMode: 1,
            players: ["Ola", "Sofie", "Max", "Hannah", "Anne"]
          }
        ],
          activeRoom: null
      }
  }

  componentDidMount() {
    this.getViewHeight();
    
    window.onresize = () => {
      this.getViewHeight();
    };
  }

  /**
   * Setter romkode i state
   * @param {Int} roomCode - gjeldende romkode
   */
  handleRoomCode = roomCode => {
      this.setState({ roomCode: roomCode })
  }

  /**
   *  Setter aktivt rom som brukes når spiller trykker "spill" 
   * @param {Object} room - rom objekt med relevant data
  */
  setRoom = room => {
    this.setState({
      activeRoom: room
    })
  }

  /** 
   * Legger til nytt rom i state
   * @param {Array} newRoom - array med data for nytt rom
  */
  addRoom = newRoom => {
    /* this.setState({
      rooms: [...this.state.rooms, newRoom]
    }) */
     
    fetch('http://ec2-3-133-89-209.us-east-2.compute.amazonaws.com:89/rooms/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        newRoom
      )
    })
  }


  /** 
   * Metode som henter høyde av viewport minus nettleser sin toolbar 
  */
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
                  rooms={this.state.rooms}
                  setRoom={this.setRoom}
                />} 
            /> 
            <Route 
              path="/create-room" 
              render={props => 
                <CreateRoom 
                  handleRoomCode={this.handleRoomCode} 
                  rooms={this.state.rooms}
                  addRoom={this.addRoom}
                />}
            />
            <Route 
              path="/game" 
              render={props => 
                <Game
                  room={this.state.activeRoom}
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
