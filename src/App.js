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
    this.debug = false;  //set to true to turn on debug mode
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
    if(this.isOn){
      if(this.isPlayerTurn){
        this.activatePanel(panelClicked.props.id);
        return true;
      }
    }    
    return false;    
  } 
  handlePanelUnClick(panelClicked, clickEvent) {
    if(this.isOn){
      if(this.isPlayerTurn){
        this.deactivatePanel(panelClicked.props.id);
        this.updatePlayerTurn(panelClicked.props.id);
      return true;
      }
    }    
    return false;    
  }
  handleOnButtonClick(clickEvent){
    /*Toggles on state*/
    this.isOn = !this.isOn;
    this.isGameRunning = false;
    return true;
  }
  handleStartButtonClick(clickEvent){
    /* toggles isGameRunning and calls takeTurn */    
    
    //button only works if the console turned on and game not currently running.
    if(this.isOn){
      if(!this.isGameRunning){
        console.log('start button clicked!');
        //toggles isGameRunning
        this.isGameRunning = true;      
        //call takeTurn
        this.aiPlayerTurn();
        return true;
      } else {
        this.resetGame();
      }
      
    } else if(this.debug){
      this.isGameRunning = true;
      this.aiPlayerTurn();
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
  resetGame(){
    this.aiPanelSequence = [];
    this.playerPanelSequence = [];
    this.turn = 0;
    this.setState((prevState, props) => ({
      count: 0,
      activePanel: ''
    }));
    this.aiPlayerTurn();
  }

  updatePlayerTurn(panelId){
    
    //1. check to see if panelId matches next item in sequence
    if(panelId === this.playerPanelSequence[0]){
      //2. if it does, then remove current item from sequence
      this.playerPanelSequence.shift();
      console.log("correct!");
      // 2a. check to see if sequence is over with. if it is, then switch to ai player
      //     and generate new sequence 
      if(this.playerPanelSequence.length < 1){        
        window.setTimeout(this.aiPlayerTurn.bind(this), this.panelPlaySpeed);
      } 
    //3. it does not match, 
    } else {  
      //3.a. signal an error and trigger ai to play sequence again
      console.log("Incorrect!");

      //console.log("Player sequence is: ");
      //console.log(this.playerPanelSequence);
      //console.log("and ai sequence is: ");
      //console.log(this.aiPanelSequence);

      //need version of updateAiTurn that just replays without updating -
    }
        
    return true;
  }
  aiPlayerTurn(){
    //a game loop that goes through playing each step in the sequence untill the end is reached
    //  calls update to add new element to sequence and play that sequence as well
    
    //set to ai player turn
    this.isPlayerTurn = false;
    //set player sequence to match ai sequence
    this.playerPanelSequence = this.aiPanelSequence.slice();
    //  update will add new step to sequence, make copy for player, and update turn.
    this.aiUpdate();
    // play panel sequence
    this.aiPlaySequence();
    //update count
    this.updateCount();
    //switch back to player turn
    this.isPlayerTurn = true;
  }

  aiUpdate(){    
    //add new step to sequence 
    let newStep = this.generateRandomPanelSequence();    
    this.aiPanelSequence.push(newStep);
    //now update player sequence to match it
    this.playerPanelSequence.push(newStep);
    //update turn.
    this.turn = ++this.turn;
  }

  aiPlaySequence(panelId = undefined, aiCurrentTurn = undefined){
    let sequenceToPlay = this.aiPanelSequence,
        panelToPlay;

    if(!aiCurrentTurn){
      aiCurrentTurn = 0;                              
    }
    if(panelId){
      this.deactivatePanel(panelId);
      //check to see if ai  has played full sequence, and if it has, update turn
      if(aiCurrentTurn === this.turn){                    
        return true;
      }      
    }
    aiCurrentTurn += 1;
    panelToPlay = this.aiPanelSequence[aiCurrentTurn-1];
    //activate current panel with newPanelId
    this.activatePanel(panelToPlay);
    //call this function again after pnaelPlaySpeed amount of time
    window.setTimeout(this.aiPlaySequence.bind(this, panelToPlay, aiCurrentTurn), this.panelPlaySpeed);
    return false;    
  }

  updateCount(){
    this.setState(() => ({
      count: this.turn
    }));
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
