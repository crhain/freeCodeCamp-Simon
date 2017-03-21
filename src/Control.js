/*renders control panel with associated buttons and display*/
import React from 'react';

class Control extends React.Component{
  render(){
    return (
      <div>
        <button id="start-btn" onClick={ this.props.onStartClick }>Start</button>
        <p>This is my control</p>
      </div>
    );
  }
}

export default Control;