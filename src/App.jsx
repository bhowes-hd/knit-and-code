import { useState } from "react";

import {} from "@google/model-viewer";
import "./App.css";
import { GlbGenerator } from "./GlbGenerator";

function App() {
  const glb = new GlbGenerator();
  let modelViewer;
  setTimeout(() => {
    modelViewer = document.querySelector("model-viewer");
    glb.generateGlb();
  }, 750);

  function viewerLoaded() {
    console.log("loaded!");
  }

  return (
    <div className="App">
      <h2>KNIT + CODE</h2>
      <p className="read-the-docs">Augmentented Reality App</p>
      <div>
        <model-viewer
          alt="Google Model Viewer"
          src=""
          ar
          shadow-intensity="1.5"
          shadow-softness="0.8"
          exposure="0.5"
          camera-controls
          touch-action="pan-y"
          style={{ justifyContent: "center" }}
        >
          <button
            slot="ar-button"
            style={{
              position: "absolute",
              bottom: "6px",
              transform: "translateX(-50%)",
            }}
            onClick={() => {
              if (modelViewer.canActivateAR) {
                modelViewer.activateAR();
              }
            }}
          >
            view in your space
          </button>
        </model-viewer>
      </div>
      <br></br>
      <div>
        <button onClick={() => glb.generateGlb()}>generate new 3d model</button>
      </div>
      <br></br>
      <p>
        Use the buttons above to generate new 3d models, and to view a model in
        your space on AR-enabled devices.
      </p>
      <br></br>
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
      <br></br>
      <p className="read-the-docs">
        Knit + Code is an interdisciplinary design collaboration made possible
        by the{" "}
        <a href="https://www.pratt.edu/design/" target="_blank">
          Pratt Institute School of Design.
        </a>{" "}
        It was designed and fabricated in Brooklyn, NY for{" "}
        <a
          href="https://www.pratt.edu/events/pratt-shows-design/"
          target="_blank"
        >
          Pratt Shows 2023: Design
        </a>{" "}
        by a team of Pratt School of Design faculty and students.
      </p>
      <br></br>
      <h3>Design Team</h3>
      <div>
        <p>
          <a href="https://www.hbh-design.com/" target="_blank">
            Hannah Berkin-Harper
          </a>
          : Industrial Design
        </p>
        <p>
          <a href="https://www.howes.studio/" target="_blank">
            Benjamin Howes
          </a>
          : Interior Design
        </p>
        <p>
          <a
            href="https://issuu.com/traceyweisman/docs/tw_selectedworks"
            target="_blank"
          >
            Tracey Weisman
          </a>
          : Knit Lab
        </p>
      </div>
      <br></br>
      <h3>Fabrication Team</h3>
      <div>
        <p>
          <a
            href="https://instagram.com/sb.esbee?igshid=NTc4MTIwNjQ2YQ=="
            target="_blank"
          >
            Shayna Block
          </a>
          : Fashion Design
        </p>
        <p>
          <a href="https://malekr.weebly.com/" target="_blank">
            Malek Rasmussen
          </a>
          : Fashion Design
        </p>
        <p>
          <a
            href="https://instagram.com/drylshltndesign?igshid=NTc4MTIwNjQ2YQ=="
            target="_blank"
          >
            Daryl Shelton
          </a>
          : Industrial Design
        </p>
        <p>
          <a href="https://www.emmawinickdesign.com/" target="_blank">
            Emma Winick
          </a>
          : Industrial Design
        </p>
        <p>
          <a href="https://www.designjlw.com/" target="_blank">
            Joanne Wu
          </a>
          : Industrial Design
        </p>
      </div>
      <br></br>
      <p className="read-the-docs">
        This website is open source software. Check out our{" "}
        <a href="https://github.com/bhowes-hd/knit-and-code" target="_blank">
          Github repository here
        </a>
      </p>
      <p className="read-the-docs">
        All rights reserved by the design team and Pratt Institute
      </p>
    </div>
  );
}

export default App;
