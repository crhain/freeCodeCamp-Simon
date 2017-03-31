import React from 'react';

class OnOffButton extends React.Component{
  render(){        
    let isOnClass = this.props.isOn ? "is-on" : "";  

    return (
    <div id="on">
        <label>OFF</label>
        <div id="on-btn-container">            
            <button id="on-btn" className={ isOnClass } onClick={ this.props.onOnClick } ></button>
        </div>
        <label>ON</label>
    </div>        
    );
  }
}

export default OnOffButton;