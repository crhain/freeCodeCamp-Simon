/*renders control panel with associated buttons and display*/
import React from 'react';

class Control extends React.Component{
  render(){
    return (
      <div>
        <div id="count">00</div>
        <button id="start-btn" onClick={ this.props.onStartClick }>Start</button>
        <button id="strict-btn">Strict</button>
        <button id="on-btn">On/Off</button>        
      </div>
    );
  }
}

export default Control;