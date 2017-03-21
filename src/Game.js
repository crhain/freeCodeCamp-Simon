/*renders game console with buttons and control panel*/
import React, { Component } from 'react';
import Control from './Control';
import Panel from './Panel';

class Game extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div id='game'>
        <Control id="control-panel" onStartClick={ this.props.onStartClick } />
        <Panel id='green' panelClicked={this.props.panelClicked} onPanelClick={ this.props.onPanelClick } onPanelUnClick={ this.props.onPanelUnClick } />
        <Panel id='red' panelClicked={this.props.panelClicked} onPanelClick={ this.props.onPanelClick } onPanelUnClick={ this.props.onPanelUnClick } />
        <Panel id='blue' panelClicked={this.props.panelClicked} onPanelClick={ this.props.onPanelClick } onPanelUnClick={ this.props.onPanelUnClick } />
        <Panel id='yellow' panelClicked={this.props.panelClicked} onPanelClick={ this.props.onPanelClick } onPanelUnClick={ this.props.onPanelUnClick } />
      </div>
    );
  }
}

Game.defaultProps = {
};

export default Game;
