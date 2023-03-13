import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'

class GlbGenerator {
    constructor() {

        this.scene = new THREE.Scene()
        
        //this.generateGlb()

    }

    generateGlb() {

        this.modelViewer = document.querySelector('model-viewer')

        //clear scene and add mesh
        this.scene.remove.apply(this.scene, this.scene.children)

        //create a mesh & add it to the scene
        let geo 
        const plato = Math.random()
        if (plato < 0.33) {
            geo = new THREE.DodecahedronGeometry(0.25)
        } 
        else if (plato < 0.66) {
            geo = new THREE.IcosahedronGeometry(0.25)
        }
        else {
            geo = new THREE.TetrahedronGeometry(0.25)
        }
        
        const mat = new THREE.MeshStandardMaterial({
            color : new THREE.Color(0.88, 0.88, 0.88),
            flatShading: true
        })
        const mesh = new THREE.Mesh(geo, mat)
        this.scene.add(mesh)

        //set glb property for model viewer to pick up
        
        const gltfX = new GLTFExporter()
        gltfX.parse(this.scene, 
            (gltf) => {
            const blob = new Blob( [gltf], { type: 'application/octet-stream' }, 'scene.glb')
            this.modelViewer.src = URL.createObjectURL( blob )
            },
            (err) => {
                console.log(err)
            },
            { binary : true })
    }
}

export { GlbGenerator }