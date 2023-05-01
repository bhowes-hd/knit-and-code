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
        Knit + Code is a mixed reality installation blending digital and
        physical experiences into an immersive spectacle. At its core is a
        minimal 3D-knit textile dynamically lit with a range of slowly changing
        lights. This physical form creates a canvas for a digital mixed reality
        experience: Viewers scan a QR code below the sculpture to launch into
        the digital space, where a custom algorithm generates multi-colored
        fibrous models that extend beyond the confines of the physical
        structure. Knit + Code blurs the boundaries of digital fabrication and
        spatial design, inviting viewers to explore the space in new ways.
      </p>
      <p className="read-the-docs">
        Knit + Code is an interdisciplinary design collaboration made possible
        by the Pratt Institute School of Design. It was designed and made in
        Brooklyn NY for the Pratt Shows 2023: Design show.
      </p>
      <br></br>
      <h3>Design Team</h3>
      <div>
        <p className="team-member">Hannah Berkin-Harper - Industrial Design</p>
        <p className="team-member">Benjamin Howes - Interior Design</p>
        <p className="team-member">Tracey Weisman - Knit Lab</p>
      </div>
      <br></br>
      <h3>Fabrication Team</h3>
      <div>
        <p className="team-member">Daryl Shelton</p>
        <p className="team-member">Emma Winick</p>
        <p className="team-member">Joanne Wu</p>
      </div>
    </div>
  );
}

export default App;
