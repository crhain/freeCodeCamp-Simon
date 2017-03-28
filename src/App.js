//import React, { Component } from 'react';
import React from 'react';
import './App.css';
import Game from './Game';

class App extends React.Component {
  constructor(props){
    super(props);
    //set the games state object
    this.state = {
      countDisplayText: "",      
      activePanel: ''
    };
    this.isOn = false;
    this.isStrict = false;
    this.isGameRunning = false;
    this.isPlayerTurn = false;
    this.step = 0;    
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
    this.stepsToWin = 20; //number of steps before winning the game. 
    this.debug = false;  //set to true to step on debug mode

    //some constants
    this.ERROR_MESSAGE = "!!";
    this.ON_MESSAGE = "--";
    this.PLAY_SPEED = 1000; //speed in miliseconds (so 1000 = 1 second)
  }
  render() {
    return <Game panelClicked={this.state.activePanel} 
            onPanelClick={this.handlePanelClick} 
            onPanelUnClick={ this.handlePanelUnClick }
            onStartClick={ this.handleStartButtonClick }
            onOnClick={ this.handleOnButtonClick }
            onStrictClick={ this.handleStrictButtonClick }
            countDisplayText={this.state.countDisplayText}
            />;
  }
  /********************************************************************/
  /*Wrapper methods for control clicks                                */
  /********************************************************************/

  //handlePanelClick(panelClicked: object, clickEvent: object) -
  // handles activation of panels
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
  //handlePanelUnClick(clickEvent: object) - deactivate a panel when it loses focus
  // or mouse button is released
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
  //handleOnButtonClick(clickEvent: object) - turn game on and off
  handleOnButtonClick(clickEvent){
    /*Toggles on state*/
    this.toggleOnMode();        
  }
  //handleStartButtonClick(clickEvent: object) - start the ball rolling
  handleStartButtonClick(clickEvent){        
    //button only works if the console turned on and game not currently running.
    this.startGame();
    
  }
  //handleStrictButtonClick(clickEvent: object) - switch on strict mode
  handleStrictButtonClick(clickEvent){
    /* toggles strict mode */
    if(this.isOn){
      this.toggleStrictMode();
      console.log('strict mode is:' + this.isStrict);    
    }    
  }
  /********************************************************************/
  /*Game Engine                                                       */
  /********************************************************************/
  toggleOnMode(state){    
    if(state === undefined){
      this.isOn = !this.isOn;
    } else{
      this.isOn = !!state;
    }    
    this.isGameRunning = false;
    this.toggleStrictMode(false);    
    this.resetGame(this.isOn ? this.ON_MESSAGE : "");
  }
  startGame(){
    if(this.isOn){
      if(!this.isGameRunning){
        //console.log('start button clicked!');
        this.isGameRunning = true;
        this.resetGame();      
        this.aiPlayerTurn();
      } else {
        this.resetGame();
        this.aiPlayerTurn();
      } 
    } else if(this.debug){
      this.isGameRunning = true;
      this.resetGame();
      this.aiPlayerTurn();    
    }
  }
  //resetGame() - resests game state and interface
  resetGame(countDisplayText){
    if(countDisplayText === undefined){
      countDisplayText = "00";
    }
    this.panelSound.pause();
    this.aiPanelSequence = [];
    this.playerPanelSequence = [];
    this.step = 0;
    this.setState((prevState, props) => ({
      countDisplayText: countDisplayText,
      activePanel: ''
    }));    
  }
  toggleStrictMode(state){
    this.isStrict = state === undefined ? !this.isStrict : !!state;
  }  
  //activatePanel(panelID: string) - activates panel with panelID (ex. "green")
  activatePanel(panelId){    
    let newPanelId = panelId;
    this.setState((prevState, props) => ({
      activePanel: panelId
    }));
    if(this.isPlayerTurn){
      if(!this.isCorrectPanel(panelId)){
        this.handleError();
        return false;
      } 
    }    
    this.playPanelSound(newPanelId);
    return true;              
  }
  //deactivatePanel(panelID: string) - deactivates panel with panelID (ex. "green")
  deactivatePanel(panelId){
    let newPanelId = panelId;
    this.setState((prevSate, props) => ({
      activePanel: ''
    }));
    if(this.isPlayerTurn){
      if(!this.isCorrectPanel(panelId)){
        newPanelId = "error";
      } 
    }    
    this.stopPanelSound(newPanelId);    
  }
  //isCorrectPanel(panelId: string)
  isCorrectPanel(panelId){
    return panelId === this.playerPanelSequence[0];
  }
  //updateCountDisplayText(status: string) - updates count panel with current step and
  // can also pass optional status to update panel with.
  updateCountDisplayText(status = undefined){
    let update;
    if(status){
      update = status;
    } else{
      update = this.step;
    }
    this.setState(() => ({
      countDisplayText: update
    }));
  }
  //handleError() - handles errors on button presses
  handleError(){
    this.playPanelSound("error");
    this.updateCountDisplayText(this.ERROR_MESSAGE);        
  }
  //playPanelSound(panelID: string) - plays sound associated with panel
  // use panelID = 'error' to play error sound 
  playPanelSound(panelId){
    const sound1 = "media/simonSound1.mp3",
        sound2 = "media/simonSound2.mp3",
        sound3 = "media/simonSound3.mp3",
        sound4 = "media/simonSound4.mp3",
        soundError = sound4;
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
            case "error":
              currentSound = soundError; //temp sound
              break;
            default:
                console.log("WRONG ID FOR PANEL! CAN'T PLAY SOUND!");
        }        
        
