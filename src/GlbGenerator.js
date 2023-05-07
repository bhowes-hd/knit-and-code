import * as THREE from "three";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { Helper } from "./Helper";

class GlbGenerator {
  constructor() {
    this.scene = new THREE.Scene();
    this.helper = new Helper();
  }

  generateGlb() {
    this.modelViewer = document.querySelector("model-viewer");

    //clear scene and add mesh
    this.scene.remove.apply(this.scene, this.scene.children);

    //color scale for fibers
    const scale = this.helper.randomColorScale();

    //materials for fibers
    const lower = this.helper.map(Math.random(), 0, 1, 0.1, 0.4);
    const upper = this.helper.map(Math.random(), 0, 1, 0.6, 0.9);
    const materials = this.helper.createMaterials2(scale, 10, lower, upper);

    //create a set of curves
    const curves = [];

    //random values for enneper surface generation.
    const help = this.helper;
    let k = Math.round(help.map(Math.random(), 0, 1, 1, 2)); //number of petals -1
    let radius = Math.round(help.map(Math.random(), 0, 1, 3.8, 4.5)); //how far along the enneper radius (how big, how much curvature)

    //scale up for AR in show mode vs testing at home mode
    const arScale = 4.4;

    //enneper surface generation function
    function enneper(r, t, target) {
      //let k = 1;
      //let radius = 4.4;

      let delta = 1; //max radius allowed for each exponent (trials and errors)...
      let magnification;

      let sin = Math.sin;
      let cos = Math.cos;
      let pi = Math.PI;
      switch (k) {
        case 1:
          delta = (3 * 3.04) / 5;
          magnification = 1000;
          break;
        case 2:
          delta = (2.25 * 3.4) / 5;
          magnification = 1400;
          break;
        case 3:
          delta = (1.88 * 3.72) / 5;
          magnification = 1500;
          break;
        case 4:
          delta = (1.7 * 3.92) / 5;
          magnification = 1500;
          break;
        default:
          delta = (1.56 * 4.2) / 5;
          magnification = 1500;
      }
      r = ((r * radius) / 5) * delta;
      t = 2 * pi * t;
      var x, y, z;
      x =
        (1 / 2) *
        (r * cos(t) -
          (Math.pow(r, 2 * k + 1) / (2 * k + 1)) * cos((2 * k + 1) * t));
      y =
        (-1 / 2) *
        (r * sin(t) +
          (Math.pow(r, 2 * k + 1) / (2 * k + 1)) * sin((2 * k + 1) * t));
      z = (Math.pow(r, k + 1) / (k + 1)) * cos((k + 1) * t);

      target.set(y * arScale, z * arScale, x * arScale);
    }

    //driving surface for fibers
    const u = 49;
    let v = 99;
    //let v = Math.round(help.map(Math.random(), 0, 1, 100, 160));
    if (v % 2 == 0) {
      v = v - 1;
    }
    //console.log("v", v);
    const enn = new ParametricGeometry(enneper, u, v);

    //constants to key in the loop
    //how far does the mipdpoint shift from the center of the curve?
    const midShifter = Math.round(help.map(Math.random(), 0, 1, -3, 3));
    //array of vectors to store the points
    const points = [];
    const enneperPositionBuffer = enn.attributes.position.array;
    for (let i = 0; i < enneperPositionBuffer.length; i = i + 3) {
      points.push(
        new THREE.Vector3(
          enneperPositionBuffer[i],
          enneperPositionBuffer[i + 1],
          enneperPositionBuffer[i + 2]
        )
      );
    }

    //loop over the positions in the buffer geometry and make curves
    const arr = enn.attributes.position.array;
    for (let i = 0; i < points.length; i = i + (u + 1)) {
      //start point
      const startIndex = Math.round(i + (u + 1) * 0.2);
      // console.log("i", i);
      // console.log("start index", startIndex);
      const start = points[startIndex];

      //mid point
      let shift = midShifter * (v + 1);
      let midIndex = i + (u + 1) * 0.6;
      midIndex = Math.round(midIndex + shift);
      // console.log("mid index", midIndex);
      // console.log("mid index/3", midIndex / 3)

      //if the shifted value is less than 0 or greater than the array length, wrap it
      const mid = help.wrapArrayIndex(points, midIndex);

      //end point
      const endIndex = i + u;
      // console.log("endIndex", endIndex);
      // console.log("endIndex/3", endIndex / 3);
      const end = points[endIndex];

      //pipes
      const crv = new THREE.CatmullRomCurve3([start, mid, end]);
      curves.push(crv);
    }

    //segment the curves, make tubes, assign materials, add to scene
    for (let i = 0; i < curves.length; i++) {
      const crvs = this.helper.breakCurve(
        curves[i],
        this.helper.map(Math.random(), 0, 1, 10, 20)
      );
      const tubes = this.helper.createTubes(
        crvs,
        this.helper.map(Math.random(), 0, 1, 0.001 * arScale, 0.01 * arScale)
      );
      const meshes = this.helper.randomMaterialize(tubes, materials);
      meshes.map((mesh) => {
        this.scene.add(mesh);
      });
    }

    //set glb property for model viewer to pick up
    const gltfX = new GLTFExporter();
    gltfX.parse(
      this.scene,
      (gltf) => {
        const blob = new Blob(
          [gltf],
          { type: "application/octet-stream" },
          "scene.glb"
        );
        this.modelViewer.src = URL.createObjectURL(blob);
      },
      (err) => {
        console.log(err);
      },
      { binary: true }
    );
  }
}

export { GlbGenerator };
