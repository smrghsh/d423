import * as THREE from 'three'
import Experience from '../Experience.js'
import Debug from '../Utils/Debug.js'

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
        this.debug = new Debug()
        this.floor = new Floor()

        this.currentStep = 0
        console.log(this.currentStep)
        this.stepMeshes = []
        
        // this.steps = [
        //     {
        //         slide: "filename.jpg",
        //         mesh:
        //     },
        //     {
        //         slide: "filename.jpg",
        //         content: "THREE Group goes here"
        //     }
        // ]
        // this.circles = new Circles()
        // this.hypercube = new Hypercube()
        // Wait for resources
        /**
         * Satellite Imagery
         */
        
        this.stars = new Stars()
        this.resources.on('ready', () =>
        {
            // Setup
            console.log('resources ready')
            // this.test = new Test()
            

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
            this.satMesh.position.z -=1
            this.stepMeshes.push(this.satMesh)
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
            this.stepMeshes.push(this.b1Mesh)
            this.scene.add(this.b1Mesh)

            const b2Image = new Image()
            const b2Texture = this.resources.items.b2
            b2Image.addEventListener('load', () =>
            {
                b2Texture.needsUpdate = true
            })
            const b2Mat = new THREE.MeshBasicMaterial( { map: b2Texture} );
            this.b2Mesh = new THREE.Mesh(equiGeo,b2Mat)
            this.b2Mesh.position.y += 2
            this.stepMeshes.push(this.b2Mesh)
            this.scene.add(this.b2Mesh)

            this.b3DMesh = this.resources.items.b3D.scene
            this.b3DMesh.children[0].material = new THREE.MeshBasicMaterial({color:'grey', wireframe:true})
            this.b3DMesh.children[0].geometry.scale(4,4,4)
            this.b3DMesh.position.x -= 3.4
            this.b3DMesh.position.z += 1.1
            this.stepMeshes.push(this.b3DMesh)
            this.scene.add(this.b3DMesh)


            // this.spectra = new Spectra()
            // this.sushi = new Sushi()
            this.present(this.currentStep)
            
            this.environment = new Environment()

        })
    }
    update() {
        // this.circles.update()
    }
    
    prev() {

    }
    present(stepIndex) {
        // make everything but current step inivisible
        this.stepMeshes.forEach( (e)=>{
            e.visible = false
        })
        this.stepMeshes[stepIndex].visible = true
    }
    next() {
        this.currentStep++
        if(this.currentStep > this.stepMeshes.length-1){
            this.currentStep = 0
        }
        console.log(this.present(this.currentStep))
    }

}