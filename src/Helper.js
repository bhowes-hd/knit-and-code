import * as THREE from "three";
import {
  interpolatePuRd,
  interpolateGreens,
  interpolateGreys,
  interpolateOranges,
} from "d3-scale-chromatic";

class Helper {
  constructor() {}

  //pass a value between 0 and 1, and get a mapped value back between low and high args
  map1(value, low, high) {
    const newval = value * (high - low) + high;
    return newval;
  }

  //map function logic from processing <3
  map(n, start1, stop1, start2, stop2) {
    const newval =
      ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    return newval;
  }

  //wrapped array index
  wrapArrayIndex(arr, index) {
    return arr[((index % arr.length) + arr.length) % arr.length];
  }

  //segment a catmullromcurve3 into n number of new catmullromcurve3 curves with random lengths using getpoints
  breakCurve(curve, segments) {
    const arr = [];

    let stepper = Math.ceil(this.map(Math.random(), 0, 1, 1, segments));
    while (stepper < 100) {
      const start = stepper;
      stepper = stepper + Math.ceil(this.map(Math.random(), 0, 1, 1, segments));
      const end = stepper;
      if (end >= 100) {
        break;
      }
      const sub = curve.getPoints(100).slice(start, end);
      const crv = new THREE.CatmullRomCurve3(sub);
      arr.push(crv);
    }
    return arr;
  }

  //create threejs tubes of a set radius from an array of threejs curves
  createTubes(curves, radius) {
    const arr = [];
    for (let i = 0; i < curves.length; i++) {
      const tube = new THREE.TubeGeometry(curves[i], 10, radius, 6, false);
      arr.push(tube);
    }
    return arr;
  }

  //randomly choose a d3 color scale from a static list of scales
  randomColorScale() {
    const arr = [
      interpolatePuRd,
      interpolateGreens,
      interpolateGreys,
      interpolateOranges,
    ];
    return this.wrapArrayIndex(arr, Math.floor(Math.random() * arr.length));
  }

  //create an array of threejs meshstandardmaterials using n evenly spaced colors from a d3 color scale
  createMaterials(scale, n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      const color = scale(i / n);

      const mat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.5,
        metalness: 0.5,
        side: THREE.DoubleSide,
        flatShading: true,
      });
      mat.DoubleSide = true;
      arr.push(mat);
    }
    return arr;
  }

  //create threejs meshes by randomly assigning materials from an input array to an input array of geometries
  randomMaterialize(geometries, materials) {
    const arr = [];
    for (let i = 0; i < geometries.length; i++) {
      const mesh = new THREE.Mesh(
        geometries[i],
        materials[Math.floor(Math.random() * materials.length)]
      );
      arr.push(mesh);
    }
    return arr;
  }
}

export { Helper };
