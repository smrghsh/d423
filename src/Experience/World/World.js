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
        const placardGeo = new THREE.PlaneGeometry(1.6 * 1.5,.9 * 1.5,1,1)
        
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
            this.group1 = new THREE.Group()

            const s1Image = new Image()
            const s1Texture = this.resources.items.s1
            s1Image.addEventListener('load', () =>
            {
                s1Texture.needsUpdate = true
            })
            const s1Mat = new THREE.MeshBasicMaterial( { map: s1Texture} );

            this.s1 = new THREE.Mesh(placardGeo, s1Mat)
            this.s1.rotation.y -= Math.PI/4
            this.s1.position.z -= 1
            this.s1.position.x += 1
            this.s1.position.y += 1

            this.group1.add(this.satMesh)
            this.group1.add(this.s1)

            this.stepMeshes.push(this.group1)
            this.scene.add(this.group1)




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
            

            const s2Image = new Image()
            const s2Texture = this.resources.items.s2
            s2Image.addEventListener('load', () =>
            {
                s2Texture.needsUpdate = true
            })
            const s2Mat = new THREE.MeshBasicMaterial( { map: s2Texture} );

            this.s2 = new THREE.Mesh(placardGeo, s2Mat)
            this.s2.rotation.y -= Math.PI/4
            this.s2.position.z -= 1
            this.s2.position.x += 1
            this.s2.position.y += 1
            this.group2 = new THREE.Group()
            this.group2.add(this.b1Mesh)
            this.group2.add(this.s2)
            this.stepMeshes.push(this.group2)
            this.scene.add(this.group2)
            
            // this.stepMeshes.push(this.b1Mesh)
            // this.scene.add(this.b1Mesh)

            const b2Image = new Image()
            const b2Texture = this.resources.items.b2
            b2Image.addEventListener('load', () =>
            {
                b2Texture.needsUpdate = true
            })
            const b2Mat = new THREE.MeshBasicMaterial( { map: b2Texture} );
            this.b2Mesh = new THREE.Mesh(equiGeo,b2Mat)
            this.b2Mesh.position.y += 2

            const s3Image = new Image()
            const s3Texture = this.resources.items.s3
            s3Image.addEventListener('load', () =>
            {
                s3Texture.needsUpdate = true
            })
            const s3Mat = new THREE.MeshBasicMaterial( { map: s3Texture} );

            this.s3 = new THREE.Mesh(placardGeo, s3Mat)
            this.s3.rotation.y -= Math.PI/4
            this.s3.position.z -= 1
            this.s3.position.x += 1
            this.s3.position.y += 1
            this.group3 = new THREE.Group()
            this.group3.add(this.b2Mesh)
            this.group3.add(this.s3)
            this.stepMeshes.push(this.group3)
            this.scene.add(this.group3)

            this.b3DMesh = this.resources.items.b3D.scene
            this.b3DMesh.children[0].material = new THREE.MeshBasicMaterial({color:'grey', wireframe:true})
            this.b3DMesh.children[0].geometry.scale(4,4,4)
            this.b3DMesh.position.x -= 3.4
            this.b3DMesh.position.z += 1.1

            const s4Image = new Image()
            const s4Texture = this.resources.items.s4
            s4Image.addEventListener('load', () =>
            {
                s4Texture.needsUpdate = true
            })
            const s4Mat = new THREE.MeshBasicMaterial( { map: s4Texture} );

            this.s4 = new THREE.Mesh(placardGeo, s4Mat)
            this.s4.rotation.y -= Math.PI/4
            this.s4.position.z -= 1
            this.s4.position.x += 1
            this.s4.position.y += 1
            this.group4 = new THREE.Group()
            this.group4.add(this.b3DMesh)
            this.group4.add(this.s4)
            this.stepMeshes.push(this.group4)
            this.scene.add(this.group4)

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