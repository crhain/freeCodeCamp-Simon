import React from 'react';

class StrictButton extends React.Component{
  render(){
    return (
      <div id="strict">
        <div id="strict-indicator"></div>       
        <button id="strict-btn" onClick={ this.props.onStrictClick }></button>
        <label>Strict</label>        
      </div>
    );
  }
}

export default StrictButton;