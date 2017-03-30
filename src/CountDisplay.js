/*renders control panel with associated buttons and display*/
import React from 'react';

class CountDisplay extends React.Component{
  render(){
    return (
      <div>        
        <div id="count-display">
          <div>{ this.props.countDisplayText }</div>
        </div>
        <div>Count</div>
      </div>
    );
  }
}

export default CountDisplay;