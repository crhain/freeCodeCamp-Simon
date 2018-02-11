/*renders a colored panel*/
import React from 'react';
import Sound from 'react-sound';

class Panel extends React.Component{
  render(){
    let panelIsOnClass = (this.props.panelClicked === this.props.id) ? " panel-on" : ""; 
    let soundUrl = "media/simonSound1.mp3";

    //get sound url
    switch(this.props.id){
      case "green":
        soundUrl = "media/simonSoundFade1.mp3";
        break;
      case "red":
        soundUrl = "media/simonSoundFade2.mp3";
        break;
      case "blue":
        soundUrl = "media/simonSoundFade3.mp3";
        break;
      case "yellow":
        soundUrl = "media/simonSoundFade4.mp3";
        break;
      case "error":
        soundUrl = "media/simonSoundFade5.mp3";
    }

    if(this.props.panelClicked === this.props.id) {
      return (      
        <div className={ "panel" + panelIsOnClass } id={this.props.id} 
              onMouseDown={ (event) => this.props.onPanelClick(this, event) }
              onTouchStart={ (event) => this.props.onPanelClick(this, event) }
              onMouseUp={ (event) => this.props.onPanelUnClick(this, event) }
              onTouchEnd={ (event) => this.props.onPanelUnClick(this, event) }  
              onMouseLeave={ (event) => this.props.onPanelUnClick(this, event) }
              onTouchMove={ (event) => this.props.onPanelUnClick(this, event) } >                        
              <Sound url={ soundUrl } playStatus={Sound.status.PLAYING} />
        </div>              
      );  
    } else {
      return (      
        <div className={ "panel" + panelIsOnClass } id={this.props.id} 
              onMouseDown={ (event) => this.props.onPanelClick(this, event) }
              onTouchStart={ (event) => this.props.onPanelClick(this, event) }
              onMouseUp={ (event) => this.props.onPanelUnClick(this, event) }
              onTouchEnd={ (event) => this.props.onPanelUnClick(this, event) }  
              onMouseLeave={ (event) => this.props.onPanelUnClick(this, event) }
              onTouchMove={ (event) => this.props.onPanelUnClick(this, event) } >                        
        </div>              
      );
    }         
        
  }
}

export default Panel;
