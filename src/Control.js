/*renders control panel with associated buttons and display*/
import React from 'react';
import CountDisplay from './CountDisplay'
import StrictButton from './StrictButton';


class Control extends React.Component{
  render(){
    return (
      <div id="control-panel">
        <h1>Simon(tm)</h1>
        <div className="flex-row">
          <CountDisplay countDisplayText={ this.props.countDisplayText } isOn={this.props.isOn}/>
          <div id="start">
            <button id="start-btn" onClick={ this.props.onStartClick }></button>
            <label>START</label>
          </div>  
          <StrictButton onStrictClick={ this.props.onStrictClick } strictOn={ this.props.strictOn } />
        </div>
        <div className="flex-row">
          <div id="on">
            <button id="on-btn" onClick={ this.props.onOnClick } ></button>
            <label>ON/OFF</label>
          </div>        
        </div>            
      </div>
    );
  }
}

export default Control;