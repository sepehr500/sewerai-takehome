import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from "axios";
import './App.css';


export interface PipeParameters {
  diameter: number;
  material: string;
  shape: string;
}

export interface Frame {
  code: string;
  frame_url: string;
  id: string;
  pipe_parameters: PipeParameters;
}




axios.defaults.baseURL = "https://tyi19eoxij.execute-api.us-west-2.amazonaws.com/prod";

function App() {
  const [loading, setLoading] = useState(true);
  const [frame, setFrame] = useState<Frame | null>(null);
  useEffect(() => {
    axios.get<Frame>("/").then(({ data }) => {
      setFrame(data);
      setLoading(false);
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
