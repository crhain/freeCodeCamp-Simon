import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';
import Panel from './Panel';

class App extends React.Component {
  constructor(props){
    super(props);
    //set the games state object
    this.state = {
      isOn: true, //temporarily set to true for testing
      isStrict: false,
      isGameRunning: false,
      isPlayerTurn: false,
      isSuccess: true,
      steps: 0,
      sequence: [],
      activePanel: ''
    };

    //bind button  handlers to app's context
    this.handleOnButtonClick = this.handleOnButtonClick.bind(this);
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    this.handleStrictButtonClick = this.handleStrictButtonClick.bind(this);
    this.handlePanelClick = this.handlePanelClick.bind(this);
    this.handlePanelUnClick = this.handlePanelUnClick.bind(this);

    //create new sound object for panels        
    this.panelSound = new Audio();

    //set some defaults for configuring the game
    this.panelPlaySpeed = 1000; //speed in miliseconds (so 1000 = 1 second)
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
    this.activatePanel(panelClicked.props.id);
    return true;
  } 
  handlePanelUnClick(panelClicked, clickEvent) {
    this.deactivatePanel(panelClicked.props.id);
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
    and then runs sequence  */
    this.activatePanel('green');
    window.setTimeout(this.deactivatePanel.bind(this, 'green'), this.panelPlaySpeed);
    //1. get random panel id using generateRandomPanelSequence(random)    
    //2. set this.state.activePanel to id returned above which will cause a rerender of that panel
    //3. need to trigger sound play.  Maybe alter Panel.toggleOn to take optional id paramter and then instantiate a panel so 
    //   we can call that method... or we could move the actual code for playing the sound to app?
    

    //let sequence = this.state.sequence.slice();
  }
  activatePanel(panelId){
    this.setState((prevState, props) => ({
      steps: ++prevState.steps,
      activePanel: panelId
    }));
    this.playPanelSound(panelId);
    
  }
  deactivatePanel(panelId){
    this.setState((prevSate, props) => ({
      activePanel: ''
    }));
    this.stopPanelSound(panelId);
  }
  playPanelSound(panelId){
    const sound1 = "media/simonSound1.mp3",
        sound2 = "media/simonSound2.mp3",
        sound3 = "media/simonSound3.mp3",
        sound4 = "media/simonSound4.mp3";
    let currentSound = "";
        
      switch(panelId){
            case "green":
                currentSound = sound1;
                break;
            case "red":
                currentSound = sound2;
                break;
            case "blue":
                currentSound = sound3;
                break;
            case "yellow":
                currentSound = sound4;
                break;
            default:
                console.log("WRONG ID FOR PANEL! CAN'T PLAY SOUND!");
        }
        this.panelSound.src = currentSound;
        
      this.panelSound.play();   
      console.log('panel ' + this.props.id + ' turned on!');
  }
  stopPanelSound(panelId){
    console.log('panel ' + this.props.id + ' turned off!'); 
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
