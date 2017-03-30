/*renders control panel with associated buttons and display*/
import React from 'react';
import CountDisplay from './CountDisplay'
import StrictButton from './StrictButton';


class Control extends React.Component{
  render(){
    return (
      <div>
        <h1>Simon(tm)</h1>
        <CountDisplay countDisplayText={ this.props.countDisplayText }/>
        <div id="start">
          <button id="start-btn" onClick={ this.props.onStartClick }></button>
          <label>Start</label>
        </div>  
        <StrictButton onStrictClick={ this.props.onStrictClick } strictOn={ this.props.strictOn } />
        <div id="on">
          <button id="on-btn" onClick={ this.props.onOnClick } ></button>
          <label>On/Off</label>
        </div>        
      </div>
    );
  }
}

export default Control;