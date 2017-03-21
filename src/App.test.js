import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from './App';

const app = new App();

beforeEach(() => {
 app.state = {
   isOn: false,
   isStrict: false,
   isGameRunning: false,
   isSuccess: true,
   steps: 0,
   sequence: [],
   activePanel: ''
 } 
 
});

describe('App:', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});


describe('handlePanelClick(panelClicked, clickEvent):', () => {
  it('', () => {

  });
});

describe('handlePanelUnClick(panelClicked, clickEvent):', () => {
  it('', () => {

  });
});

describe('handleOnButtonClick(clickEvent):', () => {
  it('fires correctly and returns true', () => {
    expect(app.handleOnButtonClick()).toBe(true);
  });
});

describe('handleStartButtonClick(clickEvent):', () => {
  it('does not run if game not on', () => {
    expect(app.handleStartButtonClick()).toBe(false);
    
  });
  it('sets isGameRunning to true', () => {
    app.state = Object.assign(app.state, { isOn: true, isGameRunning: false }); 
    app.handleStartButtonClick();
    expect(app.state.isGameRunning).toBe(true);    
  });
  it('does not run if game is already running', () => {
    expect(app.handleStartButtonClick()).toBe(false);
  });

});

describe('handleStrictButtonClick(clickEvent):', () => {
  it('fires correctly and returns true', () => {
    expect(app.handleStrictButtonClick()).toBe(true);
  });
});

describe('activatePanel(panelId):', () => {
  it('', () => {

  });
});

describe('deactivatePanel(panelId):', () => {
  it('', () => {

  });
});

describe('takeTurn():', () => {
  it('', () => {

  });
});

describe('getRandomIntInclusive(min, max):', () => {
  it('returns random number between 0 and 5', ()=>{
    var result = app.getRandomIntInclusive(0, 5);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(5);
  });
});
describe('generateRandomPanelSequence(random):', () => {
  it('should return correct color string for number', ()=>{
    const colors = ['green', 'red', 'blue', 'yellow'];
    var result;
    for(let i = 1; i <= colors.length; i++){
      result = app.generateRandomPanelSequence(i);
      expect(result).toBe(colors[i-1]);
    }         
  });
});



