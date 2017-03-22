//import React, { Component } from 'react';
import React from 'react';
import './App.css';
import Game from './Game';

class App extends React.Component {
  constructor(props){
    super(props);
    //set the games state object
    this.state = {
      count: 0,      
      activePanel: ''
    };
    this.isOn = false;
    this.isStrict = false;
    this.isGameRunning = false;
    this.isPlayerTurn = false;
    this.isSuccess = true;
    this.turn = 0;    
    this.aiPanelSequence = [];
    this.playerPanelSequence = [];
    

    //bind button  handlers to app's context
    this.handleOnButtonClick = this.handleOnButtonClick.bind(this);
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    this.handleStrictButtonClick = this.handleStrictButtonClick.bind(this);
    this.handlePanelClick = this.handlePanelClick.bind(this);
    this.handlePanelUnClick = this.handlePanelUnClick.bind(this);

    //create new sound object for panels        
    this.panelSound = new Audio();

    //set some defaults for configuring the game
    this.turnsToWin = 20; //number of turns before winning the game.
    this.panelPlaySpeed = 1000; //speed in miliseconds (so 1000 = 1 second)
    this.debug = true;  //set to true to turn on debug mode
  }
  render() {
    return <Game panelClicked={this.state.activePanel} 
            onPanelClick={this.handlePanelClick} 
            onPanelUnClick={ this.handlePanelUnClick }
            onStartClick={ this.handleStartButtonClick }
            onOnClick={ this.handleOnButtonClick }
            count={this.state.count}
            />;
  }
  /********************************************************************/
  /*Wrapper methods for control clicks                                */
  /********************************************************************/
  handlePanelClick(panelClicked, clickEvent){
    /*takes a reference 'panel' to panel object*/
    if(this.isPlayerTurn){
      this.activatePanel(panelClicked.props.id);
      return true;
    }
    return false;    
  } 
  handlePanelUnClick(panelClicked, clickEvent) {
    if(this.isPlayerTurn){
      this.deactivatePanel(panelClicked.props.id);
      this.updatePlayerTurn(panelClicked.props.id);
      return true;
    }
    return false;    
  }
  handleOnButtonClick(clickEvent){
    /*Toggles on state*/
    this.isOn = !this.isOn;
    return true;
  }
  handleStartButtonClick(clickEvent){
    /* toggles isGameRunning and calls takeTurn */    
    
    //button only works if the console turned on and game not currently running.
    if(this.isOn && !this.isGameRunning){
      console.log('start button clicked!');
      //toggles isGameRunning
      this.isGameRunning = true;      
      //call takeTurn
      this.updateAiTurn();
      return true;
    }else if(this.debug){
      this.isGameRunning = true;
      this.updateAiTurn();
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
  updatePlayerTurn(panelId){
    
    //1. check to see if panelId matches next item in sequence
    if(panelId === this.playerPanelSequence[0]){
      //2. if it does, then remove current item from sequence
      this.playerPanelSequence.shift();
      console.log("correct!");
      // 2a. check to see if sequence is over with. if it is, then switch to ai player
      //     and generate new sequence
      if(this.playerPanelSequence.length < 1){        
        window.setTimeout(this.updateAiTurn.bind(this), 3000);
      } 
    //3. if it does not match, signal an error and trigger ai to play sequence again
    } else {  
      console.log("Incorrect! Player sequence is: ");
      console.log(this.playerPanelSequence);
      console.log("and ai sequence is: ");
      console.log(this.aiPanelSequence);

      //need version of updateAiTurn that just replays without updating -
    }
        
    return true;
  }
  updateAiTurn(panelId, aiCurrentTurn){
    /* computer player updates sequence to run with next move
    and then runs sequence  */
    //deactivate panel if it is active
    let newPanelId;

    if(!aiCurrentTurn){
      aiCurrentTurn = 0;
      this.isPlayerTurn = false;
      this.playerPanelSequence = this.aiPanelSequence.slice();
      if(this.turn === 0){
        this.turn = 1;
      }            
    }
    if(panelId){
      this.deactivatePanel(panelId);
      //check to see if ai  has played full sequence, and if it has, update turn
      if(aiCurrentTurn === this.turn){
        this.setState((prevState, props) => ({
          count: this.turn
        }));
        this.turn = ++this.turn;
        //update count to match turn
        this.isPlayerTurn = true;        
        return true;
      }      
    }
    aiCurrentTurn += 1;
    //newPanelId should be  either item in sequence[aiCurrentTurn-1] or a new random sequence if at end of array
    //if it is a new random sequence it should be pushed on to sequence array.
    let shouldAddToSequence = this.aiPanelSequence.length < aiCurrentTurn;
    if(shouldAddToSequence){
      //get random panel id using generateRandomPanelSequence(random) and then push onto sequence
      newPanelId = this.generateRandomPanelSequence();    
      this.aiPanelSequence.push(newPanelId);
      //now update player sequence to match it
      this.playerPanelSequence.push(newPanelId);
    } else {  
      newPanelId = this.aiPanelSequence[aiCurrentTurn-1];
    }
    
    //activate current panel with newPanelId
    this.activatePanel(newPanelId);
    
    //call this function again after pnaelPlaySpeed amount of time
    window.setTimeout(this.updateAiTurn.bind(this, newPanelId, aiCurrentTurn), this.panelPlaySpeed);
    return false;
  }

  activatePanel(panelId){    
    this.setState((prevState, props) => ({
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
      //console.log('panel ' + panelId + ' turned on!');
  }
  stopPanelSound(panelId){
    //console.log('panel ' + panelId + ' turned off!'); 
  }
  generateRandomPanelSequence(random){
  /* helper function for takeTurn*/
  if(!random){
    random = this.getRandomIntInclusive(1, 4); //1 to 4 panels
  }
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