      if(currentSound != ""){
        this.panelSound.src = currentSound;
        this.panelSound.play();
      }  
         
      //console.log('panel ' + panelId + ' turned on!');
  }
  //stopPanelSound(panelID: string) - plays sound associated with panel
  // use panelID = 'error' to play error sound 
  //NOTE: currently not used because sounds do not loop
  stopPanelSound(panelId){
    //console.log('panel ' + panelId + ' turned off!'); 
  }  
  //updatePlayerTurn(panelId: string) - main logic for evaluating player panel presses
  updatePlayerTurn(panelId){
    //1. check to see if panelId matches next item in sequence
    if(this.isCorrectPanel(panelId)){
      //2. if it does, then remove current item from sequence
      this.playerPanelSequence.shift();
      console.log("correct!");
      // 2a. check to see if sequence is over with. if it is, then switch to ai player
      //     and generate new sequence 
      if(this.playerPanelSequence.length < 1){
        this.isPlayerTurn = false;        
        window.setTimeout(this.aiPlayerTurn.bind(this), this.PLAY_SPEED);
      } 
    //3. it does not match, 
    } else {  
      //3.a. signal an error and trigger ai to play sequence again
      console.log("Incorrect!");
      //need something to disable player hitting button but not disable deactivating current button???      
      this.isPlayerTurn = false;
      if(this.isStrict){
        window.setTimeout(this.resetGame.bind(this), this.PLAY_SPEED);
      } else{
        this.playerPanelSequence = this.aiPanelSequence.slice();
        window.setTimeout(this.aiPlaySequence.bind(this), this.PLAY_SPEED);      
      }      
    }        
    return true;
  }
  //aiPlayerTurn() - game loop for ai turn
  aiPlayerTurn(){        
    //set player sequence to match ai sequence
    this.playerPanelSequence = this.aiPanelSequence.slice();
    //  update will add new step to sequence, make copy for player, and update step.
    this.aiUpdate();
    // play panel sequence
    this.aiPlaySequence();
    //update countDisplayText
    this.updateCountDisplayText();
    //switch back to player turn
  }
  //aiUPdate() - adds a new panel to sequence played by ai and increases step
  aiUpdate(){    
    //add new step to sequence 
    let newStep = this.generateRandomPanelSequence();    
    this.aiPanelSequence.push(newStep);
    //now update player sequence to match it
    this.playerPanelSequence.push(newStep);
    //update step.
    this.step = ++this.step;
  }
  //aiPLaySequence(panelID: string, aiCurrentStep: int) - plays current sequence of panels
  aiPlaySequence(panelId = undefined, aiCurrentStep = undefined){    
    //short circuit sequence if game switched off
    if(!this.isOn){ return true; }
    if(this.state.countDisplayText === this.ERROR_MESSAGE){
      this.updateCountDisplayText();     
    }
    let sequenceToPlay = this.aiPanelSequence,
        panelToPlay;
    //if this is first time running sequence, set some state
    if(!aiCurrentStep){
      aiCurrentStep = 0;
      this.isPlayerTurn = false;                              
    }
    //if function called recursively
    if(panelId){
      this.deactivatePanel(panelId);
      //stop recursive call if sequence complete
      if(aiCurrentStep === this.step){
        this.isPlayerTurn = true;                    
        return true;
      } 
      //a pause between notes
      window.setTimeout(this.aiPlaySequence.bind(this, undefined, aiCurrentStep), this.PLAY_SPEED/4);
      return true;           
    }
    aiCurrentStep += 1;
    panelToPlay = this.aiPanelSequence[aiCurrentStep-1];
    this.activatePanel(panelToPlay);
    //call next step in sequence
    window.setTimeout(this.aiPlaySequence.bind(this, panelToPlay, aiCurrentStep), this.PLAY_SPEED);
    return false;    
  }    
  //generateRandomPanelSequence(random: int) - returns a random panelId string
  generateRandomPanelSequence(random = undefined){
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
  //getRandomIntInclusive(min: int, max: int) - returns a random number between
  // min and max that includes both.
  getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;  
  }
}

App.defaultProps = {
};

export default App;
