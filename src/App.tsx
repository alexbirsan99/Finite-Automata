/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Sketch from 'react-p5';
import State from './objects/state';
import StateLink from './objects/state-link';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { Configure } from './UI/ConfigureModal';
import p5 from 'p5';

const App = () => {

  let [showSettings, setShowSettings] = useState(false);

  let [noOfStates, setNoOfStates] = useState(0);

  let [hasBeenGenerated, setHasBeenGenerated] = useState(false);

  let states = useRef([] as State[]);

  let stateLinks= useRef([] as StateLink[]);

  let stateSelected: any;

  let [p5Var, setP5Var] = useState<any>();

  useEffect(() => {
    document.title = 'Finite Automata';

    hasBeenGenerated ? buildStates() : null;
  });

  let setup = (p5: any, parent: any) => {
    p5.createCanvas(p5.displayWidth, p5.displayHeight).parent(parent);
  }


  let draw = (p5: any) => {
    console.log('trigger');
    setP5Var(p5 as any);
    //console.log(states);
    stateLinks.current.forEach(element => {
      element.draw();
    });

    states.current.forEach(element => {
      if (element.isAbove(p5.mouseX, p5.mouseY) && stateSelected === element) {
        element.draw('#99cc00');
      } else {
        element.draw();
      }
    });
  }

  let mousePressed = (p5: any) => {
    states.current.forEach(element => {
      if (element.isAbove(p5.mouseX, p5.mouseY)) {
        stateSelected = element;
      }
    });
  }

  let mouseDragged = (p5: any) => {
    p5.clear();
    states.current.forEach((element, index) => {
      if (element.isAbove(p5.mouseX, p5.mouseY)) {
        if (element === stateSelected) {
          element.x = p5.mouseX;
          element.y = p5.mouseY;
        }
      }
    });
  }

  let mousedReleased = (p5: any) => {
    stateSelected = null;
  }

  let buildStatesTest = (p5: any) => {
    for (let i = 0; i < 5; i++) {
      let state;
      if(i === 0) {
        state = new State(p5, 300 + (200 * i), 200, i.toString(), true, false);
      } else {
        state = new State(p5, 300 + (200 * i), 200, i.toString(), false, false);
      }
      states.current.push(state);

      // e doar pt testare
      if (i === 2) {
        stateLinks.current.push(new StateLink(p5, states.current[i - 1], state, false, 'ab'));
      }
    }
  }

  let buildStates = () => {

    p5Var ? p5Var.clear() : null;

    states.current = [];
    for(let i = 0; i < noOfStates; i++) {
      states.current.push(new State(p5Var, 300 + (200 * i), 200, i.toString(), false, false));
    }
    setHasBeenGenerated(false);
  }

  return (
    <div>
      <Sketch setup={setup} draw={draw} mouseReleased={mousedReleased} mouseDragged={mouseDragged} mousePressed={mousePressed} />
      <div>
        <Button onClick={() => setShowSettings(true)} variant="primary" size="lg" className="btn-primary configure-btn">
          Configureaza
        </Button>

        <Configure showSettings = {showSettings} 
          onClose = {() => {
            setShowSettings(false);
          }}

          onGenerate = {(newNoOfStates:number) => {
            setShowSettings(false);
            setNoOfStates(newNoOfStates);
            setHasBeenGenerated(true);
          }}
        />

      </div>
    </div>
  );
}

export default App;
