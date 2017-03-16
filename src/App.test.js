import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from './App';

const app = new App();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
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



