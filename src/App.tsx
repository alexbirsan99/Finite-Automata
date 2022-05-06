import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Sketch from 'react-p5';
import State from './objects/state';
import { clear } from 'console';

const App = () => {

  let states: State[] = [];

  let stateSelected: any;

  useEffect(() => {
    document.title = 'Finite Automata';
  });

  let setup = (p5: any, parent: any) => {
    p5.createCanvas(p5.displayWidth, p5.displayHeight).parent(parent);
    buildStates(p5);
  }


  let draw = (p5: any) => {
    states.forEach(element => {
      if (element.hoverOnState(p5.mouseX, p5.mouseY)) {
        element.draw('rgb(0,255,255)');
      } else {
        element.draw();
      }
    });
  }

  let mousePressed = (p5: any) => {
    states.forEach(element => {
      if (element.hoverOnState(p5.mouseX, p5.mouseY)) {
        stateSelected = element;
      }
    });
  }

  let mouseDragged = (p5:any) => {
    p5.clear();
    states.forEach(element => {
      if (element.hoverOnState(p5.mouseX, p5.mouseY)) {
        if(element === stateSelected) {
          element.x = p5.mouseX;
          element.y = p5.mouseY;
        }
      }
    });
  }

  let mousedReleased = (p5:any) => {
    stateSelected = null;
  }

  let buildStates = (p5: any) => {
    for (let i = 0; i < 5; i++) {
      states.push(new State(p5, 200 + (100 * i), 200 + (100 * i), i.toString()));
    }
  }

  return (
    <div>
      <Sketch setup={setup} draw={draw} mouseReleased = {mousedReleased} mouseDragged = {mouseDragged} mousePressed={mousePressed} />
    </div>
  );
}

export default App;
