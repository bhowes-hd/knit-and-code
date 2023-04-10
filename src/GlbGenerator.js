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

    const CostaSurface = (u, v, target) => {
      u = u * 2 * Math.PI;
      v = v * Math.PI;
      const pi = Math.PI;
      const cosu = Math.cos(u);
      const sinu = Math.sin(u);
      const cosv = Math.cos(v);
      const sinv = Math.sin(v);
      const cos2v = Math.cos(2 * v);
      const sin2v = Math.sin(2 * v);

      const x =
        cosu * sinv * sinv -
        (cos2v * cosu * sinu) / 2 -
        (sin2v * sinu * sinu) / 2;
      const y =
        sinu * sinv * sinv +
        (cos2v * sinu * cosu) / 2 -
        (sin2v * cosu * cosu) / 2;
      const z = cosv * sinv - cos2v / 2;

      target.set(x, y, z);
    };

    const geometry = new ParametricGeometry(CostaSurface, 100, 100);
    const mesh = new THREE.Mesh(geometry, mat);

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
