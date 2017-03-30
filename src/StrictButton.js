import React from 'react';

class StrictButton extends React.Component{
  render(){
    let isOn = this.props.strictOn ? "is-on" : "";  
    console.log("strict mode is: " + isOn);  
    return (
      <div id="strict">
        <div id="strict-indicator" className={isOn}></div>       
        <button id="strict-btn" onClick={ this.props.onStrictClick }></button>
        <label>Strict</label>        
      </div>
    );
  }
}

export default StrictButton;