/*renders a colored panel*/
import React from 'react';

class Panel extends React.Component{
  render(){
    if(this.props.panelClicked === this.props.id){      
      return (
        <div className="panel panel-on" id={this.props.id} 
              onMouseUp={ (event) => this.props.onPanelUnClick(this, event) } 
              onMouseLeave={ (event) => this.props.onPanelUnClick(this, event) } >          
        </div>
      );
    }
    else{
      return (
        <div className="panel" id={this.props.id} onMouseDown={ () => this.props.onPanelClick(this) } >          
        </div>
      );
    }

  }
}

export default Panel;
