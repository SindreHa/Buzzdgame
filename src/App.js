import React, { Component } from 'react'
import RoomCode from './components/RoomCode';
import CreateRoom from './components/CreateRoom';
import TextGame1 from './components/TextGame1';
import ProductTable from './components/ProductTable';
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
            players: ["Ola", "Sofie", "Max", "Hannah", "Anne"]
          }
        ],
        /*Under er for eksempel fra 
        * https://medium.com/@chimera.zen/how-to-make-a-crud-with-netlify-create-react-app-mongodb-atlas-12adc99610e 
        */
        products: [],
        inputs: [],
        newProduct: {
          name: '',
          price: 0
        }
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

  getRoom = (roomCode) => { //TODO returner kopi av array
    const index = this.state.rooms.findIndex(room => room.roomcode === roomCode)
    return this.state.rooms[index]
  }

  addRoom = (newRoom) => {
    this.setState({
      rooms: [...this.state.rooms, newRoom]
    })
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
                  rooms={this.state.rooms}
                  getRoom={this.getRoom}
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
                <TextGame1
                  room={this.getRoom(this.state.roomCode)}
                  handleRoomCode={this.handleRoomCode} 
                />}
            />
            <Route 
              path="/faq" 
              component = {Faq}
            />
            <Route 
              path="/test" 
              component = {ProductTable}
            />
        </Router>
      );
  }
}
