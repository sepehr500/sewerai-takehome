import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Spinner } from 'evergreen-ui'
import './App.css';
import { Form } from './components/Form';


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
    <div className="container mx-auto">
      <div className="flex items-center justify-center h-screen">
        {loading &&
          <div className="items-center justify-center">
            <Spinner />
          </div>
        }
        {
          !loading && frame && (
            <>
              <div className="mr-5">
                <img alt={frame?.code} src={frame?.frame_url} />
              </div>
              <div>
                <Form frame={frame} />
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}

export default App;
