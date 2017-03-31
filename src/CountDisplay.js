/*renders control panel with associated buttons and display*/
import React from 'react';

class CountDisplay extends React.Component{
  render(){
    let isOn = this.props.isOn ? "" : "is-off";  
    return (
      <div id="count">        
        <div id="count-display">
          <div className={isOn}>{ this.props.countDisplayText }</div>
        </div>
        <div>COUNT</div>
      </div>
    );
  }
}

export default CountDisplay;