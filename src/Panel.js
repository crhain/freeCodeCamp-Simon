/*renders a colored panel*/
import React, { Component } from 'react';

class Panel extends React.Component{
  constructor(props){
    super(props);
  }
  toggleOn(){
    console.log('panel ' + this.props.id + ' turned on!');
  }
  toggleOff(){
    console.log('panel ' + this.props.id + ' turned off!'); 
  }
  render(){
    if(this.props.panelClicked === this.props.id){
      console.log('red panel was clicked and is now on');
      return (
        <div className="panel-on" id={this.props.id} onMouseDown={ () => this.props.onPanelClick(this) } onMouseUp={ () => this.props.onPanelUnClick(this) } onMouseLeave={ () => this.props.onPanelUnClick(this) } >
          <p>This is panel #{this.props.id}</p>
        </div>
      );
    }
    else{
      return (
        <div id={this.props.id} onMouseDown={ () => this.props.onPanelClick(this) } onMouseUp={ () => this.props.onPanelUnClick(this) } >
          <p>This is panel #{this.props.id}</p>
        </div>
      );
    }

  }
}

export default Panel;
