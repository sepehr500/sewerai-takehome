import React, { useState, useEffect } from 'react';
import companyLogo from "./img/sewerai-logo-black.png"
import Magnifier from "react-magnifier";
import axios from "axios";
import { Spinner, Badge } from 'evergreen-ui'
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

  const fetchFrame = async () => {
    const { data } = await axios.get<Frame>("/");
    setFrame(data);
    setLoading(false);
  }

  const handleSubmit = async (formValues) => {
    if (frame) {
      setLoading(true)
      await axios.post("/" + frame?.id, formValues)
      await fetchFrame();
    }
  }

  console.log(Magnifier);

  return (
    <div className="container mx-auto">
      <h1 className="flex items-center justify-center mt-12">
        <img className="w-32 mr-3" alt="Sewer AI logo" src={companyLogo} />
        <span className="text-2xl">
          Image labeling tool
        </span>
      </h1>
      <div className="flex mt-20 justify-center">
        {loading &&
          <div className="items-center justify-center">
            <Spinner />
          </div>
        }
        {
          !loading && frame && (
            <>
              <div className="mr-5 w-2/3">
                <Magnifier className="h-full w-full" src={frame?.frame_url} />
              </div>
              <div className="w-1/3">
                <h2 className="font-bold mb-3">Code: {frame.code}</h2>
                <div className="flex-col mb-6">
                  <div>Diamter: <Badge color="teal"> {frame.pipe_parameters.diameter} </Badge>
                  </div>
                  <div>
                    Material: <Badge color="orange"> {frame.pipe_parameters.material} </Badge>
                  </div>
                  <div>
                    Shape: <Badge color="purple"> {frame.pipe_parameters.shape} </Badge>
                  </div>
                </div>
                <Form frame={frame} onSubmit={handleSubmit} />
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}

export default App;
