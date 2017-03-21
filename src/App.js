import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';
import Panel from './Panel';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOn: true, //temporarily set to true for testing
      isStrict: false,
      isGameRunning: false,
      isSuccess: true,
      steps: 0,
      sequence: [],
      activePanel: ''
    };

    this.handlePanelClick = this.handlePanelClick.bind(this);
    this.handlePanelUnClick = this.handlePanelUnClick.bind(this);
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    this.panel = new Panel();
  }
  render() {
    return <Game panelClicked={this.state.activePanel} 
            onPanelClick={this.handlePanelClick} 
            onPanelUnClick={ this.handlePanelUnClick }
            onStartClick={ this.handleStartButtonClick }
            />;
  }
  /********************************************************************/
  /*Wrapper methods for control clicks                                */
  /********************************************************************/
  handlePanelClick(panelClicked, clickEvent){
    /*takes a reference 'panel' to panel object*/
    this.setState((prevState, props) => ({
      steps: ++prevState.steps,
      activePanel: panelClicked.props.id
    }));
    console.log('I have completed ' + this.state.steps + ' steps');
    panelClicked.toggleOn();
    return true;
  } 
  handlePanelUnClick(panelClicked, clickEvent) {
    this.setState((prevSate, props) => ({
      activePanel: ''
    }));
    panelClicked.toggleOff();
    return true;
  }
  handleOnButtonClick(clickEvent){
    /*Toggles on state*/
    return true;

  }
  handleStartButtonClick(clickEvent){
    /* toggles isGameRunning and calls takeTurn */    
    
    //button only works if the console turned on and game not currently running.
    if(this.state.isOn && !this.state.isGameRunning){
      console.log('start button clicked!');
      //toggles isGameRunning
      this.state = Object.assign(this.state, {isGameRunning: true});
      //call takeTurn
      this.takeTurn();
      return true;
    }
    return false;
    
  }
  handleStrictButtonClick(clickEvent){
    /* toggles strict mode */
    return true;
  }
  /********************************************************************/
  /*Game Engine                                                       */
  /********************************************************************/
  takeTurn(){
    /* computer player updates sequence to run with next move
    and then runs sequence  
    1. get random panel id using generateRandomPanelSequence(random)
    2. set this.state.activePanel to id returned above which will cause a rerender of that panel
    3. need to trigger sound play.  Maybe alter Panel.toggleOn to take optional id paramter and then instantiate a panel so 
       we can call that method... or we could move the actual code for playing the sound to app?
    */

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
