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
    const materials = this.helper.createMaterials(scale, 10);

    //create a set of curves
    const curves = [];

    //create a mesh & add it to the scene

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0.88, 0.88, 0.88),
      flatShading: true,
      side: THREE.DoubleSide,
    });
    mat.DoubleSide = true;

    //random values for enneper surface generation.
    const help = this.helper;
    let k = Math.round(help.map(Math.random(), 0, 1, 1, 2)); //number of petals -1
    let radius = Math.round(help.map(Math.random(), 0, 1, 3.8, 4.5)); //how far along the enneper radius (how big, how much curvature)

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

      target.set(y, z, x);
    }

    //driving surface for fibers
    const u = 49;
    let v = 99;
    //let v = Math.round(help.map(Math.random(), 0, 1, 100, 200));
    if (v % 2 == 0) {
      v = v - 1;
    }
    const enn = new ParametricGeometry(enneper, u, v);

    //constants to key in the loop
    const midShifter = Math.round(help.map(Math.random(), 0, 1, -3, 3));
    //const midShifter = 0;
    //console.log(midShifter);

    //loop over the positions in the buffer geometry and make curves
    const arr = enn.attributes.position.array;
    for (let i = 0; i < arr.length; i = i + (u + 1) * 3) {
      //start point
      const startIndex = Math.round(i + (u + 1) * 3 * 0.2);
      // console.log("i", i);
      // console.log("i/3", i / 3);
      // console.log("start index", startIndex);
      // console.log("start index/3", startIndex / 3);
      const start = new THREE.Vector3(
        arr[startIndex],
        arr[startIndex + 1],
        arr[startIndex + 2]
      );

      //mid point
      let shift = midShifter * (v + 1) * 3;
      let midIndex = i + (u + 1) * 3 * 0.6;
      midIndex = Math.round(midIndex + shift);
      // console.log("mid index", midIndex);
      // console.log("mid index/3", midIndex / 3);

      //if the shifted value is less than 0 or greater than the array length, wrap it
      const mid = new THREE.Vector3(
        help.wrapArrayIndex(arr, midIndex),
        help.wrapArrayIndex(arr, midIndex + 1),
        help.wrapArrayIndex(arr, midIndex + 2)
      );

      //end point
      const endIndex = i + u * 3;
      // console.log("endIndex", endIndex);
      // console.log("endIndex/3", endIndex / 3);
      const end = new THREE.Vector3(
        arr[endIndex],
        arr[endIndex + 1],
        arr[endIndex + 2]
      );

      //pipes
      const crv = new THREE.CatmullRomCurve3([start, mid, end]);
      curves.push(crv);
    }

    //segment the curves, make tubes, assign materials, add to scene
    for (let i = 0; i < curves.length; i++) {
      const crvs = this.helper.breakCurve(curves[i], 20);
      const tubes = this.helper.createTubes(
        crvs,
        this.helper.map(Math.random(), 0, 1, 0.001, 0.01)
      );
      const meshes = this.helper.randomMaterialize(tubes, materials);
      meshes.map((mesh) => {
        this.scene.add(mesh);
      });
    }
    //const mesh = new THREE.Mesh(enn, mat);
    //this.scene.add(mesh);

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
