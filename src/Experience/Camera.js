import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from './Experience.js'


export default class Camera 
{
    constructor(experience)
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        

        // console.log(this.model);

        // Setup Debug Folder
        this.debug = this.experience.debug
        if(this.debug)
        {
            this.debugFolder = this.debug.ui.addFolder('Camera')
            
        }

        this.setInstance()
        this.setOrbitControls()
        

    }
    setInstance()
    {
        // The Camera is called 'this.instance'
        this.instance = new THREE.PerspectiveCamera(
            35, 
            this.sizes.width / this.sizes.height, 
            0.1,
            100)
        this.instance.position.set(1, 3, 10)            // Location of the camera
        this.orientation = {value: new THREE.Vector3(0,1,1)} // Orientation of the camera
        this.instance.lookAt(this.orientation.value) 

        // Debug
        this.debugFolder.add(this.instance.position, 'x' ).name('Position X').min(-10).max(10)
        this.debugFolder.add(this.instance.position, 'y' ).name('Position y').min(0.1).max(10)
        this.debugFolder.add(this.instance.position, 'z' ).name('Position z').min(-10).max(10)


        this.scene.add(this.instance)
    }
    setOrbitControls()
    {
       this.control = new OrbitControls(this.instance, this.canvas)
       this.control.enableDamping = true
       this.control.dampingFactor = 0.02
    //    this.control.minPolarAngle = Math.PI * 0.3 //  Clamp Vertical Angles
    //    this.control.maxPolarAngle = Math.PI * 0.45 // Clamp Vertical Angles
    //    this.control.minAzimuthAngle = Math.PI * 0. //  Clamp Vertical Angles
    //    this.control.maxAzimuthAngle = Math.PI * 0.45 // Clamp Vertical Angles

    }
    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
    update()
    {
        this.control.update()
    }
    
}