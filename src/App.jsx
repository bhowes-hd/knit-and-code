import { useState } from "react";

import {} from "@google/model-viewer";
import "./App.css";
import { GlbGenerator } from "./GlbGenerator";

function App() {
  const glb = new GlbGenerator();
  setTimeout(() => {
    glb.generateGlb();
  }, 125);

  function viewerLoaded() {
    console.log("loaded!");
  }

  return (
    <div className="App">
      <h1>KNIT + CODE</h1>
      <div>
        <model-viewer
          alt="Google Model Viewer"
          src=""
          ar
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y"
        ></model-viewer>
      </div>

      <div className="card">
        <button onClick={() => glb.generateGlb()}>
          generate new iteration
        </button>
      </div>
      <p className="read-the-docs">
        Generative Mixed Reality app for the 2023 Pratt Shows
      </p>
    </div>
  );
}

export default App;
