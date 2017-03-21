/*renders a colored panel*/
import React from 'react';

class Panel extends React.Component{
  render(){
    if(this.props.panelClicked === this.props.id){      
      return (
        <div className="panel-on" id={this.props.id} 
              onMouseUp={ (event) => this.props.onPanelUnClick(this, event) } 
              onMouseLeave={ (event) => this.props.onPanelUnClick(this, event) } >
          <p>This is panel #{this.props.id}</p>
        </div>
      );
    }
    else{
      return (
        <div id={this.props.id} onMouseDown={ () => this.props.onPanelClick(this) } >
          <p>This is panel #{this.props.id}</p>
        </div>
      );
    }

  }
}

export default Panel;
