import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Sketch from 'react-p5';
import State from './objects/state';
import { clear } from 'console';
import StateLink from './objects/state-link';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { Configure } from './UI/ConfigureModal';

const App = () => {

  let [showSettings, setShowSettings] = useState(false);

  let states: State[] = [];

  let stateLinks: StateLink[] = [];

  let stateSelected: any;

  useEffect(() => {
    document.title = 'Finite Automata';
  });

  let setup = (p5: any, parent: any) => {
    p5.createCanvas(p5.displayWidth, p5.displayHeight).parent(parent);
    buildStates(p5);
  }


  let draw = (p5: any) => {
    stateLinks.forEach(element => {
      element.draw();
    });

    states.forEach(element => {
      if (element.isAbove(p5.mouseX, p5.mouseY) && stateSelected === element) {
        element.draw('#99cc00');
      } else {
        element.draw();
      }
    });
  }

  let mousePressed = (p5: any) => {
    states.forEach(element => {
      if (element.isAbove(p5.mouseX, p5.mouseY)) {
        stateSelected = element;
      }
    });
  }

  let mouseDragged = (p5: any) => {
    p5.clear();
    states.forEach((element, index) => {
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

  let buildStates = (p5: any) => {
    for (let i = 0; i < 5; i++) {
      let state = new State(p5, 300 + (200 * i), 200, i.toString());
      states.push(state);

      // e doar pt testare
      if (i === 2) {
        stateLinks.push(new StateLink(p5, states[i - 1], state, true));
      }
    }
  }

  return (
    <div>
      <Sketch setup={setup} draw={draw} mouseReleased={mousedReleased} mouseDragged={mouseDragged} mousePressed={mousePressed} />
      <Button onClick={() => setShowSettings(true)} variant="primary" size="lg" className="btn-primary configure-btn">
        Configureaza
      </Button>

      <Modal show={showSettings}>
        <Modal.Header closeButton onClick={() => setShowSettings(false)}>
          <Modal.Title>Configureaza automatismul</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Configure/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSettings(false)}>
            Renunta
          </Button>
          <Button variant="primary" onClick={() => setShowSettings(false)}>
            Aplica
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
