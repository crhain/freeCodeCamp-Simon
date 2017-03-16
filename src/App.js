import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOn: false,
      isStrict: false,
      isGameRunning: false,
      isSuccess: true,
      steps: 0,
      sequence: [],
      activePanel: ''
    };

    this.handlePanelClick = this.handlePanelClick.bind(this);
    this.handlePanelUnClick = this.handlePanelUnClick.bind(this);
  }
  render() {
    return <Game panelClicked={this.state.activePanel} onPanelClick={this.handlePanelClick} onPanelUnClick={ this.handlePanelUnClick }/>;
  }
  /********************************************************************/
  /*Wrapper methods for control clicks                                */
  /********************************************************************/
  handlePanelClick(panelClicked){
    /*takes a reference 'panel' to panel object*/
    this.setState((prevState, props) => ({
      steps: ++prevState.steps,
      activePanel: panelClicked.props.id
    }));

    console.log('I have completed ' + this.state.steps + ' steps');
    panelClicked.toggleOn();
  } 
  handlePanelUnClick(panelClicked) {
    this.setState((prevSate, props) => ({
      activePanel: ''
    }));
    panelClicked.toggleOff();
  }
  handleOnButtonClick(buttonClicked){
    /*Toggles on state*/

  }
  handleStartButtonClick(buttonClicked){
    /* toggles isGameRunning and calls takeTurn */
  }
  handleStrictButtonClick(buttonClicked){
    /* toggles strict mode */
  }
  /********************************************************************/
  /*Game Engine                                                       */
  /********************************************************************/
  takeTurn(){
    /* computer player updates sequence to run with next move
    and then runs sequence  */
    //let sequence = this.state.sequence.slice();
  }
  generateRandomPanelSequence(random){
  /* helper function for takeTurn*/
  switch(random){
    case 1:
      return 'green';
    case 2:
      return 'red';
    case 3:
      return 'blue';
    case 4:
      return 'yellow';
    default:
      console.log('ERROR!');
      return 'undefined';
    }
  }
  getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;  
  }

}

App.defaultProps = {
};

export default App;
