import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
// import Spectra from './Spectra.js'
import Stars from './Stars.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.floor = new Floor()

        this.currentStep = 0
        this.steps = [
            {
                slide: "filename.jpg",
                content: "THREE Group goes here"
            },
            {
                slide: "filename.jpg",
                content: "THREE Group goes here"
            }
        ]
        // this.circles = new Circles()
        // this.hypercube = new Hypercube()
        // Wait for resources
        /**
         * Satellite Imagery
         */
        

        this.resources.on('ready', () =>
        {
            // Setup
            console.log('resources ready')
            // this.test = new Test()
            this.stars = new Stars()

            const satImage = new Image()
            const satTexture = this.resources.items.sat
            satImage.addEventListener('load', () =>
            {
                satTexture.needsUpdate = true
            })
            const satMat = new THREE.MeshBasicMaterial( { map: satTexture} );
            const satGeo = new THREE.PlaneGeometry(2058/300,1267/300,1,1)
            this.satMesh = new THREE.Mesh(satGeo,satMat)
            this.satMesh.rotation.x -= Math.PI/2
            this.scene.add(this.satMesh)

            const b1Image = new Image()
            const b1Texture = this.resources.items.b1
            b1Image.addEventListener('load', () =>
            {
                b1Texture.needsUpdate = true
            })
            const b1Mat = new THREE.MeshBasicMaterial( { map: b1Texture} );
            const equiGeo = new THREE.CylinderGeometry( 3, 3, 5, 60, 1, true);
            equiGeo.scale( - 1, 1, 1 );
            this.b1Mesh = new THREE.Mesh(equiGeo,b1Mat)
            this.b1Mesh.position.y += 2
            this.scene.add(this.b1Mesh)


            // this.spectra = new Spectra()
            // this.sushi = new Sushi()
            
            this.environment = new Environment()
        })
    }
    update() {
        // this.circles.update()
    }
    next() {
        this.currentStep

    }
    prev() {

    }
    switchVisibilities() {
        // make everything but current step inivisible
    }

}