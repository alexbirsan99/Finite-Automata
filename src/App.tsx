import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Sketch from 'react-p5';

const App = () => {

  useEffect(() => {
    document.title = 'Finite Automata';
  });

  let setup = (p5:any, parent:any) => {
    p5.createCanvas(p5.displayWidth, p5.displayHeight).parent(parent);
  }


  let draw = (p5:any) => {
    p5.circle(50,50, 80)
  }

  return (
    <div>
      <Sketch setup={setup} draw = {draw} />
    </div>
  );
}

export default App;
