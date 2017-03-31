/*renders a colored panel*/
import React from 'react';

class Panel extends React.Component{
  render(){
    let panelIsOnClass = (this.props.panelClicked === this.props.id) ? " panel-on" : "";          
      return (
        <div className={ "panel" + panelIsOnClass } id={this.props.id} 
              onMouseDown={ (event) => this.props.onPanelClick(this, event) }
              onMouseUp={ (event) => this.props.onPanelUnClick(this, event) } 
              onMouseLeave={ (event) => this.props.onPanelUnClick(this, event) } >          
        </div>
      );  
  }
}

export default Panel;
