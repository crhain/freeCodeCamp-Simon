import React from 'react';

class OnOffButton extends React.Component{
  render(){    
    return (
       <div id="on">
            <button id="on-btn" onClick={ this.props.onOnClick } ></button>
            <label>ON/OFF</label>
        </div>        
    );
  }
}

export default OnOffButton;