import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { } from '@google/model-viewer'
import astronaut from './assets/Astronaut.glb'
import './App.css'
import { GlbGenerator } from './GlbGenerator'



function App() {
  const [count, setCount] = useState(0)
  const glb = new GlbGenerator()
  setTimeout(() => {
    glb.generateGlb()
  }, 125)
  

  function viewerLoaded() {
    console.log('loaded!')
  }

  return (
    <div className="App">
      <div>
        <model-viewer alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum" src="" ar shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
      </div>
      <h1>PS:D!</h1>
      <div className="card">
        <button onClick={() => glb.generateGlb()}>
          generate new iteration
        </button>
      </div>
      <p className="read-the-docs">
        Proof of concept Mixed Reality app for the 2023 Pratt Shows
      </p>
    </div>
  )
}

export default App
