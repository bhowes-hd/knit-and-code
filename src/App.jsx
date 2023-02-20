import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { } from '@google/model-viewer'
import astronaut from './assets/Astronaut.glb'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <model-viewer alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum" src={astronaut} ar shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
      </div>
      <h1>PS:D! Mixed Reality POC</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Proof of concept Mixed Reality app for the 2023 Pratt Shows
      </p>
    </div>
  )
}

export default App
