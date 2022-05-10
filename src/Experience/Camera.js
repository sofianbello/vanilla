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

        this.setInstance()
        this.setOrbitControls()

        

    }
    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            35, 
            this.sizes.width / this.sizes.height, 
            0.1,
            100)
        this.instance.position.set(1, 1, 10)
        this.scene.add(this.instance)
    }
    setOrbitControls()
    {
       this.control = new OrbitControls(this.instance, this.canvas)
       this.control.enableDamping = true
    }
    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
    update()
    {
        // this.control.update()
    }
    
}