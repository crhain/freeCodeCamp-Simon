/*renders control panel with associated buttons and display*/
import React from 'react';

class Control extends React.Component{
  render(){
    return (
      <div>
        <h1>Simon(tm)</h1>
        <div id="count-display">
          <div>{ this.props.countDisplayText }</div>
        </div>
        <div>Count</div>
        <button id="start-btn" onClick={ this.props.onStartClick }></button>
        <label>Start</label>
        <button id="strict-btn" onClick={ this.props.onStrictClick }></button>
        <label>Strict</label>
        <button id="on-btn" onClick={ this.props.onOnClick } ></button>
        <label>On/Off</label>        
      </div>
    );
  }
}

export default Control;