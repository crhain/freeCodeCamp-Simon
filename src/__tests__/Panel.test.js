import React from 'react';
import ReactDOM from 'react-dom';
import Panel from 'Panel';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Panel />, div);  
});  

it('panel lights up when clicked', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Panel id="green" panelClicked="green" />, div);    
});