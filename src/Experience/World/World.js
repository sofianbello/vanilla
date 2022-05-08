import Experience from "../Experience.js";
import Environment from './Environment.js'
import * as THREE from 'three'
import Floor from './Floor.js'
import Cube from "./Cube.js";



export default class World 
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // Test Mesh
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshStandardMaterial({color: 0xff1c77,wireframe: false})
        )
        testMesh.position.y = 0.7
        this.scene.add(testMesh)


        this.resources.on('ready', () => 
        {
            // Setup
            this.floor = new Floor()
            this.cube = new Cube()
            this.environment = new Environment()

            
        })        
    }
    update()
    {   
        if(this.cube){
            this.cube.update()
        }

    }

}