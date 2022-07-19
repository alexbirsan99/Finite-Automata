/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Sketch from 'react-p5';
import State from './objects/state';
import StateLink from './objects/state-link';
import Button from 'react-bootstrap/Button';
import { Configure } from './UI/ConfigureModal';
import p5 from 'p5';
import { Utils } from './objects/utils';

const App = () => {

  let [showSettings, setShowSettings] = useState(false);

  let [noOfStates, setNoOfStates] = useState(0);

  let [hasBeenGenerated, setHasBeenGenerated] = useState(false);

  let states = useRef([] as State[]);

  let [p5Var, setP5Var] = useState<any>();

  useEffect(() => {
    document.title = 'Finite Automata';

    if (hasBeenGenerated === true) {
      p5Var ? p5Var.clear() : null;
      states.current = Utils.generateStates(noOfStates, p5Var);
      Utils.buildLinks(states.current, p5Var);
      setHasBeenGenerated(false);
    }
  });

  let setup = (p5: any, parent: any) => {
    p5.createCanvas(p5.displayWidth, p5.displayHeight).parent(parent);
  }


  let draw = (p5: any) => {
    setP5Var(p5 as any);

    // deseneaza linkurile state-urilor
    states.current.forEach(element => element.links.forEach(link => link.draw()));

    // deseneaza state-urile
    states.current.forEach(element => element.draw());
  }

  let mousePressed = (p5: any) => {
    states.current.forEach(element => element.onClick());
  }

  let mouseDragged = (p5: any) => {
    p5.clear();
    states.current.forEach(element => element.onDrag());
  }

  let mousedReleased = (p5: any) => {
    states.current.forEach(element => element.onRelease());
  }

  function getVisibility() {
    return states.current.length > 0 ? "visible" : "hidden";
  }

  return (
    <div>
      <Sketch setup={setup} draw={draw} mouseReleased={mousedReleased} mouseDragged={mouseDragged} mousePressed={mousePressed} />
      <div className="row configure-row">
        <div className="col-sm-7">
          <input className={`${getVisibility()} form-control language`} type="text" placeholder="Limbaj..." />
        </div>
        <div className="col-sm-3">
          <Button className={`${getVisibility()} btn-primary start-btn`} variant="primary" size="lg">
            Parcurge automatismul
          </Button>
        </div>
        <div className="col-sm-2">
          <Button className="btn-primary configure-btn" onClick={() => setShowSettings(true)} variant="primary" size="lg" >
            Configureaza
          </Button>
        </div>

        <Configure showSettings={showSettings}
          onClose={() => {
            setShowSettings(false);
          }}

          onGenerate={(newNoOfStates: number) => {
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
