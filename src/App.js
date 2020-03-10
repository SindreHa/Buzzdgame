import React, { Component } from 'react'
import RoomCode from './components/RoomCode';
import ChooseGame from './components/ChooseGame';
import TextGame1 from './components/TextGame1';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";

export default class App extends Component {
  render() {
      return (
        <Router>
          <Header />
            <Route exact path="/" component = {RoomCode}/>
            <Route path="/choose-game" component = {ChooseGame}/>
            <Route path="/game" component = {TextGame1}/>
        </Router>
      );
  }
}
