import React, { Component } from 'react'
import RoomCode from './components/RoomCode';
import ChooseGame from './components/ChooseGame';
import TextGame1 from './components/TextGame1';
import Header from './components/Header';
import Faq from './components/faq/Faq';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

export default class App extends Component {
  
  componentDidMount() {
    this.getViewHeight();
  }

  /* Metode som henter høyde av viewport minus nettleser sin toolbar */
  getViewHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  render() {

    window.addEventListener('resize', () => {
      this.getViewHeight();
    });

      return (
        <Router>
          <Header />
            <Route exact path="/" component = {RoomCode}/>
            <Route path="/choose-game" component = {ChooseGame}/>
            <Route path="/game" component = {TextGame1}/>
            <Route path="/faq" component = {Faq}/>
        </Router>
      );
  }
}
