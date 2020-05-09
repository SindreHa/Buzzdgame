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
  handleRoomCode = (roomCode) => {
      this.setState({ roomCode: roomCode })
  }

  /**
   *  Setter aktivt rom som brukes når spiller trykker "spill" 
   * @param {int} roomCode - gjeldende romkode
  */
  setRoom = (roomCode) => {
    const index = this.state.rooms.findIndex(room => room.roomcode === roomCode)
    this.setState({
      rooms: [
        ...this.state.rooms
      ],
        activeRoom: this.state.rooms[index]
    })
    //return this.state.rooms[index]
  }

  /** 
   * Legger til nytt rom i state
   * @param {Array} newRoom - array med data for nytt rom
  */
  addRoom = (newRoom) => {
    this.setState({
      rooms: [...this.state.rooms, newRoom]
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
