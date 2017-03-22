/*renders control panel with associated buttons and display*/
import React from 'react';

class Control extends React.Component{
  render(){
    return (
      <div>
        <div id="count">{ this.props.count }</div>
        <button id="start-btn" onClick={ this.props.onStartClick }>Start</button>
        <button id="strict-btn">Strict</button>
        <button id="on-btn" onClick={ this.props.onOnClick } >On/Off</button>        
      </div>
    );
  }
}

export default Control;