/*renders a colored panel*/
import React, { Component } from 'react';

class Panel extends React.Component{
  constructor(props){
    super(props);    
    this.panelSound = new Audio();
  }
  toggleOn(){
    const sound1 = "media/simonSound1.mp3",
        sound2 = "media/simonSound2.mp3",
        sound3 = "media/simonSound3.mp3",
        sound4 = "media/simonSound4.mp3";
    let currentSound = "";
        
        switch(this.props.id){
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
  toggleOff(){
    console.log('panel ' + this.props.id + ' turned off!'); 
  }
  render(){
    if(this.props.panelClicked === this.props.id){
      console.log('red panel was clicked and is now on');
      return (
        <div className="panel-on" id={this.props.id} onMouseUp={ () => this.props.onPanelUnClick(this) } onMouseLeave={ () => this.props.onPanelUnClick(this) } >
          <p>This is panel #{this.props.id}</p>
        </div>
      );
    }
    else{
      return (
        <div id={this.props.id} onMouseDown={ () => this.props.onPanelClick(this) } >
          <p>This is panel #{this.props.id}</p>
        </div>
      );
    }

  }
}

export default Panel;
