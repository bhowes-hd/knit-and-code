import * as THREE from "three";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";
import { ParametricGeometries } from "three/examples/jsm/geometries/ParametricGeometries";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

class GlbGenerator {
  constructor() {
    this.scene = new THREE.Scene();

    //this.generateGlb()
  }

  generateGlb() {
    this.modelViewer = document.querySelector("model-viewer");

    //clear scene and add mesh
    this.scene.remove.apply(this.scene, this.scene.children);

    //create a mesh & add it to the scene

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0.88, 0.88, 0.88),
      flatShading: true,
      side: THREE.DoubleSide,
    });

    function enneper(r, t, target) {
      let k = 4; //number of petals -1
      let radius = 4.5; //how far along the enneper radius (how big, how much curvature)

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

    //
    //const mob = new ParametricGeometry(ParametricGeometries.mobius3d, 48, 48);
    const enn = new ParametricGeometry(enneper, 20, 200);
    const mesh = new THREE.Mesh(enn, mat);
    this.scene.add(mesh);

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
